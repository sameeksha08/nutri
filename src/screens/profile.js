// src/screens/profile.js

function renderProfile() {
  const u = MOCK.user;
  const starsFull = Math.floor(u.trustScore);

  const starsHTML = [1,2,3,4,5].map(i =>
    `<span style="font-size:14px;color:${i<=starsFull?'var(--gold)':'#ddd'}">${i<=starsFull?'★':'☆'}</span>`
  ).join('');

  const genderInsight = `During your ovulation phase, oestrogen peaks, which raises your pain tolerance but can also increase inflammation. Iron needs spike by up to 30%. All content you see is adapted for your hormonal profile.`;

  const appsHTML = MOCK.connectedApps.map(a => `
    <div class="app-row">
      <div class="app-row-icon" style="background:${a.bg}">${a.icon}</div>
      <div class="app-row-info">
        <div class="app-row-name">${a.name}</div>
        <div class="app-row-status">✓ ${a.status}</div>
        <div class="app-row-last">${a.data}</div>
      </div>
      <div style="font-size:11px;color:var(--muted)">${a.last}</div>
    </div>`).join('');

  const settings = [
    { icon: '🔔', label: 'Notifications & nudges' },
    { icon: '🔒', label: 'Privacy & data' },
    { icon: '🌸', label: 'Cycle & hormonal settings' },
    { icon: '🎯', label: 'Goals & preferences' },
    { icon: '🔬', label: 'Research partner info' },
    { icon: '❓', label: 'Help & support' },
  ];

  const settingsHTML = settings.map(s => `
    <div class="setting-row" onclick="APP.showToast('${s.label} — coming soon')">
      <div class="setting-icon">${s.icon}</div>
      <div class="setting-label">${s.label}</div>
      <div class="setting-arrow">›</div>
    </div>`).join('');

  document.getElementById('app').innerHTML = `
    <div class="screen" id="screen-profile">
      <div class="status-bar">
        <span class="status-time">9:41</span>
        <span class="status-icons">▲ ● ■</span>
      </div>
      <div class="scroll-content">
        <div class="profile-hero">
          <div class="profile-avi">🌿</div>
          <div>
            <div class="profile-name">${u.name} L.</div>
            <div class="profile-since">Member since April 2025 · Sydney, AU</div>
            <div class="trust-score">
              <div class="ts-stars">${starsHTML}</div>
              <span>${u.trustScore} community trust</span>
            </div>
          </div>
        </div>

        <div class="stats-grid" style="margin:14px 20px 0">
          <div class="stat-card">
            <div class="stat-num">${u.tipsPosted}</div>
            <div class="stat-label">Tips shared</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">${u.resonances}</div>
            <div class="stat-label">Resonances</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">${u.streak}</div>
            <div class="stat-label">Day streak</div>
          </div>
        </div>

        <div class="section-head" style="padding:0 20px">Gender-aware insights</div>
        <div class="gender-insight-card" style="margin:0 20px">
          <div class="gi-header">🧬 Why your content looks different</div>
          <div class="gi-body">${genderInsight}</div>
        </div>

        <div class="section-head" style="padding:0 20px">Connected apps</div>
        <div class="connected-apps-list" style="margin:0 20px">
          ${appsHTML}
          <button class="btn btn-outline" style="width:100%" onclick="APP.showToast('Connect more apps — coming soon')">+ Connect another app</button>
        </div>

        <div class="section-head" style="padding:0 20px">Settings</div>
        <div style="margin:0 20px;background:#fff;border-radius:var(--r);border:1px solid rgba(0,0,0,0.07);overflow:hidden">
          ${settingsHTML}
        </div>

        <div style="margin:16px 20px;padding:14px;background:var(--sage-light);border-radius:var(--r);text-align:center">
          <div style="font-size:12px;color:var(--muted);margin-bottom:4px">Backed by</div>
          <div style="font-size:13px;font-weight:500;color:var(--deep)">🛒 Sanitarium · 🔬 UTS Lab</div>
          <div style="font-size:10px;color:var(--muted);margin-top:4px">All recommendations are researcher-reviewed</div>
        </div>

        <button class="btn" style="margin:0 20px 20px;color:var(--terracotta);font-size:13px" onclick="APP.navigate('onboarding')">← Sign out / restart demo</button>
      </div>
      ${renderBottomNav('profile')}
    </div>`;
}
