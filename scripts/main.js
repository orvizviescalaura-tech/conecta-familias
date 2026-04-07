/* ============================================
   main.js — Interactividad y animaciones
   Tecnología Para Todos · TPT
   ============================================ */

'use strict';

/* ---- NAV: scroll state + burger menu ---- */
(function initNav() {
  const nav      = document.getElementById('nav');
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  // Scrolled state
  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // Burger toggle
  burger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);

    // Animate burger bars → X
    const bars = burger.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'translateY(7px) rotate(45deg)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    }
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      const bars = burger.querySelectorAll('span');
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    });
  });
})();

/* ---- REVEAL ON SCROLL ---- */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Stagger siblings within the same parent grid/flex container
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
          const idx      = siblings.indexOf(entry.target);

          entry.target.style.transitionDelay = (idx * 0.1) + 's';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ---- SMOOTH SCROLL for anchor links ---- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navHeight = document.getElementById('nav').offsetHeight;
      const targetY   = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    });
  });
})();

/* ---- CONTACT FORM ---- */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      shakeField('name');
      return;
    }

    if (!email || !emailRx.test(email)) {
      shakeField('email');
      return;
    }

    // Simulate send
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent  = 'Enviando…';
    btn.disabled     = true;

    setTimeout(function () {
      form.reset();
      btn.textContent = 'Enviar mensaje →';
      btn.disabled    = false;
      success.hidden  = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      setTimeout(function () { success.hidden = true; }, 6000);
    }, 1000);
  });

  function shakeField(id) {
    const field = form.querySelector('#' + id);
    if (!field) return;
    field.style.animation = 'none';
    // Force reflow
    void field.offsetWidth;
    field.style.animation = 'shake 0.4s ease';
  }
})();

/* ---- SHAKE KEYFRAMES (injected via JS so no CSS file edit needed) ---- */
(function injectKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-8px); }
      40%       { transform: translateX(8px); }
      60%       { transform: translateX(-5px); }
      80%       { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);
})();

/* ---- ACTIVE NAV LINK (highlight section in view) ---- */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav__links a');

  if (!sections.length || !navAs.length) return;

  function onScroll() {
    const scrollY   = window.scrollY;
    const navH      = document.getElementById('nav').offsetHeight;

    let current = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - navH - 60;
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navAs.forEach(function (a) {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--text)';
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();
