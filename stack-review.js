(function () {
  'use strict';

  var API = 'https://api.getsuvo.com';
  var ANON_KEY = 'suvo_anonymous_id';
  var SESSION_KEY = 'suvo_session_id';
  var UTM_KEY = 'suvo_utm_first';
  var MIN_RECOGNIZED = 3;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var root = document.getElementById('free-review');
  if (!root) {
    return;
  }

  var lang = root.getAttribute('data-lang') === 'de' ? 'de' : 'en';
  var copy = lang === 'de' ? {
    conflict: 'Konflikt-Hinweise',
    synergy: 'Synergien',
    dose: 'Dosis-Hinweise',
    drug: 'Arzneimittel-Hinweise',
    other: 'weitere Hinweise',
    noteSingular: '1 Hinweis',
    notePlural: '{n} Hinweise',
    lockedLine: 'Speichere deinen Stack, um die anderen Hinweise zu sehen und über die Zeit zu verfolgen.',
    addMore: 'Mindestens drei erkannte Wirkstoffe braucht es für eine Bewertung. Bitte füge weitere hinzu.',
    pickOne: 'Bitte auswählen…',
    typical: 'übliche Menge',
    needEmail: 'Bitte eine gültige E-Mail eingeben.',
    checkEmail: 'Prüfe dein Postfach — der Link kommt gleich.',
    waitlistOk: 'Danke. Wir melden uns, sobald die Bewertung wieder verfügbar ist.',
    busyParse: 'Stack wird gelesen…',
    busyRun: 'Bewertung läuft…',
    busyEmail: 'Wird gesendet…',
    errorGeneric: 'Etwas ist schiefgelaufen. Deine Bewertung wurde nicht verbraucht — bitte versuche es erneut.',
    limitTitle: 'Tageslimit erreicht',
    limitBody: 'Lege ein Konto an, um weiterzumachen.',
    waitlistTitle: 'Gerade hohe Nachfrage',
    waitlistBody: 'Hinterlasse deine E-Mail — wir schicken dir die Bewertung, sobald Kapazität frei ist.',
    saveCta: 'Stack speichern und Konto anlegen',
    unidentified: 'Diese Zeilen konnten wir nicht zuordnen'
  } : {
    conflict: 'conflict notes',
    synergy: 'synergy notes',
    dose: 'dose notes',
    drug: 'drug advice notes',
    other: 'other notes',
    noteSingular: '1 note',
    notePlural: '{n} notes',
    lockedLine: 'Save your stack to see the other notes and track them over time.',
    addMore: 'Add at least three recognized supplements to get a review.',
    pickOne: 'Pick one…',
    typical: 'typical amount',
    needEmail: 'Enter a valid email.',
    checkEmail: 'Check your email — the link is on its way.',
    waitlistOk: 'Thanks. We’ll email you when the review is available again.',
    busyParse: 'Reading your stack…',
    busyRun: 'Reviewing your stack…',
    busyEmail: 'Sending…',
    errorGeneric: 'Something went wrong. Your review was not used — please try again.',
    limitTitle: 'Daily limit reached',
    limitBody: 'Create an account to continue.',
    waitlistTitle: 'High demand right now',
    waitlistBody: 'Leave your email and we’ll send your review when capacity opens up.',
    saveCta: 'Save your stack and create an account',
    unidentified: 'We couldn’t identify these'
  };

  var state = {
    rows: [],
    panel: 'input',
    inputStarted: false,
    lastError: ''
  };

  function uuid() {
    if (window.crypto && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function getAnonymousId() {
    try {
      var id = localStorage.getItem(ANON_KEY);
      if (!id) {
        id = uuid();
        localStorage.setItem(ANON_KEY, id);
      }
      return id;
    } catch (e) {
      return uuid();
    }
  }

  function getSessionId() {
    try {
      var id = sessionStorage.getItem(SESSION_KEY);
      if (!id) {
        id = uuid();
        sessionStorage.setItem(SESSION_KEY, id);
      }
      return id;
    } catch (e) {
      return uuid();
    }
  }

  function captureUtm() {
    try {
      var existing = localStorage.getItem(UTM_KEY);
      if (existing) {
        return JSON.parse(existing);
      }
      var params = new URLSearchParams(window.location.search);
      var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
      var utm = {};
      var found = false;
      keys.forEach(function (k) {
        var v = params.get(k);
        if (v) {
          utm[k] = v.slice(0, 100);
          found = true;
        }
      });
      if (found) {
        localStorage.setItem(UTM_KEY, JSON.stringify(utm));
      }
      return utm;
    } catch (e) {
      return {};
    }
  }

  function funnelMeta() {
    return {
      anonymous_id: getAnonymousId(),
      session_id: getSessionId(),
      utm: captureUtm()
    };
  }

  function forceShow() {
    try {
      var q = new URLSearchParams(window.location.search).get('free_review');
      if (q === '1' || q === 'true') {
        return true;
      }
      return localStorage.getItem('suvo_free_review_force') === '1';
    } catch (e) {
      return false;
    }
  }

  // Preview-only mocks when ?free_review=1 — API kill switch blocks live
  // parse/run. No network in this mode.
  function mockParse(text) {
    var lines = String(text || '').split(/\n/).map(function (l) {
      return l.trim();
    }).filter(Boolean);
    var rows = lines.map(function (line, i) {
      var m = line.match(/^(.+?)\s+(\d+(?:\.\d+)?)\s*([A-Za-zµuμ]+)\s*$/);
      var name = m ? m[1].trim() : line;
      var key = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || ('item_' + (i + 1));
      return {
        row_id: 'mock-' + (i + 1),
        line: line,
        name: name,
        status: 'resolved',
        display_name: name,
        selected_key: key,
        candidates: [],
        issues: [],
        dose: m ? { value: parseFloat(m[2], 10), unit: m[3], raw: m[2] + ' ' + m[3] } : null
      };
    });
    return Promise.resolve({ ok: true, status: 200, data: { rows: rows } });
  }

  function mockRun() {
    var titles = lang === 'de' ? {
      conflict: 'Eisen und Calcium besser getrennt einnehmen',
      conflictMsg: 'Beide konkurrieren um die Aufnahme. Üblicher Abstand: ein paar Stunden.',
      dose: 'Vitamin D liegt im oberen üblichen Bereich',
      doseMsg: 'Typische Tagesmengen reichen oft; höhere Dosen mit einer Fachperson klären.',
      good: 'Vitamin D und Magnesium ergänzen sich oft',
      goodMsg: 'Magnesium unterstützt typische Vitamin-D-Stoffwechselwege.'
    } : {
      conflict: 'Iron and calcium are better taken apart',
      conflictMsg: 'They can compete for absorption. A few hours apart is a common pattern.',
      dose: 'Vitamin D is toward the high end of typical ranges',
      doseMsg: 'Everyday amounts are usually enough; higher doses are worth checking with a clinician.',
      good: 'Vitamin D and magnesium often work well together',
      goodMsg: 'Magnesium supports common vitamin D pathways.'
    };
    return Promise.resolve({
      ok: true,
      status: 200,
      data: {
        review: {
          review_id: 'mock-review',
          items: [
            { id: 'm1', type: 'conflict', severity: 'warning', title: titles.conflict, message: titles.conflictMsg },
            { id: 'm2', type: 'dose', severity: 'warning', title: titles.dose, message: titles.doseMsg },
            { id: 'm3', type: 'synergy', severity: 'success', title: titles.good, message: titles.goodMsg }
          ]
        },
        locked_count: 3,
        locked_summary: [
          { bucket: 'separate', kind: 'Conflict' },
          { bucket: 'separate', kind: 'Conflict' },
          { bucket: 'good', kind: 'Synergy' }
        ]
      }
    });
  }

  function emit(name, props) {
    if (forceShow()) {
      return;
    }
    var meta = funnelMeta();
    var body = {
      events: [{
        name: name,
        schema_version: 1,
        anonymous_id: meta.anonymous_id,
        session_id: meta.session_id,
        app_version: 'web',
        platform: 'web',
        client_ts: new Date().toISOString(),
        locale: lang,
        properties: Object.assign({}, props || {}, meta.utm)
      }]
    };
    fetch(API + '/api/v1/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true
    }).catch(function () {});
  }

  function api(path, payload) {
    if (forceShow()) {
      if (path.indexOf('/parse') >= 0) {
        return mockParse(payload && payload.text);
      }
      if (path.indexOf('/waitlist') >= 0) {
        return Promise.resolve({ ok: true, status: 200, data: { status: 'ok' } });
      }
      if (path.indexOf('/stack-review') >= 0) {
        return mockRun();
      }
      return Promise.resolve({ ok: true, status: 200, data: {} });
    }
    var meta = funnelMeta();
    var body = Object.assign({}, payload, {
      anonymous_id: meta.anonymous_id,
      session_id: meta.session_id,
      utm: meta.utm
    });
    return fetch(API + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept-Language': lang },
      body: JSON.stringify(body)
    }).then(function (res) {
      return res.json().then(function (data) {
        return { ok: res.ok, status: res.status, data: data };
      }).catch(function () {
        return { ok: res.ok, status: res.status, data: {} };
      });
    });
  }

  function panel(name) {
    root.querySelectorAll('[data-panel]').forEach(function (el) {
      el.hidden = el.getAttribute('data-panel') !== name;
    });
    state.panel = name;
    var cta = root.querySelector('[data-role="pinned-cta"]');
    if (cta) {
      cta.hidden = name !== 'teaser';
    }
  }

  function setBusy(msg) {
    var el = root.querySelector('[data-role="busy-msg"]');
    if (el) {
      el.textContent = msg || '';
    }
    panel('busy');
  }

  function setError(msg) {
    state.lastError = msg || copy.errorGeneric;
    var el = root.querySelector('[data-role="error-msg"]');
    if (el) {
      el.textContent = state.lastError;
    }
    panel('error');
  }

  function isRecognized(row) {
    if (row.status === 'resolved' && row.selected_key) {
      return true;
    }
    if (row.status === 'selection_required' && row.selected_key) {
      return true;
    }
    return false;
  }

  function recognizedCount() {
    return state.rows.filter(isRecognized).length;
  }

  function doseLabel(row) {
    if (row.dose && row.dose.value != null && row.dose.unit) {
      return copy.typical + ': ~' + row.dose.value + ' ' + row.dose.unit;
    }
    if (row.dose && row.dose.raw) {
      return copy.typical + ': ' + row.dose.raw;
    }
    return '';
  }

  function activePanelEl(name) {
    return root.querySelector('[data-panel="' + (name || state.panel) + '"]');
  }

  function renderConfirm(intoPanel) {
    var host = activePanelEl(intoPanel || 'confirm');
    if (!host) {
      return;
    }
    var known = host.querySelector('[data-role="known-list"]');
    var unknown = host.querySelector('[data-role="unknown-list"]');
    var unknownWrap = host.querySelector('[data-role="unknown-wrap"]');
    if (!known || !unknown) {
      return;
    }
    known.innerHTML = '';
    unknown.innerHTML = '';

    state.rows.forEach(function (row, idx) {
      if (row.status === 'unresolved' || (row.status === 'selection_required' && !row.selected_key && (!row.candidates || !row.candidates.length))) {
        var li = document.createElement('li');
        li.className = 'fr-row fr-row-unknown';
        var input = document.createElement('input');
        input.type = 'text';
        input.value = row.line || row.name || '';
        input.setAttribute('aria-label', copy.unidentified);
        input.addEventListener('change', function () {
          state.rows[idx].line = input.value;
          state.rows[idx].name = input.value;
        });
        var rm = document.createElement('button');
        rm.type = 'button';
        rm.className = 'fr-remove';
        rm.textContent = '×';
        rm.addEventListener('click', function () {
          state.rows.splice(idx, 1);
          renderConfirm(intoPanel || 'confirm');
        });
        li.appendChild(input);
        li.appendChild(rm);
        unknown.appendChild(li);
        return;
      }

      var item = document.createElement('li');
      item.className = 'fr-row';
      var main = document.createElement('div');
      main.className = 'fr-row-main';

      if (row.status === 'selection_required' || (row.candidates && row.candidates.length > 1)) {
        var sel = document.createElement('select');
        sel.setAttribute('aria-label', row.name || row.line || '');
        var blank = document.createElement('option');
        blank.value = '';
        blank.textContent = copy.pickOne;
        sel.appendChild(blank);
        (row.candidates || []).forEach(function (c) {
          var opt = document.createElement('option');
          opt.value = c.compound_key;
          opt.textContent = c.display_name || c.compound_key;
          if (c.compound_key === row.selected_key) {
            opt.selected = true;
          }
          sel.appendChild(opt);
        });
        sel.addEventListener('change', function () {
          state.rows[idx].selected_key = sel.value;
          if (sel.value) {
            var match = (state.rows[idx].candidates || []).filter(function (c) {
              return c.compound_key === sel.value;
            })[0];
            state.rows[idx].display_name = match ? match.display_name : sel.value;
            state.rows[idx].status = 'resolved';
          } else {
            state.rows[idx].status = 'selection_required';
          }
        });
        main.appendChild(sel);
      } else {
        var title = document.createElement('strong');
        title.textContent = row.display_name || row.name || row.line || row.selected_key;
        main.appendChild(title);
      }

      var dose = document.createElement('span');
      dose.className = 'fr-dose';
      dose.textContent = doseLabel(row);
      main.appendChild(dose);

      var rm2 = document.createElement('button');
      rm2.type = 'button';
      rm2.className = 'fr-remove';
      rm2.textContent = '×';
      rm2.addEventListener('click', function () {
        state.rows.splice(idx, 1);
        renderConfirm(intoPanel || 'confirm');
      });

      item.appendChild(main);
      item.appendChild(rm2);
      known.appendChild(item);
    });

    if (unknownWrap) {
      unknownWrap.hidden = unknown.children.length === 0;
    }
  }

  function kindBucketLabel(kind, bucket) {
    var k = (kind || '').toLowerCase();
    if (k.indexOf('synergy') >= 0 || bucket === 'good') {
      return 'synergy';
    }
    if (k.indexOf('conflict') >= 0 || k.indexOf('timing') >= 0 || k.indexOf('redundancy') >= 0 || bucket === 'separate') {
      return 'conflict';
    }
    if (k.indexOf('dose') >= 0) {
      return 'dose';
    }
    if (k.indexOf('drug') >= 0 || k.indexOf('contraindication') >= 0 || k.indexOf('upper') >= 0) {
      return 'drug';
    }
    return 'other';
  }

  function summarizeLocked(summary) {
    var counts = { conflict: 0, synergy: 0, dose: 0, drug: 0, other: 0 };
    (summary || []).forEach(function (item) {
      var key = kindBucketLabel(item.kind, item.bucket);
      counts[key] += 1;
    });
    var parts = [];
    if (counts.conflict) {
      parts.push(counts.conflict + ' ' + copy.conflict);
    }
    if (counts.synergy) {
      parts.push(counts.synergy + ' ' + copy.synergy);
    }
    if (counts.dose) {
      parts.push(counts.dose + ' ' + copy.dose);
    }
    if (counts.drug) {
      parts.push(counts.drug + ' ' + copy.drug);
    }
    if (counts.other) {
      parts.push(counts.other + ' ' + copy.other);
    }
    return parts.join(', ');
  }

  function severityClass(type) {
    var t = (type || '').toLowerCase();
    if (t === 'contraindication' || t === 'upper_limit') {
      return 'fr-finding-avoid';
    }
    if (t === 'dose' || t === 'drug_interaction') {
      return 'fr-finding-caution';
    }
    if (t === 'synergy') {
      return 'fr-finding-good';
    }
    return 'fr-finding-separate';
  }

  function renderTeaser(data) {
    var list = root.querySelector('[data-role="findings"]');
    var locked = root.querySelector('[data-role="locked"]');
    var lockedText = root.querySelector('[data-role="locked-summary"]');
    if (!list) {
      return;
    }
    list.innerHTML = '';
    var items = (data.review && data.review.items) || [];
    items.forEach(function (it) {
      var card = document.createElement('article');
      card.className = 'fr-finding ' + severityClass(it.type);
      var h = document.createElement('h3');
      h.textContent = it.title || '';
      var p = document.createElement('p');
      p.textContent = it.message || '';
      card.appendChild(h);
      card.appendChild(p);
      if (it.in_your_stack) {
        var stack = document.createElement('p');
        stack.className = 'fr-finding-stack';
        stack.textContent = it.in_your_stack;
        card.appendChild(stack);
      }
      list.appendChild(card);
    });

    var hasLocked = (data.locked_count || 0) > 0 && data.locked_summary && data.locked_summary.length;
    if (locked) {
      locked.hidden = !hasLocked;
    }
    if (lockedText && hasLocked) {
      lockedText.textContent = summarizeLocked(data.locked_summary);
    }
    panel('teaser');
  }

  function rowsToRunItems() {
    return state.rows.filter(isRecognized).map(function (row) {
      var item = {
        row_id: row.row_id,
        compound_key: row.selected_key
      };
      if (row.dose && row.dose.value != null) {
        item.dose = { value: row.dose.value, unit: row.dose.unit || '' };
      }
      return item;
    });
  }

  function onParse() {
    var ta = root.querySelector('[data-role="input"]');
    var text = ta ? ta.value.trim() : '';
    if (!text) {
      return;
    }
    setBusy(copy.busyParse);
    api('/api/v1/public/stack-review/parse', { text: text }).then(function (res) {
      if (!res.ok) {
        if (res.data && res.data.code === 'FEATURE_DISABLED') {
          setError(copy.errorGeneric);
          return;
        }
        if (res.data && res.data.code === 'WAITLIST') {
          showWaitlist();
          return;
        }
        setError((res.data && res.data.error) || copy.errorGeneric);
        return;
      }
      state.rows = (res.data.rows || []).slice();
      if (recognizedCount() < MIN_RECOGNIZED) {
        var msg = root.querySelector('[data-role="add-more-msg"]');
        if (msg) {
          msg.textContent = copy.addMore;
        }
        panel('add-more');
        renderConfirm('add-more');
        return;
      }
      panel('confirm');
      renderConfirm('confirm');
    }).catch(function () {
      setError(copy.errorGeneric);
    });
  }

  function onConfirm() {
    if (recognizedCount() < MIN_RECOGNIZED) {
      var msg = root.querySelector('[data-role="add-more-msg"]');
      if (msg) {
        msg.textContent = copy.addMore;
      }
      panel('add-more');
      renderConfirm('add-more');
      return;
    }
    emit('review_confirmed', { recognized_count: recognizedCount() });
    setBusy(copy.busyRun);
    api('/api/v1/public/stack-review', { items: rowsToRunItems() }).then(function (res) {
      if (!res.ok) {
        if (res.data && res.data.code === 'RATE_LIMITED') {
          panel('limit');
          return;
        }
        if (res.data && res.data.code === 'FEATURE_DISABLED') {
          setError(copy.errorGeneric);
          return;
        }
        if (res.data && res.data.code === 'WAITLIST') {
          showWaitlist();
          return;
        }
        setError((res.data && res.data.error) || copy.errorGeneric);
        return;
      }
      renderTeaser(res.data);
    }).catch(function () {
      setError(copy.errorGeneric);
    });
  }

  function showWaitlist() {
    var title = root.querySelector('[data-role="waitlist-title"]');
    var body = root.querySelector('[data-role="waitlist-body"]');
    if (title) {
      title.textContent = copy.waitlistTitle;
    }
    if (body) {
      body.textContent = copy.waitlistBody;
    }
    panel('waitlist');
  }

  function submitEmail(kind) {
    var input = root.querySelector(kind === 'waitlist'
      ? '[data-role="waitlist-email"]'
      : kind === 'limit'
        ? '[data-role="limit-email"]'
        : '[data-role="cta-email"]');
    var status = root.querySelector(kind === 'waitlist'
      ? '[data-role="waitlist-status"]'
      : kind === 'limit'
        ? '[data-role="limit-status"]'
        : '[data-role="cta-status"]');
    var email = input ? input.value.trim() : '';
    if (!EMAIL_RE.test(email)) {
      if (status) {
        status.textContent = copy.needEmail;
      }
      return;
    }
    if (status) {
      status.textContent = copy.busyEmail;
    }
    if (kind === 'waitlist') {
      api('/api/v1/public/stack-review/waitlist', { email: email }).then(function (res) {
        if (status) {
          status.textContent = res.ok ? copy.waitlistOk : ((res.data && res.data.error) || copy.errorGeneric);
        }
      }).catch(function () {
        if (status) {
          status.textContent = copy.errorGeneric;
        }
      });
      return;
    }
    if (forceShow()) {
      if (status) {
        status.textContent = copy.checkEmail;
      }
      return;
    }
    fetch(API + '/api/v1/auth/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept-Language': lang },
      body: JSON.stringify({ email: email, locale: lang })
    }).then(function (res) {
      return res.json().then(function (data) {
        return { ok: res.ok, data: data };
      }).catch(function () {
        return { ok: res.ok, data: {} };
      });
    }).then(function (res) {
      if (status) {
        status.textContent = res.ok ? copy.checkEmail : ((res.data && res.data.error) || copy.errorGeneric);
      }
    }).catch(function () {
      if (status) {
        status.textContent = copy.errorGeneric;
      }
    });
  }

  function bind() {
    var parseBtn = root.querySelector('[data-action="parse"]');
    if (parseBtn) {
      parseBtn.addEventListener('click', onParse);
    }
    var confirmBtn = root.querySelector('[data-action="confirm"]');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', onConfirm);
    }
    var backBtns = root.querySelectorAll('[data-action="back-input"]');
    backBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        panel('input');
      });
    });
    var ta = root.querySelector('[data-role="input"]');
    if (ta) {
      ta.addEventListener('focus', function () {
        if (!state.inputStarted) {
          state.inputStarted = true;
          emit('review_input_started', { mode: 'text' });
        }
      }, { once: true });
      ta.addEventListener('input', function () {
        if (!state.inputStarted) {
          state.inputStarted = true;
          emit('review_input_started', { mode: 'text' });
        }
      }, { once: true });
    }
    var ctaBtn = root.querySelector('[data-action="cta-email"]');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', function () {
        submitEmail('cta');
      });
    }
    var limitBtn = root.querySelector('[data-action="limit-email"]');
    if (limitBtn) {
      limitBtn.addEventListener('click', function () {
        submitEmail('limit');
      });
    }
    var waitBtn = root.querySelector('[data-action="waitlist-email"]');
    if (waitBtn) {
      waitBtn.addEventListener('click', function () {
        submitEmail('waitlist');
      });
    }
  }

  function reveal() {
    root.hidden = false;
    panel('input');
  }

  function init() {
    captureUtm();
    getAnonymousId();
    getSessionId();
    emit('landing_viewed', {});
    bind();
    if (forceShow()) {
      reveal();
      return;
    }
    fetch(API + '/api/v1/public/stack-review/status', {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data && data.enabled === true) {
        reveal();
      } else {
        root.hidden = true;
      }
    }).catch(function () {
      root.hidden = true;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
