(() => {
  'use strict';
  const cv = document.getElementById('game'); const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
  cv.width = W * dpr; cv.height = H * dpr; ctx.scale(dpr, dpr);
  const scoreEl = document.getElementById('score'), qEl = document.getElementById('q');
  const overlay = document.getElementById('overlay'), ovTitle = document.getElementById('ov-title'), ovSub = document.getElementById('ov-sub');
  const QA = [
    { q: '中国的首都是哪里？', o: ['上海', '北京', '广州', '深圳'], a: 1 },
    { q: '一年有多少个月？', o: ['10', '11', '12', '13'], a: 2 },
    { q: '水在标准大气压下几度沸腾？', o: ['50', '80', '90', '100'], a: 3 },
    { q: '太阳系中最大的行星是？', o: ['地球', '火星', '木星', '金星'], a: 2 },
    { q: '光的三原色不包括？', o: ['红', '绿', '蓝', '黄'], a: 3 },
    { q: '一个周角是多少度？', o: ['90', '180', '270', '360'], a: 3 },
    { q: '《红楼梦》的作者是？', o: ['施耐庵', '曹雪芹', '罗贯中', '吴承恩'], a: 1 },
    { q: '人体最大的器官是？', o: ['心脏', '肝脏', '皮肤', '肺'], a: 2 },
    { q: '圆周率 π 约等于？', o: ['2.14', '3.14', '4.14', '3.41'], a: 1 },
    { q: '下列哪个是哺乳动物？', o: ['鲨鱼', '鲸鱼', '金鱼', '鳄鱼'], a: 1 }
  ];
  const OBX = 40, OBW = W - 80, OBH = 48, OBY0 = 150, OBG = 14;
  let idx, score, picked, over;

  function reset() { idx = 0; score = 0; picked = -1; over = false; scoreEl.textContent = '0'; qEl.textContent = '1/' + QA.length; overlay.classList.add('hidden'); }
  function clickHandler(e) {
    if (over) return;
    const rect = cv.getBoundingClientRect(); const px = (e.clientX - rect.left) / rect.width * W, py = (e.clientY - rect.top) / rect.height * H;
    for (let i = 0; i < 4; i++) { const y = OBY0 + i * (OBH + OBG); if (px >= OBX && px <= OBX + OBW && py >= y && py <= y + OBH) answer(i); }
  }
  function answer(i) {
    if (picked !== -1) return;
    picked = i;
    if (i === QA[idx].a) { score += 10; scoreEl.textContent = score; }
    setTimeout(() => {
      idx++;
      if (idx >= QA.length) { over = true; ovTitle.textContent = '完成！'; ovSub.textContent = '总分 ' + score + ' / ' + (QA.length * 10); overlay.classList.remove('hidden'); }
      else { picked = -1; qEl.textContent = (idx + 1) + '/' + QA.length; }
    }, 650);
  }
  function draw() {
    ctx.fillStyle = '#1a1c3a'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#eef0ff'; ctx.font = 'bold 20px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('第 ' + (idx + 1) + ' 题：' + QA[idx].q, W / 2, 70);
    for (let i = 0; i < 4; i++) {
      const y = OBY0 + i * (OBH + OBG);
      let col = '#34386e';
      if (picked === i) col = (i === QA[idx].a) ? '#43d97a' : '#ff5c7a';
      else if (picked !== -1 && i === QA[idx].a) col = '#43d97a';
      ctx.fillStyle = col; ctx.fillRect(OBX, y, OBW, OBH);
      ctx.fillStyle = '#fff'; ctx.font = '18px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(['A. ', 'B. ', 'C. ', 'D. '][i] + QA[idx].o[i], OBX + 16, y + OBH / 2);
    }
  }
  cv.addEventListener('click', clickHandler);
  cv.addEventListener('touchend', e => { const t = e.changedTouches[0]; clickHandler({ clientX: t.clientX, clientY: t.clientY }); }, { passive: true });
  document.getElementById('new').addEventListener('click', reset);
  document.getElementById('ov-btn').addEventListener('click', reset);
  function loop() { draw(); requestAnimationFrame(loop); }
  reset(); requestAnimationFrame(loop);
})();
