/* ═══════════════════════════════════
   gUide — app.js
   All interactive logic
═══════════════════════════════════ */

window.userName = 'Sarah';

// ── ONBOARDING NAVIGATION ──────────────────────

function nextOb(targetId) {
  const current = document.querySelector('.ob-step.active');
  const target = document.getElementById(targetId);
  if (!current || !target) return;
  current.classList.remove('active');
  target.classList.add('active');
  // Update ready name if we reach the last step
  if (targetId === 'ob-ready') {
    const name = document.getElementById('nameInput')?.value || 'friend';
    document.getElementById('readyName').textContent = name || 'friend';
  }
}

function prevOb(targetId) {
  nextOb(targetId);
}

function selectCard(el, group) {
  const grid = el.closest('.ob-card-grid');
  grid.querySelectorAll('.ob-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function toggleConnect(el) {
  el.classList.toggle('connected');
  const toggle = el.querySelector('.connect-toggle');
  if (el.classList.contains('connected')) {
    toggle.classList.remove('disconnected');
    toggle.innerHTML = '<i class="fa-solid fa-circle-check"></i> Connected';
  } else {
    toggle.classList.add('disconnected');
    toggle.innerHTML = '<i class="fa-solid fa-plus-circle"></i> Connect';
  }
}

function skipToApp() {
  document.getElementById('screen-onboarding').classList.remove('active');
  document.getElementById('screen-app').classList.add('active');
  switchTab('home');
}

// ── APP TAB NAVIGATION ──────────────────────

function switchTab(tab) {
  // Hide all panes
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  // Deactivate all nav btns
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const pane = document.getElementById('pane-' + tab);
  const btn = document.getElementById('nav-' + tab);
  if (pane) pane.classList.add('active');
  if (btn) btn.classList.add('active');

  // Scroll content area back to top
  document.getElementById('contentArea').scrollTop = 0;
}

// ── HOME ──────────────────────

function logMeal(btn) {
  const card = btn.closest('.meal-card');
  card.classList.remove('upcoming');
  card.classList.add('logged');
  btn.remove();
  const check = document.createElement('i');
  check.className = 'fa-solid fa-circle-check meal-check';
  card.appendChild(check);
  showToast('Dinner logged ✓');
}

// ── VILLAGE ──────────────────────

const mascotData = {
  priya: {
    name: 'Priya S.',
    face: '👩🏽',
    bg: '#f9c6a0',
    status: '🟢 Active now',
    body: 'Just shared a new tip about golden milk for sleep 🌙 · Trust score: ★★★★☆ 4.2 · 34 tips shared'
  },
  joel: {
    name: 'Joel A.',
    face: '👨🏻',
    bg: '#c7e5f7',
    status: '🟡 Busy',
    body: 'Hit protein targets 7 days in a row 💪 · Trust score: ★★★★☆ 3.8 · 12 tips shared'
  },
  amara: {
    name: 'Amara K.',
    face: '👩🏾',
    bg: '#d4c4f0',
    status: '🟢 Active now',
    body: 'Just logged a mood journal entry · Top contributor 🏅 · Trust score: ★★★★★ 4.9 · 67 tips shared'
  },
  chris: {
    name: 'Chris B.',
    face: '🧑🏼',
    bg: '#b5e8c8',
    status: '⚫ Offline',
    body: 'Last active 2 hours ago · Trust score: ★★★★☆ 3.5 · 8 tips shared'
  }
};

function popMascot(id) {
  const d = mascotData[id];
  if (!d) return;
  document.getElementById('mpFace').textContent = d.face;
  document.getElementById('mpFace').style.background = d.bg;
  document.getElementById('mpName').textContent = d.name;
  document.getElementById('mpStatus').textContent = d.status;
  document.getElementById('mpBody').textContent = d.body;
  document.getElementById('mascotPopup').style.display = 'block';
}

function closePop() {
  document.getElementById('mascotPopup').style.display = 'none';
}

// ── RESONANCE / REACTIONS ──────────────────────

function resonate(btn) {
  btn.classList.toggle('lit');
  // Parse and increment/decrement count
  const text = btn.textContent;
  const match = text.match(/(\d+)/);
  if (match) {
    const num = parseInt(match[1]);
    const newNum = btn.classList.contains('lit') ? num + 1 : num - 1;
    btn.textContent = text.replace(/\d+/, newNum);
  }
}

// ── TIPS ──────────────────────

function filterTips(el) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  showToast('Filtered: ' + el.textContent.trim());
}

function rateTip(starEl, val) {
  const container = starEl.closest('.star-rating');
  const confirm = starEl.closest('.rate-this').querySelector('.rate-confirm');
  const stars = container.querySelectorAll('span');
  stars.forEach((s, i) => {
    s.textContent = i < val ? '★' : '☆';
    s.style.color = i < val ? 'var(--gold)' : 'var(--gold)';
  });
  confirm.style.display = 'inline';
  // Disable further clicks
  stars.forEach(s => s.style.pointerEvents = 'none');
  showToast('Rating saved — thanks!');
}

function submitTip() {
  const text = document.getElementById('tipText')?.value.trim();
  if (!text) { showToast('Write your tip first!'); return; }
  document.getElementById('shareTipModal').style.display = 'none';
  document.getElementById('tipText').value = '';
  showToast('Tip posted! Others can now rate it ✓');
}

// ── JOURNAL ──────────────────────

let selectedMood = '';

function selectMood(btn, mood) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedMood = mood;
}

function addJournalEntry() {
  const text = document.getElementById('journalEntry').value.trim();
  if (!text) { showToast('Write something first!'); return; }

  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });

  const entry = document.createElement('div');
  entry.className = 'journal-entry';
  entry.innerHTML = `
    <div class="je-date"><i class="fa-solid fa-calendar-day"></i> Today · ${timeStr}</div>
    <p class="je-text">${escapeHtml(text)}</p>
    ${selectedMood ? `<div class="je-mood-chip"><span>${selectedMood.split(' ')[0]}</span> ${selectedMood.slice(selectedMood.indexOf(' ')+1)}</div>` : ''}
  `;

  const entries = document.getElementById('journalEntries');
  entries.insertBefore(entry, entries.firstChild);
  document.getElementById('journalEntry').value = '';
  selectedMood = '';
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));

  const confirm = document.getElementById('journalConfirm');
  confirm.style.display = 'block';
  setTimeout(() => confirm.style.display = 'none', 2500);
}

// ── CHAT ──────────────────────

const chatReplies = [
  {
    trigger: ['anxious', 'run down', 'stressed', 'overwhelmed'],
    reply: 'That sounds really tough. During ovulation, some people experience a dip in serotonin — it\'s real and worth tracking. Magnesium and B6 can help. Should I add how you\'re feeling to your journal?',
    offerJournal: true
  },
  {
    trigger: ['cycle', 'phase', 'period', 'hormonal'],
    reply: 'You\'re on day 14 — ovulation phase. Your body needs more iron and zinc right now. Lentils, pumpkin seeds and red meat are great options. Want me to update tonight\'s meal suggestion?',
    offerJournal: false
  },
  {
    trigger: ['tired', 'fatigue', 'energy', 'afternoon', 'crash'],
    reply: 'Post-lunch tiredness is often a blood sugar spike from refined carbs. Try adding protein and healthy fat to lunch — your lentil bowl today was actually a great call. How did you feel after?',
    offerJournal: false
  },
  {
    trigger: ['sleep', 'insomnia', 'rest'],
    reply: 'Sleep and nutrition are deeply linked. Low magnesium is a common culprit for light sleep in women. Golden milk (turmeric + oat milk) before bed is a community favourite — and backed by Dr. Amara\'s research here. Should I add it to your meal plan?',
    offerJournal: false
  }
];

const defaultReply = 'Great question! Based on your profile and current cycle phase, I\'d recommend focusing on iron-rich whole foods this week. Is there something specific — meal ideas, supplements, or a symptom you\'ve noticed?';

let chatJournalText = '';

function sendChat(msg) {
  addChatBubble(msg, 'user');
  setTimeout(() => {
    const match = chatReplies.find(r => r.trigger.some(t => msg.toLowerCase().includes(t)));
    const replyText = match ? match.reply : defaultReply;
    addChatBubble(replyText, 'ai');
    if (match && match.offerJournal) {
      chatJournalText = msg;
      addJournalPrompt(msg);
    }
  }, 700);
}

function sendChatFromInput() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  sendChat(msg);
}

function addChatBubble(text, who) {
  const area = document.getElementById('chatArea');
  const div = document.createElement('div');
  div.className = 'bubble ' + (who === 'ai' ? 'ai-bubble' : 'user-bubble');
  div.textContent = text;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

function addJournalPrompt(originalMsg) {
  const area = document.getElementById('chatArea');
  const div = document.createElement('div');
  div.className = 'journal-prompt-bubble';
  div.innerHTML = `<span>✦ Add how you're feeling to your journal?</span>
    <button class="journal-add-btn" onclick="saveToJournalFromChat(this, '${escapeHtml(originalMsg)}')">Add ✓</button>`;
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

function saveToJournalFromChat(btn, originalMsg) {
  btn.closest('.journal-prompt-bubble').remove();
  const tag = document.createElement('div');
  tag.className = 'journal-added-tag';
  tag.textContent = '📓 Added to your journal';
  document.getElementById('chatArea').appendChild(tag);
  document.getElementById('chatArea').scrollTop = document.getElementById('chatArea').scrollHeight;

  // Actually add to journal
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' });
  const entry = document.createElement('div');
  entry.className = 'journal-entry ai-entry';
  entry.innerHTML = `
    <div class="je-date"><i class="fa-solid fa-calendar-day"></i> Today · ${timeStr} <span class="je-tag ai-tag">✦ Via Nutri chat</span></div>
    <p class="je-text">${escapeHtml(originalMsg)}</p>
  `;
  const entries = document.getElementById('journalEntries');
  if (entries) entries.insertBefore(entry, entries.firstChild);
  showToast('Added to journal ✓');
}

// ── TOAST ──────────────────────

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── UTILS ──────────────────────

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ── INIT ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Start on onboarding splash
  document.getElementById('screen-onboarding').classList.add('active');
});
