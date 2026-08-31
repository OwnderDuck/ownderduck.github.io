// typewriter.js - IntersectionObserver-based typewriter trigger

(function() {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Show all typewriter text immediately
    document.querySelectorAll('[data-text]').forEach(el => {
      el.textContent = el.dataset.text || '';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.dataset.typed === 'true') return;
        
        const text = el.dataset.text || '';
        const speed = parseInt(el.dataset.speed || '30', 10);
        const delay = parseInt(el.dataset.delay || '0', 10);
        
        el.dataset.typed = 'true';
        el.textContent = '';
        
        setTimeout(() => {
          let i = 0;
          const type = () => {
            if (i < text.length) {
              el.textContent += text[i];
              i++;
              setTimeout(type, speed + Math.random() * 15);
            } else {
              el.dispatchEvent(new CustomEvent('typewriter-complete'));
            }
          };
          type();
        }, delay);
        
        observer.unobserve(el);
      }
    });
  }, { rootMargin: '100px', threshold: 0.1 });

  document.querySelectorAll('[data-text]').forEach(el => observer.observe(el));
})();