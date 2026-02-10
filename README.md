# CS Wiki

> 97개의 큐레이션 CS 문서와 지식 그래프 시각화를 제공하는 인터랙티브 학습 플랫폼

[![Deploy](https://github.com/yuhandemian/cs-wiki/actions/workflows/deploy.yml/badge.svg)](https://github.com/yuhandemian/cs-wiki/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

**🔗 배포 URL**: [https://yuhandemian.github.io/cs-wiki/](https://yuhandemian.github.io/cs-wiki/)

---

## 📌 프로젝트 소개

CS Wiki는 컴퓨터 과학의 핵심 개념들을 체계적으로 학습할 수 있도록 설계된 지식 베이스 플랫폼입니다. 
단순한 문서 뷰어를 넘어 **D3.js 기반의 지식 그래프 시각화**를 통해 개념 간의 관계를 직관적으로 탐색할 수 있으며, 
**Lunr.js 전문 검색 엔진**으로 필요한 정보를 빠르게 찾을 수 있습니다.

### 🎯 주요 특징

- **97개의 큐레이션 문서**: Algorithm, Database, Java, Spring, Network, OS 등 7개 카테고리
- **인터랙티브 지식 그래프**: D3.js Force Simulation으로 개념 간 연관성 시각화
- **전문 검색 엔진**: 제목, 태그, 본문을 포함한 전체 문서 검색 (Lunr.js)
- **메타데이터 기반 학습**: 난이도, 선행 학습, 관련 문서, 면접 빈도 정보 제공
- **반응형 디자인**: 데스크톱/모바일 최적화 UI

---

## ✨ 주요 기능

### 1️⃣ 지식 그래프 시각화 (`/graph`)
- **D3.js Force-Directed Graph**로 97개 문서의 관계를 실시간 렌더링
- 카테고리별 필터링 및 줌/팬 인터랙션
- Prerequisite(선행 학습) 및 Related(관련 문서) 링크 시각화
- 모바일에서는 카테고리별 리스트 뷰 자동 전환

### 2️⃣ 전문 검색 (`Cmd/Ctrl + K`)
- Lunr.js 기반 클라이언트 사이드 전체 문서 검색
- 제목, 태그, 본문 내용을 포괄하는 멀티 필드 검색
- 실시간 검색 결과 프리뷰 및 키보드 내비게이션

### 3️⃣ MDX 문서 렌더링
- `next-mdx-remote`로 동적 MDX 컴포넌트 렌더링
- 커스텀 Tailwind CSS 스타일링
- 코드 블록 하이라이팅 및 반응형 레이아웃

### 4️⃣ 스마트 메타데이터
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
| **Data Visualization** | D3.js 7.9.0 (Force Simulation) |
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
│   ├── graph/page.tsx           # 지식 그래프 페이지
│   └── wiki/[category]/[slug]/  # 동적 문서 라우팅
├── components/
│   ├── ForceGraph.tsx           # D3 Force Graph 컴포넌트
│   ├── Search.tsx               # Lunr.js 검색 UI
│   ├── Navigation.tsx           # 사이드바 네비게이션
│   └── MDXContent.tsx           # MDX 렌더러
├── lib/
│   ├── mdx.ts                   # MDX 파싱 및 메타데이터 추출
│   └── search.ts                # Lunr.js 검색 인덱스 로더
├── scripts/
│   ├── generate-search-index.mjs  # 빌드 시 검색 인덱스 생성
│   └── generate-graph-data.mjs    # 그래프 데이터 생성
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
    └── graph-data.json          # D3 그래프 데이터
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

### 1. D3.js와 React의 선언적 렌더링 통합
- **문제**: D3의 명령형 DOM 조작과 React의 선언적 렌더링 충돌
- **해결**: D3는 forceSimulation 계산만 담당, SVG 렌더링은 React JSX로 분리

### 2. 클라이언트 사이드 전문 검색 구현
- **문제**: 서버 없이 97개 문서 전체 검색 필요
- **해결**: 빌드 타임에 Lunr.js 인덱스 생성, 클라이언트에서 역직렬화하여 검색

### 3. GitHub Pages basePath 이슈
- **문제**: 개발/프로덕션 환경에서 다른 basePath 필요
- **해결**: 환경 변수 기반 동적 basePath 설정

```typescript
// next.config.ts
basePath: process.env.NODE_ENV === 'production' ? '/cs-wiki' : ''
```

---

## 📊 프로젝트 통계

- **총 문서 수**: 97개
- **카테고리**: 7개 (Algorithm, Data-Structure, Database, Java, Network, OS, Spring)
- **그래프 노드**: 97개
- **그래프 링크**: 150+ (prerequisite + related)
- **검색 인덱스 크기**: ~200KB

---

## 📄 라이선스

MIT License

---

## 👤 개발자

**박유한**  
- GitHub: [@yuhandemian](https://github.com/yuhandemian)
- Project: [CS Wiki](https://yuhandemian.github.io/cs-wiki/)
