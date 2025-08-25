# Kobridge - AI 기반 언어 학습 플랫폼

<div align="center">
  <img src="/public/icons/logo.svg" alt="Kobridge Logo" width="200"/>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![PWA](https://img.shields.io/badge/PWA-Enabled-green?style=flat-square&logo=pwa)](https://web.dev/progressive-web-apps/)
</div>

## 📖 프로젝트 소개

**KoBridge**는 다문화 초등학생의 한국어 능력 향상을 위한 AI 기반 한국어 학습 웹앱입니다. 현재 국내 다문화 학생은 약 19만 3,814명으로 전체 학생의 3.8%를 차지하며, 이들의 가장 큰 문제는 한국어 능력 부족으로 인한 의사소통 문제입니다.

KoBridge는 게이미피케이션 AI 챗봇을 활용하여 학생이 서비스 내 캐릭터와 소통하며 즐겁게 한국어를 배울 수 있도록 설계되었습니다. 학교 생활, 좋아하는 것 등 학생의 생활에 밀접한 주제를 학습 내용으로 선정하여 흥미도와 참여도를 높이고, 공통교육과정과 연계할 수 있도록 구성했습니다.

### 🎯 개발 배경 및 목적

- **다문화 학생 증가**: 2024년 기준 국내 다문화 학생 약 19만 3,814명 (전체 학생의 3.8%)
- **의사소통 문제**: 한국어 능력 부족으로 인한 학습 부진과 학교 부적응
- **교육 수요**: 경기도교육청 여론조사에서 다문화 가정 학생에게 필요한 교육 1순위로 한국어 교육(55%) 선정
- **AI 기술 활용**: 게이미피케이션 AI 챗봇의 언어 학습 효과성 연구 결과 기반

### 👥 타것 사용자

**다문화 초등학생**을 주 타것으로 선정했습니다. 전체 다문화 학생 중 약 60%(11만 7,459명)를 차지하는 다문화 초등학생들은 의사소통의 어려움, 학업 수행 문제, 심리·정서적 문제로 학교 적응에 어려움을 겪고 있어, 한국어 능력 향상을 통해 의사소통 문제를 해결하고 학교 적응에 도움을 줄 필요가 있습니다.

### 🌟 주요 특징

- **AI 기반 음성 인식**: Deepgram을 활용한 실시간 음성-텍스트 변환
- **자연스러운 음성 합성**: Google Cloud TTS를 통한 고품질 음성 출력
- **게이미피케이션 학습**: 스테이지별 단계적 학습 시스템
- **실시간 대화 연습**: AI 캐릭터와의 음성 대화를 통한 실습
- **이중언어 지원**: 모국어와 한국어를 함께 제공하여 이해도 향상
- **PWA 지원**: 모바일 앱과 같은 사용자 경험 제공
- **생활 밀착형 주제**: 학교 생활, 좋아하는 것 등 실용적인 학습 내용

## 🛠 기술 스택

### Frontend

- **Next.js 15.3.5** - React 기반 풀스택 프레임워크
- **React 19.0.0** - 사용자 인터페이스 라이브러리
- **TypeScript 5.0** - 정적 타입 검사
- **Tailwind CSS 4.1.11** - 유틸리티 우선 CSS 프레임워크
- **Framer Motion 12.23.12** - 애니메이션 라이브러리

### State Management

- **Zustand 5.0.7** - 경량 상태 관리 라이브러리

### AI & Voice Services

- **Deepgram SDK 4.11.2** - 음성 인식(STT) 서비스
- **Google Cloud Text-to-Speech 6.2.0** - 음성 합성(TTS) 서비스

### Development Tools

- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **next-pwa** - Progressive Web App 지원

## 🚀 주요 기능

### 1. 언어 선택

- **이중언어 지원**: 한국어 해석에 도움을 받을 수 있는 모국어를 선택할 수 있습니다
- **다국어 인터페이스**: 한국어, 영어, 베트남어 등 다양한 언어로 서비스 이용 가능

### 2. 온보딩 시스템

- **사용자 정보 입력**: 이름, 나이, 학교, 학년 정보 수집
- **음성 캐릭터 선택**: 개인화된 학습 경험을 위한 캐릭터 선택

### 3. 단계별 한국어 학습

- **게이미피케이션 스테이지**: 학습 단계에 맞춰 한국어를 학습할 수 있는 스테이지 시스템
- **생활 밀착형 주제**: 학교 생활, 좋아하는 것 등 학생의 생활에 밀접한 주제로 구성

### 4. 학습 단계 구성

각 스테이지는 다음과 같은 3단계로 구성됩니다:

- **표현 따라하기**: 기본 한국어 표현을 따라하며 발음 연습
- **대화를 통해 표현 익히기**: AI 캐릭터와의 대화를 통해 표현을 실전적으로 학습
- **학습 내용 복습 마무리**: 학습한 내용을 복습하고 정리

### 5. 캐릭터와 자유 대화하기

- **전화 통화 형식**: 실제 전화 통화처럼 캐릭터와 대화를 주고받으며 회화 실력 향상
- **음성 인식**: 사용자의 발음을 실시간으로 인식하고 피드백 제공
- **일일 통화 제한**: 학습 동기 부여를 위한 일일 통화 횟수 관리

### 6. 한국어 표현 저장 및 관리

- **북마크 기능**: 학습 중 북마크 아이콘을 통해 유용한 한국어 표현을 저장
- **저장된 표현 확인**: 단어별/문장별로 저장된 표현을 체계적으로 관리하고 복습

## 📱 PWA 기능

- **오프라인 지원**: 서비스 워커를 통한 오프라인 기능
- **앱 설치**: 모바일 홈 화면에 앱으로 설치 가능

## 🏗 프로젝트 구조

```
frontend/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   │   ├── deepgram/      # 음성 인식 API
│   │   └── tts/           # 음성 합성 API
│   ├── main/              # 메인 애플리케이션
│   │   ├── my-learning/   # 학습 페이지
│   │   ├── conversation/  # 대화 연습
│   │   └── my-page/       # 사용자 페이지
│   └── onboarding/        # 온보딩 플로우
├── components/            # 재사용 가능한 컴포넌트
├── stores/               # Zustand 상태 관리
├── constants/            # 상수 및 설정
├── hooks/               # 커스텀 훅
└── utils/               # 유틸리티 함수
```


