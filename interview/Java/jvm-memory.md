---
title: "JVM의 구조와 메모리 영역에 대해 설명해주세요."
difficulty: "intermediate"
frequency: "high"
---

## 핵심 답변
JVM은 자바 애플리케이션을 OS에 구애받지 않고 실행할 수 있게 해주는 가상 머신입니다. 구조는 크게 클래스 로더, 실행 엔진, 가비지 컬렉터, 런타임 데이터 영역으로 나뉩니다. 런타임 데이터 영역 중 공유되는 공간으로는 언제나 접근 가능한 Method Area와 객체들이 할당되는 Heap Area가 있고, 스레드마다 개별적으로 생성되는 공간으로는 Stack, PC Register, Native Method Stack이 있습니다.

## 꼬리 질문
- **Q. 가비지 컬렉션(GC)의 원리와 자주 쓰이는 GC 알고리즘에 대해 설명해주세요.**
  - A: 동적으로 할당된 메모리 영역 중 사용되지 않는 영역(unreachable)을 탐지하여 해제합니다. 현대 자바버전에서는 보통 G1 GC나 ZGC가 많이 쓰이며 레거시는 CMS, Parallel GC를 씁니다.
- **Q. Java 8 이후 메모리 구조에서 달라진 점이 있다면 무엇인가요?**
  - A: Method Area에 존재하던 PermGen 영역이 완전히 제거되고 Native 메모리를 사용하는 Metaspace로 대체되었습니다.
