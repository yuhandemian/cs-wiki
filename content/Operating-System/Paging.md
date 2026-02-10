---
category: Operating System
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Paging
tags: []
---

# Paging

## 📝 Paging이란?

**프로세스의 가상 주소 공간을 고정 크기로 나누어 메모리에 할당하는 방식**

**Page:** 가상 메모리의 고정 크기 단위

**Page Frame:** 실제 메모리의 고정 크기 단위

---

## ✅ Paging의 장점

### 1. Flexibility (유연성)

**주소 공간의 추상화를 효율적으로 지원**

**Heap과 Stack 크기 고민 불필요**

---

### 2. Simplicity (단순성)

**여유 공간(free-space) 관리 용이**

**Page와 Page Frame이 같은 크기**

**할당 쉽고 여유 공간 유지**

---

## 📊 Simple Paging 예시

**128-byte 실제 메모리 with 16 bytes page frames**

**64-byte 가상 주소 공간 with 16 bytes pages**

**4개의 page → 8개의 page frame**

---

## 📋 Page Table

**가상 주소 공간의 page가 실제 메모리 어디에 위치하는지 기록**

**Per-process structure (프로세스별 구조)**

**OS 메모리 영역에 저장**

---

## 🔄 주소 변환 (Address Translation)

### 가상 주소 구성

**VPN (Virtual Page Number):** 상위 비트

**Offset:** 하위 비트 (page 내 위치)

---

### 예시: 64-byte 주소 공간

**가상 주소 21**

**VPN:** 01 (상위 2비트)

**Offset:** 5 (하위 4비트)

---

### 변환 과정

```
1. VPN으로 Page Table 인덱싱
2. PFN (Physical Frame Number) 획득
3. PFN + Offset으로 실제 메모리 주소 계산
```

---

## 📏 Page Table 크기 문제

### 예시: 32-bit 주소 공간, 4KB page

**VPN:** 20 bit (2^32 / 2^12 = 2^20)

**Offset:** 12 bit

**Page Table 크기:** 4MB (2^20 entries × 4 bytes)

**문제:** 각 프로세스마다 4MB 필요

---

## 📄 Page Table Entry (PTE)

**Page Table의 각 page 정보**

---

### PTE 구성 요소

**Present bit:** 실제 메모리/디스크 존재 여부

**Read/Write bit:** 쓰기 허용 여부

**U/S bit:** User Mode 접근 가능 여부

**Accessed bit:** 최근 참조 여부 (페이지 교체 정책)

**Dirty bit:** 수정 여부

**PFN:** Page Frame Number (실제 주소)

---

## ⚠️ Paging의 문제점

### 문제 1: 큰 Page Table 크기

**Segment table이나 base/bound보다 훨씬 큼**

**각 프로세스마다 필요**

---

### 문제 2: 성능 저하

**메모리 접근마다 추가 메모리 참조 필요**

**주소 변환 정보 획득을 위한 오버헤드**

---

### 주소 변환 과정

```
1. VPN으로 Page Table에서 PTE 획득 (메모리 접근 1)
2. PTE에서 PFN 추출
3. PFN + Offset으로 실제 데이터 접근 (메모리 접근 2)
```

**총 2번의 메모리 접근 필요**

---

## 💡 해결책: TLB

**Translation Lookaside Buffer**

**Page Table 캐시**

**메모리 접근 횟수 감소**

---

## ❓ 면접 질문 예시

### Q1. Paging이란 무엇인가요?

**답변:**
Paging은 프로세스의 가상 주소 공간을 고정 크기(page)로 나누어 메모리에 할당하는 방식입니다. 가상 메모리에서는 page, 실제 메모리에서는 page frame이라고 불리는 고정 크기 공간으로 프로세스를 실행합니다. Segmentation의 외부 단편화 문제를 해결하고 유연성을 제공합니다.

### Q2. Paging의 장점은?

**답변:**
Paging의 장점은 첫째, 주소 공간의 추상화를 효율적으로 지원하여 Heap과 Stack 크기를 고민할 필요가 없습니다. 둘째, 여유 공간 관리가 쉽습니다. Page와 Page Frame이 같은 크기를 가져 할당이 쉽고 여유 공간을 유지하기 용이합니다.

### Q3. Page Table이란 무엇인가요?

**답변:**
Page Table은 가상 주소를 실제 메모리 주소로 매핑할 때 사용되는 자료 구조입니다. 가상 주소 공간의 page가 실제 메모리 어디에 위치하는지 기록하며, 프로세스별로 존재하고 OS 메모리 영역에 저장됩니다.

### Q4. Paging의 주소 변환 과정을 설명해주세요.

**답변:**
가상 주소는 VPN(Virtual Page Number)과 Offset으로 구성됩니다. VPN으로 Page Table을 인덱싱하여 PFN(Physical Frame Number)을 획득하고, PFN과 Offset을 결합하여 실제 메모리 주소를 계산합니다.

### Q5. Paging의 문제점은?

**답변:**
Paging의 문제점은 첫째, Page Table 크기가 매우 클 수 있습니다. 예를 들어 32-bit 주소 공간에 4KB page를 사용하면 프로세스당 4MB의 Page Table이 필요합니다. 둘째, 메모리 접근마다 주소 변환을 위한 추가 메모리 참조가 필요하여 성능이 저하됩니다. 이를 해결하기 위해 TLB를 사용합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: [os_paging.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/OS/os_paging.md)
- 내용: Paging, Page Table, 주소 변환

### 추가 학습 자료

- [Operating Systems Three Easy Pieces](https://www.amazon.com/Operating-Systems-Three-Easy-Pieces/dp/198508659X)
- [Paging을 사용한 고정 크기 메모리 관리](https://icksw.tistory.com/148)
- [Paging 정리](https://fancy96.github.io/OS-18-Paging/)