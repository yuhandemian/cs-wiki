---
category: Operating System
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Deadlock
tags: []
---

# Deadlock (교착상태)

## 📝 개념 정의

**두 개 이상의 프로세스/스레드가 서로가 가진 자원을 기다리며 block된 상태**

**비유:** 교차로에서 모든 차가 한 자원씩 선점하고 다른 차의 자원을 기다리는 상황

**자원 (Resource):**
- 하드웨어, 소프트웨어 포함
- I/O device, CPU cycle, memory space, semaphore 등

---

## 🔑 Deadlock 발생의 4가지 조건

**모두 성립해야 Deadlock 발생**

### 1. Mutual Exclusion (상호 배제)

**매 순간 하나의 프로세스만 자원 사용**

- 자원을 공유할 수 없음

### 2. No Preemption (비선점)

**프로세스는 자원을 스스로 내어놓을 뿐 강제로 빼앗기지 않음**

- 자원 반환은 오직 취득한 프로세스만 가능

### 3. Hold and Wait (점유 대기)

**자원을 가진 프로세스가 다른 자원을 기다릴 때 보유 자원을 놓지 않음**

- 하나 이상의 자원을 취득(hold)한 상태에서 다른 자원을 기다림(wait)

### 4. Circular Wait (순환 대기)

**자원을 기다리는 프로세스 간에 사이클 형성**

- 프로세스들이 순환 형태로 서로의 자원을 기다림

---

## 🛠️ Deadlock 처리 방법

### 1. Deadlock Prevention (예방)

**시스템 레벨에서 4가지 조건 중 하나를 없앰**

#### Mutual Exclusion

- 공유 불가 자원은 반드시 성립
- 제거 불가

#### No Preemption

**방법:**
- 프로세스가 자원을 기다려야 하면 보유 자원 선점 허용
- 필요한 모든 자원을 얻을 수 있을 때 재시작

**적용:**
- CPU, memory 등 state 저장/복원 가능한 자원

#### Hold and Wait

**방법1:** 프로세스 시작 시 모든 자원 할당
- ❌ 자원 효율 저하
- ❌ Starvation 가능

**방법2:** 자원 필요 시 보유 자원 모두 반납 후 재요청
- 자원을 전혀 가지지 않은 상태에서만 요청 가능

#### Circular Wait (가장 많이 사용)

**방법:** 모든 자원에 할당 순서 정의
- 오름차순으로만 자원 할당
- 사이클 생성 방지

**예시:**
```
자원 순서: R1(1) < R2(2) < R3(3)
R3 보유 중 R1 요청 시 → R3 먼저 release
```

**단점:**
❌ Utilization 저하
❌ Throughput 감소
❌ Starvation 문제

---

### 2. Deadlock Avoidance (회피)

**실행 환경에서 안전한 경우에만 자원 할당**

**부가 정보 활용:**
- 현재 사용 가능한 자원
- 이미 할당된 자원
- 앞으로의 자원 요청/반환

#### Banker Algorithm (은행원 알고리즘)

**개념:**
- 은행에서 현금 할당에서 유래
- Deadlock 가능성 있으면 요청 거절
- 안전할 때까지 대기

**동작:**
1. 자원 요청 시 시뮬레이션
2. Deadlock 가능성 검사
3. 안전하면 할당, 아니면 거절

---

### 3. Deadlock Detection and Recovery (탐지 & 회복)

**Deadlock 발생 허용 후 발견 시 복구**

#### 복구 전략

**1. 프로세스 종료**
- Deadlock 프로세스 모두 강제 종료
- ❌ 작업 중인 자료 손실 위험

**2. 자원 선점 허용**
- 일시적으로 자원 선점
- 다른 프로세스에 할당

---

### 4. Deadlock Ignorance (무시)

**시스템이 Deadlock 책임지지 않음**

**특징:**
- UNIX 포함 대부분 OS 채택
- 사용자/개발자가 처리

**이유:**
- Deadlock 발생 빈도 낮음
- 처리 비용 높음
- 성능 우선

---

## 🆚 Deadlock vs Starvation

### Starvation (기아 상태)

**개념:**
- 특정 프로세스가 우선순위가 낮아 자원을 계속 할당받지 못하는 상태

**발생:**
- Priority Scheduling에서 주로 발생

**차이:**
- Deadlock: 서로 기다림 (순환)
- Starvation: 계속 밀림 (우선순위)

---

## 💻 Java에서 Deadlock 예시

### 문제 코드

```java
public class Main {
    public static void main(String[] args) {
        Object lock1 = new Object();
        Object lock2 = new Object();
 
        // Thread 1: lock1 → lock2
        Thread t1 = new Thread(() -> {
            synchronized (lock1) {
                System.out.println("[t1] get lock1");
                synchronized (lock2) {
                    System.out.println("[t1] get lock2");
                }
            }
        });
 
        // Thread 2: lock2 → lock1 (Deadlock!)
        Thread t2 = new Thread(() -> {
            synchronized (lock2) {
                System.out.println("[t2] get lock2");
                synchronized (lock1) {
                    System.out.println("[t2] get lock1");
                }
            }
        });
 
        t1.start();
        t2.start();
    }
}
```

---

### 해결 방법 1: Circular Wait 제거

**순서 통일**

```java
// Thread 2도 lock1 → lock2 순서로 변경
Thread t2 = new Thread(() -> {
    synchronized (lock1) {  // 순서 변경
        System.out.println("[t2] get lock1");
        synchronized (lock2) {
            System.out.println("[t2] get lock2");
        }
    }
});
```

**효과:**
✅ 사이클 생성 방지
✅ Deadlock 예방

---

### 해결 방법 2: Hold and Wait 제거

**중첩 제거**

```java
// 중첩하지 않고 분리
Thread t1 = new Thread(() -> {
    synchronized (lock1) {
        System.out.println("[t1] get lock1");
    }
    synchronized (lock2) {
        System.out.println("[t1] get lock2");
    }
});
```

**효과:**
✅ Hold and Wait 상태 제거
✅ Deadlock 예방

---

## ❓ 면접 질문 예시

### Q1. Deadlock이란 무엇인가요?

**답변:**
두 개 이상의 프로세스나 스레드가 서로가 가진 자원을 기다리며 block된 상태를 말합니다. 교차로에서 모든 차가 한 자원씩 선점하고 다른 차의 자원을 기다리는 상황과 유사합니다.

### Q2. Deadlock 발생 조건 4가지를 설명해주세요.

**답변:**
1) Mutual Exclusion: 자원을 공유할 수 없음
2) No Preemption: 자원을 강제로 빼앗을 수 없음
3) Hold and Wait: 자원을 가진 채로 다른 자원을 기다림
4) Circular Wait: 프로세스들이 순환 형태로 자원을 기다림
이 4가지 조건이 모두 성립해야 Deadlock이 발생합니다.

### Q3. Deadlock 해결 방법을 설명해주세요.

**답변:**
1) Prevention: 4가지 조건 중 하나를 제거 (Circular Wait 제거가 가장 많이 사용)
2) Avoidance: Banker Algorithm으로 안전한 경우에만 자원 할당
3) Detection & Recovery: Deadlock 발생 후 탐지하여 프로세스 종료 또는 자원 선점
4) Ignorance: 시스템이 책임지지 않음 (대부분 OS 채택)

### Q4. Deadlock과 Starvation의 차이는?

**답변:**
Deadlock은 프로세스들이 서로의 자원을 기다리며 순환 대기 상태에 빠진 것이고, Starvation은 특정 프로세스가 우선순위가 낮아 계속 자원을 할당받지 못하는 상태입니다. Deadlock은 순환 구조이고, Starvation은 우선순위 문제입니다.

### Q5. Java에서 Deadlock을 어떻게 해결하나요?

**답변:**
1) Circular Wait 제거: 모든 스레드가 같은 순서로 lock을 취득하도록 변경
2) Hold and Wait 제거: 중첩된 synchronized 블록을 분리하여 한 번에 하나의 lock만 취득
이 두 가지 방법으로 Deadlock을 예방할 수 있습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/OS/os_deadLock.md`
- 내용: Deadlock 개념, 발생 조건, 처리 방법, Java 예시

### 추가 학습 자료

- [유튜브 쉬운 코드 - 데드락(교착상태)](https://youtu.be/ESXCSNGFVto)
- [이화여대 반효경 교수님 - 운영체제](http://www.kocw.net/home/cview.do?cid=3646706b4347ef09)