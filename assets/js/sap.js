// Romteca SAP page: phone menu, module tabs, one-open FAQ, copy email.
(function () {
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('snav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  }

  var chips = document.querySelector('#module .chips');
  if (chips) {
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      chips.querySelectorAll('button').forEach(function (x) {
        var on = x === b;
        x.setAttribute('aria-pressed', on ? 'true' : 'false');
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
    });
  }

  var faqs = document.querySelectorAll('.faq details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) faqs.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var code = b.parentNode.querySelector('code');
      var label = b.textContent;
      var done = function (t) { b.textContent = t; setTimeout(function () { b.textContent = label; }, 1800); };
      var fallback = function () { var r = document.createRange(); r.selectNodeContents(code); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); done('Markiert, bitte kopieren'); };
      try { navigator.clipboard.writeText(code.textContent.trim()).then(function () { done('Kopiert'); }, fallback); } catch (err) { fallback(); }
    });
  });
})();
