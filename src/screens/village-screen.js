// src/screens/village-screen.js

function renderVillage() {
  const villagers = MOCK.villagers;

  const mascots = villagers.map(v => `
    <div class="v-mascot ${v.walk||''}" style="left:${v.x}px;bottom:${v.y}px" onclick="villageClick('${v.name}','${v.bubble}')">
      ${v.notif ? `<div class="v-notif">${v.notif}</div>` : ''}
      <div class="v-bubble">${v.bubble}</div>
      <div class="v-body" style="width:34px;height:34px;background:${v.bg}">
        <span style="font-size:20px">${v.emoji}</span>
        <div class="v-dot" style="background:${v.status==='online'?'#44cc77':v.status==='busy'?'#ffaa22':'#bbb'}"></div>
      </div>
      <div class="v-name">${v.name}</div>
    </div>`).join('');

  const feedItems = [
    { avatar: '👩🏽', bg: '#f9c6a0', name: 'Priya', text: 'Turmeric golden milk before bed changed my sleep 🌙', meta: '✨ 6 resonated · 2 tried it · 5 min ago' },
    { avatar: '👩🏾', bg: '#d4c4f0', name: 'Amara', text: 'Logged a mood — feeling tired but at peace 😌', meta: '📓 Journal · 12 min ago' },
    { avatar: '🧑🏼', bg: '#b5e8c8', name: 'Chris', text: 'Posted a new tip on meal timing and sleep quality', meta: '💡 Tip · 1h ago' },
  ].map(f => `
    <div class="feed-item">
      <div class="feed-avatar" style="background:${f.bg}">${f.avatar}</div>
      <div class="feed-content">
        <div class="feed-name">${f.name}</div>
        <div class="feed-text">${f.text}</div>
        <div class="feed-meta">${f.meta}</div>
      </div>
    </div>`).join('');

  document.getElementById('app').innerHTML = `
    <div class="screen" id="screen-village">
      <div class="status-bar">
        <span class="status-time">9:41</span>
        <span class="status-icons">▲ ● ■</span>
      </div>
      <div class="scroll-content">
        <div style="padding:12px 20px 0;display:flex;align-items:center;justify-content:space-between">
          <div>
            <h2>Your village</h2>
            <div style="font-size:12px;color:var(--muted)">3 friends active now</div>
          </div>
          <button class="btn btn-sm btn-ghost btn-pill">+ Invite</button>
        </div>

        <div class="village-map" style="margin:14px 20px 0">
          <div class="v-sky"></div>
          <div class="v-sun"></div>

          <!-- Trees -->
          <div class="v-tree" style="left:20px;bottom:80px">
            <div class="v-tree-top" style="border-width:0 16px 32px 16px;border-bottom-color:#2d7a4a"></div>
            <div class="v-tree-trunk" style="width:9px;height:12px"></div>
          </div>
          <div class="v-tree" style="right:24px;bottom:84px">
            <div class="v-tree-top" style="border-width:0 12px 26px 12px;border-bottom-color:#1e6035"></div>
            <div class="v-tree-trunk" style="width:7px;height:9px"></div>
          </div>
          <div class="v-tree" style="left:56px;bottom:74px">
            <div class="v-tree-top" style="border-width:0 9px 20px 9px;border-bottom-color:#3a8a55"></div>
            <div class="v-tree-trunk" style="width:5px;height:7px"></div>
          </div>

          <!-- Little house -->
          <svg style="position:absolute;right:50px;bottom:90px" width="48" height="44" viewBox="0 0 48 44">
            <polygon points="24,4 44,22 4,22" fill="#c4674a"/>
            <rect x="6" y="20" width="36" height="22" rx="2" fill="#fff"/>
            <rect x="18" y="28" width="12" height="14" fill="#e8d5c0" rx="2"/>
            <rect x="8" y="24" width="8" height="8" rx="1" fill="#a8d4ef"/>
            <rect x="32" y="24" width="8" height="8" rx="1" fill="#a8d4ef"/>
          </svg>

          ${mascots}

          <div class="v-title-overlay">
            <div class="v-title">🌿 Your Village</div>
            <div class="v-subtitle">6 friends · 3 online now</div>
          </div>
          <div class="v-ground"></div>
          <div class="v-path"></div>
        </div>

        <div id="v-notif-box" style="display:none;margin:10px 20px;background:#fff;border:1px solid rgba(74,124,89,0.15);border-radius:var(--r);padding:12px 14px;font-size:12px;color:var(--deep);line-height:1.5"></div>

        <div class="section-head" style="padding:0 20px">Activity feed</div>
        <div style="margin:0 20px;background:#fff;border-radius:var(--r);border:1px solid rgba(0,0,0,0.07);overflow:hidden">
          ${feedItems}
        </div>

        <div style="margin:14px 20px;padding:14px;background:var(--warm);border-radius:var(--r)">
          <div style="font-size:12px;font-weight:500;color:var(--deep);margin-bottom:4px">👥 Find more people</div>
          <div style="font-size:11px;color:var(--muted);margin-bottom:10px">Connect with others managing similar health goals</div>
          <button class="btn btn-outline btn-sm" style="width:100%">Browse community →</button>
        </div>
      </div>
      ${renderBottomNav('village')}
    </div>`;

  window.villageClick = function(name, msg) {
    const box = document.getElementById('v-notif-box');
    box.style.display = 'block';
    box.innerHTML = `<strong>${name}</strong> says: ${msg}`;
    setTimeout(() => { box.style.display = 'none'; }, 3000);
  };
}
