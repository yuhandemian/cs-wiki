---
category: Operating System
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Process Synchronization
tags: []
---

# Process Synchronization (프로세스 동기화)

## 📝 동기화 문제 발생 배경

### 데이터 접근 과정

```
1. 저장 위치에서 데이터 읽기
2. 연산 수행
3. 결과를 원래 위치에 저장
```

**문제:** 누가 먼저 읽었는지에 따라 결과가 달라짐

**발생:** Synchronization 문제

---

## 🔑 Process Synchronization이란?

**공유 데이터의 동시 접근은 데이터 불일치 문제 발생**

**목적:** 일관성 유지

**방법:** 협력 프로세스 간 실행 순서 정의

---

## ⚡ Race Condition (경쟁 상태)

**여러 프로세스/스레드가 동시에 같은 데이터 조작**

**결과:** 타이밍이나 접근 순서에 따라 결과가 달라짐

**해결:** 동기화 (Synchronization)

---

## 🚨 OS에서 Race Condition 발생 시점

### 1. Kernel 수행 중 인터럽트 발생

```
Initial Counter = 10

1. Count++ 실행 중 (CPU 레지스터로 읽음)
2. 인터럽트 발생 → Count-- 실행 및 저장
3. Count++ 계속 실행 및 저장

Expected: 10
Unexpected: 11
```

**해결:** 작업 완료까지 Disable Interrupt

---

### 2. System Call 중 Context Switch

**상황:** Kernel mode 수행 중 Context Switch

**해결:** Kernel mode에서는 CPU Preempt 안 함

**시점:** Kernel → User mode 전환 시 Preempt

---

### 3. Multiprocessor에서 Shared Memory 접근

**방법 1:** 한 번에 하나의 CPU만 커널 진입 (비효율적)

**방법 2:** 각 공유 데이터에 Lock/Unlock (효율적)

---

## 🔒 Critical Section (임계 영역)

**공유 데이터 일관성 보장을 위한 영역**

**특징:** 하나의 프로세스/스레드만 진입 가능 (Mutual Exclusion)

---

## 📋 프로세스 일반 구조

```c
do {
    entry section       // Lock 획득
    critical section    // 공유 데이터 접근
    exit section        // Lock 해제
    remainder section
} while(1);
```

---

## ✅ Critical Section Problem 해결 조건

### 1. Mutual Exclusion (상호 배제)

**한 번에 하나의 프로세스/스레드만 실행**

---

### 2. Progress (진행)

**아무도 없으면 들어가고자 하는 프로세스 진입 허용**

---

### 3. Bounded Waiting (한정된 대기)

**무한정 기다리는 상황 방지**

**목적:** Starvation 방지

---

## 💡 Solution 1: Spinlock (스핀락)

**Lock을 가질 수 있을 때까지 반복 시도**

**상태:** Busy-Waiting

**단점:** CPU 낭비

---

### TestAndSet (CPU Atomic 명령어)

```c
volatile int lock = 0; // global

void critical() {
    while (test_and_set(&lock) == 1);
    ...critical section
    lock = 0;
}

int TestAndSet(int *lockPtr) {
    int oldLock = *lockPtr;
    *lockPtr = 1;
    return oldLock;
}
```

**특징:**
- 실행 중간에 간섭/중단 안 됨
- 동시 실행 안 됨 (CPU 레벨에서 순차 실행)

---

## 💡 Solution 2: Mutex (뮤텍스)

**Mutual Exclusion의 약자**

**Lock을 가질 수 있을 때까지 휴식**

**상태:** Block-Wakeup

---

### Mutex 구조

```c
class Mutex {
    int value = 1;
    int guard = 0;
}
```

**value:** Critical section 진입 가능 여부 (0 또는 1)

**guard:** Race condition 방지 장치

---

### Mutex Lock

```c
Mutex::lock() {
    while (test_and_set(&guard));
    if (value == 0) {
        // 현재 스레드를 큐에 넣음
        guard = 0 & go to sleep
    } else {
        value = 0;
        guard = 0;
    }
}
```

---

### Mutex Unlock

```c
Mutex::unlock() {
    while (test_and_set(&guard));
    if (큐에 하나라도 대기중이라면) {
        그 중 하나를 깨운다;
    } else {
        value = 1;
    }
    guard = 0;
}
```

---

### Spinlock vs Mutex

**Spinlock이 유리한 경우:**
- 멀티 코어 환경
- Critical section 작업이 Context Switching보다 빠름

---

## 💡 Solution 3: Semaphore (세마포어)

**Signal mechanism을 가진 동기화 장치**

**목적:** 공유 자원 관리 (Mutual Exclusion 아님)

**특징:** 정수형 (0, 1, 2, ...)

**허용:** 하나 이상의 컴포넌트가 공유 자원 접근 가능

---

### Semaphore 구조

```c
class Semaphore {
    int value = 1;
    int guard = 0;
}
```

---

### P, V 연산

```c
semaphore->wait();   // P: 진입 시
...critical section
semaphore->signal(); // V: 빠져나올 시
```

---

### Semaphore 종류

**Binary Semaphore:** value = 1 (Mutex와 동일)

**Counting Semaphore:** value > 1

---

### Wait 연산

```c
Semaphore::wait() {
    while (test_and_set(&guard));
    if (value == 0) {
        // 현재 스레드를 큐에 넣음
        guard = 0 & go to sleep
    } else {
        value -= 1;
        guard = 0;
    }
}
```

---

### Signal 연산

```c
Semaphore::signal() {
    while (test_and_set(&guard));
    if (큐에 하나라도 대기중이라면) {
        그 중 하나를 깨워 준비 시킨다
    } else {
        value += 1;
    }
    guard = 0;
}
```

---

## 🔄 Signaling 메커니즘

**세마포어는 순서를 정해줄 때 사용**

**Lock을 걸지 않은 스레드도 Signal로 Lock 해제 가능**

---

### 예시: 실행 순서 보장

```c
// value = 0
<P1>
task1
semaphore->signal()

<P2>
semaphore->wait()
task2
```

**경우 1:** task1 먼저 → signal (value=1) → wait (value=0) → task2

**경우 2:** task2 먼저 → wait 대기 → task1 완료 → signal → task2 깨움

**결과:** 항상 task1 → task2 순서 보장

---

## 🆚 Mutex vs Binary Semaphore

### Mutex

**Lock 소유자만 해제 가능**

**Priority Inheritance 속성**

**용도:** 상호 배제

---

### Semaphore

**Signaling 메커니즘**

**Lock을 걸지 않은 스레드도 해제 가능**

**용도:** 작업 간 실행 순서 동기화

---

## 🍽️ 식당 예시로 이해하기

### Mutex (좌석 1개)

**손님1 입장 → Lock**

**손님2 대기:**
- Spinlock: 계속 문 두드림 (Busy-Waiting)
- Mutex: 대기실에서 대기 (Block-Wakeup)

**손님1 퇴장 → Unlock → 손님2 입장**

---

### Semaphore (좌석 3개)

**손님 3명 입장 → P, P, P (value = 0)**

**손님4 대기 → 대기실 (value = -1)**

**손님3 퇴장 → V → 손님4 깨움**

---

## ❓ 면접 질문 예시

### Q1. 임계 영역이 무엇이고, 만족해야 하는 조건은?

**답변:**
임계 영역은 공유 데이터의 일관성을 보장하기 위해 하나의 프로세스/스레드만 진입 가능한 영역입니다. 만족 조건은 1) Mutual Exclusion(상호 배제): 한 번에 하나만 실행, 2) Progress(진행): 아무도 없으면 진입 허용, 3) Bounded Waiting(한정된 대기): 무한정 기다리지 않음입니다.

### Q2. Race Condition에 대해 예시를 들어 설명해주세요.

**답변:**
Race Condition은 여러 프로세스가 동시에 같은 데이터를 조작할 때 타이밍에 따라 결과가 달라지는 상황입니다. 예를 들어 Counter=10일 때 Count++와 Count--가 동시에 실행되면, Count++가 읽은 후 Count--가 실행되어 저장하면 Count++만 반영되어 11이 됩니다.

### Q3. Mutex와 Semaphore의 차이점은?

**답변:**
Mutex는 상호 배제를 위한 것으로 Lock을 가진 자만 해제할 수 있으며, Binary 형태(0 또는 1)입니다. Semaphore는 공유 자원 관리를 위한 것으로 Signaling 메커니즘을 가지며, Lock을 걸지 않은 스레드도 해제 가능하고, 정수형(0, 1, 2, ...)입니다. 상호 배제만 필요하면 Mutex, 실행 순서 동기화가 필요하면 Semaphore를 사용합니다.

### Q4. Spinlock과 Mutex의 차이는?

**답변:**
Spinlock은 Lock을 획득할 때까지 반복 시도하는 Busy-Waiting 상태로 CPU를 낭비합니다. Mutex는 Lock을 획득할 때까지 Block-Wakeup 상태로 큐에서 대기하여 CPU 낭비를 최소화합니다. 멀티 코어 환경이고 Critical section 작업이 Context Switching보다 빠르면 Spinlock이 유리합니다.

### Q5. TestAndSet이 왜 필요한가요?

**답변:**
TestAndSet은 CPU atomic 명령어로 실행 중간에 간섭받거나 중단되지 않으며, 같은 메모리 영역에 대해 동시에 실행되지 않습니다. 두 개 이상의 프로세스/스레드가 동시에 호출해도 CPU 레벨에서 순차적으로 실행하여 Race Condition을 방지합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/OS/os_process_synchronization.md`
- 내용: Process Synchronization, Mutex, Semaphore

### 추가 학습 자료

- [이화여대, 반효경 교수님, 운영체제](http://www.kocw.net/home/cview.do?cid=3646706b4347ef09)
- [쉬운 코드 - 프로세스 동기화](https://www.youtube.com/c/쉬운코드)
- [[10분 테코톡] Mutex vs Semaphore](https://youtu.be/oazGbhBCOfU)
- [Process Synchronization 정리](https://hello-judy-world.tistory.com/193)