// Homepage only: Fig. 1 product switch and case-study filter.
(function () {
  var d = document.getElementById('seg-device'), w = document.getElementById('seg-software');
  var vd = document.getElementById('view-device'), vs = document.getElementById('view-software');
  var svg = document.getElementById('hero-fig');
  if (!d || !w || !vd || !vs) return;
  function show(sw) {
    vd.toggleAttribute('hidden', sw); vs.toggleAttribute('hidden', !sw);
    d.setAttribute('aria-pressed', String(!sw)); w.setAttribute('aria-pressed', String(sw));
    svg.setAttribute('aria-label', (sw
      ? 'Exploded isometric view of a software and AI product: an interface layer, an application and cloud layer and a data and AI models layer, above a milestone axis running from concept to launch'
      : 'Exploded isometric view of a connected device with four layers: mechanics, electronics, embedded and software and AI, above a milestone axis running from concept to launch'));
  }
  d.addEventListener('click', function () { show(false); });
  w.addEventListener('click', function () { show(true); });
  show(true);
})();

(() => {
  const f = document.querySelector('#proof .proof-filter');
  if (!f) return;
  const cards = document.querySelectorAll('#proof .card[data-cat]');
  f.addEventListener('click', e => {
    const btn = e.target.closest('button'); if (!btn) return;
    f.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === btn ? 'true' : 'false'));
    cards.forEach(c => { c.hidden = btn.dataset.f !== 'all' && c.dataset.cat !== btn.dataset.f; });
  });
})();
