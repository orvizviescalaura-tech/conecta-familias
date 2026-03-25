/* ============================================================
   main.js — Lógica principal
   Conecta Familias
   ============================================================ */

/* ── NAV SCROLL ──────────────────────────────────────────── */
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── HAMBURGER MENU ──────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── REVEAL ON SCROLL ────────────────────────────────────── */
const reveals  = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObs.observe(el));

/* ── COUNT-UP ANIMATION ──────────────────────────────────── */
function animateCount(el) {
  const target   = parseInt(el.dataset.count, 10);
  const duration = 1800;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString('es-ES');
  }, 16);
}

const counters   = document.querySelectorAll('[data-count]');
const countObs   = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => countObs.observe(c));

/* ── DONATION TIER CARDS ─────────────────────────────────── */
document.querySelectorAll('.tier-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.tier-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    document.getElementById('donate-amount').value = card.dataset.amount;
  });
});

/* ── DONATE BUTTON FEEDBACK ──────────────────────────────── */
function handleDonate(e) {
  e.preventDefault();
  const btn = e.currentTarget;

  btn.textContent = '✓ ¡Gracias por tu generosidad!';
  btn.style.background = 'var(--green)';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = '💛 Donar ahora de forma segura';
    btn.style.background = '';
    btn.disabled = false;
  }, 3500);
}
