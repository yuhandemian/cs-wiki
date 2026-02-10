---
category: Database
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Transaction Concurrency Control
tags: []
---

# Transaction Concurrency Control (동시성 제어)

## 📝 Concurrency Control이란?

**어떤 schedule도 Serializable하고 Recoverable하게 동작하도록 해주는 것**

**ACID 중 Isolation과 관련**

---

## 🔄 Serializability

### Serial Schedule

**트랜잭션들이 겹치지 않고 한 번에 하나씩 실행**

**장점:** 순서와 정합성 보장

**단점:** 성능 저하 (CPU 낭비)

---

### Non-Serial Schedule

**트랜잭션들이 겹쳐서(interleaving) 실행**

**장점:** 동시성 높아져 성능 향상

**단점:** 이상 현상 발생 가능**

---

## ⭐ Conflict Serializable

**Serial schedule과 conflict equivalent일 때**

**Non-serial schedule이지만 정상적인 결과**

---

### Conflict

**두 operation이 세 조건 모두 만족:**

1. 서로 다른 트랜잭션 소속
2. 같은 데이터 접근
3. 최소 하나는 write operation

**Conflict operation은 실행 순서 바뀌면 결과도 바뀜**

---

### Conflict Equivalent

**두 schedule이 두 조건 모두 만족:**

1. 같은 transaction 보유
2. Conflict operation 실행 순서 동일

---

## 💡 Recoverability

**트랜잭션 실패 시 회복 가능성**

**Rollback 시 다른 트랜잭션이 영향받지 않는 것**

---

### Unrecoverable Schedule

**Rollback해도 이전 상태로 회복 불가능**

**DBMS가 허용하면 안 됨**

**Commit된 transaction이 rollback된 transaction의 write 데이터를 읽은 경우**

**DIRTY READ 발생**

---

### Recoverable Schedule

**자신이 읽은 데이터를 write한 transaction이 먼저 commit/rollback 될 때까지 commit하지 않음**

**Cascading Rollback 발생 가능**

- 한 트랜잭션 rollback 시 의존 트랜잭션도 함께 rollback
- 비용이 큼

---

### Cascadeless Schedule

**Commit되지 않은 write 데이터는 읽지도 않음**

**Cascading Rollback 방지**

**하지만 write 충돌 가능**

---

### Strict Schedule

**Commit되지 않은 write 데이터는 읽지도 쓰지도 않음**

**가장 엄격한 스케줄**

**Write 충돌 방지**

---

## 📊 Schedule 계층

```
Strict Schedule
    ⊂ Cascadeless Schedule
        ⊂ Recoverable Schedule
            ⊂ All Schedules
```

---

## ❓ 면접 질문 예시

### Q1. Concurrency Control이란 무엇인가요?

**답변:**
Concurrency Control은 어떤 schedule도 Serializable하고 Recoverable하게 동작하도록 해주는 것입니다. ACID 중 Isolation과 관련이 있으며, 복수의 트랜잭션을 동시에 실행할 때 이상 현상이 일어나지 않도록 보장합니다.

### Q2. Serial Schedule과 Non-Serial Schedule의 차이는?

**답변:**
Serial Schedule은 트랜잭션들이 겹치지 않고 한 번에 하나씩 실행되어 순서와 정합성이 보장되지만 성능이 저하됩니다. Non-Serial Schedule은 트랜잭션들이 겹쳐서 실행되어 동시성이 높아지고 성능이 향상되지만 이상 현상이 발생할 수 있습니다.

### Q3. Conflict Serializable이란?

**답변:**
Conflict Serializable은 serial schedule과 conflict equivalent일 때를 말합니다. Non-serial schedule이지만 conflict operation의 실행 순서가 serial schedule과 동일하여 정상적인 결과를 낼 수 있습니다. RDBMS는 conflict serializable한 non-serial schedule을 허용하여 성능과 정합성을 모두 확보합니다.

### Q4. Recoverable Schedule과 Unrecoverable Schedule의 차이는?

**답변:**
Unrecoverable Schedule은 rollback해도 이전 상태로 회복이 불가능한 스케줄로, commit된 transaction이 rollback된 transaction의 write 데이터를 읽은 경우입니다. Recoverable Schedule은 자신이 읽은 데이터를 write한 transaction이 먼저 commit/rollback될 때까지 commit하지 않아 회복이 가능합니다.

### Q5. Strict Schedule이 필요한 이유는?

**답변:**
Cascadeless Schedule은 commit되지 않은 write 데이터를 읽지 않지만, 여전히 write 충돌이 발생할 수 있습니다. Strict Schedule은 commit되지 않은 write 데이터를 읽지도 쓰지도 않아 write 충돌까지 방지하는 가장 엄격한 스케줄입니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/DB/db_transaction_concurrency-control.md`
- 내용: Concurrency Control, Serializability, Recoverability

### 추가 학습 자료

- [DBMS는 어떻게 트랜잭션을 관리할까?](https://d2.naver.com/helloworld/407507)
- [트랜잭션 동시성 제어](https://hello-judy-world.tistory.com/196)