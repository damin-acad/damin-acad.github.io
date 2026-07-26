/**
 * Animate citation chips when they enter the viewport.
 */
(function () {
  function parseCount(value) {
    const n = parseInt(String(value).replace(/[^\d]/g, ""), 10);
    return Number.isFinite(n) ? n : 0;
  }

  function animateCount(el, target) {
    if (target <= 0) {
      el.textContent = "0";
      return;
    }

    const duration = Math.min(900, 320 + target * 18);
    const start = performance.now();

    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(eased * target));
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = String(target);
      }
    }

    el.textContent = "0";
    requestAnimationFrame(frame);
  }

  function setup() {
    const chips = Array.from(document.querySelectorAll(".citation-chip"));
    if (chips.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = (chip) => {
      if (chip.dataset.animated === "true") return;
      chip.dataset.animated = "true";
      const countEl = chip.querySelector("[data-cite-count]");
      if (!countEl) return;
      const target = parseCount(countEl.dataset.citeCount);
      if (reduceMotion) {
        countEl.textContent = String(target);
        return;
      }
      chip.classList.add("is-animated");
      animateCount(countEl, target);
    };

    if (!("IntersectionObserver" in window)) {
      chips.forEach(run);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    chips.forEach((chip) => observer.observe(chip));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
