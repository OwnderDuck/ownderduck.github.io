// scanlines.js - Subtle CRT scanline enhancement

(function() {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Create scanline overlay
  const overlay = document.createElement('div');
  overlay.className = 'scanlines';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  // Subtle flicker on focus/visibility change
  let flickerTimeout;
  function triggerFlicker() {
    overlay.style.animation = 'none';
    overlay.offsetHeight; // force reflow
    overlay.style.animation = 'scanline-move 8s linear infinite, scanline-flicker 0.15s infinite';
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) triggerFlicker();
  });

  window.addEventListener('focus', triggerFlicker);
})();