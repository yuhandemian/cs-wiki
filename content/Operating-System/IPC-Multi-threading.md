---
category: Operating System
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: high
prerequisites:
- Process-Synchronization
related:
- IPC-Multi-threading
- Process-Synchronization
- Memory-Management
sources: 1
subtopic: IPC & Multi-threading
tags:
- ipc
- multithreading
- concurrency
- synchronization
---

# IPC & Multi-threading (프로세스 간 통신과 멀티스레딩)

## 📝 멀티프로세싱 (Multi-processing)

**여러 프로세스를 통해 동시에 두 가지 이상의 일을 수행**

**특징:**
✅ 병렬 처리 가능
✅ 신뢰성 높음 (특정 프로세스 문제 발생해도 다른 프로세스로 처리)

---

## 🔑 핵심 개념

### 동시성 (Concurrency)

**하나의 코어에서 여러 작업이 번갈아가며 실행**

**= 멀티 태스킹**

---

### 병렬성 (Parallelism)

**멀티 코어에서 여러 작업을 동시에 실행**

---

### 동기 (Synchronous)

**1개 요청 완료 후 다른 요청 실행**

**특징:**
- 순차적 방식
- 요청 순서대로 결과

---

### 비동기 (Asynchronous)

**여러 요청이 선행 작업과 무관하게 실행**

**특징:**
- 다중 실행 환경
- 요청 순서와 결과 순서 다를 수 있음

---

## 💬 IPC (Inter Process Communication)

**프로세스끼리 데이터를 주고받고 공유 데이터를 관리하는 메커니즘**

**예시:**
- 클라이언트 ↔ 서버
- 클라이언트: 데이터 요청
- 서버: 요청에 응답

---

## 🔀 IPC 종류

### 1. 공유 메모리 (Shared Memory)

**여러 프로그램이 동시 접근 가능한 메모리**

**장점:**
✅ 가장 빠름
✅ 불필요한 데이터 복사 오버헤드 없음

**단점:**
❌ 동기화 필요

---

### 2. 파일 (File)

**디스크 또는 파일 서버 데이터**

---

### 3. 소켓 (Socket)

**네트워크를 경유하는 프로세스 간 통신 종착점**

**종류:**
- TCP
- UDP

---

### 4. 익명 파이프 (Anonymous Pipe)

**단방향 FIFO 통신 채널**

**특징:**
- 단방향
- 쓰기 전용
- 단순 통신

---

### 5. 명명 파이프 (Named Pipe)

**일반 파이프 확장**

**특징:**
- 단방향 또는 이중 파이프
- 클라이언트/서버 통신
- 네트워크 상 다른 컴퓨터와도 통신 가능

**파이프 개념:**
- 병행성 메커니즘
- 생산자-소비자 모델
- 선입선출 형태 큐
- 원형 버퍼

---

### 6. 메시지 큐 (Message Queue)

**프로세스/프로그램 간 데이터 교환**

**특징:**
- 커널에서 전역적으로 관리
- 커널 전역 변수 형태

---

## 📊 IPC 성능 비교

**속도:**
```
공유 메모리 > 소켓 > 파이프 > 메시지 큐 > 파일
```

**참고:**
- 메모리 완전 공유 Thread > IPC

---

## 🧵 Thread (스레드)

**프로세스의 실행 가능한 가장 작은 단위**

**특징:**
- 프로세스는 여러 Thread 보유 가능

---

## 🔀 Process vs Thread 메모리 구조

### Process

```
Code | Data | Stack | Heap
```

**각각 독립적으로 생성**

---

### Thread

```
Code (공유) | Data (공유) | Stack (개별) | Heap (공유)
```

**공유:**
- Code
- Data
- Heap

**개별:**
- Stack

---

## 🚀 멀티스레딩 (Multi-threading)

**프로세스 내 작업을 여러 Thread로 처리**

---

### 장점

✅ **효율성 높음**
- Thread끼리 자원 공유

✅ **빠른 응답**
- 병렬 처리

✅ **경제적**
- Context Switching 비용 낮음

---

### 단점

❌ **안정성 낮음**
- 한 Thread 문제 → 전체 프로세스 영향

❌ **동기화 필요**
- 공유 자원 접근 제어

---

## 📊 Multi-processing vs Multi-threading

| 특징 | Multi-processing | Multi-threading |
|------|------------------|-----------------|
| **메모리** | 독립적 | 공유 |
| **통신** | IPC 필요 | 직접 통신 |
| **안정성** | 높음 | 낮음 |
| **속도** | 느림 | 빠름 |
| **비용** | 높음 | 낮음 |

---

## ❓ 면접 질문 예시

### Q1. IPC란 무엇인가요?

**답변:**
IPC(Inter Process Communication)는 프로세스끼리 데이터를 주고받고 공유 데이터를 관리하는 메커니즘입니다. 공유 메모리, 파일, 소켓, 파이프, 메시지 큐 등의 방법이 있으며, 공유 메모리가 가장 빠르지만 동기화가 필요합니다.

### Q2. 멀티프로세싱과 멀티스레딩의 차이는?

**답변:**
멀티프로세싱은 여러 프로세스를 통해 작업을 처리하며 메모리가 독립적이고 안정성이 높지만 IPC가 필요하고 비용이 높습니다. 멀티스레딩은 프로세스 내 여러 Thread로 작업을 처리하며 메모리를 공유하여 빠르고 경제적이지만 한 Thread 문제가 전체에 영향을 미칩니다.

### Q3. Thread가 프로세스보다 효율적인 이유는?

**답변:**
Thread는 Code, Data, Heap을 공유하고 Stack만 개별적으로 가지기 때문에 Context Switching 비용이 낮습니다. 또한 Thread끼리 직접 통신이 가능하여 IPC가 필요 없고, 자원을 공유하므로 메모리 효율성이 높습니다.

### Q4. 공유 메모리가 가장 빠른 IPC인 이유는?

**답변:**
공유 메모리는 여러 프로그램이 동시에 접근할 수 있는 메모리로, 어떠한 매개체를 통해 데이터를 주고받는 것이 아니라 메모리 자체를 공유하므로 불필요한 데이터 복사의 오버헤드가 발생하지 않아 가장 빠릅니다. 단, 같은 영역을 여러 프로세스가 공유하므로 동기화가 필요합니다.

### Q5. 동시성과 병렬성의 차이는?

**답변:**
동시성은 하나의 코어에서 여러 작업이 번갈아가며 실행되는 멀티 태스킹을 의미하고, 병렬성은 멀티 코어에서 여러 작업을 동시에 실행하는 것을 의미합니다. 동시성은 시분할로 빠르게 전환하여 동시에 실행되는 것처럼 보이고, 병렬성은 실제로 동시에 실행됩니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/OS/os_multi_procsss_thread_multi_thread.md`
- 내용: Multi-processing, IPC, Thread, Multi-threading