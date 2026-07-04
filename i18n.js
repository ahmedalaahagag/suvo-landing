(function () {
  'use strict';

  var STORAGE_KEY = 'suvo-lang';

  function pageLang() {
    var lang = document.documentElement.getAttribute('lang') || 'en';
    return lang.indexOf('de') === 0 ? 'de' : 'en';
  }

  function isInlinePage() {
    return document.body.hasAttribute('data-i18n-inline');
  }

  function setActiveSwitcher(lang) {
    var switcher = document.querySelector('.lang-switcher');
    if (!switcher) {
      return;
    }

    switcher.querySelectorAll('[data-lang]').forEach(function (el) {
      var active = el.dataset.lang === lang;
      el.classList.toggle('is-active', active);
      if (active) {
        el.setAttribute('aria-current', 'true');
      } else {
        el.removeAttribute('aria-current');
      }
    });
  }

  function applyInlineLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('.lang-section[data-lang]').forEach(function (section) {
      section.hidden = section.dataset.lang !== lang;
    });

    var back = document.querySelector('[data-i18n-back]');
    if (back) {
      back.href = lang === 'de' ? 'de/index.html' : 'index.html';
      back.textContent = lang === 'de' ? '← Zurück zu Suvo' : '← Back to Suvo';
    }

    setActiveSwitcher(lang);
  }

  function initRedirect() {
    if (isInlinePage()) {
      applyInlineLang(localStorage.getItem(STORAGE_KEY) || pageLang());
      return;
    }

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
      el.addEventListener('click', function (event) {
        localStorage.setItem(STORAGE_KEY, el.dataset.lang);
        if (isInlinePage()) {
          event.preventDefault();
          applyInlineLang(el.dataset.lang);
        }
      });
    });

    if (!isInlinePage()) {
      switcher.querySelectorAll('[data-lang]').forEach(function (el) {
        if (el.dataset.lang === pageLang()) {
          el.classList.add('is-active');
          el.setAttribute('aria-current', 'true');
        }
      });
    }
  }

  initRedirect();
  initSwitcher();
})();
