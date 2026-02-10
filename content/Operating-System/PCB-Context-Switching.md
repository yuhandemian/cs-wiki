---
category: Operating System
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: PCB & Context Switching
tags: []
---

# PCB & Context Switching (프로세스 제어 블록과 문맥 교환)

## 📝 PCB (Process Control Block)

**프로세스에 대한 정보를 저장한 자료구조**

**특징:**
- 프로세스 테이블에 저장
- 주기억장치에 저장
- Context Switching에 필요

---

## 🔄 프로세스 상태

### 5가지 상태

```
New → Ready → Running → Terminated
           ↕      ↓
         Waiting ←
```

---

### New & Terminated

**임시적 상태**

- **New**: 프로세스 생성
- **Terminated**: 프로세스 종료

---

### Ready

**실행 준비 완료 상태**

**동작:**
1. Scheduler: 프로세스 선택
2. Dispatch: CPU에 할당

---

### Running

**프로세스 실행 중**

---

### Waiting

**사용자 입력 대기**

**예시:**
```
프로그램 다운로드 중 (Running)
  ↓
사용자 허용 필요 (Waiting)
  ↓
다운로드 재개 (Running)
```

---

## 🗂️ PCB 구조

### 1. 프로세스 식별자 (PID)

**프로세스 식별 용도**

---

### 2. 프로세스 상태

**Ready, Running, Waiting 등**

---

### 3. 프로그램 카운터 (PC)

**다음 실행할 명령어 주소**

---

### 4. CPU 레지스터

**레지스터 상태 저장**

---

### 5. CPU 스케줄링 정보

- 우선순위
- 최종 실행 시각
- CPU 점유 시간

---

### 6. 메모리 관리 정보

- 페이지 테이블
- 스케줄링 큐 포인터

---

### 7. I/O 상태 정보

- 할당된 입출력 장치 목록
- 열린 파일 목록

---

## 🔀 Context Switching (문맥 교환)

**CPU가 이전 프로세스 상태를 PCB에 보관하고, 다른 프로세스 정보를 PCB에서 읽어 레지스터에 적재하는 과정**

---

## 🔄 Context Switching 과정

```
Process P1 (Executing)
  ↓ Interrupt/System Call
PCB1에 P1 정보 저장
  ↓
PCB2에서 P2 정보 로드
  ↓
Process P2 (Executing)
  ↓ Interrupt/System Call
PCB2에 P2 정보 저장
  ↓
PCB1에서 P1 정보 로드
  ↓
Process P1 (Executing)
```

---

### 단계별 설명

#### 1. P1 실행 중

**Interrupt 또는 System Call 발생**

---

#### 2. P1 상태 저장

**PCB1에 프로세스 정보 저장**

---

#### 3. P2 정보 로드

**PCB2에서 P2 정보 가져옴**

---

#### 4. P2 실행

**CPU에 P2 할당**

---

#### 5. P2 상태 저장

**Interrupt 또는 System Call 발생 → PCB2에 저장**

---

#### 6. P1 정보 로드

**PCB1에서 P1 정보 가져옴**

---

## 🎯 Context Switching 발생 원인

### 선점형 스케줄링 (Preemptive Scheduling)

**우선순위 높은 프로세스가 CPU 선점**

**동작:**
1. 우선순위 높은 프로세스 도착
2. 현재 프로세스 중지 → PCB에 저장
3. 우선순위 높은 프로세스 실행

---

## ⚠️ Context Switching 문제점

### 오버헤드 (Overhead) 발생

**잦은 Context Switching → 성능 저하**

**원인:**
- PCB에서 정보 가져오는 동안 CPU 유휴 상태
- 아무 일도 하지 못함

---

## 💰 Context Switching Cost

### 1. Cache 초기화

**캐시 메모리 초기화 필요**

---

### 2. Memory Mapping 초기화

**메모리 매핑 재설정**

---

### 3. Kernel 실행 유지

**커널 모드 전환 비용**

---

## 💡 해결 방안

### Thread 사용

**프로세스 대신 Thread로 Context Switching**

**장점:**
✅ 메모리 공간 공유
✅ 스택만 정리하면 됨
✅ 프로세스보다 비용 적음

**비교:**
```
프로세스 Context Switching:
- Code, Data, Stack, Heap 모두 교체
- 비용 높음

Thread Context Switching:
- Stack만 교체
- Code, Data, Heap 공유
- 비용 낮음
```

---

## ❓ 면접 질문 예시

### Q1. Context Switching은 무엇인가요?

**답변:**
Context Switching은 CPU가 이전 프로세스의 상태를 PCB에 보관하고, 다른 프로세스의 정보를 PCB에서 읽어 레지스터에 적재하는 과정입니다. 선점형 스케줄링 방식에서 우선순위가 높은 프로세스가 CPU를 선점할 때 발생합니다.

### Q2. PCB란 무엇인가요?

**답변:**
PCB(Process Control Block)는 프로세스에 대한 정보를 저장한 자료구조입니다. 프로세스 식별자, 프로세스 상태, 프로그램 카운터, CPU 레지스터, CPU 스케줄링 정보, 메모리 관리 정보, I/O 상태 정보 등을 포함하며 주기억장치에 저장됩니다.

### Q3. 프로세스의 Context Switching Cost 해결 방안은?

**답변:**
여러 프로세스에 Context Switching을 하지 말고, 단일 프로세스에 여러 Thread를 생성하여 Thread에서 Context Switching을 하면 됩니다. Thread는 메모리 공간을 공유하고 있어 스택만 정리하면 되기 때문에 프로세스보다 비용이 적게 듭니다.

### Q4. Context Switching이 발생하는 원인은?

**답변:**
선점형 스케줄링 방식으로 진행되기 때문입니다. CPU에 우선순위가 높은 프로세스가 할당되면 기존에 실행되고 있는 프로세스를 중지하고 우선순위가 높은 프로세스가 진행됩니다. 중지되는 프로세스의 정보를 저장하고 우선순위가 높은 프로세스를 실행하는 방식이 Context Switching입니다.

### Q5. 프로세스의 5가지 상태는?

**답변:**
1) New: 프로세스 생성
2) Ready: 실행 준비 완료
3) Running: 프로세스 실행 중
4) Waiting: 사용자 입력 대기
5) Terminated: 프로세스 종료
주로 Ready, Running, Waiting 세 가지 상태가 돌아가면서 프로세스를 동작시킵니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/OS/os_pcb_and_context_switching.md`
- 내용: PCB, Context Switching, 프로세스 상태

### 추가 학습 자료

- [양햄찌가 만드는 세상](https://jhnyang.tistory.com/33)
- [yoongrammer](https://yoongrammer.tistory.com/52)
- [Binary Terms](https://binaryterms.com/process-control-block-pcb.html)
- [after academy](https://afteracademy.com/blog/what-is-context-switching-in-operating-system/)