#!/usr/bin/env python3
"""
Builds a low-poly figure from the portrait.

A likeness cannot be generated here, so this derives one: the photograph is
sampled onto a jittered lattice, split into triangles, and each triangle is
filled with the ink level nearest its mean luminance. The result resembles the
subject because it is computed from him, and it is geometry rather than a
photograph — which is what was asked for.

The background falls out for free. It is a flat (227,232,240), so every triangle
covering it lands in the lightest bucket and simply is not drawn; the paper shows
through. No masking, no transparent PNG to keep in sync.

Deterministic: the jitter is a hash of the vertex index, so the same photo always
produces the same mesh.

Depth comes from the same sampling. Luminance is read as a height field — lit
areas stand forward, shadow recedes — so the mesh is a bas-relief of the
photograph rather than a flat cut-out. It is a height map, not a scan: it will
not survive being turned all the way side-on, which is why the viewer keeps the
rotation to a shallow sweep.

    python3 scripts/build-figure.py
    -> public/figure.json   (mesh, for the rotating viewer)
    -> public/figure.svg    (flat fallback, and useful on its own)

Requires macOS `sips` for JPEG decoding. Everything else is stdlib.
"""

import json
import math
import struct
import subprocess
import sys
import zlib
from pathlib import Path

SRC = Path("public/prof_pic.jpg")
OUT = Path("public/figure.svg")
MESH = Path("public/figure.json")
TMP = Path("/tmp/figure-sample.png")

COLS = 34          # lattice columns; higher = more polygons, less abstraction
JITTER = 0.34      # how far vertices wander, as a fraction of a cell
BG_CUTOFF = 202    # luminance at or above this is background and stays unpainted
RELIEF = 0.42      # depth of the height field, in units of half the frame

# Four ink levels, darkest last, emitted as CSS custom properties rather than
# hex. The SVG is inlined by the component, so the figure resolves against
# whichever paper stock is active instead of being baked to one palette.
INKS = [
    (0.00, None),                # paper — not drawn
    (0.30, "var(--fig-1)"),      # lightest coverage
    (0.55, "var(--fig-2)"),
    (0.78, "var(--fig-3)"),
    (1.00, "var(--fig-4)"),      # solid
]


def decode_png(path: Path):
    """Minimal PNG reader: 8-bit truecolour, which is what sips emits here."""
    data = path.read_bytes()
    pos, idat = 8, b""
    w = h = ct = None
    while pos < len(data):
        (length,) = struct.unpack(">I", data[pos : pos + 4])
        kind = data[pos + 4 : pos + 8]
        if kind == b"IHDR":
            w, h, _bitdepth, ct = struct.unpack(">IIBB", data[pos + 8 : pos + 18])
        elif kind == b"IDAT":
            idat += data[pos + 8 : pos + 8 + length]
        pos += 12 + length

    channels = {0: 1, 2: 3, 4: 2, 6: 4}[ct]
    raw = zlib.decompress(idat)
    stride = w * channels
    rows, prev, p = [], bytearray(stride), 0

    for _ in range(h):
        filt = raw[p]
        p += 1
        line = bytearray(raw[p : p + stride])
        p += stride
        for i in range(stride):
            a = line[i - channels] if i >= channels else 0
            b = prev[i]
            c = prev[i - channels] if i >= channels else 0
            if filt == 1:
                line[i] = (line[i] + a) & 255
            elif filt == 2:
                line[i] = (line[i] + b) & 255
            elif filt == 3:
                line[i] = (line[i] + (a + b) // 2) & 255
            elif filt == 4:
                pp = a + b - c
                pa, pb, pc = abs(pp - a), abs(pp - b), abs(pp - c)
                line[i] = (line[i] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        rows.append(bytes(line))
        prev = line

    return w, h, channels, rows


def main() -> int:
    if not SRC.exists():
        print(f"missing {SRC}", file=sys.stderr)
        return 1

    # sample at roughly two pixels per lattice cell, which is enough to average
    sample_w = COLS * 6
    run = subprocess.run(
        ["sips", "-Z", str(sample_w), "-s", "format", "png", str(SRC), "--out", str(TMP)],
        capture_output=True,
    )
    if run.returncode != 0:
        print("sips failed:", run.stderr.decode()[:200], file=sys.stderr)
        return 1

    w, h, ch, rows = decode_png(TMP)

    def lum(x: int, y: int) -> float:
        x = max(0, min(w - 1, x))
        y = max(0, min(h - 1, y))
        o = x * ch
        r, g, b = rows[y][o], rows[y][o + 1], rows[y][o + 2]
        return 0.2126 * r + 0.7152 * g + 0.0722 * b

    rows_n = max(1, round(COLS * h / w))
    cell_w, cell_h = w / COLS, h / rows_n

    def jitter(i: int, j: int, axis: int) -> float:
        """Deterministic offset in [-JITTER, JITTER] cells."""
        n = (i * 73856093) ^ (j * 19349663) ^ (axis * 83492791)
        n = (n * 2654435761) & 0xFFFFFFFF
        return ((n % 2000) / 1000.0 - 1.0) * JITTER

    # lattice vertices, edges pinned so the silhouette stays clean
    verts = {}
    for j in range(rows_n + 1):
        for i in range(COLS + 1):
            edge = i in (0, COLS) or j in (0, rows_n)
            dx = 0.0 if edge else jitter(i, j, 0)
            dy = 0.0 if edge else jitter(i, j, 1)
            verts[(i, j)] = ((i + dx) * cell_w, (j + dy) * cell_h)

    def ink_for(level: float):
        for threshold, colour in INKS:
            if level <= threshold:
                return colour
        return INKS[-1][1]

    def threshold_for(level: float):
        for threshold, _colour in INKS:
            if level <= threshold:
                return threshold
        return INKS[-1][0]

    tris, painted = [], 0
    faces_out = []
    for j in range(rows_n):
        for i in range(COLS):
            quad = [verts[(i, j)], verts[(i + 1, j)], verts[(i + 1, j + 1)], verts[(i, j + 1)]]
            # alternate the diagonal so the mesh does not read as a grid
            split = ((i + j) % 2) == 0
            faces = (
                [(quad[0], quad[1], quad[2]), (quad[0], quad[2], quad[3])]
                if split
                else [(quad[0], quad[1], quad[3]), (quad[1], quad[2], quad[3])]
            )
            for face in faces:
                cx = sum(p[0] for p in face) / 3
                cy = sum(p[1] for p in face) / 3
                # average the centroid with the vertices for a steadier read
                samples = [lum(int(cx), int(cy))] + [lum(int(px), int(py)) for px, py in face]
                mean = sum(samples) / len(samples)
                if mean >= BG_CUTOFF:
                    continue
                level = 1.0 - (mean / BG_CUTOFF)
                colour = ink_for(level)
                if colour is None:
                    continue
                painted += 1
                pts = " ".join(f"{px:.1f},{py:.1f}" for px, py in face)
                tris.append(f'<polygon points="{pts}" fill="{colour}"/>')
                # level index 1..4, matching --fig-1..--fig-4
                faces_out.append((face[0], face[1], face[2], INKS.index((threshold_for(level), colour))))

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'role="img" aria-label="Low-poly figure derived from a photograph of Danial Amin">'
        f"<title>Danial Amin — low-poly figure</title>"
        f'<g shape-rendering="crispEdges">{"".join(tris)}</g></svg>'
    )
    OUT.write_text(svg + "\n")

    # ---- the same mesh, with depth, for the rotating viewer ----
    #
    # Vertices are centred on the origin and scaled so the longer side spans
    # [-1, 1]; z is the height field. Faces index into that list and carry the
    # ink level they were assigned, so the client never re-samples the image.
    half = max(w, h) / 2
    index = {}
    mesh_verts = []

    def vid(pt):
        key = (round(pt[0], 2), round(pt[1], 2))
        if key not in index:
            px, py = pt
            # luminance at the vertex drives depth: lit forward, shadow back
            level = 1.0 - min(lum(int(px), int(py)), 255.0) / 255.0
            z = (level - 0.5) * 2 * RELIEF
            index[key] = len(mesh_verts)
            mesh_verts.append(
                [
                    round((px - w / 2) / half, 4),
                    round((py - h / 2) / half, 4),
                    round(z, 4),
                ]
            )
        return index[key]

    mesh_faces = [[vid(a), vid(b), vid(c), lv] for a, b, c, lv in faces_out]

    MESH.write_text(
        json.dumps(
            {
                "source": "derived from public/prof_pic.jpg by scripts/build-figure.py",
                "width": w,
                "height": h,
                "relief": RELIEF,
                "levels": 4,
                "verts": mesh_verts,
                "faces": mesh_faces,
            },
            separators=(",", ":"),
        )
        + "\n"
    )

    total = COLS * rows_n * 2
    print(f"wrote {OUT}")
    print(f"  lattice   {COLS} x {rows_n} cells")
    print(f"  triangles {painted} painted of {total} ({painted / total * 100:.0f}%)")
    print(f"  dropped   {total - painted} as background (>= {BG_CUTOFF} luminance)")
    print(f"  svg       {OUT.stat().st_size / 1024:.1f} kB")
    print(f"  mesh      {MESH.stat().st_size / 1024:.1f} kB · {len(mesh_verts)} verts, {len(mesh_faces)} faces")
    zs = [v[2] for v in mesh_verts]
    print(f"  relief    z {min(zs):+.3f} .. {max(zs):+.3f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
