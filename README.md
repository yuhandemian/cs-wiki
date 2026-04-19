# CS Wiki

106개 큐레이션 CS 문서로 구성된 학습 효율 극대화 Wiki 서비스

## 🚀 시작하기

```bash
cd cs-wiki
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 📁 프로젝트 구조

```
cs-wiki/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 전체 레이아웃
│   ├── page.tsx            # 홈 페이지
│   └── wiki/[category]/[slug]/  # 동적 라우팅
├── components/
│   ├── Header.tsx          # 상단 헤더
│   ├── Navigation.tsx      # 좌측 네비게이션
│   └── MDXContent.tsx      # MDX 렌더러
├── content/                # Markdown 문서 (106개)
│   ├── Algorithm/          # 12개
│   ├── Data-Structure/     # 3개
│   ├── Database/           # 17개
│   ├── Java/               # 17개
│   ├── Network/            # 15개
│   ├── Operating-System/   # 19개
│   └── Spring/             # 14개
├── lib/
│   ├── mdx.ts              # MDX 파싱 유틸
│   └── search.ts           # 검색 기능
└── out/                    # 정적 빌드 출력
```

## 🛠️ 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| MDX | next-mdx-remote |
| Code Highlight | rehype-highlight |
| Icons | Lucide React |

## ✨ 주요 기능

- 🔍 **카테고리별 트리 네비게이션**
- 📚 **106개 큐레이션 CS 문서**
- 🎨 **MDX 렌더링 + 코드 하이라이팅**
- 🏷️ **메타데이터**: 난이도, 태그, 관련 문서, 면접 빈도
- 📱 **반응형 디자인**

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
