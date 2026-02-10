---
category: Operating System
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Address Space & Memory Virtualization
tags: []
---

# Address Space & Memory Virtualization (주소 공간과 메모리 가상화)

## 📝 초기 시스템의 OS

**추상화 없음**

**한 번에 하나의 Process가 전체 메모리 사용**

```
┌─────────────┐
│     OS      │
├─────────────┤
│   Process   │
│             │
│             │
└─────────────┘
```

**문제:** 활용성(utilization)과 효율성(efficiency) 부족

---

## 🔄 Multiprogramming & Time Sharing

**여러 프로그램 동시 실행**

```
┌─────────────┐
│     OS      │
├─────────────┤
│  Process A  │
├─────────────┤
│  Process B  │
├─────────────┤
│  Process C  │
└─────────────┘
```

**장점:**
✅ 활용성과 효율성 증가

**단점:**
❌ 보안 문제 (다른 프로세스 접근 가능)

---

## 🎯 Virtual Memory (가상 메모리)

**Address Space (주소 공간)**

**= OS가 실제 메모리를 추상화하여 프로세스에게 나눠주는 것**

---

### 메모리 가상화 예시

```
가상 주소 공간 (Process A)     실제 메모리 (Physical Memory)
┌─────────────┐                ┌─────────────┐
│ 0KB         │                │ 0KB   OS    │
│             │                │             │
│             │                │             │
│             │                │ 320KB       │
│             │   매핑 →       │  Process A  │
│             │                │             │
│ 64KB        │                │ 384KB       │
└─────────────┘                │             │
                               │ 512KB       │
                               └─────────────┘
```

**핵심:** 프로세스는 0~64KB 주소를 가진다고 착각

**실제:** 320~384KB에 위치

---

## 📦 Address Space 구조

**현재 실행 중인 프로그램(프로세스)의 모든 것**

```
┌─────────────┐ ← 높은 주소
│   Stack     │ (지역 변수, return address)
│      ↓      │
│             │
│      ↑      │
│    Heap     │ (동적 할당: new, malloc)
├─────────────┤
│ Program     │ (Code + Data)
│   Code      │ (static, 전역 변수)
└─────────────┘ ← 낮은 주소
```

---

### 구성 요소

#### Program Code (Code + Data)

**static 변수, 전역 변수 저장**

---

#### Heap

**동적 할당 데이터 저장**

**new(), malloc() 사용**

**위로 성장 ↑**

---

#### Stack

**함수 호출 정보 저장**

**return address, values, 지역 변수**

**아래로 성장 ↓**

---

## 🔑 메모리 가상화의 핵심

**추상화 (Abstraction)**

**OS가 메모리를 가상화하여 여러 프로그램 동시 실행**

---

### 주소 종류

#### Virtual Address (가상 주소)

**= Logical Address (논리 주소)**

**CPU에 의해 생성된 주소**

---

#### Physical Address (물리 주소)

**메모리 장치에 의해 생성된 주소**

**OS가 관리**

---

## 🎯 메모리 가상화의 목표

### 1. 편리성 (Convenience)

**프로그래밍 사용 편리**

---

### 2. 투명성 (Transparency)

**프로그램이 메모리 가상화를 모르도록**

**프로그램은 독립적인 실제 메모리가 있다고 착각**

---

### 3. 효율성 (Efficiency)

**시간과 공간 면에서 효율적 사용**

**TLB 같은 하드웨어 지원 필요**

---

### 4. 보호 (Protection)

**프로세스 간 보호**

**OS 자신도 프로세스로부터 보호**

---

## 💡 메모리 가상화의 장점

### 1. 보안 향상

**각 프로세스는 독립된 주소 공간**

**다른 프로세스 메모리 접근 불가**

---

### 2. 메모리 관리 용이

**물리 메모리보다 큰 프로그램 실행 가능**

**여러 프로그램 동시 실행**

---

### 3. 프로그래밍 단순화

**프로그래머는 물리 메모리 위치 신경 쓸 필요 없음**

**항상 0번지부터 시작한다고 가정**

---

## ❓ 면접 질문 예시

### Q1. 메모리 가상화가 생긴 이유는?

**답변:**
초기 컴퓨터는 한 번에 하나의 프로세스만 전체 메모리를 사용하여 활용성과 효율성이 부족했습니다. 여러 프로그램을 동시에 실행하기 위해 Time Sharing 기법을 사용했지만 보안 문제가 발생했습니다. 이를 해결하기 위해 OS가 실제 메모리를 추상화하여 각 프로세스에게 독립적인 주소 공간을 제공하는 메모리 가상화가 등장했습니다.

### Q2. 가상 메모리 계층 구조에 대해 설명해주세요.

**답변:**
Address Space는 Stack, Heap, Program Code로 구성됩니다. Stack은 함수 호출 정보와 지역 변수를 저장하며 아래로 성장합니다. Heap은 동적 할당 데이터를 저장하며 위로 성장합니다. Program Code는 코드와 Data 영역을 포함하며 static 변수와 전역 변수를 저장합니다.

### Q3. 메모리 가상화의 목적은?

**답변:**
1) 편리성: 프로그래밍 사용이 편리합니다.
2) 투명성: 프로그램이 메모리 가상화를 모르도록 하여 독립적인 메모리가 있다고 착각하게 합니다.
3) 효율성: TLB 같은 하드웨어 지원으로 시간과 공간을 효율적으로 사용합니다.
4) 보호: 프로세스 간 보호와 OS 자신도 프로세스로부터 보호합니다.

### Q4. Virtual Address와 Physical Address의 차이는?

**답변:**
Virtual Address(가상 주소)는 Logical Address라고도 하며 CPU에 의해 생성된 주소입니다. 프로세스가 사용하는 주소로 0번지부터 시작합니다. Physical Address(물리 주소)는 메모리 장치에 의해 생성된 주소로 OS가 관리하며 실제 메모리의 위치를 나타냅니다.

### Q5. Address Space란 무엇인가요?

**답변:**
Address Space(주소 공간)는 OS가 실제 메모리를 추상화하여 현재 실행 중인 프로그램(프로세스)에게 나눠주는 가상의 메모리 공간입니다. 프로세스에 대한 모든 것이 들어있으며, Program Code, Heap, Stack으로 구성됩니다. 각 프로세스는 독립적인 주소 공간을 가지고 있다고 착각하게 됩니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/OS/os_address_space.md`
- 내용: Address Space, 메모리 가상화, Virtual Memory

### 추가 학습 자료

- [Operating Systems Three Easy Pieces](https://www.amazon.com/Operating-Systems-Three-Easy-Pieces/dp/198508659X)
- [[OS] 메모리 가상화를 위한 메모리 추상화, 주소 공간](https://icksw.tistory.com/129)