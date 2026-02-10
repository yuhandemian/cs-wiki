---
category: Operating System
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: high
prerequisites:
- Paging
- TLB
related:
- Paging
- TLB
- Memory-Management
sources: 1
subtopic: Paging Smaller Table
tags:
- paging
- page-table
- multi-level
- tlb
---

# Paging: Smaller Table

## 📝 동기

**TLB가 관리할 수 있는 page보다 더 많은 page 요구**

**Page Table 메모리 공간 절약 방법**

---

## 📊 Linear Page Table 문제

### 예시: 32-bit 주소 공간

**Page 크기:** 4KB (2^12)

**Page Table Entry 크기:** 4 bytes (2^2)

**Page Table 크기:** 4MB (프로세스당)

**계산:** (2^32 / 2^12) × 2^2 = 4MB

**문제:** Page Table이 너무 커서 메모리 낭비

---

## 💡 해결 방법 1: Large Page

**Page 크기를 늘려 Page Table 크기 감소**

---

### 예시: 16KB Page

**Page 크기:** 16KB (2^14)

**Page Table 크기:** 1MB

**4MB → 1MB로 감소**

---

### 문제점

**내부 단편화 발생**

**Page 활용도 낮음 (under-utilized)**

**메모리 빨리 소모**

**완전한 해결책 아님**

---

## 💡 해결 방법 2: Hybrid (Paging + Segmentation)

**Paging과 Segmentation 결합**

---

### 구조

**base 레지스터:** Page Table 실제 주소

**bound 레지스터:** Page Table 끝

---

### 장점

**사용하지 않는 Page Table 공간 제거**

**메모리 절약**

---

### 문제점

**사용 빈도 낮지만 큰 Heap → 여전히 낭비**

**외부 단편화 재발생**

---

## 💡 해결 방법 3: Multi-level Page Tables

**실제 OS에서 사용**

**가장 효과적인 방법**

---

## 🌳 Multi-level Page Tables 개념

**Linear Page Table을 Tree 구조로 변환**

---

### 핵심 아이디어

**1. Page Table을 page 크기 단위로 분할**

**2. 유효하지 않은 page는 할당 안 함**

**3. Page Directory로 유효성 추적**

---

## 📁 Page Directory

**Page Table의 page 위치 정보**

**유효한 page 여부 정보**

---

### Page Directory Entry (PDE)

**Valid bit:** 유효 여부

**PFN:** Page Frame Number

---

### Valid/Invalid

**Invalid:** 전체 page에 유효한 entry 없음

**Valid:** 최소 하나의 유효한 PTE 존재

---

## ✅ Multi-level Page Tables 장점

### 1. 효율적 메모리 사용

**사용 중인 주소 공간에 비례하여 할당**

---

### 2. 유연한 확장

**Page Table 할당/확장 시 free page 사용**

---

## ⚠️ Multi-level Page Tables 단점

### 1. TLB Miss 시 성능 저하

**2개의 메모리 load 필요**

**1) Page Directory 접근**

**2) PTE 접근**

---

### 2. Time-Space Trade-off

**더 작은 Page Table 크기**

**더 많은 메모리 접근**

---

### 3. Increased Complexity

**구현 복잡도 증가**

---

## 🆚 방법 비교

### Large Page

**장점:** Page Table 크기 감소

**단점:** 내부 단편화

---

### Hybrid (Paging + Segmentation)

**장점:** 사용 안 하는 공간 제거

**단점:** 외부 단편화

---

### Multi-level Page Tables

**장점:** 효율적 메모리 사용

**단점:** TLB Miss 시 성능 저하

---

## ❓ 면접 질문 예시

### Q1. Page Table 크기를 줄이는 방법은?

**답변:**
Page Table 크기를 줄이는 방법은 세 가지입니다. 첫째, Page 크기를 늘려 Page Table 크기를 감소시키지만 내부 단편화가 발생합니다. 둘째, Paging과 Segmentation을 결합하여 사용하지 않는 공간을 제거하지만 외부 단편화가 재발생합니다. 셋째, Multi-level Page Tables을 사용하여 효율적으로 메모리를 사용하지만 TLB Miss 시 성능이 저하됩니다.

### Q2. Multi-level Page Tables란 무엇인가요?

**답변:**
Multi-level Page Tables은 Linear Page Table을 Tree 구조로 변환하는 방법입니다. Page Table을 page 크기 단위로 분할하고, 유효하지 않은 page는 할당하지 않으며, Page Directory로 유효성을 추적합니다. 실제 OS에서 사용되는 가장 효과적인 방법입니다.

### Q3. Page Directory란 무엇인가요?

**답변:**
Page Directory는 Page Table의 page가 어디에 있는지, 해당 page에 유효한 entry가 있는지 알려주는 구조입니다. Page Directory Entry(PDE)는 Valid bit와 PFN을 가지며, Valid는 최소 하나의 유효한 PTE가 존재함을, Invalid는 전체 page에 유효한 entry가 없음을 의미합니다.

### Q4. Multi-level Page Tables의 장단점은?

**답변:**
장점은 사용 중인 주소 공간에 비례하여 Page Table을 할당하여 메모리를 효율적으로 사용하고, Page Table 할당/확장 시 free page를 사용할 수 있습니다. 단점은 TLB Miss 시 Page Directory와 PTE 접근을 위해 2개의 메모리 load가 필요하여 성능이 저하되고, 구현 복잡도가 증가합니다.

### Q5. Time-Space Trade-off란?

**답변:**
Time-Space Trade-off는 Multi-level Page Tables에서 발생하는 현상으로, Page Table 크기는 작아지지만(Space 절약) TLB Miss 시 메모리 접근 횟수가 증가하여 시간이 더 걸립니다(Time 증가). 메모리 공간과 시간 성능 사이의 균형을 맞춰야 합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/OS/os_smaller_table.md`
- 내용: Page Table 크기 줄이기, Multi-level Page Tables

### 추가 학습 자료

- [Operating Systems Three Easy Pieces](https://www.amazon.com/Operating-Systems-Three-Easy-Pieces/dp/198508659X)
- [Paging 기법의 Page Table 크기 줄이기](https://icksw.tistory.com/150)
- [Paging Smaller Tables 정리](https://fancy96.github.io/OS-20-Paging-Smaller-Tables/)