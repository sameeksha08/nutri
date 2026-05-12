// src/screens/onboarding.js

function renderOnboarding() {
  const steps = [
    {
      num: 'Welcome',
      title: 'Your health,\npersonalised.',
      desc: 'gUide learns what works for <em>your</em> body — not a generic plan. We partner with Australian researchers so everything you see is backed by real science.',
      type: 'splash',
    },
    {
      num: 'Step 1 of 6',
      title: 'What brings you\nto gUide?',
      desc: 'We\'ll personalise everything from here.',
      type: 'options',
      options: [
        { icon: '⚡', title: 'More energy & less fatigue', sub: 'Understand what\'s draining you' },
        { icon: '🍽', title: 'Smarter nutrition', sub: 'Food choices that actually work' },
        { icon: '🌸', title: 'Hormonal health', sub: 'Cycle, menopause, or fertility support' },
        { icon: '🧠', title: 'Mental wellbeing', sub: 'Mood, stress & sleep' },
        { icon: '💪', title: 'Performance & fitness', sub: 'Fuel your training' },
      ],
    },
    {
      num: 'Step 2 of 6',
      title: 'How do you\nidentify?',
      desc: 'This shapes the content we show — gender affects nutrition in real, evidence-based ways.',
      type: 'options',
      options: [
        { icon: '♀️', title: 'Woman', sub: 'Including cycle & hormonal tracking' },
        { icon: '♂️', title: 'Man', sub: 'Testosterone, muscle & energy focus' },
        { icon: '⚧', title: 'Non-binary / gender-diverse', sub: 'You tell us what\'s relevant' },
        { icon: '🤫', title: 'Prefer not to say', sub: 'General personalisation only' },
      ],
    },
    {
      num: 'Step 3 of 6',
      title: 'Any health\nconditions we\nshould know?',
      desc: 'Optional but helps us tailor recommendations. Nothing leaves this app.',
      type: 'options',
      multi: true,
      options: [
        { icon: '🩸', title: 'PCOS', sub: null },
        { icon: '🦋', title: 'Thyroid condition', sub: null },
        { icon: '🌿', title: 'IBS or gut issues', sub: null },
        { icon: '💤', title: 'Chronic fatigue', sub: null },
        { icon: '❤', title: 'Heart health concern', sub: null },
        { icon: '✨', title: 'None / prefer not to say', sub: null },
      ],
    },
    {
      num: 'Step 4 of 6',
      title: 'Connect your\nhealth apps',
      desc: 'gUide brings everything into one place — so your journal, meals, sleep and cycle data all talk to each other.',
      type: 'connect',
    },
    {
      num: 'Step 5 of 6',
      title: 'What kind of\ncommunity member\nare you?',
      desc: 'The Tips community is built on trust. Your contributions get rated by others.',
      type: 'options',
      options: [
        { icon: '👀', title: 'Mostly a reader', sub: 'I\'ll absorb tips from others' },
        { icon: '✍️', title: 'I\'ll share what works', sub: 'Help others discover what helped you' },
        { icon: '🔁', title: 'Both — I love exchanging ideas', sub: 'The full village experience' },
      ],
    },
    {
      num: 'Done!',
      title: 'Your village\nis ready.',
      desc: 'gUide has created your personalised space. Your first AI-powered insight is waiting inside.',
      type: 'done',
    },
  ];

  let current = 0;
  const selected = {};

  function render() {
    const step = steps[current];
    const app = document.getElementById('app');

    // Progress dots
    const dots = steps.map((_, i) => `<div class="ob-dot ${i <= current ? 'active' : ''}"></div>`).join('');
    const progressBar = current > 0 ? `<div class="ob-progress">${dots}</div>` : '';

    let body = '';
    if (step.type === 'splash') {
      body = `
        <div class="ob-splash">
          <div class="ob-logo fade-up">gUide<span>.</span></div>
          <svg width="180" height="160" viewBox="0 0 180 160" class="fade-up fade-up-1">
            <ellipse cx="90" cy="130" rx="70" ry="12" fill="rgba(74,124,89,0.1)"/>
            <circle cx="90" cy="80" r="55" fill="#e8f0ea"/>
            <text x="90" y="100" font-size="60" text-anchor="middle">🌿</text>
            <circle cx="130" cy="50" r="18" fill="#f5ede0"/>
            <text x="130" y="58" font-size="18" text-anchor="middle">🫐</text>
            <circle cx="52" cy="45" r="14" fill="#faf0dc"/>
            <text x="52" y="52" font-size="14" text-anchor="middle">🥑</text>
          </svg>
          <h1 class="fade-up fade-up-2">${step.title}</h1>
          <p class="ob-tagline fade-up fade-up-3">${step.desc}</p>
          <div class="fade-up fade-up-4" style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:8px">
            <span class="badge badge-sage">🔬 Researcher-backed</span>
            <span class="badge badge-muted">🔒 Privacy-first</span>
          </div>
          <button class="btn btn-primary fade-up fade-up-5" style="width:100%;margin-top:16px;padding:16px" onclick="OB.next()">Get started →</button>
          <button class="btn" style="color:var(--muted);font-size:13px;margin-top:4px" onclick="OB.next()">I already have an account</button>
        </div>`;
    } else if (step.type === 'options') {
      const opts = step.options.map((o, i) => `
        <button class="ob-option fade-up fade-up-${Math.min(i+1,5)} ${(selected[current]||[]).includes(i)?'selected':''}" onclick="OB.select(${i},${!!step.multi})">
          <span class="ob-opt-icon">${o.icon}</span>
          <div><div class="ob-opt-title">${o.title}</div>${o.sub?`<div class="ob-opt-sub">${o.sub}</div>`:''}</div>
        </button>`).join('');
      body = `
        <div class="ob-step">
          <div class="ob-step-content">
            <div class="ob-step-num fade-up">${step.num}</div>
            <h1 class="fade-up fade-up-1" style="white-space:pre-line">${step.title}</h1>
            <p class="ob-step-desc fade-up fade-up-2">${step.desc}</p>
            <div class="ob-options">${opts}</div>
          </div>
          <button class="btn btn-primary" style="width:100%;margin-top:20px;padding:15px" onclick="OB.next()">
            ${current === steps.length - 2 ? 'Get started →' : 'Continue →'}
          </button>
        </div>`;
    } else if (step.type === 'connect') {
      const apps = MOCK.connectedApps;
      const items = apps.map((a, i) => `
        <div class="ob-connect-item ${(selected[current]||[]).includes(i)?'connected':''}" id="connect-${i}" onclick="OB.connect(${i})">
          <div class="ob-connect-icon" style="background:${a.bg}">${a.icon}</div>
          <div class="ob-connect-text">
            <div class="ob-connect-name">${a.name}</div>
            <div class="ob-connect-status">${(selected[current]||[]).includes(i) ? '✓ Connected · ' + a.data : 'Tap to connect'}</div>
          </div>
          <button class="ob-connect-btn ${(selected[current]||[]).includes(i)?'done':''}">${(selected[current]||[]).includes(i)?'✓':'Connect'}</button>
        </div>`).join('');
      body = `
        <div class="ob-step">
          <div class="ob-step-content">
            <div class="ob-step-num fade-up">${step.num}</div>
            <h1 class="fade-up fade-up-1">${step.title}</h1>
            <p class="ob-step-desc fade-up fade-up-2">${step.desc}</p>
            <div class="ob-connect-row">${items}</div>
          </div>
          <button class="btn btn-primary" style="width:100%;margin-top:20px;padding:15px" onclick="OB.next()">
            ${(selected[current]||[]).length > 0 ? 'Continue with connected apps →' : 'Skip for now →'}
          </button>
        </div>`;
    } else if (step.type === 'done') {
      body = `
        <div class="ob-splash">
          <div style="font-size:72px;animation:fadeUp 0.5s ease">🎉</div>
          <h1 class="fade-up fade-up-1" style="text-align:center">${step.title}</h1>
          <p class="ob-tagline fade-up fade-up-2">${step.desc}</p>
          <div style="background:var(--sage-light);border-radius:16px;padding:16px;width:100%;margin-top:8px" class="fade-up fade-up-3">
            <div style="font-size:13px;font-weight:500;color:var(--deep);margin-bottom:8px">Your personalised profile</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              <span class="badge badge-sage">🌸 Hormonal health</span>
              <span class="badge badge-purple">⚡ Energy focus</span>
              <span class="badge badge-gold">🔬 Cycle day 14</span>
              <span class="badge badge-sky">⌚ Apple Health linked</span>
            </div>
          </div>
          <button class="btn btn-primary fade-up fade-up-4" style="width:100%;margin-top:16px;padding:16px" onclick="APP.navigate('home')">Enter your village →</button>
        </div>`;
    }

    app.innerHTML = `
      <div class="screen onboarding-screen">
        <div class="status-bar">
          <span class="status-time">9:41</span>
          <span class="status-icons">▲ ● ■</span>
        </div>
        ${progressBar}
        ${body}
      </div>`;
  }

  const OB = {
    next() {
      current++;
      if (current >= steps.length) { APP.navigate('home'); return; }
      render();
    },
    select(idx, multi) {
      if (!selected[current]) selected[current] = [];
      if (multi) {
        const pos = selected[current].indexOf(idx);
        if (pos > -1) selected[current].splice(pos, 1);
        else selected[current].push(idx);
      } else {
        selected[current] = [idx];
        setTimeout(() => OB.next(), 320);
      }
      render();
    },
    connect(idx) {
      if (!selected[current]) selected[current] = [];
      const pos = selected[current].indexOf(idx);
      if (pos > -1) selected[current].splice(pos, 1);
      else selected[current].push(idx);
      render();
    },
  };
  window.OB = OB;
  render();
}
