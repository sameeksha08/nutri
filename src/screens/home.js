// src/screens/home.js

function renderHome() {
  const rings = [
    { label: 'Iron', pct: 72, color: '#4a7c59', cx: 30, r: 24, circ: 150.8 },
    { label: 'Hydration', pct: 80, color: '#d4a853', cx: 30, r: 24, circ: 150.8 },
    { label: 'Mood', pct: 34, color: '#7c5cbf', cx: 30, r: 24, circ: 150.8 },
  ];

  const ringsHTML = rings.map(ring => {
    const offset = ring.circ - (ring.pct / 100) * ring.circ;
    return `
      <div class="ring-card">
        <div style="position:relative;width:62px;height:62px">
          <svg class="ring-svg" width="62" height="62" viewBox="0 0 62 62">
            <circle class="ring-bg" cx="31" cy="31" r="24"/>
            <circle class="ring-fill" cx="31" cy="31" r="24" stroke="${ring.color}"
              stroke-dasharray="${ring.circ}" stroke-dashoffset="${offset}"/>
          </svg>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
            <text style="font-family:Fraunces,serif;font-size:13px;font-weight:700;color:var(--deep)">${ring.pct}%</text>
          </div>
        </div>
        <div class="ring-label-text">${ring.label}</div>
      </div>`;
  }).join('');

  const connectedPills = MOCK.connectedApps.map(a => `
    <div class="app-pill">
      <span class="app-pill-icon">${a.icon}</span>
      <div>
        <div class="app-pill-val">${a.data.split('·')[0].trim()}</div>
        <div class="app-pill-label">${a.name}</div>
      </div>
    </div>`).join('');

  const mealCards = MOCK.meals.map(m => `
    <div class="meal-card">
      <div class="meal-emoji">${m.emoji}</div>
      <div class="meal-name">${m.name}</div>
      <div class="meal-cal">${m.cal} kcal · ${m.time}</div>
      <div class="meal-badge-row">
        ${m.tags.map(t => `<span class="badge badge-sage" style="font-size:9px">${t}</span>`).join('')}
      </div>
    </div>`).join('');

  let resStates = MOCK.insights.map(() => [false, false]);

  const insightCards = MOCK.insights.map((ins, i) => `
    <div class="insight-card">
      <div class="insight-icon">${ins.icon}</div>
      <div class="insight-title">${ins.title}</div>
      <div style="margin-bottom:8px"><span class="badge badge-${ins.badge}" style="font-size:9px">${ins.badgeText}</span></div>
      <div class="resonance-row">
        <button class="res-btn" id="res-${i}-0" onclick="homeRes(${i},0)">✨ Resonates (${ins.resonances})</button>
        <button class="res-btn" id="res-${i}-1" onclick="homeRes(${i},1)">💡 Tried it (${ins.tried})</button>
      </div>
    </div>`).join('');

  document.getElementById('app').innerHTML = `
    <div class="screen" id="screen-home">
      <div class="status-bar">
        <span class="status-time">9:41</span>
        <span class="status-icons">▲ ● ■</span>
      </div>
      <div class="scroll-content">
        <div class="home-header">
          <div class="home-logo">nutri<em>.</em></div>
          <div class="notif-btn" onclick="APP.showToast('3 new notifications')">🔔<div class="notif-pip"></div></div>
        </div>

        <div class="greeting-card" style="margin:14px 20px 0">
          <div class="greeting-time">Monday, 12 May · Good morning 🌿</div>
          <div class="greeting-name">Hey Sarah, your body is<br><em style="color:rgba(255,255,255,0.85)">asking for iron today.</em></div>
          <div class="greeting-insight">
            <span style="font-size:18px;flex-shrink:0">🌸</span>
            <span>You're in ovulation phase (day 14). Iron and magnesium needs are elevated — your meal plan reflects this.</span>
          </div>
          <div class="badge-row">
            <span class="badge" style="background:rgba(255,255,255,0.2);color:#fff;font-size:10px">Cycle day 14</span>
            <span class="badge" style="background:rgba(255,255,255,0.2);color:#fff;font-size:10px">🔬 Researcher-backed</span>
          </div>
        </div>

        <div class="section-head" style="padding:0 20px">Today's goals</div>
        <div class="rings-row">${ringsHTML}</div>

        <div class="section-head" style="padding:0 20px;margin-top:16px">Your connected apps</div>
        <div class="connected-strip">${connectedPills}</div>

        <div class="section-head" style="padding:0 20px;margin-top:16px">Today's meal plan</div>
        <div class="h-scroll">${mealCards}</div>

        <div class="section-head" style="padding:0 20px;margin-top:16px">Discover this week</div>
        <div style="padding:0 0 0 0" class="h-scroll">${insightCards}</div>

        <div style="margin:16px 20px;background:var(--warm);border-radius:var(--r);padding:14px;display:flex;align-items:center;gap:12px;cursor:pointer" onclick="APP.navigate('chat')">
          <div style="font-size:28px">🤖</div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:500;color:var(--deep)">Ask Nouri anything</div>
            <div style="font-size:11px;color:var(--muted);margin-top:2px">Your AI health guide is ready — try "why am I so tired?"</div>
          </div>
          <div style="font-size:18px;color:var(--sage)">→</div>
        </div>
      </div>
      ${renderBottomNav('home')}
    </div>`;

  window.homeRes = function(i, j) {
    resStates[i][j] = !resStates[i][j];
    const btn = document.getElementById(`res-${i}-${j}`);
    if (btn) btn.classList.toggle('lit');
  };
}
