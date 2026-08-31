// layout.js - Layout inline scripts
window.showToast = (msg, dur = 2000) => {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.hidden = false;
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.hidden = true, 300);
  }, dur);
};

const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.background = 'var(--header-scroll-bg)';
    header.style.boxShadow = 'var(--header-scroll-shadow)';
    header.style.backdropFilter = 'blur(8px)';
  } else {
    header.style.background = 'transparent';
    header.style.boxShadow = 'none';
    header.style.backdropFilter = 'none';
  }
});

const themeToggle = document.getElementById('theme-toggle');
const iconSun = themeToggle?.querySelector('.icon-sun');
const iconMoon = themeToggle?.querySelector('.icon-moon');
const KEY = 'aperture-theme';

function apply(t) {
  document.documentElement.setAttribute('data-theme', t);
  if (iconSun && iconMoon) {
    if (t === 'dark') {
      iconSun.style.display = 'block';
      iconMoon.style.display = 'none';
    } else {
      iconSun.style.display = 'none';
      iconMoon.style.display = 'block';
    }
  }
}

const saved = localStorage.getItem(KEY);
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
apply(saved || (prefersDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const c = document.documentElement.getAttribute('data-theme');
  const n = c === 'dark' ? 'light' : 'dark';
  localStorage.setItem(KEY, n);
  apply(n);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem(KEY)) apply(e.matches ? 'dark' : 'light');
});