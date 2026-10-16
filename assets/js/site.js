// Shared by every page.
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('svg').forEach(function (v) { if (v.pauseAnimations) v.pauseAnimations(); });
  }
})();

// Old single-page links such as /#sap now live at /sap/.
(function () {
  var h = location.hash;
  if ((location.pathname === '/' || location.pathname === '/index.html') && (h === '#sap' || h.indexOf('#sap-') === 0)) {
    location.replace('/sap/' + (h === '#sap' ? '' : h));
  }
})();

// Copy-email buttons: <div class="mail"><code>address</code><button data-copy>…</button></div>
document.querySelectorAll('[data-copy]').forEach(function (btn) {
  var label = btn.textContent;
  btn.addEventListener('click', function () {
    var code = btn.closest('.mail').querySelector('code');
    var done = function (msg) { btn.textContent = msg; setTimeout(function () { btn.textContent = label; }, 2200); };
    var fallback = function () { var r = document.createRange(); r.selectNodeContents(code); var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r); done('Selected, press copy'); };
    try { navigator.clipboard.writeText(code.textContent.trim()).then(function () { done('Copied'); }, fallback); } catch (err) { fallback(); }
  });
});

(function () {
  var bar = document.querySelector('.bar'), btn = document.getElementById('menu-btn');
  if (!bar || !btn) return;
  function set(open) { bar.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); }
  btn.addEventListener('click', function () { set(!bar.classList.contains('open')); });
  document.getElementById('menu').addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
  document.addEventListener('click', function (e) { if (!bar.contains(e.target)) set(false); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1100) set(false); });
})();

(function () {
  var logo = document.querySelector('.logo');
  if (!logo) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go() {
    if (reduce) return;
    logo.classList.remove('pulse-go');
    void logo.getBoundingClientRect();
    logo.classList.add('pulse-go');
  }
  logo.addEventListener('animationend', function (e) { if (e.animationName === 'cursorBlink') logo.classList.remove('pulse-go'); });
  logo.addEventListener('mouseenter', go);
  logo.addEventListener('focus', go);
  setTimeout(go, 600);
})();
