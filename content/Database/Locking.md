---
category: Database
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Locking
tags: []
---

# DB Locking (데이터베이스 잠금)

## 📝 트랜잭션 스케줄 유형

### 병행 수행

**트랜잭션들이 차례로 번갈아가며 수행되는 인터리빙 방식**

---

### 1. 직렬 스케줄 (Serial Schedule)

**트랜잭션별로 순차적 실행**

**특징:**
✅ 항상 모순 없는 정확한 결과
✅ 독립적 수행

**단점:**
❌ 인터리빙 방식 미사용
❌ 병행 수행 아님
❌ 일반적으로 사용 안 함

---

### 2. 비직렬 스케줄 (Non-Serial Schedule)

**인터리빙 방식으로 병행 수행**

**문제점:**
- 갱신 분실
- 모순성
- 연쇄 복귀

**결과:**
❌ 정확성 보장 불가

---

### 3. 직렬 가능 스케줄 (Serializable Schedule)

**직렬 스케줄과 같은 결과를 생성하는 비직렬 스케줄**

**특징:**
✅ 정확한 결과
✅ 병행 수행

**문제:**
- 판단 어려움
- DBMS는 병행 제어 기법 사용

---

## 🔒 병행 제어 기법

**여러 트랜잭션 병행 수행하면서도 정확한 결과를 얻기 위한 기법**

**원리:**
- 모든 트랜잭션이 따를 규약 정의
- 규약 준수 → 직렬 가능성 보장

---

## 🔐 Locking 개념

**트랜잭션 처리의 순차성을 보장하기 위한 방법**

**원리:**
- 동일 데이터 동시 접근 방지
- Lock과 Unlock 연산 사용
- 상호 배제로 직렬 가능성 보장

---

### Lock 연산

**데이터에 대한 독점권 획득**

---

### Unlock 연산

**데이터에 대한 독점권 반납**

---

## 📜 기본 Locking 규약

### 1. Lock 획득

**DB 데이터 접근 전 Lock 연산 실행 → 독점권 획득**

---

### 2. Unlock 반납

**모든 연산 수행 후 Unlock 연산 → 독점권 반납**

---

### 3. Lock 소유자만 Unlock

**Lock 연산 실행한 트랜잭션만 Unlock 가능**

---

## 📏 Lock 단위 설정

### 전체 DB

**장점:**
✅ 제어 간단

**단점:**
❌ 병행 수행 불가

---

### 가장 작은 단위 (속성)

**장점:**
✅ 높은 병행성

**단점:**
❌ 제어 복잡

---

### 원칙

```
Lock 단위 ↑ → 병행성 ↓, 제어 쉬움
Lock 단위 ↓ → 병행성 ↑, 제어 어려움
```

**→ 시스템에 따라 적절한 Lock 단위 선택 중요**

---

## 🔑 Lock 연산 종류

### Shared Lock (공유 잠금, S-Lock)

**Read 연산만 가능**

**특징:**
✅ 다른 트랜잭션도 Shared Lock 동시 실행 가능
❌ Write 연산 불가

---

### Exclusive Lock (배타 잠금, X-Lock)

**Read와 Write 연산 모두 가능**

**특징:**
✅ Read/Write 모두 가능
❌ Lock 해제까지 다른 트랜잭션 접근 불가

---

## ⏸️ Blocking (블로킹)

**Lock 경합 발생으로 특정 세션이 멈춘 상태**

**발생 경우:**
- Shared Lock ↔ Exclusive Lock
- Exclusive Lock ↔ Exclusive Lock

---

### 해결 방법

#### 1. Transaction Commit/Rollback

**트랜잭션 종료**

---

#### 2. SQL 리팩토링

**가장 빠르게 실행되도록 최적화**

**= 속도 개선**

---

#### 3. 트랜잭션 짧게 정의

**경합 감소**

**= 허용 시간 단축**

---

#### 4. 동일 데이터 동시 변경 방지

**설계 단계에서 고려**

---

#### 5. Lock Timeout 설정

**대용량 작업 시 작업 단위 분할 또는 최대 시간 설정**

---

## 💀 DeadLock (교착 상태)

**트랜잭션들이 서로 Unlock을 기다리며 무한 대기**

```
T1: Lock(A) → Lock(B) 대기
T2: Lock(B) → Lock(A) 대기
→ 무한 대기
```

**결과:**
- 더 이상 수행 불가
- 한없이 기다림

---

## 🔒 Pessimistic Lock (비관적 락)

**동시성 문제 발생 예상 → Lock 선점**

**격리 수준:**
- Repeatable Read
- Serializable

---

### 동작 원리

**트랜잭션 시작 시 Shared/Exclusive Lock**

```
1. T1: Shared Lock 획득 (Read)
2. T2: Read 요청 (성공)
3. T2: Update 요청 (Blocking - T1의 Lock 때문)
4. T1: Commit
5. T2: Update 성공
```

**→ Transaction으로 충돌 예방**

---

### 장점

✅ **충돌 자주 발생하는 환경**에서 롤백 횟수 감소 → 성능 유리
✅ 데이터 무결성 보장 수준 매우 높음

---

### 단점

❌ 데이터에 Lock → **동시성 떨어짐** → 성능 손해
❌ 읽기 많은 DB에서 손해 심함
❌ **DeadLock** 발생 가능성

---

## 🔓 Optimistic Lock (낙관적 락)

**Lock 선점 안 함 → 동시성 문제 발생 시 처리**

**Application Level에서 처리**

---

### 동작 원리

**Version 컬럼으로 충돌 감지**

```
1. A: Read (Id=1, Name=Brown, Version=1)
2. B: Read (Id=1, Name=Brown, Version=1)
3. B: Update (Version=1 → 2) 성공
4. A: Update (Version=1 찾기) 실패 (이미 Version=2)
```

**→ Version으로 충돌 예방**

---

### 장점

✅ **충돌 안 난다는 가정** → 동시 요청 처리 성능 좋음

---

### 단점

❌ 잦은 충돌 → **롤백 처리 비용** 높음 → 성능 손해
❌ 롤백 처리 구현 복잡
❌ **개발자가 직접 롤백 처리** 필요

---

## 📊 Pessimistic vs Optimistic Lock

| 특징 | Pessimistic Lock | Optimistic Lock |
|------|------------------|-----------------|
| **Lock 시점** | 트랜잭션 시작 시 | 충돌 발생 시 |
| **처리 위치** | DB | Application |
| **충돌 예방** | Lock | Version |
| **동시성** | 낮음 | 높음 |
| **적합 환경** | 충돌 많음 | 충돌 적음 |
| **무결성** | 매우 높음 | 중간 |
| **DeadLock** | 가능 | 없음 |

---

## ❓ 면접 질문 예시

### Q1. Locking이란 무엇인가요?

**답변:**
Lock이란 트랜잭션 처리의 순차성을 보장하기 위한 방법입니다. Locking 기법은 병행 수행되는 트랜잭션들이 동일한 데이터에 동시에 접근하지 못하도록 Lock과 Unlock 연산을 이용해 제어합니다. 한 트랜잭션이 먼저 접근한 데이터에 대한 연산을 모두 마칠 때까지 다른 트랜잭션이 접근하지 못하도록 상호 배제하여 직렬 가능성을 보장합니다.

### Q2. Shared Lock과 Exclusive Lock의 차이는?

**답변:**
Shared Lock(공유 잠금)은 해당 데이터에 Read 연산만 실행할 수 있고, 다른 트랜잭션도 Shared Lock을 동시에 실행할 수 있습니다. Exclusive Lock(배타 잠금)은 Read와 Write 연산을 모두 실행할 수 있지만, Lock이 해제될 때까지 다른 트랜잭션이 어떤 Lock 연산도 실행할 수 없습니다.

### Q3. Pessimistic Lock과 Optimistic Lock의 차이는?

**답변:**
Pessimistic Lock은 동시성 문제가 발생할 것이라 예상하고 트랜잭션 시작 시 Lock을 걸어버리는 방법으로 DB에서 처리합니다. Optimistic Lock은 Lock을 선점하지 않고 동시성 문제 발생 시 처리하는 방법으로 Application Level에서 Version 컬럼을 이용해 충돌을 감지합니다. Pessimistic Lock은 충돌이 많은 환경에서, Optimistic Lock은 충돌이 적은 환경에서 유리합니다.

### Q4. Blocking이란 무엇이고 해결 방법은?

**답변:**
Blocking은 Lock의 경합이 발생하여 특정 세션이 작업을 진행하지 못하고 멈춰선 상태입니다. 해결 방법으로는 1) SQL 문장을 가장 빠르게 실행되도록 리팩토링, 2) 트랜잭션을 짧게 정의하여 경합 감소, 3) 동일 데이터 동시 변경 방지 설계, 4) 대용량 작업 시 작업 단위 분할 또는 lock_timeout 설정이 있습니다.

### Q5. DeadLock이란 무엇인가요?

**답변:**
DeadLock(교착 상태)는 각 트랜잭션들이 Lock을 획득하기 위해 상대가 독점하고 있는 데이터에 Unlock 연산이 실행되기를 서로 기다리면서 수행을 중단하고 있는 상태입니다. 예를 들어 T1이 A를 Lock하고 B를 기다리고, T2가 B를 Lock하고 A를 기다리면 무한 대기 상태가 됩니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [db_locking.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Database/db_locking.md)
- 내용: Locking, Shared/Exclusive Lock, Pessimistic/Optimistic Lock

### 추가 학습 자료

- [[DB] Lock에 대해서 알아보자 - 기본편](https://sabarada.tistory.com/121)
- [[DB] Lock이란?](https://chrisjune-13837.medium.com/db-lock-%EB%9D%BD%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80-d908296d0279)
- [[DB] 낙관적 락(Optimistic Lock)과 비관적 락(Pessimistic Lock)](https://sabarada.tistory.com/175)