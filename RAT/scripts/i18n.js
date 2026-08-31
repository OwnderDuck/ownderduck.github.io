// i18n.js - Language switching persistence
// This runs on both EN and ZH pages to handle language toggle

(function() {
  'use strict';

  const LANG_KEY = 'reaperture-lang';
  const DEFAULT_LANG = 'en';

  function getPreferredLang() {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored) return stored;
    
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) return 'zh';
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;
  }

  // Initialize on load
  const preferredLang = getPreferredLang();
  setLang(preferredLang);

  // Handle language toggle clicks (delegated)
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('.lang-toggle');
    if (!toggle) return;
    
    const currentLang = document.documentElement.getAttribute('data-lang') || DEFAULT_LANG;
    const newLang = currentLang === 'en' ? 'zh' : 'en';
    const newPath = newLang === 'zh' ? `/zh${window.location.pathname}` : window.location.pathname.replace(/^\/zh/, '');
    
    setLang(newLang);
    
    // Navigate to the other language version
    window.location.href = newPath;
  });

  // Expose for debugging
  window.__reaperture_i18n = { getPreferredLang, setLang };
})();