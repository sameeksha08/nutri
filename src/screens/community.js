// src/screens/community.js

function renderCommunity() {
  const filters = ['All', 'Hormonal', 'Gut health', 'Energy', 'Sleep', 'Mental wellbeing'];
  let activeFilter = 0;
  let tipRatings = MOCK.tips.map(t => t.myRating);
  let resStates = MOCK.tips.map(() => [false, false]);

  function starsHTML(rating, interactive, tipIdx) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let s = '';
    for (let i = 1; i <= 5; i++) {
      if (interactive) {
        s += `<button class="star-btn" onclick="rateT(${tipIdx},${i})" title="Rate ${i} star">${tipRatings[tipIdx] >= i ? '⭐' : '☆'}</button>`;
      } else {
        s += `<span style="font-size:12px;color:${i<=full?'var(--gold)':'#ddd'}">${i<=full?'★':'☆'}</span>`;
      }
    }
    return s;
  }

  function tipCardsHTML() {
    return MOCK.tips.map((t, i) => `
      <div class="tip-card-full">
        <div class="tip-header">
          <div class="tip-avatar" style="background:${t.avatarBg}">${t.avatar}</div>
          <div class="tip-user-info">
            <div class="tip-username">${t.username} ${t.verified ? '<span class="badge badge-sage" style="font-size:9px">✓ Verified</span>' : ''}</div>
            <div class="tip-rating">
              ${starsHTML(t.rating, false, i)}
              <span style="color:var(--muted);margin-left:3px">${t.rating} · ${t.totalTips} tips</span>
            </div>
          </div>
          <span class="badge badge-muted" style="font-size:9px">${t.category}</span>
        </div>
        <div class="tip-body">${t.body}</div>
        <div class="tip-discovery">${t.discovery}</div>
        <div class="tip-footer-bar">
          <div class="tip-res-row">
            <button class="res-btn ${resStates[i][0]?'lit':''}" onclick="communityRes(${i},0)">✨ (${t.resonances + (resStates[i][0]?1:0)})</button>
            <button class="res-btn ${resStates[i][1]?'lit':''}" onclick="communityRes(${i},1)">💡 Tried it (${t.tried + (resStates[i][1]?1:0)})</button>
          </div>
        </div>
        <div class="rate-section">
          <div class="rate-label">Rate this tip for the community:</div>
          <div class="star-row" id="stars-${i}">
            ${starsHTML(t.rating, true, i)}
          </div>
          ${tipRatings[i] > 0 ? `<div style="font-size:10px;color:var(--sage);margin-top:4px">You rated this ${tipRatings[i]} ★ — thank you!</div>` : ''}
        </div>
      </div>`).join('');
  }

  function render() {
    const filterHTML = filters.map((f, i) => `
      <button class="filter-pill ${activeFilter===i?'active':''}" onclick="communityFilter(${i})">${f}</button>`).join('');

    document.getElementById('app').innerHTML = `
      <div class="screen" id="screen-community">
        <div class="status-bar">
          <span class="status-time">9:41</span>
          <span class="status-icons">▲ ● ■</span>
        </div>
        <div class="scroll-content">
          <div style="padding:12px 20px 0">
            <h2>Community tips</h2>
            <div style="font-size:12px;color:var(--muted);margin-top:2px;margin-bottom:12px">Real people, real discoveries. Rate tips to build trust in the village.</div>
          </div>

          <div class="filter-scroll" style="margin-bottom:14px">${filterHTML}</div>

          <div style="padding:0 20px;display:flex;flex-direction:column;gap:12px" id="tips-container">
            ${tipCardsHTML()}
          </div>

          <button class="btn btn-outline add-tip-btn" onclick="APP.showToast('Share your tip — coming soon!')">
            ✍️ Share your own tip
          </button>

          <div style="margin:0 20px 20px;padding:14px;background:var(--sage-light);border-radius:var(--r)">
            <div style="font-size:11px;font-weight:500;color:var(--sage);margin-bottom:4px">🔬 Researcher-verified tips</div>
            <div style="font-size:11px;color:var(--muted);line-height:1.5">Tips with the ✓ badge have been reviewed by our research partners for safety and accuracy.</div>
          </div>
        </div>
        ${renderBottomNav('community')}
      </div>`;
  }

  render();

  window.communityFilter = function(idx) {
    activeFilter = idx;
    render();
    window.communityRes = communityRes;
    window.rateT = rateT;
    window.communityFilter = arguments.callee;
  };

  window.communityRes = function(i, j) {
    resStates[i][j] = !resStates[i][j];
    render();
    window.communityRes = communityRes;
    window.rateT = rateT;
  };

  window.rateT = function(tipIdx, stars) {
    tipRatings[tipIdx] = stars;
    const box = document.getElementById(`stars-${tipIdx}`);
    if (box) {
      box.parentElement.innerHTML = `
        <div class="rate-label">Rate this tip for the community:</div>
        <div class="star-row">
          ${[1,2,3,4,5].map(i=>`<button class="star-btn" onclick="rateT(${tipIdx},${i})">${tipRatings[tipIdx]>=i?'⭐':'☆'}</button>`).join('')}
        </div>
        <div style="font-size:10px;color:var(--sage);margin-top:4px">You rated this ${stars} ★ — thank you!</div>`;
    }
  };
}
