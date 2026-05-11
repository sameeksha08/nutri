// src/screens/journal.js

function renderJournal() {
  let entries = [...MOCK.journalEntries];

  function entryHTML(e) {
    return `
      <div class="journal-entry-card" style="margin:0 20px">
        <div class="je-header">
          <div class="je-date">📅 ${e.date}</div>
          ${e.source ? `<span class="je-source">${e.source}</span>` : ''}
        </div>
        <div class="je-body">${e.body}</div>
        <div class="je-mood">${e.mood}</div>
        ${e.data && e.data.length ? `<div class="connected-data">${e.data.map(d=>`<span class="data-pill">${d}</span>`).join('')}</div>` : ''}
      </div>`;
  }

  function render() {
    document.getElementById('app').innerHTML = `
      <div class="screen" id="screen-journal">
        <div class="status-bar">
          <span class="status-time">9:41</span>
          <span class="status-icons">▲ ● ■</span>
        </div>
        <div class="scroll-content">
          <div class="journal-header">
            <h2>My journal</h2>
            <div class="streak-badge">🔥 ${MOCK.user.streak} day streak</div>
          </div>

          <div style="margin:10px 20px;padding:12px 14px;background:var(--sage-light);border-radius:var(--r);display:flex;gap:10px;align-items:center">
            <span style="font-size:22px">💡</span>
            <div style="font-size:11px;color:var(--muted);line-height:1.5">When you tell Nouri how you're feeling in chat, it can <strong style="color:var(--deep)">auto-add it to your journal</strong> so you always have the full picture.</div>
          </div>

          <div class="section-head" style="padding:0 20px">Add today's entry</div>
          <div class="journal-input-area" style="margin:0 20px">
            <textarea class="journal-textarea" id="j-text" placeholder="How are you feeling today? What did you notice about your energy, mood, or body?"></textarea>
            <div class="journal-actions">
              <div class="journal-left-btns">
                <button class="j-icon-btn" title="Voice note" onclick="APP.showToast('🎙 Voice recording started...')">🎙</button>
                <button class="j-icon-btn" title="Add mood" onclick="insertMood()">😊</button>
                <button class="j-icon-btn" title="Add app data" onclick="APP.showToast('Syncing from Apple Health...')">⌚</button>
              </div>
              <button class="j-send-btn" onclick="addJournalEntry()">Save entry →</button>
            </div>
          </div>

          <div id="j-confirm" style="display:none;margin:8px 20px;background:var(--sage-light);border-radius:var(--rs);padding:8px 12px;font-size:11px;color:var(--sage)">
            ✓ Entry saved to your journal
          </div>

          <div class="section-head" style="padding:0 20px">Past entries</div>
          <div id="entries-container" style="display:flex;flex-direction:column;gap:10px;padding-bottom:8px">
            ${entries.map(entryHTML).join('')}
          </div>

          <div style="margin:16px 20px;padding:14px;background:var(--warm);border-radius:var(--r)">
            <div style="font-size:12px;font-weight:500;color:var(--deep);margin-bottom:4px">📊 Mood patterns</div>
            <div style="font-size:11px;color:var(--muted);margin-bottom:10px">Nouri is noticing you feel lower energy around cycle days 12–16. Tap to see the full pattern.</div>
            <div style="display:flex;gap:4px">
              ${['M','T','W','T','F','S','S'].map((d,i) => `
                <div style="flex:1;text-align:center">
                  <div style="height:${20+Math.random()*30|0}px;background:${i===1||i===2?'var(--sage)':'var(--sage-light)'};border-radius:4px;margin-bottom:3px"></div>
                  <div style="font-size:9px;color:var(--muted)">${d}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>
        ${renderBottomNav('journal')}
      </div>`;

    window.addJournalEntry = function() {
      const text = document.getElementById('j-text').value.trim();
      if (!text) { APP.showToast('Write something first 🌿'); return; }
      entries.unshift({
        date: 'Just now',
        source: null,
        body: text,
        mood: '📝 Just logged',
        data: ['⌚ Live sync'],
      });
      document.getElementById('j-text').value = '';
      const confirm = document.getElementById('j-confirm');
      confirm.style.display = 'block';
      setTimeout(() => confirm.style.display = 'none', 2000);
      document.getElementById('entries-container').innerHTML = entries.map(entryHTML).join('');
    };

    window.insertMood = function() {
      const moods = ['😊 Energised','😴 Tired','😰 Anxious','😌 Calm','😶‍🌫️ Foggy','💪 Strong'];
      const pick = moods[Math.floor(Math.random() * moods.length)];
      const ta = document.getElementById('j-text');
      ta.value += (ta.value ? ' ' : '') + pick;
      ta.focus();
    };
  }

  render();
}
