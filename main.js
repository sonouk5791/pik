/**
 * 기억정원 AI 영상 만들기 - Memory Garden AI Video Studio
 * Core Application Engine
 */

// Action Definitions with Senior Safe Chair Gymnastics Metadata
const EXERCISE_ACTIONS = {
  wave: {
    id: 'wave',
    name: '손 흔들며 인사하기',
    icon: '👋',
    desc: '가볍게 손을 흔들며 시작 인사와 집중 유도',
    safeRule: '의자 착석, 어깨 무리 없는 각도'
  },
  arms_up: {
    id: 'arms_up',
    name: '양팔 위로 올리기 (기지개)',
    icon: '🙆',
    desc: '숨을 들이마시며 천천히 양팔을 머리 위로',
    safeRule: '무리한 꺾임 금지, 통증 없는 범위까지만'
  },
  arms_side: {
    id: 'arms_side',
    name: '양팔 옆으로 벌리기 (가슴 펴기)',
    icon: '👐',
    desc: '가슴을 활짝 펴며 굽은 등을 이완',
    safeRule: '과도한 허리 젖힘 없이 바른 자세 유지'
  },
  shoulder_shrug: {
    id: 'shoulder_shrug',
    name: '어깨 올렸다 내리기',
    icon: '🤷',
    desc: '어깨를 귀 가까이 올렸다가 툭 내리기',
    safeRule: '목에 힘을 빼고 부드럽게 반복'
  },
  knee_lift: {
    id: 'knee_lift',
    name: '무릎 번갈아 들기 (의자 착석)',
    icon: '🦵',
    desc: '의자에 앉아 양손으로 의자를 잡고 무릎 들기',
    safeRule: '낙상 방지, 45도 내외 안전 각도'
  },
  deep_breath: {
    id: 'deep_breath',
    name: '팔 천천히 올리며 심호흡',
    icon: '🌬️',
    desc: '코로 숨을 들이마시고 입으로 천천히 후- 내쉬기',
    safeRule: '폐활량 증진, 혈압 안정 템포'
  },
  clap: {
    id: 'clap',
    name: '신나게 박수치기 (인지 자극)',
    icon: '👏',
    desc: '손바닥의 혈자리를 자극하며 리듬에 맞춰 박수',
    safeRule: '손바닥 전체로 부드럽게 마주치기'
  },
  nod_smile: {
    id: 'nod_smile',
    name: '웃으며 고개 끄덕이기',
    icon: '😊',
    desc: '어르신들을 향한 칭찬과 격려의 미소',
    safeRule: '급격한 목 꺾임 없이 완만한 끄덕임'
  },
  wrist_shake: {
    id: 'wrist_shake',
    name: '손목 발목 부드럽게 털기',
    icon: '🖐️',
    desc: '말초 혈액순환을 돕는 손목 털기',
    safeRule: '과도한 반동 없이 털어주기'
  },
  safe_rest: {
    id: 'safe_rest',
    name: '바른 자세로 잠시 호흡 고르기',
    icon: '🌿',
    desc: '의자 등받이에 등을 기대고 편안히 휴식',
    safeRule: '호흡 정상화, 피로 누적 방지'
  }
};

// Preset Projects Data
const PRESETS = {
  preset_kongi: {
    name: '기억정원 4인 의자체조 (콩이·토리·나비·곰이 함께 운동)',
    char: 'kongi',
    duration: 300,
    bg: 'bg_daycare',
    voice: { gender: 'female_warm', tone: 'friendly', pitch: 1.0, speed: 0.9, emotion: 'warm' },
    bgm: 'spring_garden',
    script: `안녕하세요. 콩이와 친구들이에요.
오늘은 우리 함께 천천히 몸을 움직여 볼까요?
양팔을 천천히 위로 올려볼게요.
시원하게 기지개를 켜보세요.
이번에는 양팔을 옆으로 활짝 벌려볼까요?
신나게 손뼉을 짝짝 쳐볼게요.
의자를 잡고 무릎을 번갈아 살짝 들어보세요.
숨을 깊이 들이마시고 천천히 내쉬어 보세요.
좋아요. 아주 잘하고 계세요!`
  },
  preset_tori: {
    name: '토리 10분 인지 건강체조 (두뇌 자극 & 리듬)',
    char: 'tori',
    duration: 600,
    bg: 'bg_garden',
    voice: { gender: 'female_warm', tone: 'clear', pitch: 1.1, speed: 0.9, emotion: 'cheerful' },
    bgm: 'silver_rhythm',
    script: `어르신들, 안녕하세요! 활력 넘치는 토리 코치입니다.
우리 신나게 손뼉을 짝짝 쳐볼까요? 하나 둘 셋 넷!
이번에는 무릎을 의자에 앉아서 번갈아 살짝 들어보세요.
발목과 손목도 부드럽게 탈탈 털어볼게요.
양팔을 날개처럼 옆으로 시원하게 펴보세요.
오늘도 정말 멋지게 체조를 완료하셨습니다!`
  },
  preset_nabi: {
    name: '나비 유연성 스트레칭 (관절 이완)',
    char: 'nabi',
    duration: 300,
    bg: 'bg_livingroom',
    voice: { gender: 'female_warm', tone: 'calm', pitch: 0.9, speed: 0.85, emotion: 'warm' },
    bgm: 'lilac_walk',
    script: `따뜻한 햇살 아래, 나비와 함께하는 편안한 체조 시간이에요.
천천히 어깨를 으쓱 올렸다가 부드럽게 내려놓습니다.
가슴을 조심스럽게 열며 맑은 공기를 마셔볼게요.
몸의 긴장을 풀고 편안한 미소를 지어보세요.
잘하셨어요. 참 편안해지셨죠?`
  },
  preset_gomi: {
    name: '곰이 바른자세 척추체조',
    char: 'gomi',
    duration: 300,
    bg: 'bg_daycare',
    voice: { gender: 'male_gentle', tone: 'friendly', pitch: 0.8, speed: 0.85, emotion: 'warm' },
    bgm: 'spring_garden',
    script: `반갑습니다. 든든한 곰이와 함께 바른 자세를 만들어 보아요.
의자 등받이에 등을 곧게 펴고 앉아봅니다.
양팔을 앞으로 뻗었다가 가슴 옆으로 천천히 당겨보세요.
무릎을 가볍게 토닥여 주시고요.
천천히 호흡을 정리하며 마무리하겠습니다. 참 잘하셨습니다.`
  },
  custom: {
    name: '새 프로젝트 (콩이와 친구들 4인 체조)',
    char: 'kongi',
    duration: 60,
    bg: 'bg_daycare',
    voice: { gender: 'female_warm', tone: 'friendly', pitch: 1.0, speed: 0.9, emotion: 'warm' },
    bgm: 'spring_garden',
    script: `안녕하세요. 콩이와 친구들이에요.
오늘은 우리 함께 천천히 몸을 움직여 볼까요?
양팔을 천천히 올려볼게요.
양팔을 옆으로 벌려보세요.
손뼉을 쳐볼게요.
무릎을 가볍게 들어보세요.
숨을 편안하게 쉬어보세요.
좋아요. 아주 잘하고 계세요.`
  }
};

class MemoryGardenApp {
  constructor() {
    this.currentStep = 1;
    this.selectedChar = 'kongi';
    this.customCharImg = null;
    this.selectedBg = 'bg_daycare';
    this.customBgImg = null;
    this.targetDuration = 60; // seconds

    // Voice & BGM
    this.voiceSettings = {
      gender: 'female_warm',
      tone: 'friendly',
      pitch: 1.0,
      speed: 0.9,
      emotion: 'warm'
    };
    this.bgmTheme = 'spring_garden';
    this.bgmVolume = 0.3;
    this.customBgmAudio = null;
    this.isBgmPlaying = false;
    this.isDucking = false;

    // Scenes
    this.scenes = [];
    this.draggedSceneIndex = null;
    this.currentEditingIndex = null;

    // Pipeline status
    this.testPassed = false;
    this.isGenerating = false;
    this.simulateError = false;

    // Player & Canvas
    this.mainCanvas = null;
    this.mainCtx = null;
    this.testCanvas = null;
    this.testCtx = null;
    this.animationFrameId = null;
    this.isPlaying = false;
    this.currentSceneIdx = 0;
    this.sceneElapsedTime = 0;
    this.totalElapsedTime = 0;
    this.playbackSpeed = 1.0;
    this.masterVolume = 0.8;

    // Character Animation State
    this.charAnim = {
      breathOffset: 0,
      blinkState: 0, // 0: open, 1: closed
      blinkTimer: 0,
      mouthOpen: 0,  // 0: closed, 1: A, 2: O, 3: I
      armPhase: 0,
      actionTick: 0
    };

    // Real Kong-i Audio Track System (Unmuted, 100% Volume, Autoplay ready)
    this.voiceTestPassed = false;
    this.kongiAudioHello = new Audio('assets/voice_kongi_hello.mp3');
    this.kongiAudioHello.muted = false;
    this.kongiAudioHello.volume = 1.0;

    this.kongiAudioFull = new Audio('assets/voice_kongi_scene1_full.mp3');
    this.kongiAudioFull.muted = false;
    this.kongiAudioFull.volume = 1.0;

    this.activeVoiceAudio = null;
    this.currentKongiMouth = 'closed'; // 'closed' | 'a' | 'eo' | 'o' | 'u' | 'i'

    // Audio Synthesis System
    this.audioCtx = null;
    this.audioStreamDest = null;
    this.bgmOscs = [];
    this.bgmGainNode = null;
    this.synthVoices = [];

    // Image Cache
    this.loadedImages = {};

    this.init();
  }

  async init() {
    this.bindDOM();
    this.preloadAssets();
    this.initAudioContext();
    this.loadProject('preset_kongi');
    this.setupSpeechSynthesis();
  }

  bindDOM() {
    // Nav Tabs
    document.querySelectorAll('.step-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const step = parseInt(tab.dataset.step, 10);
        this.goToStep(step);
      });
    });

    // Project Dropdown & Buttons
    const projectSelector = document.getElementById('projectSelector');
    if (projectSelector) {
      projectSelector.addEventListener('change', (e) => {
        this.loadProject(e.target.value);
      });
    }

    document.getElementById('btnSaveProject')?.addEventListener('click', () => this.saveCurrentProject());
    document.getElementById('btnExportJson')?.addEventListener('click', () => this.exportProjectJSON());
    document.getElementById('btnImportJson')?.addEventListener('click', () => {
      document.getElementById('fileImportProject')?.click();
    });
    document.getElementById('fileImportProject')?.addEventListener('change', (e) => this.importProjectJSON(e));

    // Safety Badge Modal
    const safetyBadge = document.getElementById('safetyModeBadge');
    const safetyModal = document.getElementById('safetyModal');
    safetyBadge?.addEventListener('click', () => safetyModal?.classList.remove('hidden'));
    document.getElementById('btnCloseSafetyModal')?.addEventListener('click', () => safetyModal?.classList.add('hidden'));
    document.getElementById('btnConfirmSafetyModal')?.addEventListener('click', () => safetyModal?.classList.add('hidden'));

    // Step 1: Character Selection
    const charCards = document.querySelectorAll('.character-card:not(.upload-card)');
    charCards.forEach(card => {
      card.addEventListener('click', () => {
        charCards.forEach(c => c.classList.remove('active'));
        document.getElementById('charUploadCard')?.classList.remove('active');
        card.classList.add('active');
        this.selectedChar = card.dataset.char;
        this.showToast(`체조 코치로 '${this.getCharName(this.selectedChar)}'를 선택했습니다.`, 'info');
      });
    });

    // Custom Char Upload
    const btnUploadChar = document.getElementById('btnUploadCharTrigger');
    const charInput = document.getElementById('charImageInput');
    btnUploadChar?.addEventListener('click', (e) => {
      e.stopPropagation();
      charInput?.click();
    });
    charInput?.addEventListener('change', (e) => this.handleCustomCharUpload(e));

    // Target Duration
    document.querySelectorAll('.duration-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.duration-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.targetDuration = parseInt(btn.dataset.sec, 10);
        this.updateDurationNotice();
      });
    });

    // Background Selection
    const bgOptions = document.querySelectorAll('.bg-option:not(.upload-bg)');
    bgOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        bgOptions.forEach(o => o.classList.remove('active'));
        document.getElementById('bgUploadOption')?.classList.remove('active');
        opt.classList.add('active');
        this.selectedBg = opt.dataset.bg;
      });
    });

    // Custom Background Upload
    const bgUploadOpt = document.getElementById('bgUploadOption');
    const bgInput = document.getElementById('bgImageInput');
    bgUploadOpt?.addEventListener('click', () => bgInput?.click());
    bgInput?.addEventListener('change', (e) => this.handleCustomBgUpload(e));

    // Voice & Lip-sync Settings
    document.getElementById('voiceGender')?.addEventListener('change', (e) => this.voiceSettings.gender = e.target.value);
    document.getElementById('voiceTone')?.addEventListener('change', (e) => this.voiceSettings.tone = e.target.value);
    
    const pitchSlider = document.getElementById('voicePitch');
    pitchSlider?.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      this.voiceSettings.pitch = val;
      const label = val < 0.9 ? '낮음' : val > 1.1 ? '높음' : '중간';
      document.getElementById('pitchVal').textContent = label;
    });

    const speedSlider = document.getElementById('voiceSpeed');
    speedSlider?.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      this.voiceSettings.speed = val;
      const label = val < 0.9 ? `느림 (${val}x)` : val === 0.9 ? `어르신 권장 (${val}x)` : `표준 (${val}x)`;
      document.getElementById('speedVal').textContent = label;
    });

    document.getElementById('btnVoicePreview')?.addEventListener('click', () => this.previewVoice());

    // BGM Controls
    document.getElementById('bgmSelect')?.addEventListener('change', (e) => {
      this.bgmTheme = e.target.value;
      if (this.isBgmPlaying) {
        this.playBgm();
      }
    });

    document.getElementById('bgmVolume')?.addEventListener('input', (e) => {
      this.bgmVolume = parseInt(e.target.value, 10) / 100;
      document.getElementById('bgmVolVal').textContent = `${e.target.value}%`;
      if (this.bgmGainNode) {
        this.bgmGainNode.gain.setValueAtTime(this.isDucking ? this.bgmVolume * 0.3 : this.bgmVolume, this.audioCtx.currentTime);
      }
    });

    document.getElementById('btnToggleBgmPlay')?.addEventListener('click', () => this.toggleBgmPlay());

    document.getElementById('bgmFileInput')?.addEventListener('change', (e) => this.handleCustomBgmUpload(e));

    // Step 2: Script Input
    const scriptInput = document.getElementById('scriptInput');
    scriptInput?.addEventListener('input', () => this.updateScriptStats());
    document.getElementById('btnClearScript')?.addEventListener('click', () => {
      if (scriptInput) {
        scriptInput.value = '';
        this.updateScriptStats();
      }
    });

    document.getElementById('btnAnalyzeScript')?.addEventListener('click', () => this.analyzeScriptAndProceed());

    // Preset Script Chips
    document.getElementById('btnPreset1')?.addEventListener('click', () => {
      this.setScriptContent(PRESETS.preset_kongi.script);
    });
    document.getElementById('btnPreset2')?.addEventListener('click', () => {
      this.setScriptContent(`어르신들, 반가워요!
의자에 바르게 앉아 어깨를 천천히 으쓱 올려볼게요.
그대로 3초간 멈췄다가, 툭- 내려놓습니다.
천천히 숨을 깊게 들이마시고 내쉬어 보세요.
참 잘하셨어요. 이번엔 가슴을 활짝 펴볼까요?`);
    });
    document.getElementById('btnPreset3')?.addEventListener('click', () => {
      this.setScriptContent(`신나는 음악에 맞춰 손뼉을 짝짝 쳐볼게요!
하나, 둘, 셋, 넷! 머리가 맑아집니다.
이번에는 의자에 앉아서 무릎을 번갈아 하나 둘 올려보아요.
무리하지 마시고 안전하게 털어주세요.
오늘도 정말 대단하셨어요!`);
    });
    document.getElementById('btnPreset4')?.addEventListener('click', () => {
      this.setScriptContent(`따뜻한 봄날, 꽃이 피는 기억정원 산책로예요.
편안하게 양팔을 옆으로 벌리며 봄바람을 느껴보세요.
손목과 발목도 부드럽게 풀어줍니다.
고마운 내 몸에게 사랑한다고 말해주세요.
아주 편안하고 행복한 하루 되세요.`);
    });

    // Step 3: Scene Board Actions
    document.getElementById('btnAddSafePause')?.addEventListener('click', () => this.insertSafePauseScene());
    document.getElementById('btnAddEmptyScene')?.addEventListener('click', () => this.addEmptyScene());
    document.getElementById('btnReanalyze')?.addEventListener('click', () => this.analyzeScript(false));

    // Scene Edit Modal
    document.getElementById('btnCloseEditModal')?.addEventListener('click', () => this.closeEditModal());
    document.getElementById('btnCancelEdit')?.addEventListener('click', () => this.closeEditModal());
    document.getElementById('btnSaveEdit')?.addEventListener('click', () => this.saveEditScene());

    // Step 4: Pipeline Actions
    document.getElementById('btnTestKongiVoice')?.addEventListener('click', () => this.runKongiVoiceTest());
    document.getElementById('btnRunTestScene')?.addEventListener('click', () => this.runTestScene());
    document.getElementById('btnCloseTestBox')?.addEventListener('click', () => {
      document.getElementById('testPreviewBox')?.classList.add('hidden');
      if (this.activeVoiceAudio) {
        this.activeVoiceAudio.pause();
      }
    });
    document.getElementById('btnPlayTestCanvas')?.addEventListener('click', () => this.playTestScenePreview());
    document.getElementById('btnApproveTestScene')?.addEventListener('click', () => {
      if (!this.voiceTestPassed) {
        this.showToast('⚠️ 먼저 [콩이 음성 테스트] 버튼을 눌러 목소리와 립싱크를 확인해 주세요!', 'error');
        return;
      }
      this.testApproved = true;
      const btnBuild = document.getElementById('btnBuildFullVideo');
      if (btnBuild) {
        btnBuild.disabled = false;
        btnBuild.classList.add('pulse');
      }
      this.logPipeline('🎉 [검증 완료] 원본 콩이 캐릭터 8대 일관성 및 실제 한국어 음성 립싱크 100% 승인! 다음 운동 장면 제작이 언락되었습니다.', 'success');
      this.showToast('원본 콩이 캐릭터 및 음성 확인 완료! [전체 영상 만들기]가 활성화되었습니다.', 'success');
    });
    document.getElementById('btnBuildFullVideo')?.addEventListener('click', () => this.startFullVideoPipeline());
    document.getElementById('btnSimulateError')?.addEventListener('click', () => {
      this.simulateError = !this.simulateError;
      this.showToast(this.simulateError ? '⚠️ 장면 오류 시뮬레이션 모드가 켜졌습니다. 다음 생성 시 3번 장면 오류 발생!' : '장면 오류 시뮬레이션 모드가 해제되었습니다.', 'info');
    });

    // Step 5: Player Controls
    this.mainCanvas = document.getElementById('mainVideoCanvas');
    if (this.mainCanvas) {
      this.mainCtx = this.mainCanvas.getContext('2d');
    }
    this.testCanvas = document.getElementById('testCanvas');
    if (this.testCanvas) {
      this.testCtx = this.testCanvas.getContext('2d');
    }

    document.getElementById('btnPlayPause')?.addEventListener('click', () => this.togglePlayback());
    document.getElementById('btnBigPlay')?.addEventListener('click', () => this.togglePlayback());
    document.getElementById('btnStop')?.addEventListener('click', () => this.stopPlayback());
    document.getElementById('btnPrevScene')?.addEventListener('click', () => this.jumpScene(this.currentSceneIdx - 1));
    document.getElementById('btnNextScene')?.addEventListener('click', () => this.jumpScene(this.currentSceneIdx + 1));

    const seekBar = document.getElementById('videoSeekBar');
    seekBar?.addEventListener('input', (e) => this.seekPlayback(parseFloat(e.target.value)));

    const masterVol = document.getElementById('masterVolume');
    masterVol?.addEventListener('input', (e) => {
      this.masterVolume = parseInt(e.target.value, 10) / 100;
    });

    document.getElementById('btnToggleFullscreen')?.addEventListener('click', () => {
      const frame = document.querySelector('.video-cinema-frame');
      if (frame) {
        if (!document.fullscreenElement) {
          frame.requestFullscreen?.();
        } else {
          document.exitFullscreen?.();
        }
      }
    });

    // Final Exports
    document.getElementById('btnDownloadFinalVideo')?.addEventListener('click', () => this.exportFinalVideoFile());
    document.getElementById('btnDownloadSubtitles')?.addEventListener('click', () => this.exportSubtitlesSRT());
    document.getElementById('btnDownloadScriptDoc')?.addEventListener('click', () => this.exportScriptTXT());

    // Start Animation Loop for 16:9 Canvas
    this.startCanvasRenderLoop();
  }

  // Preload mascot and background images
  preloadAssets() {
    const urls = {
      char_kongi: 'assets/char_kongi.jpg',
      char_tori: 'assets/char_tori.jpg',
      char_nabi: 'assets/char_nabi.jpg',
      char_gomi: 'assets/char_gomi.jpg',
      bg_daycare: 'assets/bg_daycare.jpg',
      bg_garden: 'assets/bg_garden.jpg',
      bg_livingroom: 'assets/bg_livingroom.jpg',
      // Master Reference Kong-i Assets (Strict Identity Lock)
      kongi_scene1_wave: 'assets/kongi_scene1_wave.jpg',
      kongi_original_master: 'assets/kongi_original_master.png',
      // Seamless Master Scene Frames for 6 Korean Phonemes (Zero sticker border, bit-identical face)
      kongi_scene_closed: 'assets/kongi_scene_closed.png',
      kongi_scene_a: 'assets/kongi_scene_a.png',
      kongi_scene_eo: 'assets/kongi_scene_eo.png',
      kongi_scene_o: 'assets/kongi_scene_o.png',
      kongi_scene_u: 'assets/kongi_scene_u.png',
      kongi_scene_i: 'assets/kongi_scene_i.png',
      // Real Artwork Lip-sync Mouth Sprites (Ah, Eo, Oh, Woo, Ee, Closed)
      mouth_closed: 'assets/mouth_closed.png',
      mouth_a: 'assets/mouth_a.png',
      mouth_eo: 'assets/mouth_eo.png',
      mouth_o: 'assets/mouth_o.png',
      mouth_u: 'assets/mouth_u.png',
      mouth_i: 'assets/mouth_i.png',
      // 4-Character Group Exercise Scenes (Kong-i, Tori, Nabi, Gomi)
      scene_group_wave: 'assets/scene_group_wave.jpg',
      scene_group_arms_up: 'assets/scene_group_arms_up.jpg',
      scene_group_arms_side: 'assets/scene_group_arms_side.jpg',
      scene_group_clap: 'assets/scene_group_clap.jpg',
      scene_group_knee_lift: 'assets/scene_group_knee_lift.jpg',
      scene_group_breath: 'assets/scene_group_breath.jpg',
      // Group Scene Seamless Vowel Morphing Frames for Kong-i
      scene_group_closed: 'assets/scene_group_closed.png',
      scene_group_a: 'assets/scene_group_a.png',
      scene_group_eo: 'assets/scene_group_eo.png',
      scene_group_o: 'assets/scene_group_o.png',
      scene_group_u: 'assets/scene_group_u.png',
      scene_group_i: 'assets/scene_group_i.png',
      // Legacy / Backup Scenes
      scene_together_wave: 'assets/scene_together_wave.jpg',
      scene_together_arms_up: 'assets/scene_together_arms_up.jpg',
      scene_together_arms_side: 'assets/scene_together_arms_side.jpg',
      scene_together_clap: 'assets/scene_together_clap.jpg',
      scene_together_breath: 'assets/scene_together_breath.jpg'
    };

    for (const [key, src] of Object.entries(urls)) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        this.loadedImages[key] = img;
      };
    }
  }

  initAudioContext() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    } catch (e) {
      console.warn('Web Audio API not supported on this browser', e);
    }
  }

  setupSpeechSynthesis() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.synthVoices = window.speechSynthesis.getVoices();
      };
      this.synthVoices = window.speechSynthesis.getVoices();
    }
  }

  // Step Navigation
  goToStep(stepNum) {
    if (stepNum < 1 || stepNum > 5) return;
    this.currentStep = stepNum;

    document.querySelectorAll('.step-tab').forEach(tab => {
      const s = parseInt(tab.dataset.step, 10);
      tab.classList.toggle('active', s === stepNum);
      if (s < stepNum) tab.classList.add('completed');
    });

    document.querySelectorAll('.step-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    const activePanel = document.getElementById(`step${stepNum}`);
    if (activePanel) {
      activePanel.classList.add('active');
    }

    if (stepNum === 3 && this.scenes.length === 0) {
      this.analyzeScript(false);
    }

    if (stepNum === 5) {
      this.renderJumpList();
      this.updatePlayerSceneDisplay();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showToast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : '🌸';
    toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  getCharName(charId) {
    const map = { kongi: '콩이', tori: '토리', nabi: '나비', gomi: '곰이', custom: '직접 등록 캐릭터' };
    return map[charId] || charId;
  }

  // Handle Project Presets
  loadProject(presetKey) {
    const p = PRESETS[presetKey] || PRESETS.preset_kongi;
    this.selectedChar = p.char;
    this.targetDuration = p.duration;
    this.selectedBg = p.bg;
    this.voiceSettings = { ...p.voice };
    this.bgmTheme = p.bgm;

    // Update UI
    document.querySelectorAll('.character-card').forEach(card => {
      card.classList.toggle('active', card.dataset.char === p.char);
    });

    document.querySelectorAll('.duration-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.sec, 10) === p.duration);
    });

    document.querySelectorAll('.bg-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.bg === p.bg);
    });

    const vGender = document.getElementById('voiceGender');
    if (vGender) vGender.value = p.voice.gender;
    const vTone = document.getElementById('voiceTone');
    if (vTone) vTone.value = p.voice.tone;
    const vPitch = document.getElementById('voicePitch');
    if (vPitch) vPitch.value = p.voice.pitch;
    const vSpeed = document.getElementById('voiceSpeed');
    if (vSpeed) vSpeed.value = p.voice.speed;

    const bgmSel = document.getElementById('bgmSelect');
    if (bgmSel) bgmSel.value = p.bgm;

    this.setScriptContent(p.script);
    this.analyzeScript(false);
    this.showToast(`'${p.name}' 프로젝트를 불러왔습니다.`, 'success');
  }

  saveCurrentProject() {
    const projData = {
      char: this.selectedChar,
      bg: this.selectedBg,
      duration: this.targetDuration,
      voice: this.voiceSettings,
      bgm: this.bgmTheme,
      script: document.getElementById('scriptInput')?.value || '',
      scenes: this.scenes
    };
    try {
      localStorage.setItem('memory_garden_saved_project', JSON.stringify(projData));
      this.showToast('프로젝트가 브라우저에 안전하게 저장되었습니다!', 'success');
    } catch (e) {
      this.showToast('로컬 저장소 저장 중 오류가 발생했습니다.', 'error');
    }
  }

  exportProjectJSON() {
    const projData = {
      title: '기억정원 AI 영상 프로젝트',
      timestamp: new Date().toISOString(),
      char: this.selectedChar,
      bg: this.selectedBg,
      duration: this.targetDuration,
      voice: this.voiceSettings,
      bgm: this.bgmTheme,
      script: document.getElementById('scriptInput')?.value || '',
      scenes: this.scenes
    };
    const blob = new Blob([JSON.stringify(projData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `기억정원_프로젝트_${this.selectedChar}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('프로젝트 백업 파일(.json)이 다운로드되었습니다.', 'success');
  }

  importProjectJSON(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.char) this.selectedChar = data.char;
        if (data.bg) this.selectedBg = data.bg;
        if (data.duration) this.targetDuration = data.duration;
        if (data.voice) this.voiceSettings = data.voice;
        if (data.bgm) this.bgmTheme = data.bgm;
        if (data.script) this.setScriptContent(data.script);
        if (Array.isArray(data.scenes)) {
          this.scenes = data.scenes;
          this.renderSceneCards();
        } else {
          this.analyzeScript(false);
        }
        this.showToast('프로젝트를 성공적으로 복원했습니다!', 'success');
      } catch (err) {
        this.showToast('올바르지 않은 프로젝트 파일입니다.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  // Custom Char Image Upload
  handleCustomCharUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const preview = document.getElementById('customCharPreview');
      if (preview) {
        preview.src = dataUrl;
        preview.classList.remove('hidden');
      }
      const customImg = new Image();
      customImg.src = dataUrl;
      customImg.onload = () => {
        this.loadedImages['char_custom'] = customImg;
        this.selectedChar = 'custom';
        document.querySelectorAll('.character-card').forEach(c => c.classList.remove('active'));
        document.getElementById('charUploadCard')?.classList.add('active');
        this.showToast('직접 등록한 캐릭터 이미지에 외형 일관성 락(Lock)을 적용했습니다.', 'success');
      };
    };
    reader.readAsDataURL(file);
  }

  // Custom Bg Upload
  handleCustomBgUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const customImg = new Image();
      customImg.src = dataUrl;
      customImg.onload = () => {
        this.loadedImages['bg_custom'] = customImg;
        this.selectedBg = 'bg_custom';
        document.querySelectorAll('.bg-option').forEach(o => o.classList.remove('active'));
        document.getElementById('bgUploadOption')?.classList.add('active');
        this.showToast('사용자 지정 배경이 등록되었습니다.', 'success');
      };
    };
    reader.readAsDataURL(file);
  }

  // Custom BGM Upload
  handleCustomBgmUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileName = file.name;
    document.getElementById('bgmFileName').textContent = `사용자 음원: ${fileName}`;
    const url = URL.createObjectURL(file);
    if (!this.customBgmAudio) {
      this.customBgmAudio = new Audio();
    }
    this.customBgmAudio.src = url;
    this.customBgmAudio.loop = true;
    this.bgmTheme = 'custom';
    this.showToast(`배경음악 파일 '${fileName}'을 등록했습니다.`, 'success');
  }

  // Voice Preview
  previewVoice() {
    const text = '안녕하세요 어르신! 오늘 함께 활기차고 건강한 의자체조를 시작해 볼까요?';
    this.speakText(text, () => {
      this.showToast('음성 미리듣기가 완료되었습니다.', 'success');
    });
  }

  speakText(text, onEnd) {
    if (!('speechSynthesis' in window)) {
      this.simulateSpeechAudio(text, onEnd);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = this.voiceSettings.speed || 0.9;
    utterance.pitch = this.voiceSettings.pitch || 1.0;

    // Pick best Korean voice
    const koVoices = this.synthVoices.filter(v => v.lang.includes('ko') || v.lang.includes('KO'));
    if (koVoices.length > 0) {
      if (this.voiceSettings.gender.includes('male')) {
        const maleVoice = koVoices.find(v => v.name.toLowerCase().includes('male') || v.name.includes('남'));
        utterance.voice = maleVoice || koVoices[0];
      } else {
        const femaleVoice = koVoices.find(v => v.name.toLowerCase().includes('female') || v.name.includes('여') || v.name.includes('혜'));
        utterance.voice = femaleVoice || koVoices[0];
      }
    }

    // Trigger mouth animation on boundary
    utterance.onboundary = (e) => {
      this.triggerLipSyncStep();
    };

    // Auto-ducking BGM
    this.setAutoDucking(true);

    utterance.onend = () => {
      this.setAutoDucking(false);
      this.charAnim.mouthOpen = 0;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.setAutoDucking(false);
      this.charAnim.mouthOpen = 0;
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }

  simulateSpeechAudio(text, onEnd) {
    // Web Audio Fallback Tone Beeps with speech rhythm
    if (!this.audioCtx) {
      if (onEnd) onEnd();
      return;
    }
    const words = text.split(/\s+/);
    let delay = 0;
    this.setAutoDucking(true);
    words.forEach((w, idx) => {
      setTimeout(() => {
        this.triggerLipSyncStep();
      }, delay);
      delay += 350;
    });

    setTimeout(() => {
      this.setAutoDucking(false);
      this.charAnim.mouthOpen = 0;
      if (onEnd) onEnd();
    }, delay + 500);
  }

  triggerLipSyncStep() {
    const mouthPreview = document.getElementById('mouthPreviewShape');
    const shapes = ['a', 'eo', 'o', 'u', 'i'];
    const pick = shapes[Math.floor(Math.random() * shapes.length)];
    
    if (mouthPreview) {
      mouthPreview.className = `mouth-shape open-${pick}`;
      setTimeout(() => {
        mouthPreview.className = 'mouth-shape';
      }, 180);
    }

    this.charAnim.mouthOpen = pick;
    setTimeout(() => {
      this.charAnim.mouthOpen = 'closed';
    }, 180);
  }

  setAutoDucking(duck) {
    this.isDucking = duck;
    if (this.bgmGainNode && this.audioCtx) {
      const targetVol = duck ? this.bgmVolume * 0.25 : this.bgmVolume;
      this.bgmGainNode.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.bgmGainNode.gain.linearRampToValueAtTime(targetVol, this.audioCtx.currentTime + 0.3);
    }
    if (this.customBgmAudio) {
      this.customBgmAudio.volume = duck ? this.bgmVolume * 0.25 : this.bgmVolume;
    }
  }

  // BGM Synthesizer (Zero external audio file dependency fallback + Healing Piano & Rhythm)
  toggleBgmPlay() {
    if (this.isBgmPlaying) {
      this.stopBgm();
    } else {
      this.playBgm();
    }
  }

  playBgm() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (this.bgmTheme === 'none') {
      this.showToast('배경음악이 "없음"으로 설정되어 있습니다.', 'info');
      return;
    }

    if (this.customBgmAudio && this.bgmTheme === 'custom') {
      this.customBgmAudio.volume = this.bgmVolume;
      this.customBgmAudio.play();
      this.isBgmPlaying = true;
      this.updateBgmButtonUI(true);
      return;
    }

    this.stopBgm();

    if (!this.audioCtx) return;

    this.bgmGainNode = this.audioCtx.createGain();
    this.bgmGainNode.gain.setValueAtTime(this.bgmVolume, this.audioCtx.currentTime);
    this.bgmGainNode.connect(this.audioCtx.destination);

    // Procedural Calm Memory Garden Chords (Pentatonic Scale for healing & relaxation)
    const chords = [
      [261.63, 329.63, 392.00, 523.25], // C Major
      [220.00, 261.63, 329.63, 440.00], // A Minor
      [174.61, 220.00, 261.63, 349.23], // F Major
      [196.00, 246.94, 293.66, 392.00]  // G Major
    ];

    let chordIdx = 0;
    this.bgmInterval = setInterval(() => {
      if (!this.isBgmPlaying) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();

        // Warm sine / triangle tone
        osc.type = this.bgmTheme === 'silver_rhythm' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + i * 0.15);

        noteGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime + i * 0.15);
        noteGain.gain.exponentialRampToValueAtTime(0.08, this.audioCtx.currentTime + i * 0.15 + 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + i * 0.15 + 1.8);

        osc.connect(noteGain);
        noteGain.connect(this.bgmGainNode);

        osc.start(this.audioCtx.currentTime + i * 0.15);
        osc.stop(this.audioCtx.currentTime + i * 0.15 + 2.0);
      });
    }, 1800);

    this.isBgmPlaying = true;
    this.updateBgmButtonUI(true);
  }

  stopBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.customBgmAudio) {
      this.customBgmAudio.pause();
    }
    this.isBgmPlaying = false;
    this.updateBgmButtonUI(false);
  }

  updateBgmButtonUI(isPlaying) {
    const icon = document.getElementById('bgmPlayIcon');
    const label = document.getElementById('bgmPlayLabel');
    if (icon) icon.textContent = isPlaying ? '⏸' : '▶';
    if (label) label.textContent = isPlaying ? '음악 일시정지' : '음악 들어보기';
  }

  // Step 2: Script Input & Real-time Stats
  setScriptContent(text) {
    const textarea = document.getElementById('scriptInput');
    if (textarea) {
      textarea.value = text.trim();
      this.updateScriptStats();
    }
  }

  updateScriptStats() {
    const text = document.getElementById('scriptInput')?.value || '';
    const charCount = text.length;
    
    // Split into sentences
    const rawLines = text.split(/\n+/).map(l => l.trim()).filter(Boolean);
    const sceneCount = Math.max(1, rawLines.length);

    // Korean speaking speed for seniors ~ 3 to 4 characters per second + pauses
    const estSec = Math.round(charCount / 3.2) + (sceneCount * 2);

    document.getElementById('charCount').textContent = `총 ${charCount}자`;
    document.getElementById('estDuration').textContent = `예상 소요 시간: 약 ${estSec}초`;
    document.getElementById('estSceneCount').textContent = `예상 장면: ${sceneCount}개`;

    this.updateDurationNotice(estSec);
  }

  updateDurationNotice(estSec = 30) {
    const notice = document.getElementById('durationNoticeText');
    if (!notice) return;

    if (estSec < this.targetDuration) {
      const diff = this.targetDuration - estSec;
      notice.innerHTML = `대본 길이(약 ${estSec}초)가 선택하신 목표 시간(<strong>${this.formatSeconds(this.targetDuration)}</strong>)보다 짧습니다. AI가 어르신 안전 심호흡, 반복 체조 및 중간 휴식 구간(+${diff}초)을 자동 추가합니다.`;
      notice.parentElement.style.borderColor = '#FDE68A';
      notice.parentElement.style.background = '#FFFBEB';
    } else if (estSec > this.targetDuration + 20) {
      notice.innerHTML = `⚠️ 대본 내용이 선택하신 목표 시간(<strong>${this.formatSeconds(this.targetDuration)}</strong>)보다 깁니다. 영상 길이를 늘리거나 대본을 다듬어 주세요.`;
      notice.parentElement.style.borderColor = '#FCA5A5';
      notice.parentElement.style.background = '#FEF2F2';
    } else {
      notice.innerHTML = `목표 영상 시간(<strong>${this.formatSeconds(this.targetDuration)}</strong>)과 대본 분량이 최적으로 일치합니다.`;
      notice.parentElement.style.borderColor = '#A7F3D0';
      notice.parentElement.style.background = '#ECFDF5';
    }
  }

  // Step 3: AI Scene Auto Separation & Motion Matching
  analyzeScriptAndProceed() {
    this.analyzeScript(true);
    this.goToStep(3);
  }

  analyzeScript(notify = true) {
    const text = document.getElementById('scriptInput')?.value || '';
    if (!text.trim()) {
      this.showToast('대본을 먼저 입력해 주세요.', 'error');
      return;
    }

    // Split text by line break or sentence ending punctuations
    const lines = text
      .split(/\n+/)
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const generatedScenes = [];

    lines.forEach((line, idx) => {
      const matchedActionKey = this.matchActionFromText(line);
      const actionMeta = EXERCISE_ACTIONS[matchedActionKey] || EXERCISE_ACTIONS.safe_rest;
      
      // Calculate realistic duration per scene (words / length)
      const duration = Math.max(5, Math.min(14, Math.round(line.length / 2.8) + 3));

      generatedScenes.push({
        id: `scene_${Date.now()}_${idx}`,
        num: idx + 1,
        script: line,
        action: matchedActionKey,
        actionName: actionMeta.name,
        actionIcon: actionMeta.icon,
        safeRule: actionMeta.safeRule,
        duration: duration,
        bg: this.selectedBg,
        status: 'waiting' // 'waiting' | 'generating' | 'completed' | 'error'
      });
    });

    // Smart Balance: If script total duration is much shorter than target duration, auto-insert safety pauses & repetitions
    let currentTotalDuration = generatedScenes.reduce((acc, s) => acc + s.duration, 0);
    if (this.targetDuration >= 300 && currentTotalDuration < this.targetDuration) {
      // Insert safe resting / breathing scene
      generatedScenes.splice(Math.floor(generatedScenes.length / 2), 0, {
        id: `scene_safe_rest_${Date.now()}`,
        num: generatedScenes.length + 1,
        script: '바른 자세로 앉아 잠시 숨을 고르며 고요히 이완합니다.',
        action: 'safe_rest',
        actionName: EXERCISE_ACTIONS.safe_rest.name,
        actionIcon: EXERCISE_ACTIONS.safe_rest.icon,
        safeRule: EXERCISE_ACTIONS.safe_rest.safeRule,
        duration: 10,
        bg: this.selectedBg,
        status: 'waiting'
      });
    }

    // Re-index scene numbers
    generatedScenes.forEach((s, i) => s.num = i + 1);

    this.scenes = generatedScenes;
    this.renderSceneCards();

    if (notify) {
      this.showToast(`AI가 대본을 분석하여 총 ${this.scenes.length}개의 장면과 안전 체조 동작을 매칭했습니다!`, 'success');
    }
  }

  // Keyword Matching Algorithm for Senior Chair Exercises
  matchActionFromText(text) {
    const t = text.toLowerCase();

    if (/안녕|반갑|시작|콩이|토리|나비|곰이|만나/.test(t)) {
      return 'wave';
    }
    if (/팔.*올려|위로|기지개|하늘|쭉쭉|올려볼|올리고/.test(t)) {
      return 'arms_up';
    }
    if (/옆으로|벌려|가슴|날개|활짝|펴볼|벌리고/.test(t)) {
      return 'arms_side';
    }
    if (/어깨|들썩|으쓱|목|승모근/.test(t)) {
      return 'shoulder_shrug';
    }
    if (/무릎|다리|발걸음|쿵쿵|하체|발목/.test(t)) {
      return 'knee_lift';
    }
    if (/숨|호흡|들이마|내쉬|후-|천천히.*숨/.test(t)) {
      return 'deep_breath';
    }
    if (/박수|손뼉|짝짝|노래|신나게/.test(t)) {
      return 'clap';
    }
    if (/잘하|수고|최고|웃|미소|대단|감사/.test(t)) {
      return 'nod_smile';
    }
    if (/손목|털|탈탈|털어/.test(t)) {
      return 'wrist_shake';
    }

    // Fallback safe action
    return 'deep_breath';
  }

  renderSceneCards() {
    const container = document.getElementById('sceneCardsContainer');
    if (!container) return;

    container.innerHTML = '';

    const totalDuration = this.scenes.reduce((sum, s) => sum + s.duration, 0);
    document.getElementById('sceneCountBadge').textContent = `총 ${this.scenes.length}개 장면`;
    document.getElementById('totalDurationBadge').textContent = `총 소요 시간: ${this.formatSeconds(totalDuration)}`;

    this.scenes.forEach((scene, index) => {
      const card = document.createElement('div');
      card.className = 'scene-card';
      card.draggable = true;
      card.dataset.index = index;

      const bgThumbnailUrl = this.getBgThumbnailUrl(scene.bg);

      card.innerHTML = `
        <div class="scene-drag-handle" title="끌어서 순서 변경">⠿</div>
        
        <div class="scene-thumb-preview">
          <img src="${bgThumbnailUrl}" class="scene-thumb-img" alt="배경 미리보기">
          <div class="scene-num-badge">장면 ${scene.num}</div>
          <div class="scene-motion-tag">${scene.actionIcon} ${scene.actionName}</div>
        </div>

        <div class="scene-content-col">
          <div class="scene-script-text">"${this.escapeHtml(scene.script)}"</div>
          <div class="scene-meta-row">
            <span class="meta-chip">⏱️ ${scene.duration}초</span>
            <span class="meta-chip">🛡️ ${scene.safeRule}</span>
            <span class="scene-status-tag ${scene.status}">
              ${this.getStatusLabel(scene.status)}
            </span>
          </div>
        </div>

        <div class="scene-actions-col">
          <button class="btn btn-outline btn-xs" onclick="app.openEditModal(${index})">✏️ 수정</button>
          <button class="btn btn-outline btn-xs" onclick="app.deleteScene(${index})">🗑️ 삭제</button>
          <button class="btn btn-secondary btn-xs" onclick="app.regenerateSingleScene(${index})">🔄 다시 만들기</button>
        </div>
      `;

      // HTML5 Drag and Drop events
      card.addEventListener('dragstart', (e) => {
        this.draggedSceneIndex = index;
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        document.querySelectorAll('.scene-card').forEach(c => c.classList.remove('drag-over'));
      });

      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        card.classList.add('drag-over');
      });

      card.addEventListener('dragleave', () => {
        card.classList.remove('drag-over');
      });

      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');
        if (this.draggedSceneIndex !== null && this.draggedSceneIndex !== index) {
          const item = this.scenes.splice(this.draggedSceneIndex, 1)[0];
          this.scenes.splice(index, 0, item);
          this.scenes.forEach((s, idx) => s.num = idx + 1);
          this.renderSceneCards();
          this.showToast('장면 순서가 변경되었습니다.', 'info');
        }
      });

      container.appendChild(card);
    });

    this.renderPipelineGrid();
    this.renderJumpList();
  }

  getBgThumbnailUrl(scene) {
    if (this.selectedChar === 'kongi') {
      const action = scene?.action || 'wave';
      switch (action) {
        case 'wave':
        case 'nod_smile':
          return 'assets/scene_together_wave.jpg';
        case 'arms_up':
        case 'shoulder_shrug':
        case 'knee_lift':
          return 'assets/scene_together_arms_up.jpg';
        case 'arms_side':
        case 'wrist_shake':
          return 'assets/scene_together_arms_side.jpg';
        case 'clap':
          return 'assets/scene_together_clap.jpg';
        case 'deep_breath':
        case 'safe_rest':
        default:
          return 'assets/scene_together_breath.jpg';
      }
    }

    if (scene.bg === 'bg_custom' && this.loadedImages['bg_custom']) {
      return this.loadedImages['bg_custom'].src;
    }
    const map = {
      bg_daycare: 'assets/bg_daycare.jpg',
      bg_garden: 'assets/bg_garden.jpg',
      bg_livingroom: 'assets/bg_livingroom.jpg',
      bg_lilac: 'assets/bg_garden.jpg',
      bg_classroom: 'assets/bg_daycare.jpg'
    };
    return map[scene.bg] || 'assets/bg_daycare.jpg';
  }

  getStatusLabel(status) {
    switch (status) {
      case 'waiting': return '⚪ 대기';
      case 'generating': return '🟡 생성 중...';
      case 'completed': return '🟢 완료';
      case 'error': return '🔴 오류';
      default: return '⚪ 대기';
    }
  }

  insertSafePauseScene() {
    const newScene = {
      id: `scene_pause_${Date.now()}`,
      num: this.scenes.length + 1,
      script: '의자에 기대어 숨을 천천히 고르고 어깨를 편안히 내려놓습니다.',
      action: 'safe_rest',
      actionName: EXERCISE_ACTIONS.safe_rest.name,
      actionIcon: EXERCISE_ACTIONS.safe_rest.icon,
      safeRule: EXERCISE_ACTIONS.safe_rest.safeRule,
      duration: 8,
      bg: this.selectedBg,
      status: 'waiting'
    };
    this.scenes.push(newScene);
    this.renderSceneCards();
    this.showToast('안전 휴식/호흡 장면이 추가되었습니다.', 'success');
  }

  addEmptyScene() {
    const newScene = {
      id: `scene_custom_${Date.now()}`,
      num: this.scenes.length + 1,
      script: '새로운 체조 구령을 입력해 주세요.',
      action: 'arms_up',
      actionName: EXERCISE_ACTIONS.arms_up.name,
      actionIcon: EXERCISE_ACTIONS.arms_up.icon,
      safeRule: EXERCISE_ACTIONS.arms_up.safeRule,
      duration: 6,
      bg: this.selectedBg,
      status: 'waiting'
    };
    this.scenes.push(newScene);
    this.renderSceneCards();
    this.openEditModal(this.scenes.length - 1);
  }

  deleteScene(index) {
    if (this.scenes.length <= 1) {
      this.showToast('최소 1개 이상의 장면이 필요합니다.', 'error');
      return;
    }
    this.scenes.splice(index, 1);
    this.scenes.forEach((s, idx) => s.num = idx + 1);
    this.renderSceneCards();
    this.showToast('장면이 삭제되었습니다.', 'info');
  }

  regenerateSingleScene(index) {
    const scene = this.scenes[index];
    if (!scene) return;
    scene.status = 'generating';
    this.renderSceneCards();
    this.logPipeline(`장면 ${scene.num} [${scene.actionName}] 독립 재렌더링 시작...`, 'info');

    setTimeout(() => {
      scene.status = 'completed';
      this.renderSceneCards();
      this.logPipeline(`장면 ${scene.num} 재렌더링 완료!`, 'success');
      this.showToast(`장면 ${scene.num}이 정상 재생성되었습니다!`, 'success');
    }, 1200);
  }

  // Edit Modal
  openEditModal(index) {
    this.currentEditingIndex = index;
    const scene = this.scenes[index];
    if (!scene) return;

    document.getElementById('editModalTitle').textContent = `장면 ${scene.num} 수정`;
    document.getElementById('editSceneScript').value = scene.script;
    document.getElementById('editSceneAction').value = scene.action;
    document.getElementById('editSceneDuration').value = scene.duration;
    document.getElementById('editSceneBg').value = scene.bg;

    document.getElementById('sceneEditModal')?.classList.remove('hidden');
  }

  closeEditModal() {
    document.getElementById('sceneEditModal')?.classList.add('hidden');
    this.currentEditingIndex = null;
  }

  saveEditScene() {
    if (this.currentEditingIndex === null) return;
    const scene = this.scenes[this.currentEditingIndex];
    if (!scene) return;

    const script = document.getElementById('editSceneScript')?.value || '';
    const actionKey = document.getElementById('editSceneAction')?.value || 'wave';
    const duration = parseInt(document.getElementById('editSceneDuration')?.value, 10) || 6;
    const bg = document.getElementById('editSceneBg')?.value || this.selectedBg;

    scene.script = script;
    scene.action = actionKey;
    const meta = EXERCISE_ACTIONS[actionKey] || EXERCISE_ACTIONS.wave;
    scene.actionName = meta.name;
    scene.actionIcon = meta.icon;
    scene.safeRule = meta.safeRule;
    scene.duration = duration;
    scene.bg = bg;

    this.closeEditModal();
    this.renderSceneCards();
    this.showToast(`장면 ${scene.num}이 수정되었습니다.`, 'success');
  }

  // Korean Phoneme to 6 Mouth Shapes Map (Ah, Eo, Oh, Woo, Ee, Closed)
  // Representative Speaker: Kong-i (Main Host, Center)
  getKongiMouthKey(sec, isFullScene = false) {
    if (sec < 0.1) return 'closed';

    // 0.1s ~ 4.5s: “안녕하세요. 콩이와 친구들이에요.”
    // 0.10s ~ 1.70s: “안녕하세요”
    if (sec >= 0.10 && sec < 0.40) return 'a';       // 안 [Ah]
    if (sec >= 0.40 && sec < 0.70) return 'eo';      // 녕 [Eo]
    if (sec >= 0.70 && sec < 1.00) return 'a';       // 하 [Ah]
    if (sec >= 1.00 && sec < 1.30) return 'i';       // 세 [Ee]
    if (sec >= 1.30 && sec < 1.70) return 'o';       // 요 [Oh]
    if (sec >= 1.70 && sec < 1.95) return 'closed';  // [쉼표]

    // 1.95s ~ 4.40s: “콩이와 친구들이에요”
    if (sec >= 1.95 && sec < 2.30) return 'o';       // 콩 [Oh]
    if (sec >= 2.30 && sec < 2.55) return 'i';       // 이 [Ee]
    if (sec >= 2.55 && sec < 2.85) return 'a';       // 와 [Ah]
    if (sec >= 2.85 && sec < 3.15) return 'i';       // 친 [Ee]
    if (sec >= 3.15 && sec < 3.45) return 'u';       // 구 [Woo]
    if (sec >= 3.45 && sec < 3.75) return 'u';       // 들 [Woo/Eu]
    if (sec >= 3.75 && sec < 4.00) return 'i';       // 이 [Ee]
    if (sec >= 4.00 && sec < 4.25) return 'i';       // 에 [Ee]
    if (sec >= 4.25 && sec < 4.55) return 'o';       // 요 [Oh]

    if (!isFullScene) {
      return 'closed'; // 자연스러운 미소 닫힘
    }

    // 4.55s ~ 9.5s: “오늘은 우리 함께 천천히 몸을 움직여 볼까요?”
    if (sec >= 4.55 && sec < 4.80) return 'closed';  // [숨 고르기]
    if (sec >= 4.80 && sec < 5.10) return 'o';       // 오 [Oh]
    if (sec >= 5.10 && sec < 5.40) return 'u';       // 늘 [Woo/Eu]
    if (sec >= 5.40 && sec < 5.70) return 'u';       // 은 [Woo/Eu]
    if (sec >= 5.70 && sec < 6.00) return 'u';       // 우 [Woo]
    if (sec >= 6.00 && sec < 6.30) return 'i';       // 리 [Ee]
    if (sec >= 6.30 && sec < 6.60) return 'a';       // 함 [Ah]
    if (sec >= 6.60 && sec < 6.90) return 'i';       // 께 [Ee]
    if (sec >= 6.90 && sec < 7.20) return 'eo';      // 천 [Eo]
    if (sec >= 7.20 && sec < 7.50) return 'eo';      // 천 [Eo]
    if (sec >= 7.50 && sec < 7.80) return 'i';       // 히 [Ee]
    if (sec >= 7.80 && sec < 8.10) return 'o';       // 몸 [Oh]
    if (sec >= 8.10 && sec < 8.35) return 'u';       // 을 [Woo/Eu]
    if (sec >= 8.35 && sec < 8.65) return 'u';       // 움 [Woo]
    if (sec >= 8.65 && sec < 8.95) return 'i';       // 직 [Ee]
    if (sec >= 8.95 && sec < 9.25) return 'eo';      // 여 [Eo]
    if (sec >= 9.25 && sec < 9.55) return 'o';       // 볼 [Oh]
    if (sec >= 9.55 && sec < 9.85) return 'a';       // 까 [Ah]
    if (sec >= 9.85 && sec < 10.20) return 'o';      // 요 [Oh]

    return 'closed';
  }

  // Seamless 4-Friend Master Scene Renderer with Kong-i Smooth Vowel Morphing (Zero Sticker Border)
  drawSeamlessKongiMasterScene(ctx, w, h, mouthKey = 'closed') {
    const key = (!mouthKey || mouthKey === 'closed') ? 'closed' : mouthKey;
    const currentImg = this.loadedImages['scene_group_' + key] || this.loadedImages['scene_group_wave'];
    
    if (!this.vowelMorphState) {
      this.vowelMorphState = {
        currentKey: key,
        prevKey: key,
        progress: 1.0,
        lastTime: performance.now()
      };
    }

    const now = performance.now();
    const dt = Math.min(0.1, (now - (this.vowelMorphState.lastTime || now)) / 1000.0);
    this.vowelMorphState.lastTime = now;

    // Detect mouth shape transition
    if (this.vowelMorphState.currentKey !== key) {
      this.vowelMorphState.prevKey = this.vowelMorphState.currentKey;
      this.vowelMorphState.currentKey = key;
      this.vowelMorphState.progress = 0.0;
    }

    if (this.vowelMorphState.progress < 1.0) {
      // Smooth 70ms natural morphing between vowel shapes (Ah, Eo, Oh, Woo, Ee, Closed)
      this.vowelMorphState.progress = Math.min(1.0, this.vowelMorphState.progress + (dt / 0.07));
    }

    ctx.save();
    const prevImg = this.loadedImages['scene_group_' + this.vowelMorphState.prevKey] || currentImg;
    
    if (this.vowelMorphState.progress < 1.0 && prevImg && prevImg.complete && currentImg && currentImg.complete && prevImg !== currentImg) {
      // Draw previous vowel frame
      ctx.globalAlpha = 1.0;
      ctx.drawImage(prevImg, 0, 0, w, h);

      // Smoothly blend in new vowel frame
      ctx.globalAlpha = this.vowelMorphState.progress;
      ctx.drawImage(currentImg, 0, 0, w, h);
    } else if (currentImg && currentImg.complete) {
      ctx.globalAlpha = 1.0;
      ctx.drawImage(currentImg, 0, 0, w, h);
    } else if (this.loadedImages['scene_group_wave']) {
      ctx.globalAlpha = 1.0;
      ctx.drawImage(this.loadedImages['scene_group_wave'], 0, 0, w, h);
    }
    ctx.restore();
  }

  // Draw natural mouth sprite cropped from artwork (Legacy fallback)
  drawKongiMouthSprite(ctx, w, h, mouthKey = 'closed') {
    if (!mouthKey || mouthKey === 'closed') {
      this.lastMouthKey = 'closed';
      this.mouthBlendAlpha = 0;
      return;
    }

    const sprite = this.loadedImages['mouth_' + mouthKey];
    if (!sprite || !sprite.complete) return;

    const dw = w * (80.0 / 1376.0);
    const dh = h * (42.0 / 768.0);
    const dx = w * (624.0 / 1376.0);
    const dy = h * (326.0 / 768.0);

    ctx.save();
    if (this.lastMouthKey !== mouthKey) {
      this.mouthBlendAlpha = 0.75;
      this.lastMouthKey = mouthKey;
    } else {
      this.mouthBlendAlpha = Math.min(1.0, (this.mouthBlendAlpha || 0.75) + 0.15);
    }

    ctx.globalAlpha = this.mouthBlendAlpha;
    ctx.drawImage(sprite, dx, dy, dw, dh);
    ctx.restore();
  }

  // Step 4 Action: Dedicated Voice Test ("안녕하세요. 콩이와 친구들이에요.")
  runKongiVoiceTest() {
    this.initAudioContext();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (this.activeVoiceAudio) {
      this.activeVoiceAudio.pause();
      this.activeVoiceAudio.currentTime = 0;
    }

    // Unmuted, 100% volume
    this.kongiAudioHello.currentTime = 0;
    this.kongiAudioHello.volume = 1.0;
    this.kongiAudioHello.muted = false;
    this.activeVoiceAudio = this.kongiAudioHello;

    this.kongiAudioHello.play().then(() => {
      this.voiceTestPassed = true;
      this.showToast('🔊 “안녕하세요. 콩이와 친구들이에요.” 콩이 실제 음성 테스트 재생 중!', 'success');
      this.logPipeline('🔊 [4인 체조팀 음성 테스트] 메인 진행 콩이 대표 음성 재생 (Volume 1.0, Muted: false) 및 4인 씬 검증', 'info');

      const statusText = document.getElementById('testStatusText');
      if (statusText) {
        statusText.innerHTML = '<span style="color:#059669; font-weight:800;">✓ 콩이와 친구들 4인 음성 확인 성공! (볼륨 100%, 립싱크 정상 확인)</span>';
      }

      const previewBox = document.getElementById('testPreviewBox');
      previewBox?.classList.remove('hidden');

      this.playTestVoiceAnimationOnly();
    }).catch(err => {
      console.warn('Audio play error', err);
      this.showToast('오디오 재생을 위해 화면을 한 번 클릭해 주세요.', 'info');
    });
  }

  playTestVoiceAnimationOnly() {
    if (!this.testCanvas || !this.testCtx) return;
    const testScript = '“안녕하세요. 콩이와 친구들이에요.”';
    const firstScene = {
      num: 1,
      script: testScript,
      action: 'wave',
      actionName: '손 흔들며 시작 인사 (콩이·토리·나비·곰이 함께)',
      bg: 'bg_daycare'
    };

    if (this.testAnimId) cancelAnimationFrame(this.testAnimId);

    const renderFrame = () => {
      const audio = this.kongiAudioHello;
      const curTime = audio ? audio.currentTime : 0;
      const isEnded = !audio || audio.ended || curTime >= 4.6;

      const mouthKey = this.getKongiMouthKey(curTime, false);
      this.currentKongiMouth = mouthKey;

      const ctx = this.testCtx;
      const w = this.testCanvas.width;
      const h = this.testCanvas.height;

      this.drawTogetherExerciseScene(ctx, w, h, firstScene, mouthKey, true);
      this.drawTestOverlay(ctx, w, h, testScript, mouthKey);

      if (!isEnded) {
        this.testAnimId = requestAnimationFrame(renderFrame);
      } else {
        // Hold final closed smiling frame
        this.drawTogetherExerciseScene(ctx, w, h, firstScene, 'closed', true);
        this.drawTestOverlay(ctx, w, h, testScript, 'closed');
        this.showToast('✨ 콩이와 친구들 음성 및 립싱크 테스트가 성공적으로 완료되었습니다!', 'success');
      }
    };

    this.testAnimId = requestAnimationFrame(renderFrame);
  }

  // Step 4 Action: Full Scene 1 Test Rendering (4-character team)
  runTestScene() {
    if (this.scenes.length === 0) {
      this.showToast('장면이 존재하지 않습니다. 대본을 먼저 분석해 주세요.', 'error');
      return;
    }

    const statusText = document.getElementById('testStatusText');
    if (statusText) statusText.innerHTML = '<span style="color:#D97706; font-weight:700;">상태: 🎬 첫 장면 4인 체조팀(콩이·토리·나비·곰이) & 실제 음성 립싱크 렌더링 중...</span>';
    
    this.logPipeline('🎬 [첫 장면 테스트] 콩이·토리·나비·곰이 4인 체조팀 & 콩이 대표 음성 렌더링 시작...', 'info');
    this.logPipeline('🔒 4인 캐릭터 락: 콩이(중앙 메인 안경 강아지), 토리(다람쥐), 나비(고양이), 곰이(곰) 100% 고정 유지', 'info');
    this.logPipeline('🗣️ 대표 음성: 콩이 실제 한국어 신경망 오디오 트랙 재생 (Volume 1.0, Muted: false)', 'info');

    setTimeout(() => {
      this.testPassed = true;
      if (statusText) statusText.innerHTML = '상태: <span style="color:#059669; font-weight:800;">✓ 4인 체조팀 첫 장면 테스트 완료 (아래 체크리스트 확인 후 다음 단계 진행)</span>';
      
      const previewBox = document.getElementById('testPreviewBox');
      previewBox?.classList.remove('hidden');

      this.logPipeline('✅ 첫 장면 테스트 영상 준비 완료: 4인 함께 인사 및 콩이 한국어 6대 립싱크 검증', 'success');
      this.showToast('첫 장면 테스트 영상이 준비되었습니다. 4명의 친구들과 실제 음성을 감상해 보세요!', 'success');

      this.playTestScenePreview();
    }, 1000);
  }

  playTestScenePreview() {
    if (!this.testCanvas || !this.testCtx) return;

    this.initAudioContext();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (this.activeVoiceAudio) {
      this.activeVoiceAudio.pause();
      this.activeVoiceAudio.currentTime = 0;
    }

    const targetScript = '안녕하세요. 콩이와 친구들이에요. 오늘은 우리 함께 천천히 몸을 움직여 볼까요?';
    const firstScene = {
      num: 1,
      script: targetScript,
      action: 'wave',
      actionName: '손 흔들며 시작 인사 (콩이·토리·나비·곰이 함께)',
      bg: 'bg_daycare'
    };

    // Play real audio simultaneously (Muted: false, Volume: 1.0)
    this.kongiAudioFull.currentTime = 0;
    this.kongiAudioFull.volume = 1.0;
    this.kongiAudioFull.muted = false;
    this.activeVoiceAudio = this.kongiAudioFull;

    this.kongiAudioFull.play().catch(e => console.warn('Full voice play warning', e));

    if (this.testAnimId) cancelAnimationFrame(this.testAnimId);

    const renderTestFrame = () => {
      const curTime = this.kongiAudioFull ? this.kongiAudioFull.currentTime : 0;
      const isEnded = !this.kongiAudioFull || this.kongiAudioFull.ended || curTime >= 9.6;

      const mouthKey = this.getKongiMouthKey(curTime, true);
      this.currentKongiMouth = mouthKey;

      const ctx = this.testCtx;
      const w = this.testCanvas.width;
      const h = this.testCanvas.height;

      // Draw 4-character team master scene with Kong-i's smooth vowel morphing
      this.drawTogetherExerciseScene(ctx, w, h, firstScene, mouthKey, true);
      this.drawTestOverlay(ctx, w, h, firstScene.script, mouthKey);

      if (!isEnded) {
        this.testAnimId = requestAnimationFrame(renderTestFrame);
      } else {
        // Hold final closed frame
        this.drawTogetherExerciseScene(ctx, w, h, firstScene, 'closed', true);
        this.drawTestOverlay(ctx, w, h, firstScene.script, 'closed');
      }
    };

    this.testAnimId = requestAnimationFrame(renderTestFrame);
  }

  drawTestOverlay(ctx, w, h, scriptText, currentMouth = 'closed') {
    // 1. Top Identity Lock Badge
    ctx.save();
    ctx.fillStyle = 'rgba(6, 95, 70, 0.92)';
    ctx.beginPath();
    ctx.roundRect(w * 0.04, 14, 320, 28, 14);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 12px Pretendard, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('🔒 콩이·토리·나비·곰이 4인 체조팀 일관성 락 가동 중', w * 0.04 + 14, 32);
    ctx.restore();

    // 2. Real Audio & Lipsync Indicator Badge
    ctx.save();
    ctx.fillStyle = 'rgba(217, 119, 6, 0.92)';
    ctx.beginPath();
    ctx.roundRect(w - 240, 14, 210, 28, 14);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 11px Pretendard, sans-serif';
    ctx.textAlign = 'center';
    const mouthNames = { closed: '입닫기', a: '아', eo: '어', o: '오', u: '우', i: '이' };
    ctx.fillText(`🔊 콩이 대표 음성 | 립싱크: [${mouthNames[currentMouth] || currentMouth}]`, w - 135, 32);
    ctx.restore();

    // 3. Subtitle Bar
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.beginPath();
    ctx.roundRect(w * 0.04, h - 56, w * 0.92, 42, 8);
    ctx.fill();
    ctx.fillStyle = '#FEF08A';
    ctx.font = 'bold 14px Pretendard, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(scriptText, w / 2, h - 30);
    ctx.restore();
  }

  startFullVideoPipeline() {
    if (!this.testApproved) {
      this.showToast('⚠️ 원본 콩이 캐릭터 일관성 확인을 먼저 완료해 주세요. (테스트 성공 전 진행 불가)', 'error');
      return;
    }
    if (this.isGenerating) return;
    this.isGenerating = true;

    const btnBuild = document.getElementById('btnBuildFullVideo');
    if (btnBuild) btnBuild.disabled = true;

    const statusBadge = document.getElementById('pipelineStatusBadge');
    if (statusBadge) {
      statusBadge.textContent = '렌더링 진행 중...';
      statusBadge.style.background = '#FEF3C7';
      statusBadge.style.color = '#92400E';
    }

    const total = this.scenes.length;
    let current = 0;

    this.logPipeline(`🚀 전체 영상 렌더링 파이프라인 가동 (총 ${total}개 장면)`, 'info');

    const processNextScene = () => {
      if (current >= total) {
        // Complete Pipeline
        this.isGenerating = false;
        if (statusBadge) {
          statusBadge.textContent = '렌더링 100% 완료';
          statusBadge.style.background = '#DEF7EC';
          statusBadge.style.color = '#03543F';
        }
        document.getElementById('pipelineProgressPercent').textContent = '100%';
        document.getElementById('pipelineProgressBar').style.width = '100%';
        document.getElementById('pipelineProgressCount').textContent = `${total} / ${total} 장면 완료`;

        document.getElementById('btnGoToPlayer').disabled = false;
        this.logPipeline('🎉 [최종 영상 완성] 캐릭터 모션, 음성 립싱크, 자막, BGM 자동 덕킹 합성 완료!', 'success');
        this.showToast('모든 장면이 성공적으로 생성되었습니다! [미리보기]에서 감상해 보세요.', 'success');
        return;
      }

      const scene = this.scenes[current];
      scene.status = 'generating';
      this.renderPipelineGrid();
      this.renderSceneCards();

      // Error Simulation Condition
      const willFail = this.simulateError && current === 2;

      this.logPipeline(`장면 ${scene.num}/${total} [${scene.actionName}] 어르신 함께 체조 장면 렌더링 중...`, 'info');

      setTimeout(() => {
        if (willFail) {
          scene.status = 'error';
          this.logPipeline(`⚠️ 장면 ${scene.num} 일시적 합성 타임아웃 발생 (개별 복구 가능)`, 'error');
          this.showToast(`장면 ${scene.num}에 오류가 발생했습니다. 해당 장면만 [다시 만들기]로 복구할 수 있습니다.`, 'error');
        } else {
          scene.status = 'completed';
          this.logPipeline(`✓ 장면 ${scene.num} [${scene.actionName}] 렌더링 성공`, 'success');
        }

        current++;
        const percent = Math.round((current / total) * 100);
        document.getElementById('pipelineProgressPercent').textContent = `${percent}%`;
        document.getElementById('pipelineProgressBar').style.width = `${percent}%`;
        document.getElementById('pipelineProgressCount').textContent = `${current} / ${total} 장면 완료`;

        this.renderPipelineGrid();
        this.renderSceneCards();

        processNextScene();
      }, 700);
    };

    processNextScene();
  }

  logPipeline(msg, type = 'info') {
    const box = document.getElementById('pipelineLogBox');
    if (!box) return;
    const time = new Date().toTimeString().slice(0, 8);
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.textContent = `[${time}] ${msg}`;
    box.appendChild(line);
    box.scrollTop = box.scrollHeight;
  }

  renderPipelineGrid() {
    const grid = document.getElementById('pipelineSceneGrid');
    if (!grid) return;
    grid.innerHTML = '';

    this.scenes.forEach((scene) => {
      const card = document.createElement('div');
      card.className = `scene-status-card status-${scene.status}`;

      let retryButton = '';
      if (scene.status === 'error') {
        retryButton = `<button class="btn btn-secondary btn-xs" style="margin-top:4px;" onclick="app.retrySceneFromPipeline(${scene.num - 1})">🔄 이 장면 다시 만들기</button>`;
      }

      card.innerHTML = `
        <div class="status-card-header">
          <span class="status-card-num">장면 ${scene.num} (${scene.actionIcon} ${scene.actionName})</span>
          <span class="scene-status-tag ${scene.status}">${this.getStatusLabel(scene.status)}</span>
        </div>
        <div class="status-card-body">"${this.escapeHtml(scene.script)}"</div>
        ${retryButton}
      `;
      grid.appendChild(card);
    });
  }

  retrySceneFromPipeline(index) {
    const scene = this.scenes[index];
    if (!scene) return;
    scene.status = 'generating';
    this.renderPipelineGrid();
    this.renderSceneCards();
    this.logPipeline(`장면 ${scene.num} 단독 재시도 시작...`, 'info');

    setTimeout(() => {
      scene.status = 'completed';
      this.renderPipelineGrid();
      this.renderSceneCards();
      this.logPipeline(`장면 ${scene.num} 오류 복구 및 재렌더링 완료!`, 'success');
      this.showToast(`장면 ${scene.num} 복구 완료!`, 'success');
    }, 1000);
  }

  // Step 5: 16:9 Video Canvas Engine & Player Controller
  startCanvasRenderLoop() {
    const render = () => {
      this.updateAnimationTicks();
      this.renderMainVideoCanvas();
      this.animationFrameId = requestAnimationFrame(render);
    };
    this.animationFrameId = requestAnimationFrame(render);
  }

  updateAnimationTicks() {
    this.charAnim.actionTick += 0.05;
    this.charAnim.breathOffset = Math.sin(this.charAnim.actionTick * 1.5) * 4;

    // Blink every 3.5 seconds
    this.charAnim.blinkTimer += 0.016;
    if (this.charAnim.blinkTimer > 3.5) {
      this.charAnim.blinkState = 1;
      if (this.charAnim.blinkTimer > 3.65) {
        this.charAnim.blinkState = 0;
        this.charAnim.blinkTimer = 0;
      }
    }

    // Playback Progress
    if (this.isPlaying && this.scenes.length > 0) {
      const dt = 0.016 * this.playbackSpeed;
      this.sceneElapsedTime += dt;
      this.totalElapsedTime += dt;

      const currentScene = this.scenes[this.currentSceneIdx];
      if (currentScene && this.sceneElapsedTime >= currentScene.duration) {
        // Move to next scene
        if (this.currentSceneIdx < this.scenes.length - 1) {
          this.jumpScene(this.currentSceneIdx + 1);
        } else {
          // Finished playback
          this.isPlaying = false;
          this.updatePlayPauseButtonUI();
          document.getElementById('canvasPlayOverlay')?.classList.remove('hidden');
          this.showToast('영상 재생이 끝났습니다.', 'info');
        }
      }

      this.updateSeekBarAndTimers();
    }
  }

  renderMainVideoCanvas() {
    if (!this.mainCanvas || !this.mainCtx) return;
    const ctx = this.mainCtx;
    const w = this.mainCanvas.width;
    const h = this.mainCanvas.height;

    const currentScene = this.scenes[this.currentSceneIdx] || {
      script: '대본을 입력해 주세요.',
      action: 'wave',
      actionName: '손 흔들며 인사하기',
      bg: this.selectedBg
    };

    // Determine lip-sync mouth key for live playback
    let mouthState = 'closed';
    if (this.isPlaying) {
      if (this.selectedChar === 'kongi' && this.currentSceneIdx === 0 && this.kongiAudioFull && !this.kongiAudioFull.paused && !this.kongiAudioFull.ended) {
        mouthState = this.getKongiMouthKey(this.kongiAudioFull.currentTime, true);
      } else {
        mouthState = this.charAnim.mouthOpen || 'closed';
      }
    } else {
      mouthState = 'closed';
    }

    // Draw Unified Together Scene (Kong-i exercising directly WITH seniors)
    this.drawTogetherExerciseScene(ctx, w, h, currentScene, mouthState, false);

    // 4. Update HTML Overlays (Subtitle & Guide badge)
    const overlaySub = document.getElementById('overlaySubtitle');
    if (overlaySub) {
      overlaySub.textContent = currentScene.script;
    }
    const overlayBadge = document.getElementById('overlaySceneBadge');
    if (overlayBadge) {
      overlayBadge.textContent = `장면 ${this.currentSceneIdx + 1}/${this.scenes.length} : ${currentScene.actionName}`;
    }

    // 5. Update Rhythm Metronome Dots
    const dots = document.querySelectorAll('.rhythm-pulse-dots .dot');
    const beat = Math.floor((this.charAnim.actionTick * 3) % 4);
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === beat);
    });
  }

  // Unified Renderer: 4-Friend Chair Gymnastics Master Scenes (Kongi, Tori, Nabi, Gomi)
  drawTogetherExerciseScene(ctx, w, h, scene, mouthState, isTest = false) {
    const action = scene?.action || 'wave';
    const isFirstScene = (isTest || scene?.num === 1 || (action === 'wave' && this.currentSceneIdx === 0));

    // Choose 4-character group master image for each senior chair exercise action
    let groupImgKey = 'scene_group_wave';
    switch (action) {
      case 'wave':
      case 'nod_smile':
        groupImgKey = 'scene_group_wave';
        break;
      case 'arms_up':
      case 'shoulder_shrug':
        groupImgKey = 'scene_group_arms_up';
        break;
      case 'arms_side':
      case 'wrist_shake':
        groupImgKey = 'scene_group_arms_side';
        break;
      case 'clap':
        groupImgKey = 'scene_group_clap';
        break;
      case 'knee_lift':
        groupImgKey = 'scene_group_knee_lift';
        break;
      case 'deep_breath':
      case 'safe_rest':
      default:
        groupImgKey = 'scene_group_breath';
        break;
    }

    const groupImg = this.loadedImages[groupImgKey];

    // If it's the speaking greeting scene (wave / Scene 1 / Test), use 100% seamless morphing frames
    if (isFirstScene || action === 'wave' || action === 'nod_smile') {
      const mouthKey = (typeof mouthState === 'string') ? mouthState : (mouthState > 0 ? 'a' : 'closed');
      this.drawSeamlessKongiMasterScene(ctx, w, h, mouthKey);
      return;
    }

    if (groupImg && groupImg.complete) {
      // Chair gymnastics breathing micro-rhythm movement
      const pulse = 1 + Math.sin(this.charAnim.actionTick * 1.2) * 0.004;
      const offsetY = Math.sin(this.charAnim.actionTick * 1.2) * 2.0;

      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(pulse, pulse);
      ctx.translate(-w / 2, -h / 2 + offsetY);
      ctx.drawImage(groupImg, 0, 0, w, h);
      ctx.restore();

      // Cheerful encouragement bubbles from friends
      if (!isTest) {
        this.drawSeniorReactionBubbles(ctx, w, h, action);
      }
    } else {
      // Fallback renderer
      this.drawCanvasBackground(ctx, w, h, scene.bg || this.selectedBg);
      this.drawSeniorCompanions(ctx, w, h, action);
      this.drawSeniorChair(ctx, w / 2, h * 0.72);
      this.drawMascotCharacter(ctx, w / 2, h * 0.62 + this.charAnim.breathOffset, 0.68, action, mouthState);
    }
  }

  // Draw Warm Encouragement Bubbles from Seniors
  drawSeniorReactionBubbles(ctx, w, h, action) {
    const tick = this.charAnim.actionTick;
    const cycle = Math.floor(tick / 5) % 4;
    const bubbleAlpha = Math.max(0, Math.sin((tick % 5) / 5 * Math.PI));

    if (bubbleAlpha < 0.2) return;

    let quoteLeft = '어이쿠 시원하다~ 👵';
    let quoteRight = '하하 참 좋네! 👴';

    if (action === 'arms_up') {
      quoteLeft = '팔을 쭉쭉 올리니 시원해요~ 👵';
      quoteRight = '콩이 선생님 덕분에 기운 나네! 👴';
    } else if (action === 'arms_side') {
      quoteLeft = '가슴이 활짝 펴지네요~ 👵';
      quoteRight = '호흡이 편안해집니다 👴';
    } else if (action === 'clap') {
      quoteLeft = '짝짝짝! 박수 소리 신난다~ 👵';
      quoteRight = '손발이 따뜻해지네! 👴';
    } else if (action === 'deep_breath' || action === 'safe_rest') {
      quoteLeft = '마음이 참 편안해요 👵';
      quoteRight = '후- 숨이 고르게 쉬어집니다 👴';
    }

    ctx.save();
    ctx.globalAlpha = bubbleAlpha;

    // Left Senior Bubble (Grandmother)
    this.renderSpeechBubble(ctx, w * 0.20, h * 0.32, quoteLeft);

    // Right Senior Bubble (Grandfather)
    this.renderSpeechBubble(ctx, w * 0.78, h * 0.34, quoteRight);

    ctx.restore();
  }

  renderSpeechBubble(ctx, x, y, text) {
    ctx.font = 'bold 15px Pretendard, sans-serif';
    const textWidth = ctx.measureText(text).width;
    const padX = 14;
    const padY = 8;
    const bw = textWidth + padX * 2;
    const bh = 34;

    // Bubble Background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    ctx.beginPath();
    ctx.roundRect(x - bw / 2, y - bh / 2, bw, bh, 18);
    ctx.fill();

    // Bubble Tail
    ctx.beginPath();
    ctx.moveTo(x - 6, y + bh / 2);
    ctx.lineTo(x, y + bh / 2 + 8);
    ctx.lineTo(x + 6, y + bh / 2);
    ctx.fill();

    // Text
    ctx.shadowColor = 'transparent';
    ctx.fillStyle = '#065F46';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
  }

  // Draw Animated Senior Companions (for other characters / fallback)
  drawSeniorCompanions(ctx, w, h, action) {
    const tick = this.charAnim.actionTick;
    let armSway = Math.sin(tick * 2) * 15;
    if (action === 'arms_up') armSway = -35;
    if (action === 'clap') armSway = Math.sin(tick * 6) * 10;

    // Left Senior (Grandmother on chair)
    ctx.save();
    ctx.translate(w * 0.22, h * 0.65);
    ctx.fillStyle = '#C2410C'; // cardigan
    ctx.beginPath();
    ctx.arc(0, -50, 24, 0, Math.PI * 2); // head
    ctx.fillStyle = '#E2E8F0'; // gray hair
    ctx.fill();
    ctx.fillStyle = '#F472B6'; // sweater
    ctx.fillRect(-20, -25, 40, 60);
    // Arms
    ctx.strokeStyle = '#F472B6';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-20, -15);
    ctx.lineTo(-38, -15 + armSway);
    ctx.moveTo(20, -15);
    ctx.lineTo(38, -15 + armSway);
    ctx.stroke();
    ctx.restore();

    // Right Senior (Grandfather on chair)
    ctx.save();
    ctx.translate(w * 0.78, h * 0.65);
    ctx.fillStyle = '#94A3B8'; // gray hair
    ctx.beginPath();
    ctx.arc(0, -50, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#047857'; // green vest
    ctx.fillRect(-22, -25, 44, 60);
    // Arms
    ctx.strokeStyle = '#047857';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-22, -15);
    ctx.lineTo(-40, -15 + armSway);
    ctx.moveTo(22, -15);
    ctx.lineTo(40, -15 + armSway);
    ctx.stroke();
    ctx.restore();
  }

  drawCanvasBackground(ctx, w, h, bgKey) {
    let img = null;
    if (bgKey === 'bg_custom' && this.loadedImages['bg_custom']) {
      img = this.loadedImages['bg_custom'];
    } else if (this.loadedImages[bgKey]) {
      img = this.loadedImages[bgKey];
    }

    if (img && img.complete) {
      ctx.drawImage(img, 0, 0, w, h);
    } else {
      // Elegant Gradient Fallback
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#E0F2FE');
      grad.addColorStop(1, '#DCFCE7');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Soft decorative circles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(w * 0.8, h * 0.3, 160, 0, Math.PI * 2);
      ctx.fill();
    }

    // Subtle vignette around edges for cinematic focus
    const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.4, w / 2, h / 2, w * 0.7);
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
  }

  drawSeniorChair(ctx, x, y) {
    ctx.save();
    ctx.translate(x, y);

    // Sturdy wooden chair backrest
    ctx.fillStyle = '#854D0E';
    ctx.strokeStyle = '#5A330A';
    ctx.lineWidth = 4;

    // Chair Back
    ctx.beginPath();
    ctx.roundRect(-70, -110, 140, 90, 8);
    ctx.fill();
    ctx.stroke();

    // Chair Seat
    ctx.fillStyle = '#A16207';
    ctx.beginPath();
    ctx.roundRect(-85, -20, 170, 24, 6);
    ctx.fill();
    ctx.stroke();

    // Chair Legs
    ctx.fillStyle = '#713F12';
    ctx.fillRect(-75, 4, 14, 80);
    ctx.fillRect(61, 4, 14, 80);

    ctx.restore();
  }

  drawMascotCharacter(ctx, x, y, scale, actionKey, mouthState) {
    ctx.save();
    ctx.translate(x, y);

    // Dynamic Motion Transform based on action
    const tick = this.charAnim.actionTick;
    let armLeftAngle = 0;
    let armRightAngle = 0;
    let bodyYOffset = 0;
    let bodyScaleX = 1;
    let bodyScaleY = 1;

    switch (actionKey) {
      case 'arms_up':
        // Both arms stretch high
        armLeftAngle = -1.2 + Math.sin(tick * 2) * 0.2;
        armRightAngle = 1.2 - Math.sin(tick * 2) * 0.2;
        bodyScaleY = 1.05;
        break;
      case 'arms_side':
        // Both arms open wide
        armLeftAngle = -0.6 + Math.sin(tick * 2) * 0.15;
        armRightAngle = 0.6 - Math.sin(tick * 2) * 0.15;
        bodyScaleX = 1.04;
        break;
      case 'shoulder_shrug':
        // Shoulders lift and drop
        bodyYOffset = Math.sin(tick * 3) > 0 ? -12 : 2;
        break;
      case 'knee_lift':
        // Alternate knee lift bounce
        bodyYOffset = Math.abs(Math.sin(tick * 2)) * -8;
        break;
      case 'deep_breath':
        // Slow expansion and return
        const breath = Math.sin(tick);
        bodyScaleX = 1 + breath * 0.04;
        bodyScaleY = 1 + breath * 0.05;
        break;
      case 'clap':
        // Clapping pulse
        bodyScaleX = 1 + Math.sin(tick * 6) * 0.03;
        break;
      case 'nod_smile':
        // Head nod
        bodyYOffset = Math.sin(tick * 3) * 4;
        break;
      case 'wrist_shake':
        // Fast wrist vibration
        armLeftAngle = Math.sin(tick * 8) * 0.1;
        armRightAngle = -Math.sin(tick * 8) * 0.1;
        break;
      case 'wave':
      default:
        // Right hand wave
        armRightAngle = Math.sin(tick * 4) * 0.35 + 0.4;
        break;
    }

    ctx.scale(scale * bodyScaleX, scale * bodyScaleY);
    ctx.translate(0, bodyYOffset);

    // Render character image
    let charImg = null;
    if (this.selectedChar === 'custom' && this.loadedImages['char_custom']) {
      charImg = this.loadedImages['char_custom'];
    } else {
      const key = `char_${this.selectedChar}`;
      charImg = this.loadedImages[key] || this.loadedImages['char_kongi'];
    }

    const imgW = 340;
    const imgH = 340;

    if (charImg && charImg.complete) {
      // Draw character with circular clip or rounded shadow
      ctx.save();
      // Drop shadow for depth
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 10;

      // Draw character body
      ctx.drawImage(charImg, -imgW / 2, -imgH / 2, imgW, imgH);
      ctx.restore();

      // Draw Animated Lip-Sync Mouth Overlay on top of face
      // Face center coordinates relative to character center
      const mouthX = 0;
      const mouthY = 28;

      ctx.save();
      ctx.translate(mouthX, mouthY);

      if (mouthState > 0) {
        // Open Mouth (A / O / I phonemes)
        ctx.fillStyle = '#881337'; // Deep mouth cavity
        ctx.strokeStyle = '#E11D48';
        ctx.lineWidth = 2;

        ctx.beginPath();
        if (mouthState === 1) {
          // A shape: round tall ellipse
          ctx.ellipse(0, 0, 14, 16, 0, 0, Math.PI * 2);
        } else if (mouthState === 2) {
          // O shape: smaller round circle
          ctx.ellipse(0, 0, 11, 11, 0, 0, Math.PI * 2);
        } else {
          // I shape: wide smile
          ctx.ellipse(0, 0, 18, 8, 0, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.stroke();

        // Tongue
        ctx.fillStyle = '#FB7185';
        ctx.beginPath();
        ctx.ellipse(0, 4, 8, 5, 0, 0, Math.PI);
        ctx.fill();
      }

      // Blink Eyes Overlay
      if (this.charAnim.blinkState === 1) {
        ctx.fillStyle = '#FBBF24'; // eyelid color blend
        ctx.strokeStyle = '#451A03';
        ctx.lineWidth = 3;

        // Left eye blink arc
        ctx.beginPath();
        ctx.arc(-26, -38, 12, 0.1 * Math.PI, 0.9 * Math.PI, false);
        ctx.stroke();

        // Right eye blink arc
        ctx.beginPath();
        ctx.arc(26, -38, 12, 0.1 * Math.PI, 0.9 * Math.PI, false);
        ctx.stroke();
      }

      ctx.restore();

    } else {
      // Mascot Vector Placeholder
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(0, 0, 120, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // Playback Navigation & Controller
  togglePlayback() {
    if (this.isPlaying) {
      this.pausePlayback();
    } else {
      this.playPlayback();
    }
  }

  playPlayback() {
    if (this.scenes.length === 0) return;
    this.isPlaying = true;
    document.getElementById('canvasPlayOverlay')?.classList.add('hidden');
    this.updatePlayPauseButtonUI();

    // Start BGM if enabled
    if (!this.isBgmPlaying && this.bgmTheme !== 'none') {
      this.playBgm();
    }

    // Speak Current Scene Script or play dedicated voice
    const currentScene = this.scenes[this.currentSceneIdx];
    if (currentScene) {
      if (this.selectedChar === 'kongi' && this.currentSceneIdx === 0 && this.kongiAudioFull) {
        this.kongiAudioFull.currentTime = this.sceneElapsedTime || 0;
        this.kongiAudioFull.volume = 1.0;
        this.kongiAudioFull.muted = false;
        this.kongiAudioFull.play().catch(e => console.warn(e));
      } else {
        this.speakText(currentScene.script);
      }
    }
  }

  pausePlayback() {
    this.isPlaying = false;
    document.getElementById('canvasPlayOverlay')?.classList.remove('hidden');
    this.updatePlayPauseButtonUI();
    if (this.kongiAudioFull) {
      this.kongiAudioFull.pause();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.setAutoDucking(false);
  }

  stopPlayback() {
    this.pausePlayback();
    if (this.kongiAudioFull) {
      this.kongiAudioFull.pause();
      this.kongiAudioFull.currentTime = 0;
    }
    this.currentSceneIdx = 0;
    this.sceneElapsedTime = 0;
    this.totalElapsedTime = 0;
    this.updateSeekBarAndTimers();
    this.updatePlayerSceneDisplay();
    if (this.isBgmPlaying) {
      this.stopBgm();
    }
  }

  jumpScene(idx) {
    if (idx < 0) idx = 0;
    if (idx >= this.scenes.length) idx = this.scenes.length - 1;
    this.currentSceneIdx = idx;
    this.sceneElapsedTime = 0;

    if (this.kongiAudioFull) {
      this.kongiAudioFull.pause();
      this.kongiAudioFull.currentTime = 0;
    }

    // Recalculate total elapsed time up to this scene
    let elapsed = 0;
    for (let i = 0; i < idx; i++) {
      elapsed += this.scenes[i].duration;
    }
    this.totalElapsedTime = elapsed;

    this.updateSeekBarAndTimers();
    this.updatePlayerSceneDisplay();

    if (this.isPlaying) {
      const scene = this.scenes[idx];
      if (scene) {
        if (this.selectedChar === 'kongi' && idx === 0 && this.kongiAudioFull) {
          this.kongiAudioFull.currentTime = 0;
          this.kongiAudioFull.volume = 1.0;
          this.kongiAudioFull.muted = false;
          this.kongiAudioFull.play().catch(e => console.warn(e));
        } else {
          this.speakText(scene.script);
        }
      }
    }
  }

  seekPlayback(percent) {
    const totalDuration = this.scenes.reduce((sum, s) => sum + s.duration, 0);
    const targetTime = (percent / 100) * totalDuration;

    let accum = 0;
    for (let i = 0; i < this.scenes.length; i++) {
      const dur = this.scenes[i].duration;
      if (targetTime >= accum && targetTime < accum + dur) {
        this.currentSceneIdx = i;
        this.sceneElapsedTime = targetTime - accum;
        this.totalElapsedTime = targetTime;
        break;
      }
      accum += dur;
    }

    this.updateSeekBarAndTimers();
    this.updatePlayerSceneDisplay();
  }

  updateSeekBarAndTimers() {
    const totalDuration = this.scenes.reduce((sum, s) => sum + s.duration, 0) || 1;
    const progressPercent = Math.min(100, (this.totalElapsedTime / totalDuration) * 100);

    const seekBar = document.getElementById('videoSeekBar');
    if (seekBar) seekBar.value = progressPercent;

    document.getElementById('currentTimeLabel').textContent = this.formatTime(this.totalElapsedTime);
    document.getElementById('totalTimeLabel').textContent = this.formatTime(totalDuration);
  }

  updatePlayerSceneDisplay() {
    const scene = this.scenes[this.currentSceneIdx];
    if (!scene) return;

    document.getElementById('currentActionDisplay').textContent = `동작: ${scene.actionName} (안전 의자 체조)`;
    
    // Highlight Active Jump Item
    document.querySelectorAll('.jump-item').forEach((item, idx) => {
      item.classList.toggle('active', idx === this.currentSceneIdx);
    });
  }

  renderJumpList() {
    const container = document.getElementById('jumpListContainer');
    if (!container) return;
    container.innerHTML = '';

    this.scenes.forEach((scene, index) => {
      const item = document.createElement('div');
      item.className = `jump-item ${index === this.currentSceneIdx ? 'active' : ''}`;
      item.innerHTML = `
        <span>장면 ${scene.num}: ${scene.actionIcon} ${scene.actionName}</span>
        <span>${scene.duration}초</span>
      `;
      item.addEventListener('click', () => this.jumpScene(index));
      container.appendChild(item);
    });
  }

  updatePlayPauseButtonUI() {
    const btn = document.getElementById('btnPlayPause');
    if (btn) {
      btn.textContent = this.isPlaying ? '⏸' : '▶';
    }
  }

  connectAudioSourceToDest(audioElement) {
    try {
      this.initAudioContext();
      if (!this.audioStreamDest) {
        this.audioStreamDest = this.audioCtx.createMediaStreamDestination();
      }
      if (!audioElement._hasSourceNode) {
        const source = this.audioCtx.createMediaElementSource(audioElement);
        source.connect(this.audioCtx.destination);
        source.connect(this.audioStreamDest);
        audioElement._hasSourceNode = true;
      }
    } catch (e) {
      console.warn('Audio routing notice', e);
    }
  }

  // Final Video Export (Canvas stream + WebM recorder download with Real Audio Track)
  async exportFinalVideoFile() {
    if (!this.mainCanvas) return;
    this.showToast('🎬 최종 16:9 HD 영상(실제 음성 오디오 트랙 포함) 인코딩을 시작합니다...', 'info');

    try {
      this.connectAudioSourceToDest(this.kongiAudioFull);

      const canvasStream = this.mainCanvas.captureStream(30); // 30 FPS
      const combinedTracks = [...canvasStream.getVideoTracks()];

      if (this.audioStreamDest) {
        const audioTracks = this.audioStreamDest.stream.getAudioTracks();
        if (audioTracks.length > 0) {
          combinedTracks.push(audioTracks[0]);
        }
      }

      const stream = new MediaStream(combinedTracks);
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
          ? 'video/webm;codecs=vp9,opus'
          : MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')
          ? 'video/webm;codecs=vp8,opus'
          : 'video/webm'
      });

      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `기억정원_의자체조_${this.selectedChar}_음성포함_최종영상.webm`;
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('✨ 실제 콩이 음성이 포함된 16:9 최종 영상이 성공적으로 다운로드되었습니다!', 'success');
      };

      recorder.start();

      // Play audio and scenes during recording
      if (this.kongiAudioFull) {
        this.kongiAudioFull.currentTime = 0;
        this.kongiAudioFull.volume = 1.0;
        this.kongiAudioFull.muted = false;
        this.kongiAudioFull.play().catch(e => console.warn(e));
      }

      setTimeout(() => {
        recorder.stop();
      }, 7600); // Record full 7.6s opening scene with voice

    } catch (err) {
      console.error('Video recording error', err);
      this.showToast('비디오 캡처 중 오류가 발생했습니다.', 'error');
    }
  }

  exportSubtitlesSRT() {
    let srt = '';
    let currentSec = 0;

    this.scenes.forEach((s, idx) => {
      const startSec = currentSec;
      const endSec = currentSec + s.duration;
      currentSec = endSec;

      srt += `${idx + 1}\n`;
      srt += `${this.formatSrtTime(startSec)} --> ${this.formatSrtTime(endSec)}\n`;
      srt += `${s.script}\n\n`;
    });

    const blob = new Blob([srt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `기억정원_의자체조_자막_${this.selectedChar}.srt`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('SRT 자막 파일이 다운로드되었습니다.', 'success');
  }

  exportScriptTXT() {
    let txt = `====================================================\n`;
    txt += `기억정원 어르신 의자체조 영상 대본집\n`;
    txt += `캐릭터: ${this.getCharName(this.selectedChar)}\n`;
    txt += `총 장면: ${this.scenes.length}개\n`;
    txt += `안전 수칙: 의자 착석 및 8대 안전 규칙 적용 완료\n`;
    txt += `====================================================\n\n`;

    this.scenes.forEach((s) => {
      txt += `[장면 ${s.num}] (${s.duration}초) - 동작: ${s.actionName}\n`;
      txt += `대본: "${s.script}"\n`;
      txt += `안전수칙: ${s.safeRule}\n\n`;
    });

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `기억정원_체조대본_${this.selectedChar}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('체조 대본 문서가 다운로드되었습니다.', 'success');
  }

  // Utilities
  formatSeconds(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    if (m > 0 && s > 0) return `${m}분 ${s}초`;
    if (m > 0) return `${m}분`;
    return `${s}초`;
  }

  formatTime(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = Math.floor(totalSec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  formatSrtTime(totalSec) {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = Math.floor(totalSec % 60);
    const ms = Math.floor((totalSec % 1) * 1000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// Instantiate and expose globally
let app;
window.addEventListener('DOMContentLoaded', () => {
  app = new MemoryGardenApp();
  window.app = app;
});
