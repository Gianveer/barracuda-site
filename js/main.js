/* ==========================================================================
   Barracuda Holdings — main.js
   Vanilla JS, no libraries. Loaded with `defer` on every page.
     1. Mark <html> as JS-enabled (arms CSS-gated animations).
     2. Mobile nav toggle with aria-expanded sync.
     3. IntersectionObserver scroll reveal (.reveal -> .is-visible).
     4. Animated stat count-ups (homepage), rAF + easeOutExpo.
     5. Pause/hide hero video under reduced motion.
   Everything degrades to visible, static content with JS off or reduced motion.
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var prefersReducedMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  // 1. Announce JS. `js` gates the hero entrance; `reveal-armed` hides
  //    .reveal targets until the observer reveals them. Under reduced motion
  //    we still add `js` (for state) but NOT `reveal-armed`, so content stays
  //    visible and nothing waits on an observer.
  root.classList.add("js");
  if (!prefersReducedMotion) {
    root.classList.add("reveal-armed");
  }

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  /* ---- 2. Mobile nav toggle -------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      nav.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    // Close the menu when a link is chosen.
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    // Close on Escape and return focus to the toggle.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // Reset state if we grow past the mobile breakpoint.
    var wide = window.matchMedia("(min-width: 861px)");
    var handleWide = function (mq) {
      if (mq.matches) setOpen(false);
    };
    if (wide.addEventListener) {
      wide.addEventListener("change", handleWide);
    } else if (wide.addListener) {
      wide.addListener(handleWide);
    }
  }

  /* ---- 3. Scroll reveal -------------------------------------------------
     Reveals .reveal elements as they enter the viewport. An IntersectionObserver
     drives the normal case; a throttled scroll/resize sweep is the failsafe so
     jump-scrolls (anchor links, fast flicks) can never leave a section stuck
     invisible. Both paths add .is-visible and stop tracking the element. */
  function initReveal() {
    var targets = [].slice.call(document.querySelectorAll(".reveal"));
    if (!targets.length) return;

    // No IntersectionObserver support or reduced motion -> show everything.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      root.classList.remove("reveal-armed");
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var pending = targets.slice();

    function reveal(el) {
      el.classList.add("is-visible");
      var i = pending.indexOf(el);
      if (i !== -1) pending.splice(i, 1);
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      // Trigger a touch BEFORE the element's top reaches the viewport bottom.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });

    // Failsafe sweep: reveal anything whose top has crossed 92% of the viewport,
    // regardless of whether the observer fired. rAF-throttled, passive.
    var ticking = false;
    function sweep() {
      ticking = false;
      var trigger = window.innerHeight * 0.92;
      pending.slice().forEach(function (el) {
        if (el.getBoundingClientRect().top <= trigger) {
          reveal(el);
          observer.unobserve(el);
        }
      });
      if (!pending.length) teardown();
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(sweep);
      }
    }
    function teardown() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Reveal whatever is already in view on load.
    sweep();
  }

  /* ---- 4. Stat count-ups ----------------------------------------------- */
  // easeOutExpo — fast start, gentle settle. Matches the CSS --ease-out feel.
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function formatNumber(value, useGrouping) {
    var rounded = Math.round(value);
    return useGrouping ? rounded.toLocaleString("en-US") : String(rounded);
  }

  function runCountUp(el) {
    var target = parseFloat(el.getAttribute("data-count-to"));
    if (isNaN(target)) return;
    var useGrouping = el.getAttribute("data-count-group") === "true";
    var prefix = el.getAttribute("data-count-prefix") || "";
    var duration = 1600;
    var start = null;

    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      var current = easeOutExpo(progress) * target;
      el.textContent = prefix + formatNumber(current, useGrouping);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = prefix + formatNumber(target, useGrouping);
      }
    }
    requestAnimationFrame(frame);
  }

  function initCountUps() {
    var counters = document.querySelectorAll("[data-count-to]");
    if (!counters.length) return;

    function setFinal(el) {
      var target = parseFloat(el.getAttribute("data-count-to"));
      if (isNaN(target)) return;
      var useGrouping = el.getAttribute("data-count-group") === "true";
      var prefix = el.getAttribute("data-count-prefix") || "";
      el.textContent = prefix + formatNumber(target, useGrouping);
    }

    // Reduced motion or no observer -> write the final value immediately.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      counters.forEach(setFinal);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCountUp(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- 5. Hero video under reduced motion ------------------------------ */
  function initHeroVideo() {
    var video = document.querySelector(".hero-video");
    if (!video) return;
    if (prefersReducedMotion) {
      video.style.display = "none";
      try {
        video.pause();
        video.removeAttribute("autoplay");
      } catch (e) {
        /* pausing a not-yet-loaded video can throw; safe to ignore */
      }
    }
  }

  onReady(function () {
    initNav();
    initReveal();
    initCountUps();
    initHeroVideo();
  });
})();
