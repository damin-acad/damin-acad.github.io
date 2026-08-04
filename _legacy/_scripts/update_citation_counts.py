#!/usr/bin/env python3
"""Refresh citations={} in _bibliography/papers.bib via Semantic Scholar.

Uses the batch paper endpoint (DOI / ARXIV ids) with title-search fallback.
Optional env SEMANTIC_SCHOLAR_API_KEY raises rate limits:
  https://www.semanticscholar.org/product/api#api-key-form

Run from repo root: python3 _scripts/update_citation_counts.py
"""

from __future__ import annotations

import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIB_PATH = ROOT / "_bibliography" / "papers.bib"
API_BASE = "https://api.semanticscholar.org/graph/v1"
USER_AGENT = "damin-acad-citation-bot/1.0 (academic site; github.com/damin-acad/damin-acad.github.io)"
FIELDS = "title,citationCount,externalIds"
BATCH_SIZE = 20
REQUEST_GAP_SEC = float(os.environ.get("S2_REQUEST_GAP", "3.0"))
MAX_RETRIES = 8


def api_headers() -> dict[str, str]:
    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
    key = os.environ.get("SEMANTIC_SCHOLAR_API_KEY", "").strip()
    if key:
        headers["x-api-key"] = key
    return headers


def request_json(url: str, data: bytes | None = None) -> dict | list | None:
    method = "POST" if data is not None else "GET"
    last_err = None
    for attempt in range(MAX_RETRIES):
        req = urllib.request.Request(url, data=data, headers=api_headers(), method=method)
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            last_err = e
            body = e.read().decode("utf-8", errors="replace")
            if e.code == 404:
                return None
            if e.code == 429:
                wait = min(120, (2**attempt) * 5)
                print(f"  rate limited; sleeping {wait}s", file=sys.stderr)
                time.sleep(wait)
                continue
            print(f"  HTTP {e.code}: {body[:200]}", file=sys.stderr)
            return None
        except Exception as e:  # noqa: BLE001
            last_err = e
            time.sleep(min(30, (2**attempt)))
    print(f"  request failed: {last_err}", file=sys.stderr)
    return None


def batch_papers(ids: list[str]) -> list[dict | None]:
    """Return papers aligned with ids (None when unmatched)."""
    out: list[dict | None] = []
    for i in range(0, len(ids), BATCH_SIZE):
        chunk = ids[i : i + BATCH_SIZE]
        url = f"{API_BASE}/paper/batch?fields={FIELDS}"
        payload = json.dumps({"ids": chunk}).encode("utf-8")
        result = request_json(url, data=payload)
        time.sleep(REQUEST_GAP_SEC)
        if not isinstance(result, list):
            out.extend([None] * len(chunk))
            continue
        # API returns one item per id (null if missing)
        if len(result) != len(chunk):
            # Be defensive if lengths diverge
            by_norm = {}
            for paper in result:
                if not paper:
                    continue
                ext = paper.get("externalIds") or {}
                if ext.get("DOI"):
                    by_norm[f"DOI:{ext['DOI']}".lower()] = paper
                if ext.get("ArXiv"):
                    by_norm[f"ARXIV:{ext['ArXiv']}".lower()] = paper
            for pid in chunk:
                out.append(by_norm.get(pid.lower()))
        else:
            out.extend(result)
    return out


def paper_by_search(title: str) -> dict | None:
    params = urllib.parse.urlencode({"query": title, "fields": FIELDS, "limit": 5})
    data = request_json(f"{API_BASE}/paper/search?{params}")
    time.sleep(REQUEST_GAP_SEC)
    if not isinstance(data, dict):
        return None
    items = data.get("data") or []
    if not items:
        return None
    norm = normalize_title(title)
    for item in items:
        if normalize_title(item.get("title") or "") == norm:
            return item
    first = items[0]
    if title_similarity(norm, normalize_title(first.get("title") or "")) >= 0.75:
        return first
    return None


def normalize_title(title: str) -> str:
    t = title.lower()
    t = re.sub(r"[^a-z0-9\s]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def title_similarity(a: str, b: str) -> float:
    if not a or not b:
        return 0.0
    sa, sb = set(a.split()), set(b.split())
    if not sa or not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)


def extract_field(body: str, name: str) -> str | None:
    m = re.search(rf"{name}\s*=\s*\{{([^{{}}]*)\}}", body, flags=re.I | re.S)
    if not m:
        return None
    return re.sub(r"\s+", " ", m.group(1)).strip()


def parse_entries(text: str) -> list[tuple[str, str, str]]:
    """Return list of (entry_type, key, body)."""
    pattern = re.compile(r"@(\w+)\{([^,]+),\n(.*?)(^})", re.S | re.M)
    return [(m.group(1), m.group(2), m.group(3)) for m in pattern.finditer(text)]


def resolve_ids(body: str) -> tuple[str | None, str | None, str | None]:
    doi = extract_field(body, "doi")
    arxiv = extract_field(body, "arxiv")
    title = extract_field(body, "title")
    html = extract_field(body, "html") or ""

    if not arxiv:
        m = re.search(r"arxiv\.org/abs/([0-9]+\.[0-9]+)", html, flags=re.I)
        if m:
            arxiv = m.group(1)
    if not doi:
        m = re.search(r"(10\.\d{4,9}/[-._;()/:A-Z0-9]+)", html, flags=re.I)
        if m:
            doi = m.group(1).rstrip(".,;)")

    return doi, arxiv, title


def set_citations(body: str, count: int) -> str:
    line = f"  citations={{{count}}},\n"
    if re.search(r"^[ \t]*citations\s*=\s*\{[^}]*\},?[ \t]*\n", body, flags=re.M):
        return re.sub(
            r"^[ \t]*citations\s*=\s*\{[^}]*\},?[ \t]*\n",
            line,
            body,
            count=1,
            flags=re.M,
        )
    if re.search(r"^[ \t]*google_scholar_id\s*=\s*\{[^}]*\},[ \t]*\n", body, flags=re.M):
        return re.sub(
            r"(^[ \t]*google_scholar_id\s*=\s*\{[^}]*\},[ \t]*\n)",
            r"\1" + line,
            body,
            count=1,
            flags=re.M,
        )
    if re.search(r"^[ \t]*title\s*=\s*\{.*?\},[ \t]*\n", body, flags=re.M | re.S):
        return re.sub(
            r"(^[ \t]*title\s*=\s*\{.*?\},[ \t]*\n)",
            r"\1" + line,
            body,
            count=1,
            flags=re.M | re.S,
        )
    return line + body


def main() -> int:
    if not BIB_PATH.is_file():
        print(f"Bib not found: {BIB_PATH}", file=sys.stderr)
        return 1

    text = BIB_PATH.read_text(encoding="utf-8")
    entries = parse_entries(text)
    if not entries:
        print("No bib entries found", file=sys.stderr)
        return 1

    print(f"Updating citations for {len(entries)} entries via Semantic Scholar…")
    if not os.environ.get("SEMANTIC_SCHOLAR_API_KEY", "").strip():
        print(
            "Tip: set SEMANTIC_SCHOLAR_API_KEY for higher rate limits "
            "(https://www.semanticscholar.org/product/api#api-key-form)",
            file=sys.stderr,
        )

    # Prefer DOI, else ARXIV, for batch lookup
    lookup_ids: list[str | None] = []
    meta: list[tuple[str, str, str, str | None, str | None, str | None]] = []
    for etype, key, body in entries:
        doi, arxiv, title = resolve_ids(body)
        pid = f"DOI:{doi}" if doi else (f"ARXIV:{arxiv}" if arxiv else None)
        lookup_ids.append(pid)
        meta.append((etype, key, body, doi, arxiv, title))

    id_list = [pid for pid in lookup_ids if pid]
    id_to_paper: dict[str, dict] = {}
    if id_list:
        print(f"Batch lookup for {len(id_list)} DOI/arXiv ids…")
        papers = batch_papers(id_list)
        for pid, paper in zip(id_list, papers):
            if paper and paper.get("citationCount") is not None:
                id_to_paper[pid.lower()] = paper

    updated = 0
    skipped = 0
    failed = 0
    new_text = text

    for etype, key, body, doi, arxiv, title in meta:
        print(f"- {key}")
        paper = None
        if doi and f"DOI:{doi}".lower() in id_to_paper:
            paper = id_to_paper[f"DOI:{doi}".lower()]
        elif arxiv and f"ARXIV:{arxiv}".lower() in id_to_paper:
            paper = id_to_paper[f"ARXIV:{arxiv}".lower()]
        elif title:
            print("  title search fallback")
            paper = paper_by_search(title)

        if not paper or paper.get("citationCount") is None:
            print("  no match")
            failed += 1
            continue

        count = int(paper["citationCount"])
        old = extract_field(body, "citations")
        old_n = int(old) if old and old.isdigit() else None
        if old_n == count:
            print(f"  unchanged ({count})")
            skipped += 1
            continue

        new_body = set_citations(body, count)
        old_entry = f"@{etype}{{{key},\n{body}}}"
        new_entry = f"@{etype}{{{key},\n{new_body}}}"
        if old_entry not in new_text:
            print("  failed to rewrite entry", file=sys.stderr)
            failed += 1
            continue
        new_text = new_text.replace(old_entry, new_entry, 1)
        print(f"  {old_n} → {count}" if old_n is not None else f"  set {count}")
        updated += 1

    if new_text != text:
        BIB_PATH.write_text(new_text, encoding="utf-8")
        print(f"Wrote {BIB_PATH}")
    else:
        print("No file changes")

    print(f"Done: updated={updated} unchanged={skipped} unmatched={failed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
