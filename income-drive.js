/* Retro Console Checker — RRUK Income Drive v1 */
(() => {
  const RRUK = 'https://retroreplay.uk';
  const HUNT = RRUK + '/pages/find-my-console#1789076813a6932e54';
  const GIFT_FINDER = 'https://taccountant2026.github.io/Retro-Gift-Finder/#finder';
  const source = 'retro_console_checker';
  const campaign = 'income_drive';

  function tracked(url, medium = 'referral', extra = {}) {
    const u = new URL(url, location.href);
    u.searchParams.set('utm_source', source);
    u.searchParams.set('utm_medium', medium);
    u.searchParams.set('utm_campaign', campaign);
    Object.entries(extra).forEach(([k,v]) => v && u.searchParams.set(k, v));
    return u.toString();
  }

  function huntUrl(model = '') {
    const u = new URL(HUNT);
    u.searchParams.set('utm_source', source);
    u.searchParams.set('utm_medium', 'lead');
    u.searchParams.set('utm_campaign', campaign);
    u.searchParams.set('utm_content', 'find_one');
    if (model) u.searchParams.set('console', model);
    u.hash = '1789076813a6932e54';
    return u.toString();
  }

  function enhanceResult() {
    const result = document.getElementById('result');
    if (!result || !result.innerHTML.trim()) return;
    const identity = result.querySelector('.identity h2');
    const chips = result.querySelectorAll('.chip');
    const modelName = identity?.textContent?.trim() || '';
    const modelCode = chips[0]?.textContent?.trim() || '';
    const shopBox = result.querySelector('.shop');
    if (!shopBox || shopBox.dataset.incomeDrive === '1') return;
    shopBox.dataset.incomeDrive = '1';

    const originalShop = shopBox.querySelector('a.btn');
    if (originalShop) {
      originalShop.textContent = 'SHOP MATCHING CONSOLES AT RRUK ▶';
      originalShop.href = tracked(originalShop.href, 'model_result', {model: modelCode || modelName});
    }

    const hunt = document.createElement('a');
    hunt.className = 'btn secondary';
    hunt.href = huntUrl(modelCode || modelName);
    hunt.target = '_blank';
    hunt.rel = 'noopener';
    hunt.textContent = 'CAN’T FIND ONE? ASK RRUK TO SOURCE IT ▶';

    const gift = document.createElement('a');
    gift.className = 'btn secondary';
    gift.href = tracked(GIFT_FINDER, 'cross_tool', {model: modelCode || modelName});
    gift.textContent = 'BUYING AS A GIFT? USE GIFT FINDER ▶';

    const restart = document.createElement('button');
    restart.className = 'secondary';
    restart.type = 'button';
    restart.textContent = 'CHECK ANOTHER CONSOLE';
    restart.addEventListener('click', () => {
      const q = document.getElementById('quick');
      if (q) { q.value = ''; q.focus(); }
      document.getElementById('checker')?.scrollIntoView({behavior:'smooth', block:'start'});
    });

    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.append(hunt, gift, restart);
    shopBox.appendChild(actions);

    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = 'RRUK stock changes regularly. If the exact model is unavailable, send a sourcing request rather than settling for the wrong revision.';
    shopBox.appendChild(note);
  }

  const result = document.getElementById('result');
  if (result) new MutationObserver(enhanceResult).observe(result, {childList:true, subtree:true});
  enhanceResult();

  document.querySelectorAll('a[href^="https://retroreplay.uk"]').forEach(a => {
    try { a.href = tracked(a.href, 'site_link'); } catch (_) {}
  });
})();
