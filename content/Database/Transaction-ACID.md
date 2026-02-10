---
category: Database
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: 트랜잭션과 ACID
tags: []
---

# 트랜잭션 (Transaction)

## 📝 개념 정의

**데이터베이스에서 하나의 논리적 기능을 수행하기 위한 작업의 단위**입니다.

**핵심:**
- 여러 개의 쿼리를 하나로 묶는 단위
- 데이터의 정합성을 보장
- All or Nothing (완료 → Commit, 실패 → Rollback)

---

## 🔄 트랜잭션 연산

### COMMIT

- 작업 내용을 DB에 **영구적으로 저장**
- Transaction 종료

### ROLLBACK

- 작업을 모두 **취소**하고 이전 상태로 복구
- Transaction 종료

### AUTOCOMMIT

- 각 쿼리에 자동으로 Transaction 처리
- 쿼리 성공 시 자동 Commit
- 실행 중 문제 발생 시 Rollback
- MySQL은 기본적으로 AUTOCOMMIT enabled

---

## 💰 예시: 계좌 이체

### 상황

```
🐰 주디 계좌: 200만 원
🐱 송송 계좌: 100만 원
```

주디가 송송에게 10만 원 이체

### Transaction 구성

```sql
START TRANSACTION;
UPDATE account SET balance = balance - 100000 WHERE id = "주디";
UPDATE account SET balance = balance + 100000 WHERE id = "송송";
COMMIT;
```

**결과:**
```
🐰 주디 계좌: 190만 원
🐱 송송 계좌: 110만 원
```

### Rollback 예시

```sql
START TRANSACTION;
UPDATE account SET balance = balance - 100000 WHERE id = "주디";
ROLLBACK;  -- 주디 계좌는 다시 190만 원으로 복구
```

---

## 🔧 Java/Spring 구현

### Java 예시

```java
public void transfer(String fromId, String toId, int amount) {
    try {
        Connection connection = ...;
        connection.setAutoCommit(false);  // START TRANSACTION
        ...  // update at fromId
        ...  // update at toId
        connection.commit();
    } catch (Exception e) {
        connection.rollback();
    } finally {
        connection.setAutoCommit(true);
    }
}
```

### Spring Boot

```java
@Transactional
public void transfer(String fromId, String toId, int amount) {
    // 간단하게 어노테이션으로 구현
}
```

---

## 📊 트랜잭션 상태

```
         ┌─────────┐
         │ Active  │ (실행 중)
         └────┬────┘
              │
      ┌───────┴───────┐
      │               │
┌─────▼──────┐  ┌────▼────┐
│ Partially  │  │ Failed  │
│ Committed  │  └────┬────┘
└─────┬──────┘       │
      │              │
┌─────▼──────┐  ┌────▼────┐
│ Committed  │  │ Aborted │
└────────────┘  └─────────┘
```

### 상태 설명

- **Active**: Transaction 실행 중
- **Partially Committed**: 데이터 변경을 메모리에만 적용 (DB 미반영)
- **Committed**: 정상 완료, DB에 데이터 쓰기 완료 (Rollback 불가)
- **Failed**: 오류로 실패
- **Aborted**: 취소, 이전 데이터로 복구

---

## ✅ ACID 속성

### 1. 원자성 (Atomicity)

**All or Nothing**

**특징:**
- 모두 수행되거나 전혀 수행되지 않음
- Commit 이전에는 메모리 버퍼에만 저장
- 실패 시 디스크에 반영하지 않음

**예시:**
- 이체 작업: 출금 + 입금 모두 성공 또는 모두 실패

---

### 2. 일관성 (Consistency)

**Transaction 전후로 데이터 일관성 유지**

**특징:**
- DB에 정의된 Rules 위반 시 Rollback
- Constraints, Trigger 등 검증

#### 예시: 잔액 음수 방지

```sql
CREATE TABLE account (
    ...,
    balance INT,
    CHECK (balance >= 0)
);
```

**상황:**
- 주디 계좌: 200만 원
- 210만 원 이체 시도 → 잔액 -10만 원

**결과:**
- CHECK 제약 위반 → **Inconsistent** → Rollback

---

### 3. 격리성 (Isolation)

**각 Transaction이 독립적으로 수행**

**특징:**
- 병렬 Transaction이 서로 간섭하지 않음
- 순차적으로 실행되는 것처럼 동작
- 여러 Isolation Level 제공

#### 예시: 동시 Transaction

```
초기 상태:
🐰 주디 계좌: 200만 원
🐱 송송 계좌: 100만 원
```

**Transaction 1 (주디 → 송송 이체 10만 원):**
```sql
START TRANSACTION;
UPDATE account SET balance = balance - 100000 WHERE id = "주디";
UPDATE account SET balance = balance + 100000 WHERE id = "송송";
COMMIT;
```

**Transaction 2 (송송 ATM 입금 20만 원):**
```sql
START TRANSACTION;
UPDATE account SET balance = balance + 200000 WHERE id = "송송";
COMMIT;
```

**Isolation 없이 동시 실행 시 문제:**
- Transaction 2가 Transaction 1의 중간 상태 읽기 가능
- 데이터 불일치 발생

**Isolation 보장:**
- 각 Transaction이 독립적으로 실행
- 최종 결과 일관성 유지

---

### 4. 지속성 (Durability)

**Commit된 Transaction은 영구적으로 저장**

**특징:**
- 시스템 장애 발생 시에도 데이터 유지
- 체크섬, 저널링, 롤백 기능

**보장:**
- Committed 상태에서는 철회 불가능

---

## 🎯 Transaction 설계의 중요성

**개발자의 역량:**
- Transaction을 어떻게 정의하고 사용할지는 개발자가 결정
- 구현 기능과 ACID 속성 이해 필수
- 적절한 Transaction 정의로 데이터 정합성 보장

**고려사항:**
- Transaction 범위 설정
- Isolation Level 선택
- 성능과 일관성 Trade-off

---

## ❓ 면접 질문 예시

### Q1. Transaction이란 무엇인가요?

**답변:**
데이터베이스에서 하나의 논리적 기능을 수행하기 위한 작업의 단위입니다. 여러 쿼리를 하나로 묶어 All or Nothing 방식으로 처리하며, 모두 성공하면 Commit, 하나라도 실패하면 Rollback하여 데이터의 정합성을 보장합니다.

### Q2. ACID 속성을 설명해주세요.

**답변:**
- **Atomicity(원자성)**: All or Nothing, 모두 수행되거나 전혀 수행되지 않음
- **Consistency(일관성)**: Transaction 전후로 데이터 일관성 유지, DB 제약조건 위반 시 Rollback
- **Isolation(격리성)**: 각 Transaction이 독립적으로 수행, 동시 실행 시에도 순차 실행처럼 동작
- **Durability(지속성)**: Commit된 Transaction은 영구 저장, 시스템 장애 시에도 유지

### Q3. Isolation이 중요한 이유는?

**답변:**
여러 Transaction이 동시에 실행될 때 서로 간섭하지 않도록 보장하기 위해서입니다. Isolation이 없으면 한 Transaction이 다른 Transaction의 중간 상태를 읽어 데이터 불일치가 발생할 수 있습니다. Isolation Level을 적절히 설정하여 성능과 일관성의 균형을 맞출 수 있습니다.

### Q4. Commit과 Rollback의 차이는?

**답변:**
Commit은 Transaction의 모든 작업을 DB에 영구적으로 저장하고 Transaction을 종료합니다. Rollback은 Transaction의 모든 작업을 취소하고 이전 상태로 복구한 후 Transaction을 종료합니다. Commit 후에는 Rollback이 불가능합니다.

### Q5. Transaction을 어떻게 설계해야 하나요?

**답변:**
구현하려는 기능과 ACID 속성을 이해하여 적절한 범위로 Transaction을 정의해야 합니다. Transaction 범위가 너무 크면 성능이 저하되고, 너무 작으면 데이터 정합성이 깨질 수 있습니다. 또한 Isolation Level을 적절히 선택하여 성능과 일관성의 균형을 맞춰야 합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [db_transaction_and_acid.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Database/db_transaction_and_acid.md)
- 내용: Transaction 개념, ACID 속성, 예시

### 추가 학습 자료

- [[NAVER D2] DBMS는 어떻게 트랜잭션을 관리할까?](https://d2.naver.com/helloworld/407507)
- 쉬운 코드 채널