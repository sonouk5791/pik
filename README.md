# 🌸 기억정원 AI 영상 만들기 (Memory Garden AI Video Studio)

> **대본만 입력하면 자동으로 어르신 의자체조 영상을 완성하는 웹 기반 AI 영상 제작 플랫폼**

[![Vercel Live Demo](https://img.shields.io/badge/Vercel-Live%20Demo-brightgreen?logo=vercel)](https://temporary-flying-quartz-z5qlfiq.vercel.app)
[![Node.js](https://img.shields.io/badge/Node.js-v24.19.0-green?logo=node.js)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌐 라이브 배포 주소 (Vercel)

- **Vercel 실시간 접속 주소**: [https://temporary-flying-quartz-z5qlfiq.vercel.app](https://temporary-flying-quartz-z5qlfiq.vercel.app)
- **Vercel 영구 계정 연결(Claim)**: [https://vercel.com/claim-deployment?code=1b29d3e3-1a18-407b-b7e9-3c2f479ab839](https://vercel.com/claim-deployment?code=1b29d3e3-1a18-407b-b7e9-3c2f479ab839)

---

## 📋 프로젝트 개요

**기억정원 AI 영상 만들기**는 복잡한 영상 편집 프로그램 없이, 사용자가 대본 텍스트만 입력하면 AI가 문맥을 분석하여 어르신 의자체조 동작을 매칭하고, 캐릭터 외형 일관성 락(Identity Lock), 음성 합성(TTS), 실시간 립싱크(A/O/I), 배경음악 자동 감쇄(Auto-Ducking), 고대비 자막을 합성하여 16:9 와이드 비디오로 완성해 주는 플랫폼입니다.

특히 **콩이 코치가 사각 스티커처럼 따로 붕 떠있지 않고, 주간보호센터에서 어르신들과 동그랗게 둘러앉아 한마음으로 손 흔들기, 양팔 올리기, 박수치기를 함께 호흡하며 체조하는 일체형 씬**으로 구현되었습니다.

---

## ✨ 핵심 기능

1. **간결한 5단계 원클릭 제작 워크플로우**
   - **Step 1**: 캐릭터 선택 (콩이, 토리, 나비, 곰이, 직접 등록) + 외형 100% 일관성 락 + 음성/BGM 설정
   - **Step 2**: 중앙 대형 대본 입력창 + 추천 예시 대본 버튼 + 실시간 글자수/시간 분석 + [✨ AI 장면 분석하기]
   - **Step 3**: AI 자동 장면 분할 + 체조 동작 자동 매칭 + **드래그 앤 드롭 카드 순서 변경** + [수정/삭제/재생성]
   - **Step 4**: [🎬 첫 장면 테스트 (5~8초)] 검증 → 통과 후 [🚀 전체 영상 만들기] 언락 + 진행률 카운터(`7/20 완료, 35%`) + 개별 오류 복구
   - **Step 5**: 16:9 시네마 플레이어 + 실시간 립싱크 + 어르신 호응 말풍선 + **최종 비디오(WebM/MP4) / SRT 자막 / TXT 대본집 다운로드**

2. **어르신과 함께하는 일체형 체조 씬**
   - 콩이가 "콩이 선생님" 전용 의자에 앉아 있고, 주변 할머니·할아버지 어르신들이 둘러앉아 같은 체조 동작을 동시에 수행
   - 체조 중 어르신들의 다정한 호응 말풍선(*"어이쿠 시원하다~ 👵"*, *"콩이 선생님 덕분에 기운 나네! 👴"*, *"짝짝짝! 👏"*) 연출

3. **어르신 의자체조 필수 8대 안전 수칙 100% 적용**
   - 🪑 의자 착석 상태 유지
   - 🚫 점프 동작 금지
   - 🚫 빠른 회전 금지
   - 🚫 과도한 허리 비틀기 금지
   - 🚫 빠른 목 돌리기 금지
   - 🚫 한 발 서기 금지
   - 🚫 무리한 다리 올리기 금지
   - 🌿 천천히 반복 & 중간 휴식 안내 포함

4. **스마트 오디오 & 자동 덕킹(Auto-Ducking)**
   - 대본을 읊을 때 배경음악 볼륨이 자동으로 -70% 감소하여 음성을 또렷하게 전달
   - Web Speech API 및 내장 힐링 피아노 & 체조 리듬 신디사이저 탑재

5. **상용화 프로젝트 관리**
   - 콩이 5분 체조, 토리 10분 체조 등 기본 프리셋 제공
   - 로컬 저장소 저장 및 JSON 파일 백업/불러오기 지원

---

## 📂 프로젝트 구조

```
pik/
├── index.html          # 메인 UI 구조 및 시네마 플레이어 마크업
├── style.css           # 따뜻한 기억정원 테마 CSS 및 반응형 디자인 시스템
├── main.js             # 클라이언트 핵심 엔진 (AI 분석, 립싱크, 캔버스 렌더러, 녹화)
├── app.js              # 메인 스크립트 복사본
├── server.js           # 로컬 HTTP 정적 서버 (범용 MIME 및 오디오/비디오 Range 지원)
├── vercel.json         # Vercel 정적 배포 설정
├── .vercelignore       # Vercel 배포 제외 설정
├── assets/             # 고화질 마스코트 캐릭터 및 어르신 일체형 체조 씬 이미지
│   ├── char_kongi.jpg
│   ├── char_tori.jpg
│   ├── char_nabi.jpg
│   ├── char_gomi.jpg
│   ├── bg_daycare.jpg
│   ├── bg_garden.jpg
│   ├── bg_livingroom.jpg
│   ├── scene_together_wave.jpg      # 어르신과 함께 손 흔들기
│   ├── scene_together_arms_up.jpg   # 어르신과 함께 양팔 올리기
│   ├── scene_together_arms_side.jpg # 어르신과 함께 양팔 벌리기
│   ├── scene_together_clap.jpg      # 어르신과 함께 박수치기
│   └── scene_together_breath.jpg    # 어르신과 함께 심호흡하기
└── WORK_LOG_2026-09-30.md # 금일 개발 작업 일지
```

---

## 💻 로컬 실행 방법

Node.js 환경에서 별도의 외부 패키지 설치 없이 즉시 실행할 수 있습니다:

```bash
# 로컬 개발 서버 실행
node dev-server.js

# 브라우저 접속
http://127.0.0.1:3000
```

---

## 🚀 배포 정보 및 GitHub 리포지토리
- **GitHub 공식 저장소**: https://github.com/sonouk5791/pik
- **Vercel 프로덕션 라이브 URL**: https://pik-woad.vercel.app/

### 라이브 배포 및 리포지토리
- **GitHub 저장소**: https://github.com/sonouk5791/pik
- **Vercel 프로덕션 라이브 URL**: https://pik-woad.vercel.app/

### GitHub 푸시 가이드
```bash
git add .
git commit -m "feat: 업데이트 내용 요약"
git push origin main
```
