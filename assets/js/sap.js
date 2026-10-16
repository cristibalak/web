// SAP page: the team board animation.
(function () {
  var PH = ['Prepare','Explore','Realize','Deploy','Run'];
  var PH_NOTE = [
    'Prepare: leads and architects join to plan scope, landscape and the project setup.',
    'Explore: fit-to-standard workshops. Functional consultants come on board.',
    'Realize: build, configure and test. This is the peak, and where extra hands matter most.',
    'Deploy: cutover and go-live. Developers start to roll off.',
    'Run: hypercare with a small core team. Everyone else is released.'
  ];
  var S = {
    green: { label: 'S/4HANA greenfield', streams: [
      ['Finance', [['FI','Finance lead','Lead',0,5],['CO','Controlling','Senior',1,4],['FI','Asset accounting','Senior',2,4]]],
      ['Logistics', [['MM','Procurement','Senior',1,5],['SD','Order to cash','Senior',1,5],['PP','Production planning','Expert',1,4]]],
      ['Technology', [['BASIS','Basis architect','Lead',0,5],['ABAP','RAP developer','Senior',2,4],['ABAP','Forms & interfaces','Senior',2,4],['BTP','Integration (CPI)','Expert',2,4]]],
      ['Data', [['DMIG','Data migration','Senior',2,4]]]
    ]},
    brown: { label: 'Brownfield conversion', streams: [
      ['Finance', [['FI','Finance conversion','Lead',0,5],['CO','Controlling','Senior',1,4]]],
      ['Logistics', [['MM','Procurement','Senior',1,4],['SD','Order to cash','Senior',1,4]]],
      ['Technology', [['BASIS','SUM / DMO','Lead',0,5],['BASIS','Landscape','Senior',1,4],['ABAP','Custom code','Senior',1,4],['ABAP','Custom code','Senior',2,4],['FIORI','Fiori apps','Senior',2,4]]]
    ]},
    ewm: { label: 'EWM rollout', streams: [
      ['Warehouse', [['EWM','Solution architect','Lead',0,5],['EWM','Inbound & outbound','Expert',1,4],['EWM','MFS automation','Expert',2,4]]],
      ['Logistics', [['MM','Inventory','Senior',1,4],['TM','Transport mgmt','Senior',1,4],['SD','Shipping','Senior',2,4]]],
      ['Technology', [['ABAP','RF & forms','Senior',2,4],['BTP','Interfaces','Senior',2,5]]]
    ]},
    sf: { label: 'SuccessFactors', streams: [
      ['HR core', [['EC','Employee Central','Lead',0,5],['ECP','Payroll','Expert',1,5],['TIME','Time tracking','Senior',2,4]]],
      ['Talent', [['RCM','Recruiting','Senior',1,4],['PMGM','Performance','Senior',2,4]]],
      ['Technology', [['CPI','Integration','Expert',1,4],['RPT','Reporting','Senior',2,4]]]
    ]}
  };
  var $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cur = 'green', timer = null;
  function initials(i) { return 'C' + String(i + 1).padStart(2, '0'); }
  function roles() { var out = []; S[cur].streams.forEach(function (s) { s[1].forEach(function (r) { out.push(r); }); }); return out; }
  function buildScen() {
    $('sap-scen').innerHTML = '';
    Object.keys(S).forEach(function (k) {
      var b = document.createElement('button'); b.type = 'button'; b.textContent = S[k].label;
      b.setAttribute('aria-pressed', k === cur);
      b.onclick = function () { cur = k; buildScen(); build(); play(); };
      $('sap-scen').appendChild(b);
    });
  }
  function build() {
    var st = $('sap-streams'); st.innerHTML = ''; var idx = 0;
    S[cur].streams.forEach(function (s) {
      var d = document.createElement('div'); d.className = 'stream';
      d.innerHTML = '<h4>' + s[0] + '</h4><div class="slots"></div>';
      var sl = d.querySelector('.slots');
      s[1].forEach(function (r) {
        var el = document.createElement('div'); el.className = 'slot'; el.dataset.i = idx;
        el.innerHTML = '<span class="code">' + r[0] + '</span><span class="who"><span class="role">' + r[1] + '</span><span class="st">Open role</span></span><span class="dot" aria-hidden="true"></span>';
        sl.appendChild(el); idx++;
      });
      st.appendChild(d);
    });
    $('sap-phases').innerHTML = '';
    PH.forEach(function (p, i) {
      var b = document.createElement('button'); b.type = 'button';
      b.innerHTML = '<b>' + p + '</b><small>Phase ' + (i + 1) + '</small>';
      b.onclick = function () { stop(); setPhase(i, false); };
      $('sap-phases').appendChild(b);
    });
    var rs = roles();
    var sizes = PH.map(function (_, p) { return rs.filter(function (r) { return r[3] <= p && p < r[4]; }).length; });
    var mx = Math.max.apply(null, sizes);
    $('sap-bars').innerHTML = sizes.map(function (n) { return '<div style="height:' + (n / mx * 100) + '%" title="' + n + ' consultants"></div>'; }).join('');
    $('sap-count').textContent = '0';
    $('sap-phase-note').textContent = 'Every role starts open. Press replay or pick a phase.';
  }
  function setPhase(p, animate) {
    var rs = roles();
    document.querySelectorAll('#sap-phases button').forEach(function (b, i) {
      b.className = i < p ? 'done' : i === p ? 'now' : '';
      b.setAttribute('aria-current', i === p ? 'step' : 'false');
    });
    document.querySelectorAll('#sap-streams .slot').forEach(function (el) {
      var i = +el.dataset.i, r = rs[i];
      var on = r[3] <= p && p < r[4], off = p >= r[4];
      var was = el.classList.contains('on');
      el.classList.toggle('on', on); el.classList.toggle('off', off);
      var st = el.querySelector('.st'), dot = el.querySelector('.dot');
      if (on) { st.textContent = r[2] + ' · ' + initials(i); dot.textContent = initials(i).slice(1); }
      else if (off) { st.textContent = 'Rolled off after ' + PH[r[4] - 1]; dot.textContent = ''; }
      else { st.textContent = r[3] > p ? 'Joins in ' + PH[r[3]] : 'Open role'; dot.textContent = ''; }
      if (on && !was && animate && !reduce) { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }
    });
    $('sap-count').textContent = rs.filter(function (r) { return r[3] <= p && p < r[4]; }).length;
    document.querySelectorAll('#sap-bars div').forEach(function (b, i) { b.classList.toggle('cur', i === p); });
    $('sap-phase-note').textContent = PH_NOTE[p];
  }
  function stop() { clearTimeout(timer); timer = null; $('sap-replay').classList.remove('playing'); }
  function play() {
    stop();
    if (reduce) { setPhase(2, false); return; }
    var p = 0;
    $('sap-replay').classList.add('playing');
    var step = function () { setPhase(p, true); p++; if (p < PH.length) timer = setTimeout(step, 1900); else $('sap-replay').classList.remove('playing'); };
    timer = setTimeout(step, 500);
  }
  $('sap-replay').onclick = function () { build(); play(); };
  buildScen(); build(); play();
})();
