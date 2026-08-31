// particles.js - Aperture Lab particle system

(function() {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const canvas = document.querySelector('.particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  // Aperture orange with varying opacity
  const PARTICLE_COLORS = [
    'rgba(255, 102, 0, 0.4)',
    'rgba(255, 102, 0, 0.25)',
    'rgba(255, 102, 0, 0.15)',
    'rgba(224, 32, 32, 0.2)',
    'rgba(224, 32, 32, 0.1)'
  ];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    initParticles();
  }

  function initParticles() {
    const count = Math.min(Math.floor((width * height) / 18000), 120);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        radius: Math.random() * 1.5 + 0.5,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      // Gentle floating motion
      p.phase += 0.005;
      p.x += p.vx + Math.sin(p.phase) * 0.15;
      p.y += p.vy + Math.cos(p.phase * 0.7) * 0.1;

      // Wrap around edges
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }

    // Draw subtle connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 102, 0, ${0.04 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  function start() {
    resize();
    animate();
    window.addEventListener('resize', resize, { passive: true });
  }

  function stop() {
    if (animationId) cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  }

  // Start when visible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  // Cleanup on page hide
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  // Expose for debugging
  window.__aperture_particles = { start, stop, resize };
})();