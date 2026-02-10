---
category: Database
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: 인덱스
tags: []
---

# 인덱스 (Index)

## 📝 개념 정의

**추가적인 쓰기 작업과 저장 공간을 활용하여 데이터베이스 테이블의 검색 속도를 향상**시키기 위한 자료구조입니다.

**핵심:**
- 데이터의 주소값을 저장하는 별도의 자료 구조
- 빠른 검색을 위한 색인 역할

---

## 🎯 인덱스가 필요한 이유

### Index가 없다면?

```sql
SELECT * FROM customer WHERE first_name = "Jeongyoon";
```

**Full Scan 필요:**
- 모든 Row를 하나씩 확인
- 시간복잡도: **O(N)**
- 서비스 성능 저하

### Index가 있다면?

**시간복잡도: O(logN)** (B-tree 기반)

**사용 목적:**
✅ 조건을 만족하는 튜플을 빠르게 조회
✅ 빠른 정렬 (`ORDER BY`)
✅ 빠른 그룹핑 (`GROUP BY`)

---

## 🔧 인덱스 설정 (MySQL)

### 1. 기존 테이블에 Index 추가

```sql
-- Single Column Index
CREATE INDEX player_name_idx ON player (name);

-- Multi Column Index
CREATE UNIQUE INDEX team_id_back_number_idx ON player (team_id, back_number);
```

### 2. 테이블 생성 시 Index 설정

```sql
CREATE TABLE PLAYER (
  id INT PRIMARY KEY, 
  name VARCHAR(255) NOT NULL,
  team_id INT NOT NULL, 
  back_number INT NOT NULL,
  INDEX player_name_idx (name),
  UNIQUE INDEX team_id_back_number_idx (team_id, back_number)
);
```

**참고:** 대부분의 RDBMS는 Primary Key에 자동으로 Index 생성

---

## 📊 Multi Column Index

### 고려사항

**언제 사용?**
- WHERE절에서 AND로 자주 함께 질의되는 컬럼

```sql
WHERE team_id = 105 AND back_number = 7
```

### 정렬 순서

**INDEX(team_id, back_number):**
- team_id 기준으로 먼저 정렬
- 같은 team_id 내에서 back_number 정렬

**주의:**
```sql
WHERE back_number = 7  -- Index 효율 낮음 (team_id가 먼저 정렬되어 있음)
```

### Covering Index (장점)

```sql
SELECT team_id, back_number FROM player WHERE team_id = 5;
```

**효과:**
- 조회하는 모든 Attribute가 Index에 포함
- 물리적 데이터 블록 읽기 불필요
- 조회 성능 향상

---

## 🏗️ 인덱스 자료구조

### B-Tree

**시간복잡도:** O(logN)

**특징:**
- 자식 노드가 2개 이상인 트리
- 균형 트리 (Balanced Tree)
- 루트에서 리프까지 거리 동일

### ⭐ B+Tree (가장 많이 사용)

**특징:**
- B-Tree 확장 및 개선
- 비단말 노드는 인덱스 역할만 수행
- 관계형 DB에서 가장 많이 사용

**장점:**
- 범위 검색에 유리
- 순차 접근 효율적

### Hash Table

**시간복잡도:** O(1)

**장점:**
- 등호(=) 연산에 최적화

**단점:**
❌ 부등호 연산(\u003e, \u003c) 불가능 (Equality만 가능, Range 불가)
❌ Multi Column Index 시 전체 Attributes 필수
❌ 정렬 불가

---

## 💡 왜 B-Tree 계열을 사용할까?

### Secondary Storage 특성

**HDD/SSD:**
- 데이터 처리 속도가 가장 느림
- 랜덤 I/O 발생 시 성능 저하
- Block 단위로 읽기/쓰기

**최적화 전략:**
- Secondary Storage 접근 최소화
- 연관 데이터를 모아서 저장

### B-Tree의 장점

✅ **빠른 탐색 범위 축소**: Binary Tree보다 빠르게 범위 좁힘
✅ **다중 데이터 저장**: 한 노드에 여러 데이터 저장 가능
✅ **범위 검색 지원**: 부등호 연산 효율적
✅ **Block I/O 최적화**: 연관 데이터를 함께 읽음

---

## ⚠️ 인덱스 설정 시 고려사항

### 성능 저하 상황

❌ **Write 작업 Overhead:**
- INSERT, UPDATE, DELETE 시 Index도 갱신 필요
- 추가 연산 발생

❌ **추가 저장 공간:**
- Index 자체가 디스크 공간 차지

### Full Scan이 더 빠른 경우

#### 1. 데이터가 적을 때
- Index 조회 + 데이터 접근 비용 \u003e Full Scan

#### 2. 조회 데이터가 전체의 상당 부분일 때

**인덱스 손익분기점:**
- 일반적으로 전체 데이터의 **5~10%** 이하 조회 시 효율적
- 20% 이상 조회 시 Full Scan이 더 빠를 수 있음

**이유:**
- **Index Range Scan**: 랜덤 액세스, 싱글블록 I/O
- **Table Full Scan**: 시퀀셜 액세스, 멀티블록 I/O

### 랜덤 액세스 vs 시퀀셜 액세스

**랜덤 액세스:**
- Index로 주소 확인 → 해당 위치로 이동
- 데이터가 적을 때 효율적
- 데이터가 많으면 이동 시간 증가

**시퀀셜 액세스:**
- 블록별로 순차적 접근
- 이동 시간 감소
- 대량 데이터 조회 시 효율적

---

## 📏 인덱스 설정 기준

### 1. 카디널리티 (Cardinality)

**높을수록 좋음** (중복도가 낮을수록)

**예시:**
- ✅ 주민등록번호, 이메일 (카디널리티 높음)
- ❌ 성별, 나이 (카디널리티 낮음)

### 2. 선택도 (Selectivity)

**낮을수록 좋음 (일반적으로 5~10%)**

**계산:**
```
선택도 = (특정 값의 Row 수 / 전체 Row 수) × 100
```

**예시:**
- 100명 중 20명이 같은 나이 → 선택도 20% (높음, 비효율)

### 3. 활용도

**높을수록 좋음**
- 자주 조회되는 컬럼

### 4. 수정 빈도

**낮을수록 좋음**
- 값이 자주 변경되면 Index 갱신 비용 증가

---

## ❓ 면접 질문 예시

### Q1. Index를 사용하는 이유는?

**답변:**
조건을 만족하는 데이터를 빠르게 조회하기 위해서입니다. Index가 없으면 Full Scan(O(N))이 필요하지만, B-Tree 기반 Index를 사용하면 O(logN)으로 검색할 수 있습니다. 또한 ORDER BY, GROUP BY 연산도 빠르게 처리할 수 있습니다.

### Q2. Index를 걸면 좋은 상황과 안 좋은 상황은?

**답변:**
**좋은 상황:** 카디널리티가 높고, 선택도가 낮으며(5~10%), 자주 조회되고, 수정 빈도가 낮은 컬럼입니다. 또한 전체 데이터의 5~10% 이하를 조회할 때 효율적입니다.

**안 좋은 상황:** 데이터가 적거나, 조회 데이터가 전체의 20% 이상일 때는 Full Scan이 더 빠를 수 있습니다. 또한 INSERT, UPDATE, DELETE가 빈번한 테이블은 Index 갱신 비용이 커집니다.

### Q3. B-Tree를 Index로 사용하는 이유는?

**답변:**
Hash Table은 O(1)로 빠르지만 등호 연산만 가능하고 범위 검색이 불가능합니다. B-Tree는 O(logN)이지만 부등호 연산과 범위 검색을 지원하며, 여러 데이터를 한 노드에 저장하여 디스크 I/O를 최소화할 수 있습니다. 또한 Secondary Storage의 Block 단위 I/O에 최적화되어 있습니다.

### Q4. Multi Column Index 사용 시 주의사항은?

**답변:**
Multi Column Index는 컬럼 순서에 따라 정렬됩니다. INDEX(team_id, back_number)는 team_id 기준으로 먼저 정렬되므로, back_number만으로 조회하면 Index 효율이 낮습니다. WHERE절에서 AND로 자주 함께 사용되는 컬럼을 순서에 맞게 설정해야 합니다.

### Q5. Covering Index란?

**답변:**
조회하는 모든 Attribute가 Index에 포함되어 있을 때를 말합니다. 이 경우 Index만으로 쿼리를 처리할 수 있어 물리적 데이터 블록을 읽을 필요가 없어 조회 성능이 향상됩니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [db_index.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Database/db_index.md)
- 내용: Index 개념, 자료구조, 설정 기준

### 추가 학습 자료

- [Tecoble, DB Index 입문](https://tecoble.techcourse.co.kr/post/2021-09-18-db-index/)
- [Eric's DevLog, DB Index 동작원리](https://kyungyeon.dev/)
- 친절한 SQL 튜닝