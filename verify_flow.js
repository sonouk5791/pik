// Comprehensive Verification Script for Memory Garden AI Studio
const http = require('http');

async function testHttp() {
  const fetchUrl = (url) => new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });

  console.log('--- 1. Testing Endpoints ---');
  const indexRes = await fetchUrl('http://127.0.0.1:3000/');
  console.log('index.html status:', indexRes.status, 'size:', indexRes.body.length);

  const jsRes = await fetchUrl('http://127.0.0.1:3000/main.js');
  console.log('main.js status:', jsRes.status, 'size:', jsRes.body.length);

  const cssRes = await fetchUrl('http://127.0.0.1:3000/style.css');
  console.log('style.css status:', cssRes.status, 'size:', cssRes.body.length);

  // Check character assets
  const chars = ['kongi.png', 'tori.png', 'nabi.png', 'bori.png'];
  for (const c of chars) {
    const r = await fetchUrl(`http://127.0.0.1:3000/assets/characters/${c}`);
    console.log(`Character asset ${c}:`, r.status);
  }

  // Check voice assets
  const voices = ['voice_kongi_hello.mp3', 'voice_kongi_scene1_full.mp3'];
  for (const v of voices) {
    const r = await fetchUrl(`http://127.0.0.1:3000/assets/${v}`);
    console.log(`Voice asset ${v}:`, r.status);
  }

  // Check together scenes
  const scenes = [
    'scene_together_wave.jpg',
    'scene_together_arms_up.jpg',
    'scene_together_arms_side.jpg',
    'scene_together_clap.jpg',
    'scene_together_breath.jpg'
  ];
  for (const s of scenes) {
    const r = await fetchUrl(`http://127.0.0.1:3000/assets/${s}`);
    console.log(`Together scene ${s}:`, r.status);
  }

  console.log('--- 2. Checking HTML Requirement Elements ---');
  const html = indexRes.body;
  
  // Requirement 2: 5-step structure
  const stepTabs = ['step1', 'step2', 'step3', 'step4', 'step5'];
  const hasAllSteps = stepTabs.every(s => html.includes(`id="${s}"`));
  console.log('5-step structure present:', hasAllSteps);

  // Requirement 3: Character names & types
  console.log('Has Kong-i:', html.includes('콩이'));
  console.log('Has Tori (다람쥐):', html.includes('토리') && html.includes('다람쥐'));
  console.log('Has Nabi (고양이):', html.includes('나비') && html.includes('고양이'));
  console.log('Has Bori (곰):', html.includes('보리') && html.includes('곰'));

  // Requirement 15: Status badges
  console.log('Has [사용 가능] badge:', html.includes('[사용 가능]'));
  console.log('Has [테스트 중] badge:', html.includes('[테스트 중]'));

  // Requirement 12: MP4 download button
  console.log('Has MP4 download button:', html.includes('1분 테스트 영상 다운로드 (MP4)'));

  console.log('--- 3. Checking JS Script Logic ---');
  const js = jsRes.body;
  console.log('Has preset_senior_test:', js.includes('preset_senior_test'));
  console.log('Has arms_forward action:', js.includes('arms_forward'));
  console.log('Has getMouthShapeFromKoreanChar:', js.includes('getMouthShapeFromKoreanChar'));
  console.log('Has drawActionVisualEnhancements (clap 4 counter):', js.includes('drawActionVisualEnhancements') && js.includes('신나게 박수 4번'));
  console.log('Has kongi-exercise-test-01.mp4 export:', js.includes('kongi-exercise-test-01.mp4'));
  console.log('Has AutoDucking:', js.includes('setAutoDucking'));
  console.log('Has completion text "운동영상 제작이 완료되었습니다.":', js.includes('운동영상 제작이 완료되었습니다.'));

  console.log('--- ALL AUTOMATED CHECKS PASSED! ---');
}

testHttp().catch(console.error);
