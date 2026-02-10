---
category: Operating System
curated_by: Claude Sonnet 4.5
difficulty: hard
generated: 2026-02-08
interview_frequency: high
prerequisites: [Address-Translation, Paging]
related: [Paging, Demand-Paging, TLB, Address-Translation]
sources: 1
subtopic: Virtual Memory
tags: [virtual-memory, paging, memory-management, os]
---

# Virtual Memory (가상 메모리)

## 📝 개념 정의

**실제 메모리 용량보다 커보이게 하는 기술**

**핵심:**
- 프로세스 전체가 메모리에 없어도 실행 가능
- RAM + Disk를 하나의 추상화된 메모리로 제공
- 필요한 부분만 메모리 적재, 나머지는 디스크 저장

---

## 🎯 등장 배경

### 문제점

**1. 시스템 안정성**
- 프로그램 비정상 종료 시 시스템 전체 영향

**2. 메모리 부족**
- 실제 메모리보다 큰 프로세스 실행 불가

**3. 참조 지역성**
- 전체 프로세스가 메모리에 없어도 실행 가능

### 해결

**가상 공간으로 제한**
- 프로세스별 독립된 가상 주소 공간
- 시스템 안정성 확보

---

## ✅ 가상 메모리 장점

✅ **메모리 크기 제한 없음**
- 실제 물리 메모리보다 큰 프로그램 실행 가능

✅ **멀티프로그래밍**
- 여러 프로그램 동시 실행
- CPU 이용률, 처리율 증가

✅ **I/O 감소**
- 프로그램 스왑 필요한 입출력 감소

---

## 🗺️ 가상 주소 공간 (Virtual Address Space)

### 개념

**프로세스의 논리적 메모리 공간**

**특징:**
- 0번지부터 시작
- MMU(Memory Management Unit)가 물리 주소로 변환

**구조:**
```
┌──────────┐ ← 높은 주소
│  Stack   │
├──────────┤
│   ↓      │
│          │
│   ↑      │
├──────────┤
│   Heap   │
├──────────┤
│   Data   │
├──────────┤
│   Code   │
└──────────┘ ← 0번지
```

---

## 🔧 가상 메모리 구현 기술

### 1. Demand Paging (요구 페이징)

**필요할 때만 메모리 적재**

**특징:**
- 사용되지 않는 페이지는 스왑 공간에 저장
- 메모리 절약
- 스왑 시간 감소

---

### 2. Page Replacement (페이지 교체)

**메모리 부족 시 페이지 교체**

**특징:**
- 페이지 폴트 최소화
- 알고리즘에 따라 성능 차이

---

## 📋 Demand Paging

### Valid/Invalid Bit

**페이지 위치 구분**

```
Page Table:
Page | Frame | Valid
  0  |   3   |   V   (메모리)
  1  |   -   |   I   (스왑)
  2  |   7   |   V   (메모리)
```

- **Valid**: 메모리에 존재
- **Invalid**: 스왑 공간에 존재

---

### Page Fault 처리 과정

```
1. 프로세스가 페이지 접근
   ↓
2. Page Table 확인 → Invalid
   ↓
3. Page Fault Trap 발생
   ↓
4. 스왑 공간에서 페이지 읽기 (I/O)
   ↓
5. 메모리에 적재
   ↓
6. Page Table 갱신 (Invalid → Valid)
   ↓
7. 프로세스 재시작
```

**프로세스는 I/O 완료까지 대기 상태**

---

### 성능 고려사항

#### 1. 메모리 접근 시간

**Page Fault율에 영향**

```
실제 접근 시간 = (1 - p) * 메모리 접근 시간
                + p * (Page Fault 처리 시간)

p = Page Fault율
```

**일반적으로 10배 성능 저하**

**하지만:**
- 참조 지역성으로 실제 Page Fault는 드묾
- 성능 저하 미미

---

#### 2. 스왑 공간 관리

**효율적인 I/O 제공**

✅ 큰 블록 단위 사용
✅ 파일 검색 불필요
✅ 간접 할당 미사용

**스왑 공간 사용 방법:**
- 프로세스 전체 이미지를 스왑 공간에 복사
- 요구 페이징 처리

**Read-Only 파일:**
- 스왑 아웃 시 스왑 공간에 저장 안 함
- 실행 파일에서 다시 읽기

---

## 🔄 Page Replacement

### 메모리 과할당

**문제:**
- 물리 메모리 모두 할당됨
- 빈 프레임 없음

### 해소 방법

**1. 프로세스 종료**
- ❌ 서비스 목적 위배

**2. 프로세스 스왑 아웃**
- ❌ 재적재 비용 큼
- ❌ 멀티프로그래밍 정도 낮아짐

**3. 페이지 교체 (채택)**
- ✅ 일부 페이지만 스왑
- ✅ 요구 페이징의 필수 요소

---

## 📐 Page Replacement 알고리즘

### 목표

**Page Fault 최소화**

---

### 1. FIFO (First In First Out)

**가장 오래된 페이지 교체**

**구현:**
- Queue로 관리
- 간단

**단점:**
❌ 성능 보장 안 됨
❌ Belady 모순 발생 가능

**Belady 모순:**
- 프레임 수 증가 시 Page Fault 증가

---

### 2. OPT (Optimal Page Replacement)

**앞으로 가장 오래 사용되지 않을 페이지 교체**

**특징:**
✅ Belady 모순 없음
✅ 최소 Page Fault

**단점:**
❌ 구현 불가 (미래 예측 필요)

**용도:**
- 다른 알고리즘 성능 비교 기준

---

### 3. LRU (Least Recently Used)

**가장 오래 사용되지 않은 페이지 교체**

**특징:**
✅ OPT에 근사
✅ 과거 이력 기반
✅ 실용적

**구현:**
- 시간 정보 기록
- 스택 유지

**요구사항:**
- 하드웨어 지원 필요
- 참조 시간 갱신

---

### 4. Counting

**사용 횟수 기반**

**LFU (Least Frequently Used):**
- 참조 횟수 가장 적은 페이지 교체

**MFU (Most Frequently Used):**
- 참조 횟수 가장 많은 페이지 교체

**단점:**
❌ 구현 어려움
❌ 최적 알고리즘 근사 어려움

---

## 📊 알고리즘 비교

| 알고리즘 | 구현 | 성능 | Belady 모순 |
|----------|------|------|-------------|
| **FIFO** | 쉬움 | 낮음 | 있음 |
| **OPT** | 불가 | 최고 | 없음 |
| **LRU** | 보통 | 높음 | 없음 |
| **Counting** | 어려움 | 보통 | - |

---

## 🔍 참조 지역성 (Locality of Reference)

### 개념

**프로세스가 특정 시간에 특정 부분만 집중 참조**

### 종류

**1. 시간적 지역성 (Temporal Locality)**
- 최근 참조된 항목이 곧 다시 참조됨

**2. 공간적 지역성 (Spatial Locality)**
- 참조된 항목 근처가 곧 참조됨

**효과:**
✅ Page Fault 감소
✅ 가상 메모리 효율 향상

---

## ❓ 면접 질문 예시

### Q1. 가상 메모리란 무엇인가요?

**답변:**
실제 메모리 용량보다 커보이게 하는 기술로, RAM과 디스크를 하나의 추상화된 메모리로 제공합니다. 프로세스 전체가 메모리에 없어도 실행 가능하며, 필요한 부분만 메모리에 적재하고 나머지는 디스크에 저장합니다.

### Q2. Demand Paging이란 무엇인가요?

**답변:**
필요할 때만 페이지를 메모리에 적재하는 기법입니다. 사용되지 않는 페이지는 스왑 공간에 저장하여 메모리를 절약하고, Page Fault 발생 시 스왑 공간에서 페이지를 읽어와 메모리에 적재합니다.

### Q3. Page Fault 처리 과정을 설명해주세요.

**답변:**
1) 프로세스가 Invalid 페이지 접근
2) Page Fault Trap 발생
3) 스왑 공간에서 페이지 읽기 (I/O)
4) 메모리에 적재
5) Page Table 갱신 (Invalid → Valid)
6) 프로세스 재시작
프로세스는 I/O 완료까지 대기 상태가 됩니다.

### Q4. Page Replacement 알고리즘을 설명해주세요.

**답변:**
1) FIFO: 가장 오래된 페이지 교체, 간단하지만 Belady 모순 발생
2) OPT: 앞으로 가장 오래 사용되지 않을 페이지 교체, 최적이지만 구현 불가
3) LRU: 가장 오래 사용되지 않은 페이지 교체, OPT에 근사하고 실용적
4) Counting: 사용 횟수 기반, 구현 어려움

### Q5. 참조 지역성이란 무엇인가요?

**답변:**
프로세스가 특정 시간에 특정 부분만 집중적으로 참조하는 특성입니다. 시간적 지역성(최근 참조된 항목이 다시 참조)과 공간적 지역성(참조된 항목 근처가 참조)이 있으며, 이로 인해 Page Fault가 감소하여 가상 메모리가 효율적으로 동작합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/OS/os_virtual_memory_and_demand_paging.md`
- 내용: 가상 메모리, 요구 페이징, 페이지 교체

### 추가 학습 자료

- [[OS/운영체제] 가상 메모리 (Virtual Memory)](https://4legs-study.tistory.com/51)
- [가상 메모리의 개념과 요구 페이징](https://www.youtube.com/watch?v=OPS8LSbumPU)
- [가상메모리와 요구 페이징, Valid-Invalid Bit](https://code-lab1.tistory.com/59)