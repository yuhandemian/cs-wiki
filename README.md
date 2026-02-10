# CS Wiki

106개 큐레이션 CS 문서로 구성된 학습 효율 극대화 Wiki + Graph 탐색 서비스

## 🚀 시작하기

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

### 빌드

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
cs-wiki-web/
├── app/
│   ├── layout.tsx           # 전체 레이아웃
│   ├── page.tsx             # 홈 페이지
│   └── wiki/
│       └── [category]/
│           ├── page.tsx     # 카테고리 페이지
│           └── [slug]/
│               └── page.tsx # 문서 페이지
├── components/
│   ├── Navigation.tsx       # 좌측 네비게이션
│   ├── Header.tsx           # 상단 헤더
│   └── MDXContent.tsx       # MDX 렌더러
├── lib/
│   └── mdx.ts              # MDX 파싱 유틸
└── content/                # Markdown 문서 (106개)
    ├── algorithm/
    ├── data-structure/
    ├── database/
    ├── java/
    ├── network/
    ├── operating-system/
    └── spring/
```

## ✨ 주요 기능

- 🔍 **빠른 문서 탐색**: 카테고리별 트리 네비게이션
- 📚 **106개 큐레이션 문서**: 고품질 CS 지식 베이스
- 🎨 **MDX 렌더링**: 커스텀 스타일링 및 컴포넌트
- 🏷️ **메타데이터**: 난이도, 태그, 관련 문서, 면접 빈도
- 📱 **반응형 디자인**: 모바일 최적화

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **MDX**: next-mdx-remote
- **Icons**: Lucide React

## 📝 문서 메타데이터 형식

```yaml
---
category: Operating System
subtopic: Paging
tags: [os, memory, virtual-memory]
related: [Address-Translation, Virtual-Memory]
difficulty: medium
prerequisites: [Address-Space]
interview_frequency: high
---
```

## 🔜 다음 단계

- [ ] 개념 그래프 시각화 (D3.js)
- [ ] 검색 기능 (Lunr.js)
- [ ] 다크 모드
- [ ] 취약 개념 추적

## 📄 라이선스

MIT
