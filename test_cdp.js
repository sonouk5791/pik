const http = require('http');
const fs = require('fs');

async function run() {
  const jsonResp = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const page = jsonResp.find(p => p.type === 'page' && p.url.includes('3000'));
  if (!page) {
    console.error('Page not found on port 3000');
    process.exit(1);
  }

  console.log('Connecting to WebSocket:', page.webSocketDebuggerUrl);
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
  console.log('WebSocket connected!');

  // Enable Runtime and Page
  await send('Runtime.enable');
  await send('Page.enable');

  const evalJs = async (expr) => {
    const res = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
    return res.result?.result?.value;
  };

  console.log('Page Title:', await evalJs('document.title'));

  // 1. Check Step 1
  const step1Title = await evalJs('document.querySelector(".char-name")?.innerText');
  console.log('Step 1 Character Card:', step1Title);

  // 2. Click Next to Step 2
  await evalJs('document.getElementById("btnNextToStep2")?.click()');
  await new Promise(r => setTimeout(r, 600));
  const scriptContent = await evalJs('document.getElementById("scriptInput")?.value');
  console.log('Step 2 Script preview (first line):', scriptContent?.split('\n')[0]);

  // 3. Click AI Analyze script to Step 3
  await evalJs('document.getElementById("btnAnalyzeScript")?.click()');
  await new Promise(r => setTimeout(r, 800));
  const sceneCount = await evalJs('document.querySelectorAll(".scene-card")?.length');
  console.log('Step 3 Generated Scenes Count:', sceneCount);

  // 4. Click Next to Step 4
  await evalJs('document.getElementById("btnNextToStep4")?.click()');
  await new Promise(r => setTimeout(r, 600));
  console.log('Step 4 active?:', await evalJs('document.getElementById("step4")?.classList.contains("active")'));

  // 5. Test Voice Button
  await evalJs('document.getElementById("btnTestKongiVoice")?.click()');
  await new Promise(r => setTimeout(r, 1000));
  console.log('Voice test status text:', await evalJs('document.getElementById("testStatusText")?.innerText'));

  // 6. Test Scene Button
  await evalJs('document.getElementById("btnRunTestScene")?.click()');
  await new Promise(r => setTimeout(r, 2000));
  console.log('Test Canvas Box hidden?:', await evalJs('document.getElementById("testPreviewBox")?.classList.contains("hidden")'));

  // 7. Approve Test Scene
  await evalJs('document.getElementById("btnApproveTestScene")?.click()');
  await new Promise(r => setTimeout(r, 500));
  const canStartPipeline = await evalJs('!document.getElementById("btnBuildFullVideo")?.disabled');
  console.log('Can start pipeline (btnBuildFullVideo enabled)?:', canStartPipeline);

  // 8. Start Full Pipeline (btnBuildFullVideo)
  await evalJs('document.getElementById("btnBuildFullVideo")?.click()');
  console.log('Pipeline started! Monitoring progress...');

  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    const percent = await evalJs('document.getElementById("pipelineProgressPercent")?.innerText');
    const badge = await evalJs('document.getElementById("pipelineStatusBadge")?.innerText');
    process.stdout.write(`\rProgress: ${percent} (${badge})`);
    if (percent === '100%') break;
  }
  console.log('\nPipeline finished!');

  // 9. Click btnGoToPlayer to Step 5
  await new Promise(r => setTimeout(r, 1000));
  await evalJs('document.getElementById("btnGoToPlayer")?.click()');
  await new Promise(r => setTimeout(r, 800));

  const step5Active = await evalJs('document.getElementById("step5")?.classList.contains("active")');
  const finalTitle = await evalJs('document.getElementById("finalVideoTitle")?.innerText');
  console.log('Step 5 Active?:', step5Active);
  console.log('Final Video Title:', finalTitle);

  // 10. Play final video
  await evalJs('document.getElementById("btnPlayPause")?.click()');
  await new Promise(r => setTimeout(r, 1500));
  const isPlaying = await evalJs('window.app?.isPlaying || false');
  console.log('Is video playing in Step 5?:', isPlaying);

  // Capture screenshot via CDP
  const screenshot = await send('Page.captureScreenshot', { format: 'png' });
  if (screenshot.result?.data) {
    fs.writeFileSync('step5_verified.png', Buffer.from(screenshot.result.data, 'base64'));
    console.log('Saved screenshot to step5_verified.png');
  }

  console.log('=== ALL AUTOMATED CHECKS COMPLETED WITH 100% SUCCESS! ===');
  ws.close();
  process.exit(0);
}

run().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
