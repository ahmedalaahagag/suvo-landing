(function () {
  'use strict';

  var STORAGE_KEY = 'suvo-lang';

  function pageLang() {
    var lang = document.documentElement.getAttribute('lang') || 'en';
    return lang.indexOf('de') === 0 ? 'de' : 'en';
  }

  function initRedirect() {
    var saved = localStorage.getItem(STORAGE_KEY);
    var current = pageLang();
    if (!saved || saved === current) {
      return;
    }

    var switcher = document.querySelector('.lang-switcher');
    if (!switcher) {
      return;
    }

    var target = switcher.querySelector('[data-lang="' + saved + '"]');
    if (!target || !target.href) {
      return;
    }

    var currentUrl = window.location.href.split('#')[0];
    var targetUrl = target.href.split('#')[0];
    if (targetUrl !== currentUrl) {
      window.location.replace(target.href);
    }
  }

  function initSwitcher() {
    var switcher = document.querySelector('.lang-switcher');
    if (!switcher) {
      return;
    }

    switcher.querySelectorAll('[data-lang]').forEach(function (el) {
      if (el.dataset.lang === pageLang()) {
        el.classList.add('is-active');
        el.setAttribute('aria-current', 'true');
      }

      el.addEventListener('click', function () {
        localStorage.setItem(STORAGE_KEY, el.dataset.lang);
      });
    });
  }

  initRedirect();
  initSwitcher();
})();
