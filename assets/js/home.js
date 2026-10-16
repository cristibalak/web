// Homepage only: case-study filter.
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
