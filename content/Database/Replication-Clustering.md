---
category: Database
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Replication & Clustering & Sharding
tags: []
---

# Replication & Clustering & Sharding

## 📝 기본 데이터베이스 구조

```
┌─────────────┐
│   Server    │
├─────────────┤
│   Storage   │
└─────────────┘
```

**문제:** 서버나 스토리지 장애 시 서비스 중단

---

## 🔄 Clustering (클러스터링)

**여러 개의 DB를 수평적 구조로 구축**

**목적:** Single Point of Failure 해결, Fail Over 시스템 구축

**동기화:** 동기 방식

---

### 1. Active & Active

```
┌─────────┐  ┌─────────┐
│ Server1 │  │ Server2 │
└────┬────┘  └────┬────┘
     └──────┬─────┘
         ┌──┴───┐
         │Storage│
         └──────┘
```

**장점:**
✅ 서버 한 대 장애 시에도 서비스 계속
✅ CPU, Memory 부하 분산
✅ 서비스 중단 없음

**단점:**
❌ 하나의 스토리지 공유 → 병목 현상

---

### 2. Active & Stand-By

```
┌─────────┐  ┌─────────┐
│ Active  │  │Stand-By │
└────┬────┘  └────┬────┘
     └──────┬─────┘
         ┌──┴───┐
         │Storage│
         └──────┘
```

**동작:**
- Active 서버 장애 시 Fail Over
- Stand-By를 Active로 전환

**단점:**
❌ Fail Over 시간 동안 서비스 중단
❌ 한 대만 운영 → 효율 절반

---

## 📦 Replication (레플리케이션)

**서버와 스토리지 모두 복제**

**구조:** Master-Slave (수직적)

```
┌─────────┐
│  Master │ (INSERT, UPDATE, DELETE)
└────┬────┘
     │
  ┌──┴───┬───────┐
  │      │       │
┌─┴──┐ ┌─┴──┐ ┌─┴──┐
│Slave│ │Slave│ │Slave│ (SELECT)
└────┘ └────┘ └────┘
```

---

### 구축 목적

#### 1. 스케일 아웃

**트래픽 증가 시 서버 추가로 부하 분산**

---

#### 2. 데이터 백업

**레플리카 서버에서 백업 진행**

**이유:** 백업이 실행 중인 쿼리에 영향

---

#### 3. 데이터 분석

**데이터 분석 전담 서버 운영**

**이유:** 복잡한 쿼리가 실제 서비스에 영향

---

#### 4. 데이터의 지리적 분산

**다양한 지역에 레플리카 서버**

**목적:** 응답 속도 향상

---

### Replication 장점

✅ Slave 서버로 부하 분산
✅ 성능 향상
✅ 데이터 백업 용이

---

### Replication 단점

❌ 비동기 방식 → 일관성 문제 가능
❌ Master 서버 다운 시 복구 까다로움
❌ 버전 관리 필요

---

## 🔪 Sharding (샤딩)

**같은 테이블 스키마를 다수의 DB에 분산 저장**

**목적:** 검색 속도 향상

```
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Shard 1 │  │ Shard 2 │  │ Shard 3 │
│ (1-100) │  │(101-200)│  │(201-300)│
└─────────┘  └─────────┘  └─────────┘
```

**Shard Key:** 어떤 Shard를 선택할지 결정하는 키

---

### 1. Hash Sharding

**Database ID를 Hashing하여 결정**

```
Hash(ID) % Node 개수 = Shard 번호
```

**장점:**
✅ 구현 간단 (key-value)

**단점:**
❌ 확장성 떨어짐 (Resharding 필요)
❌ 공간 효율 고려 안 함

---

### 2. Dynamic Sharding

**Locator Service로 Shard Key 관리**

```
┌──────────────┐
│Locator Service│
│ (Shard Table)│
└───────┬──────┘
        │
  ┌─────┼─────┐
  │     │     │
┌─┴─┐ ┌─┴─┐ ┌─┴─┐
│Sh1│ │Sh2│ │Sh3│
└───┘ └───┘ └───┘
```

**장점:**
✅ 확장 용이 (Shard Key만 추가)
✅ 기존 Data Shard Key 변경 불필요

**단점:**
❌ Locator에 의존적
❌ 잘못된 Routing 시 Error

---

### 3. Entity Group

**관계 있는 Entity끼리 같은 Shard에 배치**

```
┌─────────────┐  ┌─────────────┐
│   Shard 1   │  │   Shard 2   │
│ User + Post │  │ User + Post │
└─────────────┘  └─────────────┘
```

**장점:**
✅ 단일 Shard 내 쿼리 효율적
✅ 강한 응집도
✅ 사용자 증가 시 확장성 좋음

**단점:**
❌ Cross-partition 쿼리 비효율적
❌ Consistency 보장 어려움

---

## 💾 MySQL Clustering

### Galera Clustering

**동작 과정:**
1. 1개 노드에 쓰기 트랜잭션 수행
2. COMMIT 실행
3. 디스크 쓰기 전 다른 노드로 복제 요청
4. 다른 노드에서 OK 신호
5. 실제 디스크에 데이터 저장

**WSREP 모듈:** 복제를 위한 범용 모듈

---

### Galera 장점

✅ 모든 노드에 일관성 있게 저장
✅ 모든 노드가 마스터로 작동
✅ 특정 노드 장애 시에도 서비스 정상

---

### Galera 단점

❌ Replication보다 쓰기 성능 떨어짐
❌ LOCK 문제 시 다른 노드로 전파 가능
❌ 횡적 스케일링 한계

---

## 💾 MySQL Replication

**동작 과정:**
1. Master가 데이터 저장, BIN LOG에 기록
2. Slave의 IO Thread가 BIN LOG 복사
3. Replay Log에 기록
4. SQL Thread가 읽어와 Data File에 저장

---

### MySQL Replication 특징

**Master:** DML 처리만 수행

**Slave:** Read만 수행 (여러 대 가능)

---

### 장점

✅ 방식 단순 → 신뢰도 높음
✅ 부하 분산

---

### 단점

❌ 비동기 방식 → 일시적 데이터 불일치
❌ Master 다운 시 복구 복잡

---

## 🍃 MongoDB Clustering

### Sharded Cluster

**구성 요소:**

**Query Router:**
- 쿼리를 각 Shard로 전달
- 데이터 저장 안 함 (Router 역할만)

**Shard:**
- 실제 데이터 저장소

**Config Server:**
- Shard가 어떤 데이터를 가지는지 관리
- Data chunk 분산 정보

---

### 동작 과정

1. Chunk metadata를 Config Server에서 가져와 캐시
2. 쿼리에서 Sharding Key 조건 찾기
3. Sharding Key 있으면 → 해당 Shard로만 요청
4. Sharding Key 없으면 → 모든 Shard로 요청
5. 결과 병합하여 반환

---

## 🍃 MongoDB Replication

### Replica-Set

```
┌─────────┐
│ Primary │
└────┬────┘
     │
  ┌──┴───┬──────┐
  │      │      │
┌─┴──┐ ┌─┴──┐ ┌─┴──┐
│Sec1│ │Sec2│ │Arb │
└────┘ └────┘ └────┘
```

**Primary:** 모든 쓰기 작업, 기본 읽기

**Secondary:** 읽기 작업 가능

**Arbiter:** 투표만 참여, 디스크 저장 안 함

---

### 특징

**Heartbeat:** 노드 간 상태 체크

**Primary 장애 시:**
- Secondary가 투표 개최
- 새로운 Primary 선출

**권장:** 홀수 노드 구성

---

## ❓ 면접 질문 예시

### Q1. 클러스터링과 레플리케이션의 차이는?

**답변:**
클러스터링은 여러 DB를 수평적 구조로 구축하여 하나의 스토리지를 공유하며, 동기 방식으로 데이터를 동기화합니다. 레플리케이션은 서버와 스토리지 모두를 복제하여 수직적 Master-Slave 구조로 구축하며, 비동기 방식으로 데이터를 동기화합니다.

### Q2. Replication의 구축 목적은?

**답변:**
1) 스케일 아웃: 트래픽 증가 시 서버를 추가하여 부하를 분산합니다.
2) 데이터 백업: 레플리카 서버에서 백업을 진행하여 실제 서비스에 영향을 주지 않습니다.
3) 데이터 분석: 복잡한 쿼리를 전담 서버에서 처리합니다.
4) 지리적 분산: 다양한 지역에 레플리카 서버를 두어 응답 속도를 높입니다.

### Q3. Sharding이란 무엇인가요?

**답변:**
Sharding은 같은 테이블 스키마를 가진 데이터를 다수의 데이터베이스에 분산하여 저장하는 방법입니다. 테이블을 특정 기준(Shard Key)으로 나눠서 저장 및 검색하여 검색 속도를 향상시킵니다. Hash Sharding, Dynamic Sharding, Entity Group 방식이 있습니다.

### Q4. MongoDB의 Config Server에 저장된 metadata는?

**답변:**
Config Server의 metadata는 어떤 Shard가 어떤 데이터(data chunk)를 가지고 있는지, data chunk들을 어떻게 분산해서 저장하며 관리할지에 대한 정보입니다. Query Router는 성능을 위해 이 metadata를 캐시로 저장합니다.

### Q5. Galera Clustering과 MySQL Replication의 차이는?

**답변:**
Galera Clustering은 모든 노드가 마스터로 작동하며 동기 방식으로 데이터를 복제하여 일관성이 높지만 쓰기 성능이 떨어집니다. MySQL Replication은 Master-Slave 구조로 비동기 방식으로 복제하여 방식이 단순하고 신뢰도가 높지만 일시적 데이터 불일치가 발생할 수 있습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [db_rdb_nosql_replication_and_clustering.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Database/db_rdb_nosql_replication_and_clustering.md)
- 내용: Clustering, Replication, Sharding, MySQL, MongoDB

### 추가 학습 자료

- [MySQL 클러스터링을 위한 Galera Cluster](https://bcho.tistory.com/1062)
- [[10분 테코톡] 히브리의 Sharding, Clustering, Replication](https://youtu.be/y42TXZKFfqQ)
- [Replication과 Clustering](https://tecoble.techcourse.co.kr/post/2021-09-18-replication_clustering/)
- [MongoDB Clusters](https://www.mongodb.com/basics/clusters)