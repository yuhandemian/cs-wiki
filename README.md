# CS Wiki

> 97개의 큐레이션 CS 문서를 제공하는 인터랙티브 학습 플랫폼

[![Deploy](https://github.com/yuhandemian/cs-wiki/actions/workflows/deploy.yml/badge.svg)](https://github.com/yuhandemian/cs-wiki/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

**🔗 배포 URL**: [https://yuhandemian.github.io/cs-wiki/](https://yuhandemian.github.io/cs-wiki/)

---

## 📌 프로젝트 소개

CS Wiki는 컴퓨터 과학의 핵심 개념들을 체계적으로 학습할 수 있도록 설계된 지식 베이스 플랫폼입니다. 
**Lunr.js 전문 검색 엔진**으로 필요한 정보를 빠르게 찾을 수 있습니다.

### 🎯 주요 특징

- **97개의 큐레이션 문서**: Algorithm, Database, Java, Spring, Network, OS 등 7개 카테고리
- **전문 검색 엔진**: 제목, 태그, 본문을 포함한 전체 문서 검색 (Lunr.js)
- **메타데이터 기반 학습**: 난이도, 선행 학습, 관련 문서, 면접 빈도 정보 제공
- **반응형 디자인**: 데스크톱/모바일 최적화 UI

---

## ✨ 주요 기능

### 1️⃣ 전문 검색 (`Cmd/Ctrl + K`)
- Lunr.js 기반 클라이언트 사이드 전체 문서 검색
- 제목, 태그, 본문 내용을 포괄하는 멀티 필드 검색
- 실시간 검색 결과 프리뷰 및 키보드 내비게이션

### 2️⃣ MDX 문서 렌더링
- `next-mdx-remote`로 동적 MDX 컴포넌트 렌더링
- 커스텀 Tailwind CSS 스타일링
- 코드 블록 하이라이팅 및 반응형 레이아웃

### 3️⃣ 스마트 메타데이터
```yaml
difficulty: medium          # 학습 난이도
prerequisites: [Paging]     # 선행 학습 필요 문서
related: [TLB, Segmentation] # 연관 문서
interview_frequency: high   # 기술 면접 출제 빈도
```

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| **Framework** | Next.js 16.1.6 (App Router, Static Export) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS |
| **Search** | Lunr.js 2.3.9 (Full-text Search) |
| **Content** | MDX (next-mdx-remote 5.0) |
| **Deploy** | GitHub Pages (GitHub Actions CI/CD) |

### 주요 구현 사항

- **Static Site Generation (SSG)**: 빌드 타임에 모든 페이지 사전 렌더링
- **클라이언트 사이드 검색**: 서버 없이 브라우저에서 전문 검색 수행
- **React 기반 D3 통합**: D3 시뮬레이션과 React 상태 관리 분리 설계
- **Git-based Content Management**: Markdown 파일로 버전 관리

---

## 📁 프로젝트 구조

```
cs-wiki/
├── app/
│   ├── page.tsx                 # 홈페이지
│   └── wiki/[category]/[slug]/  # 동적 문서 라우팅
├── components/
│   ├── Search.tsx               # Lunr.js 검색 UI
│   ├── Navigation.tsx           # 사이드바 네비게이션
│   └── MDXContent.tsx           # MDX 렌더러
├── lib/
│   ├── mdx.ts                   # MDX 파싱 및 메타데이터 추출
│   └── search.ts                # Lunr.js 검색 인덱스 로더
├── scripts/
│   ├── generate-search-index.mjs  # 빌드 시 검색 인덱스 생성
├── content/                     # Markdown 문서 (97개)
│   ├── Algorithm/
│   ├── Data-Structure/
│   ├── Database/
│   ├── Java/
│   ├── Network/
│   ├── Operating-System/
│   └── Spring/
└── public/
    ├── search-index.json        # Lunr 검색 인덱스
```

---

## 🚀 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
# → http://localhost:3000

# 프로덕션 빌드
npm run build

# 정적 파일 확인
npm start
```

---

## 🔍 기술적 도전 과제 해결

### 1. 클라이언트 사이드 전문 검색 구현
- **문제**: 서버 없이 97개 문서 전체 검색 필요
- **해결**: 빌드 타임에 Lunr.js 인덱스 생성, 클라이언트에서 역직렬화하여 검색

### 2. GitHub Pages basePath 이슈
- **문제**: 개발/프로덕션 환경에서 다른 basePath 필요
- **해결**: 환경 변수 기반 동적 basePath 설정

```typescript
// next.config.ts
basePath: process.env.NODE_ENV === 'production' ? '/cs-wiki' : ''
```

---

## 🤖 AI 하네스 엔지니어링 (Harness Engineering)

이 프로젝트는 AI 어시스턴트(Anti Gravity)가 독립적이고 안정적으로 문서를 작성 및 관리할 수 있도록 **하네스 엔지니어링(Harness Engineering)** 환경을 도입했습니다.
하네스 엔지니어링이란 AI가 실수 없이 정해진 규칙 안에서 작업하도록 "제약(Constraints)"을 강제하고, 작업 결과를 스스로 검증하는 "피드백 루프(Feedback Loops)"를 시스템적으로 구축하는 방법론입니다.

### 1. 명확한 규칙 제약 (Constraints)
- 프로젝트 루트에 `.cursorrules` 파일을 배치했습니다. AI는 작업을 시작하기 전에 이를 기준점으로 삼아 프레임워크 제약(Next.js Static Export), 필수 메타데이터 형식 등의 아키텍처 규칙을 철저하게 준수해야 합니다.

### 2. 피드백 루프: 스스로 실행하는 Linter와 Link Checker
- AI 에이전트가 직접 터미널 명령어(`npm run lint:md`, `npm run test:links`)를 실행해 자신의 결과물을 검증할 수 있도록 스크립트 도구들이 연동되어 있습니다.
- 코드를 고치거나 문서를 추가한 뒤, AI가 이 스크립트를 능동적으로 실행하고, 에러나 깨진 링크를 발견하면 스스로 코드를 다시 고치는 **자가 점검(Self-Correction) 순환 구조**를 완성했습니다.

> **💡 Linter(린터)란?**
> 소스 코드를 실행하기 전에 코드의 문법 오류, 들여쓰기/띄어쓰기 등 팀 규칙 위반, 잠재적 버그 등을 찾아내 미리 알려주는 정적 분석 도구입니다. 이 프로젝트는 마크다운용 린터(`markdownlint`)를 설정해 방대한 양의 위키 문서들이 일관된 퀄리티를 유지하도록 통제합니다.

---

## 📊 프로젝트 통계

- **총 문서 수**: 97개
- **카테고리**: 7개 (Algorithm, Data-Structure, Database, Java, Network, OS, Spring)
- **검색 인덱스 크기**: ~200KB

---

## 📄 라이선스

MIT License

---

## 👤 개발자

**박유한**  
- GitHub: [@yuhandemian](https://github.com/yuhandemian)
- Project: [CS Wiki](https://yuhandemian.github.io/cs-wiki/)
