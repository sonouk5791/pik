const http = require('http');

async function run() {
  const jsonResp = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  let page = jsonResp.find(p => p.type === 'page' && p.url.includes('3000'));
  if (!page) {
    page = jsonResp.find(p => p.type === 'page');
  }
  if (!page) {
    console.error('No page found on Chrome CDP');
    process.exit(1);
  }

  console.log('Connecting to page:', page.url);
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let msgId = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
  };

  const send = (method, params = {}) => {
    const id = msgId++;
    return new Promise((resolve) => {
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  await new Promise(resolve => ws.onopen = resolve);

  await send('Runtime.enable');
  await send('Page.enable');

  const evalJs = async (expr) => {
    const res = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
    return res.result?.result?.value;
  };

  // Navigate to 3000 if not already there
  await send('Page.navigate', { url: 'http://127.0.0.1:3000/' });
  await new Promise(r => setTimeout(r, 1500));

  console.log('Page Title:', await evalJs('document.title'));

  const testCases = [
    { name: '1분 테스트', sec: 60, timeStr: '01:00', label: '1분' },
    { name: '3분', sec: 180, timeStr: '03:00', label: '3분' },
    { name: '5분', sec: 300, timeStr: '05:00', label: '5분' },
    { name: '10분', sec: 600, timeStr: '10:00', label: '10분' },
    { name: '20분', sec: 1200, timeStr: '20:00', label: '20분' }
  ];

  const results = [];

  for (const tc of testCases) {
    console.log(`\n========================================`);
    console.log(`▶ Testing Duration: ${tc.name} (${tc.sec}초)`);
    console.log(`========================================`);

    // 1. Go to Step 1 and click duration button
    await evalJs(`app.goToStep(1)`);
    await new Promise(r => setTimeout(r, 200));

    // Click duration button
    await evalJs(`document.querySelector('.duration-btn[data-sec="${tc.sec}"]')?.click()`);
    await new Promise(r => setTimeout(r, 300));

    // Verify STEP 1
    const s1TargetDur = await evalJs(`app.targetDuration`);
    const s1ActiveSec = await evalJs(`document.querySelector('.duration-btn.active')?.dataset.sec`);
    const s1BannerTitle = await evalJs(`document.getElementById('togetherBannerTitle')?.innerText`);
    const s1Notice = await evalJs(`document.getElementById('durationNoticeText')?.innerText`);
    const s1Badge = await evalJs(`document.getElementById('headerDurationBadge')?.innerText`);

    console.log(`[STEP 1] app.targetDuration:`, s1TargetDur, `(expected: ${tc.sec})`);
    console.log(`[STEP 1] Active button data-sec:`, s1ActiveSec);
    console.log(`[STEP 1] Header badge:`, s1Badge);
    console.log(`[STEP 1] Banner title:`, s1BannerTitle);

    // 2. Check STEP 3
    await evalJs(`app.goToStep(3)`);
    await new Promise(r => setTimeout(r, 200));

    const s3TotalBadge = await evalJs(`document.getElementById('totalDurationBadge')?.innerText`);
    const s3SceneDurations = await evalJs(`app.scenes.map(s => s.duration)`);
    const s3DurSum = s3SceneDurations.reduce((a, b) => a + b, 0);

    console.log(`[STEP 3] Total duration badge:`, s3TotalBadge);
    console.log(`[STEP 3] Scene durations:`, s3SceneDurations, `(Sum: ${s3DurSum}초)`);

    // 3. Check STEP 4
    await evalJs(`app.goToStep(4)`);
    await new Promise(r => setTimeout(r, 200));

    const s4Title = await evalJs(`document.getElementById('step4TestTitle')?.innerText`);
    const s4Desc = await evalJs(`document.getElementById('step4TestDesc')?.innerText`);
    const s4Status = await evalJs(`document.getElementById('testStatusText')?.innerText`);
    const s4ChecklistTitle = await evalJs(`document.getElementById('checklistTitle')?.innerText`);
    const s4ChecklistDur = await evalJs(`document.getElementById('checklistDurationItem')?.innerText`);

    console.log(`[STEP 4] Test card title:`, s4Title);
    console.log(`[STEP 4] Checklist title:`, s4ChecklistTitle);
    console.log(`[STEP 4] Checklist duration item:`, s4ChecklistDur);

    // 4. Check STEP 5
    await evalJs(`app.goToStep(5)`);
    await new Promise(r => setTimeout(r, 200));

    const s5PlayerTitle = await evalJs(`document.getElementById('step5PlayerTitle')?.innerText`);
    const s5BrandTitle = await evalJs(`document.getElementById('playerBrandTitle')?.innerText`);
    const s5TotalTime = await evalJs(`document.getElementById('totalTimeLabel')?.innerText`);
    const s5ChaptersTitle = await evalJs(`document.getElementById('chaptersBarTitle')?.innerText`);
    const s5Chap1Text = await evalJs(`document.getElementById('btnChap1')?.innerText`);
    const s5Chap6Text = await evalJs(`document.getElementById('btnChap6')?.innerText`);
    const s5ExportSpecTime = await evalJs(`document.getElementById('exportSpecTotalTime')?.innerText`);
    const s5DownloadBtn = await evalJs(`document.getElementById('btnDownloadFinalVideo')?.innerText`);

    console.log(`[STEP 5] Player title:`, s5PlayerTitle);
    console.log(`[STEP 5] Brand title on video:`, s5BrandTitle);
    console.log(`[STEP 5] Total time label:`, s5TotalTime, `(expected: ${tc.timeStr})`);
    console.log(`[STEP 5] Chapters title:`, s5ChaptersTitle);
    console.log(`[STEP 5] Chapter 1 button:`, s5Chap1Text);
    console.log(`[STEP 5] Chapter 6 button:`, s5Chap6Text);
    console.log(`[STEP 5] Export spec time:`, s5ExportSpecTime);
    console.log(`[STEP 5] Download button text:`, s5DownloadBtn);

    // Validations
    const passed = (
      s1TargetDur === tc.sec &&
      s1ActiveSec === String(tc.sec) &&
      s3DurSum === tc.sec &&
      s5TotalTime === tc.timeStr &&
      s4Title.includes(`기억정원 ${tc.label} 의자체조`) &&
      s5PlayerTitle.includes(`기억정원 ${tc.label} 의자체조`) &&
      s5BrandTitle.includes(`기억정원 ${tc.label} 의자체조`)
    );

    results.push({
      duration: tc.name,
      targetSec: tc.sec,
      observedSum: s3DurSum,
      totalTimeLabel: s5TotalTime,
      step4Title: s4Title,
      step5Title: s5PlayerTitle,
      passed
    });
  }

  console.log(`\n========================================`);
  console.log(`📊 FINAL TEST VERIFICATION SUMMARY`);
  console.log(`========================================`);
  console.table(results);

  const allPassed = results.every(r => r.passed);
  if (allPassed) {
    console.log(`\n🎉 ALL 5 DURATION TESTS PASSED WITH 100% ACCURACY!`);
  } else {
    console.error(`\n❌ SOME DURATION TESTS FAILED!`);
    process.exit(1);
  }

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
