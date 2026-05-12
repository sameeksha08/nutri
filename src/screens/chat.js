// src/screens/chat.js

function renderChat() {
  let messages = [...MOCK.chatMessages];
  let pendingJournal = null;

  const quickPrompts = [
    'I\'ve been feeling anxious lately 😓',
    'Best foods for cycle day 14?',
    'Why am I so tired after lunch?',
    'How does iron affect mood?',
    'Help me sleep better',
  ];

  const aiReplies = {
    anxious: {
      text: 'I\'m really glad you shared that with me, Sarah. Anxiety during ovulation can be linked to progesterone rising — totally normal, and also something nutrition can genuinely help with. Magnesium and B6-rich foods (like pumpkin seeds and bananas) can ease this significantly.\n\nWould you like some meal ideas?',
      journalPrompt: true,
    },
    iron: {
      text: 'Iron directly affects dopamine and serotonin production — so low iron literally makes you feel emotionally flat. Your current phase means your needs are elevated by up to 30%. Your spinach oat bowl this morning was a great start — adding vitamin C alongside iron-rich foods helps absorption by 3×.',
      journalPrompt: false,
    },
    tired: {
      text: 'Post-lunch tiredness is usually one of two things: a blood sugar spike from high-GI carbs, or your circadian rhythm (natural 1–3pm dip). Based on your meal log, your lunch had good protein but could use more fibre. Want me to suggest a tweak?',
      journalPrompt: false,
    },
    sleep: {
      text: 'Your sleep data shows 5.9 hours last night — below your 7.2hr average. For your cycle phase, magnesium glycinate before bed, and cutting screen light 45 min before sleep, are the two most evidence-backed interventions. Want a full sleep protocol?',
      journalPrompt: false,
    },
    default: {
      text: 'Great question. Based on your profile and connected health data, here\'s what I\'d suggest personalised for you right now...',
      journalPrompt: false,
    },
  };

  function getReply(msg) {
    const m = msg.toLowerCase();
    if (m.includes('anxious') || m.includes('anxiety') || m.includes('stressed')) return aiReplies.anxious;
    if (m.includes('iron') || m.includes('mood') || m.includes('flat')) return aiReplies.iron;
    if (m.includes('tired') || m.includes('energy') || m.includes('fatigue')) return aiReplies.tired;
    if (m.includes('sleep')) return aiReplies.sleep;
    return aiReplies.default;
  }

  function messagesHTML() {
    return messages.map((m, i) => {
      if (m.role === 'ai') return `
        <div>
          <div class="bubble-sender">gUide ✦</div>
          <div class="bubble bubble-ai">${m.text.replace(/\n/g, '<br>')}
            ${m.journalPrompt ? `
              <div class="journal-prompt-chip">
                <span class="jp-text">✦ Add this check-in to your journal?</span>
                <button class="jp-btn" onclick="addToJournal()">Add ✓</button>
              </div>` : ''}
          </div>
        </div>`;
      return `<div class="bubble bubble-user">${m.text}</div>`;
    }).join('');
  }

  function render() {
    document.getElementById('app').innerHTML = `
      <div class="screen" id="screen-chat" style="display:flex;flex-direction:column">
        <div class="status-bar">
          <span class="status-time">9:41</span>
          <span class="status-icons">▲ ● ■</span>
        </div>
        <div class="chat-header">
          <h2 style="padding:0 20px">Ask Nutri</h2>
        </div>
        <div class="nouri-ai-intro" style="margin:10px 20px">
          <div class="ai-avatar">🌿</div>
          <div>
            <div class="ai-name">Nouri AI · Personalised to you</div>
            <div class="ai-status"><span class="online-dot"></span> Online · backed by real researchers</div>
          </div>
        </div>
        <div class="quick-prompts">
          ${quickPrompts.map(q => `<button class="qp" onclick="sendQuick('${q.replace(/'/g,"\\'")}')">💬 ${q}</button>`).join('')}
        </div>
        <div class="chat-area" id="chat-messages">
          <div class="chat-day-sep">Today</div>
          ${messagesHTML()}
        </div>
        <div class="chat-input-bar">
          <input class="chat-input" id="chat-input" placeholder="Ask anything about your health..." onkeydown="if(event.key==='Enter')sendMsg()"/>
          <button class="j-icon-btn" onclick="APP.showToast('🎙 Voice input started...')" title="Voice">🎙</button>
          <button class="send-btn" onclick="sendMsg()">→</button>
        </div>
        ${renderBottomNav('chat')}
      </div>`;

    scrollToBottom();
  }

  function scrollToBottom() {
    setTimeout(() => {
      const el = document.getElementById('chat-messages');
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  }

  function doSend(text) {
    messages.push({ role: 'user', text });
    const reply = getReply(text);
    pendingJournal = reply.journalPrompt ? text : null;
    setTimeout(() => {
      messages.push({ role: 'ai', text: reply.text, journalPrompt: reply.journalPrompt });
      render();
      window.sendMsg = sendMsg;
      window.sendQuick = sendQuick;
      window.addToJournal = addToJournal;
    }, 900);
    render();
    window.sendMsg = sendMsg;
    window.sendQuick = sendQuick;
    window.addToJournal = addToJournal;
  }

  function sendMsg() {
    const inp = document.getElementById('chat-input');
    const text = inp ? inp.value.trim() : '';
    if (!text) return;
    inp.value = '';
    doSend(text);
  }

  function sendQuick(text) {
    doSend(text);
  }

  function addToJournal() {
    MOCK.journalEntries.unshift({
      date: 'Just now',
      source: '✦ via Nouri chat',
      body: pendingJournal || 'Chat check-in captured.',
      mood: '😶‍🌫️ Captured from chat',
      data: [],
    });
    APP.showToast('✓ Added to your journal');
    const chip = document.querySelector('.journal-prompt-chip');
    if (chip) chip.innerHTML = '<span class="jp-text" style="color:var(--sage)">✓ Saved to journal</span>';
  }

  window.sendMsg = sendMsg;
  window.sendQuick = sendQuick;
  window.addToJournal = addToJournal;

  render();
}
