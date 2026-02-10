---
category: Database
curated_by: Claude Sonnet 4.5
difficulty: easy
generated: 2026-02-09
interview_frequency: high
prerequisites:
- Key
related:
- RDBMS-NoSQL
- Connection-Pool
- Replication-Clustering
sources: 1
subtopic: Redis
tags:
- key-value
- in-memory
- no-sql
- cache
- message-broker
---

# Redis

## 📝 개념 정의

**Remote Dictionary Server**

**Key-Value 구조의 비정형 데이터를 관리하기 위한 오픈 소스 기반 비관계형(NoSQL) 인메모리 DBMS**

**용도:**
- DB
- Cache
- Message Broker

---

## 🔑 Message Broker

**Publisher(송신자)로부터 전달받은 메시지를 Subscriber(수신자)로 전달**

**역할:**
- 응용 소프트웨어 간 메시지 교환
- Redis를 Message Queue로 활용

---

## ⚡ 특징

### 1. Key-Value 구조

**쿼리 사용 불필요**

---

### 2. 인메모리 처리

**메모리에서 데이터 처리 → 속도 빠름**

**디스크 쓰기 구조 아님**

---

### 3. 다양한 자료 구조 지원

- **String**: 가장 일반적인 Key-Value
- **Lists**: Array 형식, 처음/끝 데이터 삽입/삭제 빠름
- **Sets**: String 집합, 여러 값을 하나의 Value에 저장
- **Sorted Sets**: Set + 정렬
- **Hashes**: Field-Value 쌍

---

### 4. Single Threaded

**한 번에 하나의 명령만 처리**

**주의:**
- 처리 시간 긴 명령어 → 뒤 명령어 대기

---

## 💾 Redis 영속성 (Persistence)

### RDB (Snapshotting)

**메모리 내용을 Disk에 전체 저장**

**특징:**
- 순간적으로 전체 스냅샷
- 특정 시점 백업

---

### AOF (Append On File)

**모든 Write/Update 연산을 Log 파일에 기록**

**특징:**
- 입력/수정/삭제 명령 기록
- 조회 명령 제외
- 더 안전한 데이터 보존

---

## 📖 Cache 읽기 전략

### 1. Look Aside (Lazy Loading)

```
1. Cache에 Data 존재 확인
2. Data 있으면 → Cache 사용
3. Data 없으면 → DB 조회
4. DB Data를 Cache에 저장
```

---

### 2. Read Through

**Cache에서만 데이터 읽기**

**특징:**
- 데이터 동기화를 라이브러리/캐시 제공자에게 위임
- Cache와 DB 간 데이터 동기화 항상 유지

**장점:**
✅ 데이터 정합성 문제 해결
✅ 읽기 많은 곳에 적합

**단점:**
❌ 전체적으로 속도 느림
❌ Redis 다운 시 서비스 차질

---

## ✍️ Cache 쓰기 전략

### 1. Write Back

```
1. Data를 Cache에 저장
2. Cache Data 일정 기간 Check
3. 모여있는 Data를 DB에 저장
4. Cache Data 삭제
```

**장점:**
✅ 쓰기 성능 향상

**단점:**
❌ 데이터 유실 가능성

---

### 2. Write Through

**DB와 Cache에 동시 저장**

**장점:**
✅ DB와 Cache 항상 동기화
✅ 데이터 유실 방지

**단점:**
❌ 매 요청마다 2번 쓰기
❌ 빈번한 생성/수정 시 성능 이슈

---

### 3. Write Around

**모든 데이터는 DB에만 저장**

**동작:**
- Cache 갱신 안 함
- Cache Miss 발생 시에만 Cache 저장

**장점:**
✅ Write Through보다 빠름

**단점:**
❌ Cache와 DB 데이터 불일치 가능

---

## 📊 Cache 전략 비교

| 전략 | 읽기 | 쓰기 | 정합성 | 성능 |
|------|------|------|--------|------|
| **Look Aside** | Cache → DB | DB만 | 중간 | 빠름 |
| **Read Through** | Cache만 | - | 높음 | 느림 |
| **Write Back** | - | Cache → DB | 낮음 | 매우 빠름 |
| **Write Through** | - | Cache + DB | 높음 | 느림 |
| **Write Around** | - | DB만 | 낮음 | 빠름 |

---

## ⚠️ 주의점

### 1. 서버 장애 대비

**인메모리 DB → 데이터 유실 가능**

**대책:**
- 운영 플랜 필요
- RDB/AOF 영속성 활용

---

### 2. Single Thread 특성

**처리 시간 긴 명령 피해야 함**

**피해야 할 명령:**
- `KEYS *` (전체 키 조회)
- 대량 데이터 처리

---

## 💡 데이터 정합성 문제

**Cache와 DB 간 데이터 불일치**

**해결:**
- 적절한 읽기/쓰기 전략 선택
- TTL(Time To Live) 설정
- 캐시 무효화 전략

---

## ❓ 면접 질문 예시

### Q1. Redis란 무엇인가요?

**답변:**
Redis는 Remote Dictionary Server의 약자로 Key-Value 구조의 비정형 데이터를 관리하기 위한 오픈 소스 기반 비관계형 인메모리 DBMS입니다. DB, Cache, Message Broker 용도로 사용되며, 메모리에서 데이터를 처리하기 때문에 속도가 매우 빠릅니다.

### Q2. Redis의 특징은?

**답변:**
1) Key-Value 구조로 쿼리 사용 불필요
2) 인메모리 처리로 속도가 빠름
3) String, Lists, Sets, Sorted Sets, Hashes 등 다양한 자료 구조 지원
4) Single Threaded로 한 번에 하나의 명령만 처리
5) RDB/AOF 방식으로 영속성 보장 가능

### Q3. Look Aside와 Read Through의 차이는?

**답변:**
Look Aside는 Cache에 데이터가 없으면 DB에서 조회 후 Cache에 저장하는 방식입니다. Read Through는 Cache에서만 데이터를 읽고 데이터 동기화를 라이브러리에게 위임하는 방식입니다. Read Through가 정합성은 높지만 속도가 느리고, Look Aside가 더 빠르지만 정합성 문제가 발생할 수 있습니다.

### Q4. Write Back과 Write Through의 차이는?

**답변:**
Write Back은 데이터를 Cache에만 저장하고 일정 기간 후 DB에 일괄 저장하는 방식으로 쓰기 성능이 뛰어나지만 데이터 유실 가능성이 있습니다. Write Through는 DB와 Cache에 동시에 저장하는 방식으로 데이터 정합성은 높지만 매 요청마다 2번 쓰기가 발생하여 성능이 떨어집니다.

### Q5. Redis 사용 시 주의점은?

**답변:**
1) 인메모리 DB이기 때문에 서버 장애 시 데이터 유실 가능성이 있어 RDB/AOF 영속성 전략과 운영 플랜이 필요합니다.
2) Single Thread 특성상 처리 시간이 긴 명령(KEYS *, 대량 데이터 처리)은 피해야 합니다.
3) Cache와 DB 간 데이터 정합성 문제를 해결하기 위해 적절한 읽기/쓰기 전략을 선택해야 합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/DB/db_redis.md`
- 내용: Redis, Cache 전략, 영속성