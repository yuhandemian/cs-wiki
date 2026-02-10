---
category: Operating System
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: high
prerequisites:
- Paging
- Address-Translation
related:
- Paging
- Address-Translation
- Memory-Management
sources: 1
subtopic: TLB
tags:
- translation-lookaside-buffer
- mmu
- page-table-cache
- virtual-address
- physical-address
---

# TLB (Translation Look-aside Buffer)

## 📝 TLB란?

**변환 참조 버퍼 / 변환 우선 참조 버퍼 / 변환 색인 버퍼**

**페이지 테이블을 캐싱한 저장장치**

**위치:** MMU 내부

**목적:** 주소 변환 속도 향상

---

## 🔑 주요 특징

**일종의 캐시 개념**

**페이지 교체:** LRU 알고리즘 적용

**다계층 구조:** L1 TLB, L2 TLB 등 여러 계층 존재 가능

---

## 🏗️ TLB 구조

### VPN (Virtual Page Frame Number)

**TLB KEY**

**역할:**
- CPU 코어가 요청한 가상 주소에서 추출
- TLB 내부 검색에 사용

**구성:** 가상 주소 = VPN + VPO(offset)

---

### PPN (Physical Page Frame Number)

**TLB VALUE**

**역할:**
- VPN과 1:1 대응
- 주기억장치 주소 저장
- PFO(offset)와 결합하여 물리 주소 완성

---

### Other Bits (상태 관리 비트)

#### Valid Bit

**역할:** Hit/Miss 여부 표시

**초기화:** 시스템 시작 시 invalid

---

#### Protection Bit

**역할:** 페이지 접근 방식 표시

**상태:** Read / Write / Execute

**목적:** 보호 비트

---

#### ASID (Address Space ID)

**단일 프로세스 환경:**
- VPN 충돌 없음
- 사용 안 함

**다중 프로세스 환경:**
- 프로세스별 ID 부여
- ID별로 VPN 관리
- 충돌 방지

**이전 방식:** 새 프로세스 접근 시 TLB 초기화 (큰 오버헤드)

**현재 방식:** ASID로 충돌 방지

---

#### Dirty Bit

**역할:** TLB 적재 후 수정 여부 표시

---

## 🔄 TLB 동작 과정

### 1. CPU가 가상 주소 요청

**VPN 추출**

---

### 2. TLB 검색

**TLB Hit:** PPN 즉시 반환

**TLB Miss:** 페이지 테이블 탐색

---

### 3. TLB Miss 처리

**페이지 테이블 탐색**

**페이지 로드**

**TLB 정보 갱신**

---

## ⚡ 속도 차이

### TLB Hit

**시간:** 수십 클럭

**결과:** 즉시 페이지 로드

---

### TLB Miss

**시간:** 수백~수천 클럭

**결과:** 페이지 테이블 탐색 필요

---

### Page Fault

**시간:** 수십만~수백만 클럭

**결과:** 디스크에서 페이지 로드

**속도 차:** TLB Hit 대비 수만~수십만 배 느림

---

## 📊 전체 페이지 탐색 과정

```
1. CPU가 가상 주소 요청
   ↓
2. TLB 검색
   ↓
3-1. TLB Hit
   → PPN 즉시 반환
   → 물리 주소 완성
   → 메모리 접근
   
3-2. TLB Miss
   → 페이지 테이블 탐색
   ↓
4-1. Page Table Hit
   → PPN 획득
   → TLB 갱신
   → 물리 주소 완성
   → 메모리 접근
   
4-2. Page Fault
   → 디스크에서 페이지 로드
   → 페이지 테이블 갱신
   → TLB 갱신
   → 물리 주소 완성
   → 메모리 접근
```

---

## ❓ 면접 질문 예시

### Q1. TLB란 무엇인가요?

**답변:**
TLB는 Translation Look-aside Buffer의 약자로 페이지 테이블을 캐싱한 저장장치입니다. MMU 내부에 존재하며 가상 주소를 물리 주소로 변환하는 속도를 향상시키기 위해 사용됩니다. 일종의 캐시 개념으로 페이지 교체에는 LRU 알고리즘을 적용합니다.

### Q2. TLB의 구조를 설명해주세요.

**답변:**
TLB는 VPN(Virtual Page Frame Number), PPN(Physical Page Frame Number), 그리고 상태 관리 비트들로 구성됩니다. VPN은 TLB KEY로 가상 주소에서 추출하여 검색에 사용하고, PPN은 TLB VALUE로 물리 주소를 저장합니다. 상태 관리 비트에는 valid, protection, ASID, dirty 비트 등이 있습니다.

### Q3. ASID의 역할은 무엇인가요?

**답변:**
ASID는 Address Space ID의 약자로 다중 프로세스 환경에서 TLB 충돌을 방지하기 위한 프로세스별 ID입니다. ASID가 등장하기 전에는 새로운 프로세스가 TLB에 접근할 때마다 TLB를 초기화했지만, 큰 오버헤드가 발생하여 ASID를 도입하게 되었습니다.

### Q4. TLB Hit와 Page Fault의 속도 차이는?

**답변:**
TLB Hit는 수십 클럭으로 즉시 페이지를 로드할 수 있지만, Page Fault는 디스크에서 페이지를 로드해야 하므로 수십만~수백만 클럭이 소모됩니다. 따라서 TLB Hit 대비 수만~수십만 배의 속도 차이가 발생할 수 있습니다.

### Q5. TLB Miss가 발생하면 어떻게 처리하나요?

**답변:**
TLB Miss가 발생하면 주기억장치 내부의 페이지 테이블을 탐색합니다. 페이지 테이블에서 PPN을 찾으면 TLB 정보를 갱신하고 물리 주소를 완성합니다. 만약 페이지 테이블에도 없으면 Page Fault가 발생하여 디스크에서 페이지를 로드합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: [os_tlb.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/OS/os_tlb.md)
- 내용: TLB, VPN, PPN, ASID

### 추가 학습 자료

- [기술사과정 TLB, Translation Look-aside Buffer](https://www.youtube.com/watch?v=MC_GBOf5KI8)
- [[운영체제] MMU, page table, TLB](https://about-myeong.tistory.com/35)
- [Computer System Design - 12 : TLB](https://etst.tistory.com/66)