---
category: Database
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Transaction Isolation Level
tags: []
---

# Transaction Isolation Level (트랜잭션 격리 수준)

## 📝 개념 정의

**트랜잭션 Isolation 유지를 위한 수준 설정**

**목적:**
- 복수 트랜잭션 동시 실행 시 이상 현상 방지
- 데이터 정합성과 성능 사이 Trade-off

---

## ⚠️ Isolation 문제점

### Serializability & Recoverability 보장

**장점:**
✅ 이상 현상 방지

**단점:**
❌ 동시 처리 트랜잭션 수 감소
❌ DBMS 성능 하락

---

### 해결책

**여러 Isolation Level 제공**

**→ 개발자가 데이터 정합성과 성능 사이 Trade-off**

---

## 🚨 격리 수준에 따른 이상 현상

### 1. Dirty Read (더티 리드)

**커밋되지 않은 데이터를 다른 트랜잭션이 읽음**

```
T1: Update (키 171 → 177) (미커밋)
T2: Read (키 = 177) ← 문제!
T1: Rollback
→ T2는 존재하지 않는 데이터 읽음
```

---

### 2. Non-Repeatable Read (반복 가능하지 않은 조회, Fuzzy Read)

**한 트랜잭션 내 같은 쿼리가 다른 결과 반환**

```
T1: Read (떡볶이 = 3000원)
T2: Update (떡볶이 = 4000원)
T2: Commit
T1: Read (떡볶이 = 4000원) ← 문제!
→ 같은 트랜잭션 내 다른 값
```

**Repeatable Read 정합성 위배**

---

### 3. Phantom Read (팬텀 리드)

**한 트랜잭션 내 같은 쿼리에서 유령 레코드 출현**

```
T1: Select (금액 >= 5000원) → 3개
T2: Insert (금액 = 6000원)
T2: Commit
T1: Select (금액 >= 5000원) → 4개 ← 문제!
→ 존재하지 않던 레코드 출현
```

---

## 📊 4가지 Isolation Level

**SQL 표준 정의**

| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|-------|------------|---------------------|--------------|
| **Read Uncommitted** | O | O | O |
| **Read Committed** | X | O | O |
| **Repeatable Read** | X | X | O |
| **Serializable** | X | X | X |

**위로 갈수록:**
- 동시성 ↑, 격리성 ↓

**아래로 갈수록:**
- 동시성 ↓, 격리성 ↑

---

## 🔓 1. Read Uncommitted (레벨 0)

**커밋되지 않은 데이터도 조회 가능**

**허용 이상 현상:**
- Dirty Read ✅
- Non-Repeatable Read ✅
- Phantom Read ✅

**특징:**
❌ 무결성 위험
❌ 사용 권장 안 함

---

## 📖 2. Read Committed (레벨 1)

**커밋된 데이터만 조회 가능**

**허용 이상 현상:**
- Dirty Read ❌
- Non-Repeatable Read ✅
- Phantom Read ✅

**특징:**
✅ 가장 많이 사용
✅ 많은 DB의 Default 값
⚠️ 다른 트랜잭션이 행 수정 가능

---

## 🔁 3. Repeatable Read (레벨 2)

**트랜잭션 진입 전 커밋된 내용만 조회**

**허용 이상 현상:**
- Dirty Read ❌
- Non-Repeatable Read ❌
- Phantom Read ✅

**특징:**
✅ 행 수정 방지
⚠️ 새로운 행 추가는 막지 않음

---

## 🔒 4. Serializable (레벨 3)

**트랜잭션 순차적 진행**

**허용 이상 현상:**
- Dirty Read ❌
- Non-Repeatable Read ❌
- Phantom Read ❌

**특징:**
✅ 매우 엄격
✅ Lock으로 다른 트랜잭션 접근 차단

**단점:**
❌ 교착 상태 확률 높음
❌ 성능 매우 떨어짐

---

## 🎯 Isolation Level 선택 기준

### Read Uncommitted

**사용 권장 안 함**

---

### Read Committed

**일반적인 경우**

**적합:**
- 대부분의 애플리케이션
- 성능과 정합성 균형

---

### Repeatable Read

**데이터 정합성 중요**

**적합:**
- 금융 시스템
- 재고 관리

---

### Serializable

**완벽한 격리 필요**

**적합:**
- 매우 중요한 트랜잭션
- 성능보다 정확성 우선

---

## 💡 Trade-off

### 데이터 정합성 vs 성능

```
Read Uncommitted
  ↓ 정합성 ↓, 성능 ↑
Read Committed
  ↓ 정합성 ↑, 성능 ↓
Repeatable Read
  ↓ 정합성 ↑, 성능 ↓
Serializable
  ↓ 정합성 ↑↑, 성능 ↓↓
```

---

## ⚙️ RDBMS별 차이

### 주의사항

- RDBMS마다 제공하는 Isolation Level 다름
- 같은 이름이라도 동작 방식 다를 수 있음
- 사용하는 RDBMS의 Isolation Level 파악 필요

---

## ❓ 면접 질문 예시

### Q1. 트랜잭션 격리 수준이란 무엇이고 왜 필요한가요?

**답변:**
트랜잭션 격리 수준은 복수의 트랜잭션을 동시에 실행할 때 이상 현상이 일어나지 않도록 하는 수준입니다. Serializability와 Recoverability를 완벽히 보장하면 이상 현상은 방지되지만 동시 처리 트랜잭션 수가 줄어 성능이 하락합니다. 이를 해결하기 위해 여러 Isolation Level을 제공하여 개발자가 데이터 정합성과 성능 사이에서 Trade-off할 수 있도록 합니다.

### Q2. Dirty Read, Non-Repeatable Read, Phantom Read를 설명해주세요.

**답변:**
Dirty Read는 커밋되지 않은 데이터를 다른 트랜잭션이 읽는 현상입니다. Non-Repeatable Read는 한 트랜잭션 내에서 같은 쿼리를 두 번 실행했을 때 다른 결과가 나오는 현상입니다. Phantom Read는 한 트랜잭션 내에서 같은 쿼리를 두 번 실행했을 때 첫 번째에 없던 유령 레코드가 두 번째에 나타나는 현상입니다.

### Q3. 4가지 Isolation Level을 설명해주세요.

**답변:**
1) Read Uncommitted: 커밋되지 않은 데이터도 조회 가능, 모든 이상 현상 발생
2) Read Committed: 커밋된 데이터만 조회, Dirty Read 방지, 가장 많이 사용
3) Repeatable Read: 트랜잭션 진입 전 커밋된 내용만 조회, Non-Repeatable Read 방지
4) Serializable: 트랜잭션 순차 진행, 모든 이상 현상 방지, 성능 매우 떨어짐

### Q4. Read Committed가 가장 많이 사용되는 이유는?

**답변:**
Read Committed는 커밋된 데이터만 조회할 수 있어 Dirty Read를 방지하면서도 적절한 성능을 유지합니다. 데이터 정합성과 성능 사이에서 균형을 잘 맞추기 때문에 대부분의 애플리케이션에 적합하며, 많은 데이터베이스의 기본값으로 설정되어 있습니다.

### Q5. Serializable의 단점은?

**답변:**
Serializable은 트랜잭션을 순차적으로 진행하고 Lock을 걸어 다른 트랜잭션의 접근을 차단하기 때문에 교착 상태가 일어날 확률이 높고 성능이 매우 떨어집니다. 완벽한 격리가 필요한 매우 중요한 트랜잭션에만 사용해야 합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/DB/db_transaction_isolation_level.md`
- 내용: Transaction Isolation Level, Dirty Read, Non-Repeatable Read, Phantom Read

### 추가 학습 자료

- [[NAVER D2] DBMS는 어떻게 트랜잭션을 관리할까?](https://d2.naver.com/helloworld/407507)
- 주홍철, 『면접을 위한 CS 전공지식 노트』, 깃벗(2022), p224-231