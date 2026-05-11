// src/app.js — Main router

function renderBottomNav(active) {
  const items = [
    { id: 'home',      icon: '🏠', label: 'Home' },
    { id: 'village',   icon: '🌿', label: 'Village' },
    { id: 'community', icon: '💡', label: 'Tips' },
    { id: 'journal',   icon: '📓', label: 'Journal' },
    { id: 'chat',      icon: '🤖', label: 'Ask Nouri' },
    { id: 'profile',   icon: '👤', label: 'Me' },
  ];
  return `
    <div class="bottom-nav">
      ${items.map(it => `
        <div class="nav-item ${active === it.id ? 'active' : ''}" onclick="APP.navigate('${it.id}')">
          <div class="nav-icon">${it.icon}</div>
          <div class="nav-label">${it.label}</div>
        </div>`).join('')}
    </div>`;
}

const APP = {
  current: null,

  navigate(screen) {
    this.current = screen;
    if (screen === 'onboarding') { renderOnboarding(); return; }
    if (screen === 'home')      { renderHome(); return; }
    if (screen === 'village')   { renderVillage(); return; }
    if (screen === 'community') { renderCommunity(); return; }
    if (screen === 'journal')   { renderJournal(); return; }
    if (screen === 'chat')      { renderChat(); return; }
    if (screen === 'profile')   { renderProfile(); return; }
  },

  showToast(msg) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast';
      document.getElementById('app').appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  },
};

// Boot
window.addEventListener('DOMContentLoaded', () => {
  APP.navigate('onboarding');
});
