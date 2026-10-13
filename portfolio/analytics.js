/* PostHog analytics in cookieless mode: nothing is stored on the visitor's
   device, so no consent banner is needed. PostHog counts unique visitors with
   a privacy-preserving hash on its own servers instead.

   Cookieless mode must ALSO be enabled in the PostHog project settings
   (Project settings → Web analytics → Cookieless server hash mode), otherwise
   PostHog drops every event this script sends.

   posthog-config.js is generated from POSTHOG_PROJECT_TOKEN and POSTHOG_HOST
   when the Docker container starts. Markup hooks:
     data-track="event_name"   on a link: captures the event on click
     data-track-target="x"     on that link: sent as the `target` property
     data-track-section="x"    on a block: sent as `section` for clicks inside
                               it, and captured once as `section_viewed` when
                               the block scrolls into view */
(function () {
  var config = window.__POSTHOG_CONFIG__;
  var isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

  // Without config (local development, or a deploy missing the env vars) the
  // page works normally and analytics is off; locally, say so in the console.
  if (!config || !config.key || !config.host) {
    window.trackEvent = function () {};
    if (isLocal) console.warn('PostHog analytics off: POSTHOG_PROJECT_TOKEN / POSTHOG_HOST not set.');
    return;
  }

  var KEY = config.key;
  var API_HOST = config.host;

  var queue = [];
  var logQueue = [];

  // This facade is the only application logger forwarded to PostHog. Existing
  // console output and application logs remain local to the browser.
  function log(level, message, attributes) {
    var entry = { body: message, level: level, attributes: attributes || {} };
    if (window.posthog && window.posthog.__loaded) {
      window.posthog.captureLog(entry);
    } else {
      logQueue.push(entry);
    }
  }
  window.portfolioLogger = {
    info: function (message, attributes) { log('info', message, attributes); },
    error: function (message, attributes) { log('error', message, attributes); }
  };

  var s = document.createElement('script');
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.src = API_HOST.replace('.i.posthog.com', '-assets.i.posthog.com') + '/static/array.js';
  s.onload = function () {
    window.posthog.init(KEY, {
      api_host: API_HOST,
      cookieless_mode: 'always',
      person_profiles: 'identified_only',
      capture_pageleave: true,
      disable_session_recording: true,
      capture_exceptions: {
        capture_unhandled_errors: true,
        capture_unhandled_rejections: true,
        capture_console_errors: false
      },
      defaults: '2026-05-30',
      logs: {
        serviceName: 'portfolio-web',
        environment: isLocal ? 'development' : 'production'
      }
    });
    queue.forEach(function (args) { window.posthog.capture(args[0], args[1]); });
    queue = [];
    logQueue.forEach(function (entry) { window.posthog.captureLog(entry); });
    logQueue = [];
  };
  document.head.appendChild(s);

  // Events fired before the SDK finishes loading are held in `queue` and
  // sent on load.
  function track(name, props) {
    if (window.posthog && window.posthog.__loaded) window.posthog.capture(name, props || {});
    else queue.push([name, props || {}]);
  }
  window.trackEvent = track;

  function sectionOf(el) {
    var sec = el.closest('[data-track-section]');
    return sec ? sec.getAttribute('data-track-section') : null;
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-track]');
    if (!el) return;
    track(el.getAttribute('data-track'), {
      target: el.getAttribute('data-track-target'),
      section: sectionOf(el)
    });
  });

  if (!('IntersectionObserver' in window)) return;
  // A section counts as viewed once its top edge passes 60% of the way up the
  // viewport; a fixed visibility ratio would never trigger on tall sections.
  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      seen.unobserve(entry.target);
      track('section_viewed', { section: entry.target.getAttribute('data-track-section') });
    });
  }, { rootMargin: '0px 0px -40% 0px' });

  function observeSections() {
    document.querySelectorAll('[data-track-section]').forEach(function (el) { seen.observe(el); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', observeSections);
  else observeSections();
})();
