(() => {
  'use strict';
  const cv = document.getElementById('game'); const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
  cv.width = W * dpr; cv.height = H * dpr; ctx.scale(dpr, dpr);
  const wpmEl = document.getElementById('wpm'), accEl = document.getElementById('acc'), timeEl = document.getElementById('time');
  const overlay = document.getElementById('overlay'), ovTitle = document.getElementById('ov-title'), ovSub = document.getElementById('ov-sub');
  const WORDS = ['apple', 'banana', 'orange', 'grape', 'happy', 'world', 'code', 'game', 'jump', 'music', 'sun', 'moon', 'star', 'river', 'cloud', 'peace', 'light', 'dream', 'smile', 'brave', 'quick', 'fox', 'lazy', 'cat', 'dog'];
  let word, typed, correct, errors, idx, over, timer, secs, start;

  function reset() {
    idx = 0; word = WORDS[idx]; typed = ''; correct = 0; errors = 0; over = false; secs = 30; start = Date.now();
    wpmEl.textContent = '0'; accEl.textContent = '100'; timeEl.textContent = '30'; overlay.classList.add('hidden');
    if (timer) clearInterval(timer);
    timer = setInterval(() => { if (!over) { secs--; timeEl.textContent = secs; if (secs <= 0) finish(); } }, 1000);
  }
  function nextWord() { idx++; if (idx >= WORDS.length) idx = 0; word = WORDS[idx]; typed = ''; }
  function press(ch) {
    if (over) return;
    if (typed.length < word.length) {
      if (ch === word[typed.length]) { typed += ch; correct++; }
      else errors++;
      if (typed.length === word.length) nextWord();
    }
  }
  function finish() {
    over = true; if (timer) clearInterval(timer);
    const elapsed = (30 - secs) / 60 || 0.5;
    const wpm = Math.round((correct / 5) / Math.max(elapsed, 0.1));
    const acc = correct + errors ? Math.round(correct / (correct + errors) * 100) : 100;
    wpmEl.textContent = wpm; accEl.textContent = acc;
    ovTitle.textContent = '时间到'; ovSub.textContent = '速度 ' + wpm + ' WPM · 正确率 ' + acc + '%'; overlay.classList.remove('hidden');
  }
  function draw() {
    ctx.fillStyle = '#1a1c3a'; ctx.fillRect(0, 0, W, H);
    ctx.font = 'bold 40px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const x0 = W / 2 - (word.length * 24) / 2;
    for (let i = 0; i < word.length; i++) {
      const x = x0 + i * 24;
      if (i < typed.length) ctx.fillStyle = '#43d97a';
      else if (i === typed.length) ctx.fillStyle = '#ffd23f';
      else ctx.fillStyle = '#eef0ff';
      ctx.fillText(word[i], x, H / 2 - 20);
    }
    ctx.font = '16px sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillText('已输入 ' + correct + ' 字 · 错误 ' + errors + ' 字', W / 2, H / 2 + 40);
  }
  window.addEventListener('keydown', e => { if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) { e.preventDefault(); press(e.key.toLowerCase()); } });
  document.getElementById('new').addEventListener('click', reset);
  document.getElementById('ov-btn').addEventListener('click', reset);
  function loop() { draw(); requestAnimationFrame(loop); }
  reset(); requestAnimationFrame(loop);
})();
