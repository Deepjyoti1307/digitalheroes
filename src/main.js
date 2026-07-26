/**
 * NorthPeak Digital — Interactions & Smooth Scroll
 *
 * Features:
 * - Lenis smooth scroll (silky 120fps-ready)
 * - Staggered scroll-reveal via IntersectionObserver
 * - Animated stat counters on scroll
 * - Active nav tracking
 * - Mobile nav with scroll lock
 * - Contact form validation
 */

import Lenis from 'lenis';

document.addEventListener('DOMContentLoaded', init);

function init() {
  const lenis = initSmoothScroll();
  initMobileNav(lenis);
  initHeaderScroll(lenis);
  initScrollReveal();
  initStatCounters();
  initContactForm();
}


/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL (Lenis)
   ═══════════════════════════════════════════════════════════ */

function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  /** Persistent animation loop */
  (function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  })(performance.now());

  /** Intercept all anchor links for silky scrolling */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, {
        offset: -72,
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    });
  });

  return lenis;
}


/* ═══════════════════════════════════════════════════════════
   MOBILE NAVIGATION
   ═══════════════════════════════════════════════════════════ */

function initMobileNav(lenis) {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!isOpen));
    burger.classList.toggle('burger--open');
    nav.classList.toggle('nav--open');

    if (!isOpen) {
      lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis.start();
      document.body.style.overflow = '';
    }
  });

  document.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      burger.classList.remove('burger--open');
      nav.classList.remove('nav--open');
      lenis.start();
      document.body.style.overflow = '';
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   HEADER SCROLL STATE + ACTIVE NAV
   ═══════════════════════════════════════════════════════════ */

function initHeaderScroll(lenis) {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  if (!header) return;

  lenis.on('scroll', ({ scroll }) => {
    header.classList.toggle('scrolled', scroll > 30);

    /* Active section tracking */
    let current = '';
    const offset = window.innerHeight * 0.35;

    sections.forEach((section) => {
      if (scroll >= section.offsetTop - offset) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current}`
      );
    });
  });
}


/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL — Staggered siblings
   ═══════════════════════════════════════════════════════════ */

function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    revealEls.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      /** Group newly-visible entries by parent for stagger */
      const groups = new Map();

      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const parent = entry.target.parentElement;
        if (!groups.has(parent)) groups.set(parent, []);
        groups.get(parent).push(entry.target);
      });

      groups.forEach((els) => {
        els.forEach((el, i) => {
          el.style.transitionDelay = `${i * 100}ms`;
          el.classList.add('is-visible');
          observer.unobserve(el);
        });
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}


/* ═══════════════════════════════════════════════════════════
   ANIMATED STAT COUNTERS
   ═══════════════════════════════════════════════════════════ */

function initStatCounters() {
  const statEls = document.querySelectorAll('[data-count]');
  if (!statEls.length) return;

  let hasFired = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasFired) {
          hasFired = true;
          animateCounters(statEls);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  statEls.forEach((el) => observer.observe(el));
}

/**
 * Animate each stat counter from 0 to its target value.
 * Handles integers and floats (e.g. 3.2).
 */
function animateCounters(elements) {
  const duration = 2000;

  elements.forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const isFloat = !Number.isInteger(target);
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      /* Ease-out quart for satisfying deceleration */
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * target;

      el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  });
}


/* ═══════════════════════════════════════════════════════════
   CONTACT FORM VALIDATION
   ═══════════════════════════════════════════════════════════ */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = document.getElementById('submit-btn');

  const fields = {
    name: {
      el: document.getElementById('name'),
      validate: (v) => v.length > 0,
    },
    email: {
      el: document.getElementById('email'),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    },
    message: {
      el: document.getElementById('message'),
      validate: (v) => v.length >= 10,
    },
  };

  /** Toggle error state on a single field */
  function validateField(field) {
    const valid = field.validate(field.el.value.trim());
    field.el.classList.toggle('is-invalid', !valid);
    field.el.parentElement.classList.toggle('has-error', !valid);
    return valid;
  }

  /* Inline validation on blur + clear on input */
  Object.values(fields).forEach((field) => {
    field.el.addEventListener('blur', () => validateField(field));
    field.el.addEventListener('input', () => {
      if (field.el.classList.contains('is-invalid')) {
        field.el.classList.remove('is-invalid');
        field.el.parentElement.classList.remove('has-error');
      }
    });
  });

  /* Submit handler */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const allValid = Object.values(fields)
      .map((f) => validateField(f))
      .every(Boolean);

    if (!allValid) return;

    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-disabled', 'true');
    submitBtn.classList.add('is-loading');

    /* Simulate 600ms network request */
    setTimeout(() => {
      form.classList.add('is-success');
      document.getElementById('form-success').focus();
    }, 600);
  });
}
