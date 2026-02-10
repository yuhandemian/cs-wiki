---
category: Operating-System
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: high
prerequisites:
- PCB-Context-Switching
- Process-Synchronization
related:
- PCB-Context-Switching
- Process-Synchronization
- System-Call
sources: 1
subtopic: CPU 스케줄링
tags:
- cpu-scheduling
- preemptive-scheduling
- round-robin
- turnaround-time
---

# CPU 스케줄링

## 📝 개념 정의

### CPU 스케줄링

**언제 어떤 프로세스에 CPU를 할당할지 결정**하는 작업입니다.

**필요성:**
- CPU core가 하나일 때 한 번에 하나의 프로세스만 실행 가능
- CPU 이용률 극대화를 위한 멀티프로그래밍 필요
- I/O bound job과 CPU bound job의 효율적 관리

---

## 🔄 CPU-I/O Burst Cycle

### 개념

프로세스 실행은 **CPU 실행과 I/O 대기의 반복**으로 구성됩니다.

```
CPU Burst → I/O Burst → CPU Burst → I/O Burst → ...
```

### Burst 유형

#### CPU Burst
- CPU 연산이 연속적으로 실행되는 구간
- 계산 집약적 작업

#### I/O Burst
- I/O 장치의 입출력이 이루어지는 구간
- 디스크 읽기/쓰기, 네트워크 통신 등

### 프로세스 분류

| 특성 | I/O Bound Job | CPU Bound Job |
|------|---------------|---------------|
| **CPU Burst** | 짧고 빈번 | 길고 드묾 |
| **특징** | Interactive | 계산 집약적 |
| **예시** | 웹 브라우저, 텍스트 에디터 | 과학 계산, 동영상 인코딩 |
| **우선순위** | 높음 (사용자 응답성) | 낮음 |

**스케줄링 전략:**
- I/O bound job에 CPU 우선 할당 → 사용자 응답성 향상
- CPU bound job이 CPU를 독점하면 I/O bound job 대기 시간 증가

---

## 🎯 CPU Scheduler

### 역할

Ready Queue에서 **다음에 실행할 프로세스를 선택**하는 커널 코드입니다.

**결정 사항:**
- 어떤 프로세스에게 CPU를 줄 것인가?
- 얼마나 사용하게 할 것인가?

### Ready Queue 구조

- FIFO Queue, 우선순위 Queue, Tree 등 다양한 구조 가능
- 각 레코드는 프로세스의 PCB (Process Control Block)

---

## 📊 스케줄링 시점

### 프로세스 상태 전환

```
         ┌─────────┐
    ┌───→│  Ready  │←───┐
    │    └─────────┘    │
    │         ↓         │
    │    ┌─────────┐    │
    │    │ Running │    │
    │    └─────────┘    │
    │      ↓      ↓     │
┌───┴───┐      ┌───────┴──┐
│Waiting│      │Terminated│
└───────┘      └──────────┘
```

### 스케줄링 발생 시점

1. **Running → Waiting**: I/O 요청 발생
2. **Running → Ready**: 인터럽트 발생 (타임 슬라이스 만료)
3. **Waiting → Ready**: I/O 완료
4. **Running → Terminated**: 프로세스 종료

---

## 🔀 선점 vs 비선점 스케줄링

### 비선점 스케줄링 (Non-preemptive)

**특징:**
- CPU 할당 후 프로세스가 **자발적으로 반납**할 때까지 보장
- 1번, 4번 시점에서만 스케줄링

**장점:**
✅ 문맥 교환 Overhead 적음
✅ 응답 시간 예측 가능

**단점:**
❌ 긴 작업이 CPU 독점 가능
❌ 짧은 작업도 오래 대기

**예시:** FCFS, SJF(비선점), HRN

### 선점 스케줄링 (Preemptive)

**특징:**
- 실행 중인 프로세스로부터 **강제로 CPU 회수** 가능
- 모든 시점에서 스케줄링 가능

**장점:**
✅ 높은 우선순위 프로세스 빠른 처리
✅ 빠른 응답 시간 (시분할 시스템)
✅ CPU 독점 방지

**단점:**
❌ 잦은 문맥 교환으로 Overhead 증가
❌ 동시성 제어 필요

**예시:** Round Robin, SJF(선점), Priority, Multilevel Queue

---

## 📏 스케줄링 성능 척도

### 시스템 관점

#### 1. CPU 이용률 (Utilization)
- 시간당 CPU 사용 비율
- **목표: 최대화**

#### 2. 처리량 (Throughput)
- 단위 시간당 완료된 프로세스 수
- **목표: 최대화**

### 프로세스 관점

#### 1. 반환 시간 (Turnaround Time)
- 프로세스 생성부터 종료까지 총 시간
- 대기 시간 + 실행 시간 + I/O 시간
- **목표: 최소화**

#### 2. 대기 시간 (Waiting Time)
- Ready Queue에서 대기한 총 시간
- **목표: 최소화**

#### 3. 응답 시간 (Response Time)
- 첫 번째 CPU 할당까지 걸린 시간
- **목표: 최소화**

**이상적인 스케줄링:**
- CPU Utilization ↑, Throughput ↑
- Turnaround Time ↓, Waiting Time ↓, Response Time ↓

---

## 🔧 CPU 스케줄링 알고리즘

### 1. FCFS (First Come First Served)

**방식**: 먼저 도착한 프로세스 먼저 처리

**특징:**
- 비선점형
- 구현 간단 (FIFO Queue)

**장점:**
✅ 이해하기 쉬움
✅ 공평함

**단점:**
❌ 평균 대기 시간 길어질 수 있음
❌ **Convoy Effect** 발생

> **Convoy Effect (호위 효과)**
> CPU 사용 시간이 긴 프로세스가 짧은 프로세스들을 오래 대기시키는 현상

---

### 2. SJF (Shortest Job First)

**방식**: CPU Burst 시간이 가장 짧은 프로세스 먼저 처리

**특징:**
- 비선점형 + 선점형 모두 가능
- 평균 대기 시간 최소화

**비선점 SJF:**
- 실행 중인 프로세스는 끝까지 실행

**선점 SJF (SRTF - Shortest Remaining Time First):**
- 새로 도착한 프로세스가 더 짧으면 교체

**장점:**
✅ 평균 대기 시간 최소

**단점:**
❌ CPU Burst 시간 예측 어려움
❌ 긴 프로세스 기아 상태 가능

---

### 3. Round Robin (RR)

**방식**: 각 프로세스에 **동일한 시간 할당량(Time Quantum)** 부여

**특징:**
- 선점형
- 시분할 시스템에 적합

**동작:**
1. 프로세스에 Time Quantum 할당
2. 시간 내 완료 못하면 Ready Queue 맨 뒤로 이동
3. 다음 프로세스 실행

**장점:**
✅ 빠른 응답 시간
✅ 공평한 CPU 분배
✅ n개 프로세스 시 최대 (n-1)q 대기

**단점:**
❌ Time Quantum 설정에 따라 성능 차이
- q가 크면: FCFS와 유사
- q가 작으면: 문맥 교환 Overhead 증가

---

### 4. Priority Scheduling

**방식**: 우선순위가 높은 프로세스 먼저 처리

**특징:**
- 비선점형 + 선점형 모두 가능
- SJF는 CPU Burst 시간이 우선순위인 Priority Scheduling

**우선순위 결정 요소:**
- 내부: 시간 제한, 메모리 요구량, I/O 비율
- 외부: 프로세스 중요도, 정책적 요인

**장점:**
✅ 중요한 프로세스 빠른 처리

**단점:**
❌ **기아 상태 (Starvation)**: 낮은 우선순위 프로세스가 무한 대기
❌ **무기한 봉쇄 (Indefinite Blocking)**

**해결책:**
- **Aging**: 대기 시간에 따라 우선순위 점진적 증가
- Round Robin과 결합 (Multilevel Queue)

---

### 5. Multilevel Queue

**방식**: 프로세스를 여러 Queue로 분류하여 관리

**특징:**
- 선점형
- 각 Queue는 독립적인 스케줄링 알고리즘 사용
- Queue 간 프로세스 이동 불가

**예시:**
```
┌─────────────────┐  RR (q=8ms)
│ Foreground      │  (Interactive)
├─────────────────┤
│ Background      │  FCFS
│                 │  (Batch)
└─────────────────┘
```

**Time Quantum 차별화:**
- 높은 우선순위 Queue: 작은 Time Quantum
- 낮은 우선순위 Queue: 큰 Time Quantum

**장점:**
✅ 프로세스 특성에 맞는 스케줄링

**단점:**
❌ 기아 상태 발생 가능

---

### 6. Multilevel Feedback Queue (MFQ)

**방식**: Multilevel Queue + Queue 간 프로세스 이동 가능

**특징:**
- 선점형
- Time Quantum을 다 사용하면 하위 Queue로 이동
- Time Quantum을 다 못 채우면 현재 Queue 유지

**동작:**
```
Q0 (RR, q=8)  ← 새 프로세스
    ↓ (Time Quantum 소진)
Q1 (RR, q=16)
    ↓ (Time Quantum 소진)
Q2 (FCFS)
```

**장점:**
✅ 짧은 작업 우선 처리
✅ I/O bound job 우선권
✅ Aging 구현 가능 (기아 상태 해결)
✅ 현대 OS에서 가장 일반적

**단점:**
❌ 매개변수 설정 복잡

---

### 7. HRN (Highest Response-ratio Next)

**방식**: 우선순위를 계산하여 가장 높은 프로세스 처리

**우선순위 계산:**
```
우선순위 = (대기 시간 + 실행 시간) / 실행 시간
```

**특징:**
- 비선점형
- SJF의 기아 상태 보완

**장점:**
✅ 대기 시간 고려로 공평성 향상

---

## 📊 알고리즘 비교

| 알고리즘 | 선점 | 평균 대기 시간 | 응답 시간 | 기아 상태 | 복잡도 |
|----------|------|----------------|-----------|-----------|--------|
| **FCFS** | X | 길 수 있음 | 김 | X | 낮음 |
| **SJF** | △ | 짧음 | 보통 | O | 보통 |
| **RR** | O | 보통 | 짧음 | X | 보통 |
| **Priority** | △ | 보통 | 보통 | O | 보통 |
| **MFQ** | O | 짧음 | 짧음 | X | 높음 |
| **HRN** | X | 짧음 | 보통 | X | 보통 |

---

## ❓ 면접 질문 예시

### Q1. CPU 스케줄링이 필요한 이유는?

**답변:**
CPU core가 하나일 때 여러 프로세스를 효율적으로 실행하기 위해 필요합니다. I/O bound job과 CPU bound job이 섞여 있을 때, I/O bound job에 우선적으로 CPU를 할당하여 사용자 응답성을 높이고, CPU 이용률을 극대화할 수 있습니다.

### Q2. 선점형과 비선점형 스케줄링의 차이는?

**답변:**
비선점형은 프로세스가 CPU를 자발적으로 반납할 때까지 보장하여 문맥 교환 Overhead가 적지만, 긴 작업이 CPU를 독점할 수 있습니다. 선점형은 실행 중인 프로세스로부터 강제로 CPU를 회수할 수 있어 응답 시간이 빠르지만, 잦은 문맥 교환으로 Overhead가 증가합니다.

### Q3. Round Robin의 Time Quantum 크기가 성능에 미치는 영향은?

**답변:**
Time Quantum이 크면 FCFS처럼 동작하여 응답 시간이 길어지고, 너무 작으면 문맥 교환이 빈번하게 발생하여 Overhead가 증가합니다. 적절한 크기는 대부분의 프로세스가 한 번의 Time Quantum 내에 완료될 수 있을 정도로 설정하는 것이 좋습니다.

### Q4. Multilevel Feedback Queue가 현대 OS에서 많이 사용되는 이유는?

**답변:**
짧은 작업을 우선 처리하고, I/O bound job에 우선권을 주어 응답 시간을 단축할 수 있습니다. 또한 Aging을 구현하여 기아 상태를 방지할 수 있으며, 프로세스 특성에 따라 Queue를 이동시켜 유연한 스케줄링이 가능하기 때문입니다.

### Q5. Priority Scheduling의 기아 상태를 해결하는 방법은?

**답변:**
Aging 기법을 사용합니다. 프로세스가 Ready Queue에서 대기하는 시간이 길어질수록 우선순위를 점진적으로 증가시켜, 낮은 우선순위 프로세스도 결국 CPU를 할당받을 수 있도록 합니다. 또는 Round Robin과 결합하여 Multilevel Queue로 구현할 수 있습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/OS/os_cpu_scheduling_and_algorithm.md`
- 내용: CPU 스케줄링 개념, 알고리즘, 성능 척도

### 추가 학습 자료

- [[OS] CPU burst와 CPU Scheduler](https://velog.io/@kmjoo/OS-CPU-Scheduling-1)
- [[운영체제] CPU 스케줄링 알고리즘](https://code-lab1.tistory.com/45)
- Abraham Silberschatz, "운영 체제 개념, 제9판", 6장