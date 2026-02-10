---
category: Database
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: JOIN
tags: []
---

# JOIN

## 📝 개념 정의

**RDB에서 기본키-외래키로 연관된 두 테이블을 묶어 하나의 테이블로 만드는 방법**

**핵심:**
- RDB 사용의 가장 중요한 역할
- 정규화된 테이블을 결합하여 의미있는 데이터 조회

---

## 🔗 JOIN 종류

### 1. Inner Join (내부 조인)

**교집합 - 두 테이블 모두에 연관된 값이 있는 레코드만 조회**

#### Explicit Inner Join

```sql
SELECT {columns}
FROM {tableA} INNER JOIN {tableB}
  ON {join condition}
WHERE {optional conditions};
```

#### Implicit Inner Join

```sql
SELECT {columns}
FROM {tableA}, {tableB}
WHERE {join condition}
  AND {optional conditions};
```

---

### 예시: 책 + 저자

**테이블 구조:**
```
책 목록:
book_id | name           | author_id
1       | Java           | 1
2       | C/C#           | 2
3       | Linear Algebra | 3
4       | Calculus       | 1
5       | SQL            | NULL

저자 명단:
author_id | name   | publisher_id
1         | jimmy  | 1
2         | jose   | 1
3         | tom    | 2
4         | george | NULL
```

**Inner Join:**
```sql
SELECT *
FROM book INNER JOIN author
  ON book.author_id = author.author_id;
```

**결과:**
```
book_id | name           | author_id | name  | publisher_id
1       | Java           | 1         | jimmy | 1
2       | C/C#           | 2         | jose  | 1
3       | Linear Algebra | 3         | tom   | 2
4       | Calculus       | 1         | jimmy | 1
```

**제외된 데이터:**
- `SQL` 책 (author_id가 NULL)
- `george` 저자 (책이 없음)

---

### 2. Outer Join (외부 조인)

**어느 한쪽이라도 값이 있으면 모두 출력**

#### Left Join

**기준 테이블(왼쪽)의 모든 값 출력 + 매칭되는 오른쪽 데이터**

```sql
SELECT {columns}
FROM {tableA} LEFT JOIN {tableB}
  ON {join condition}
WHERE {optional conditions};
```

**예시:**
```sql
SELECT *
FROM book LEFT OUTER JOIN author
  ON book.author_id = author.author_id;
```

**결과:**
```
book_id | name           | author_id | name  | publisher_id
1       | Java           | 1         | jimmy | 1
2       | C/C#           | 2         | jose  | 1
3       | Linear Algebra | 3         | tom   | 2
4       | Calculus       | 1         | jimmy | 1
5       | SQL            | NULL      | NULL  | NULL
```

**특징:**
✅ 기준 테이블(book)의 모든 레코드 포함
✅ 매칭 안 되는 값은 NULL로 채움

---

#### Right Join

**기준 테이블(오른쪽)의 모든 값 출력 + 매칭되는 왼쪽 데이터**

```sql
SELECT {columns}
FROM {tableA} RIGHT JOIN {tableB}
  ON {join condition}
WHERE {optional conditions};
```

**예시:**
```sql
SELECT *
FROM book RIGHT OUTER JOIN author
  ON book.author_id = author.author_id;
```

**결과:**
```
book_id | name           | author_id | name   | publisher_id
1       | Java           | 1         | jimmy  | 1
2       | C/C#           | 2         | jose   | 1
3       | Linear Algebra | 3         | tom    | 2
4       | Calculus       | 1         | jimmy  | 1
NULL    | NULL           | NULL      | george | NULL
```

**특징:**
✅ 기준 테이블(author)의 모든 레코드 포함
✅ 매칭 안 되는 값은 NULL로 채움

---

#### Full Outer Join

**양쪽 테이블의 모든 값 출력**

**Oracle:**
```sql
SELECT {columns}
FROM {tableA} FULL OUTER JOIN {tableB}
  ON {join condition};
```

**MySQL/MariaDB (UNION 사용):**
```sql
SELECT *
FROM book LEFT OUTER JOIN author
  ON book.author_id = author.author_id
UNION
SELECT *
FROM book RIGHT OUTER JOIN author
  ON book.author_id = author.author_id;
```

**결과:**
```
book_id | name           | author_id | name   | publisher_id
1       | Java           | 1         | jimmy  | 1
2       | C/C#           | 2         | jose   | 1
3       | Linear Algebra | 3         | tom    | 2
4       | Calculus       | 1         | jimmy  | 1
5       | SQL            | NULL      | NULL   | NULL
NULL    | NULL           | NULL      | george | NULL
```

**특징:**
✅ 양쪽 테이블의 모든 레코드 포함
✅ 매칭 안 되는 값은 NULL로 채움

---

## 📊 벤 다이어그램으로 보는 JOIN

### 1. LEFT JOIN

```
┌─────────┐
│    A    │
│  ┌──────┼──────┐
│  │  교집합  │   B  │
│  └──────┼──────┘
└─────────┘
```

```sql
SELECT {columns}
FROM {tableA} LEFT OUTER JOIN {tableB}
  ON {join condition};
```

---

### 2. RIGHT JOIN

```
        ┌─────────┐
        │    B    │
┌───────┼──────┐  │
│   A   │  교집합  │  │
└───────┼──────┘  │
        └─────────┘
```

```sql
SELECT {columns}
FROM {tableA} RIGHT OUTER JOIN {tableB}
  ON {join condition};
```

---

### 3. INNER JOIN

```
        ┌─────────┐
        │         │
┌───────┼──────┐  │
│       │ 교집합 │  │
└───────┼──────┘  │
        └─────────┘
```

```sql
SELECT {columns}
FROM {tableA} INNER JOIN {tableB}
  ON {join condition};
```

---

### 4. FULL OUTER JOIN

```
┌─────────┐
│    A    │
│  ┌──────┼──────┐
│  │  교집합  │   B  │
│  └──────┼──────┘
└─────────┘
```

```sql
SELECT {columns}
FROM {tableA} FULL OUTER JOIN {tableB}
  ON {join condition};
```

---

### 5. LEFT JOIN (A만)

```
┌─────────┐
│    A    │
│  ┌──────┼──────┐
│  │      │   B  │
│  └──────┼──────┘
└─────────┘
```

```sql
SELECT {columns}
FROM {tableA} LEFT OUTER JOIN {tableB}
  ON {join condition}
WHERE {tableB.col} IS NULL;
```

---

### 6. RIGHT JOIN (B만)

```
        ┌─────────┐
        │    B    │
┌───────┼──────┐  │
│   A   │      │  │
└───────┼──────┘  │
        └─────────┘
```

```sql
SELECT {columns}
FROM {tableA} RIGHT OUTER JOIN {tableB}
  ON {join condition}
WHERE {tableA.col} IS NULL;
```

---

### 7. FULL OUTER JOIN (A, B만)

```
┌─────────┐
│    A    │
│  ┌──────┼──────┐
│  │      │   B  │
│  └──────┼──────┘
└─────────┘
```

```sql
SELECT {columns}
FROM {tableA} FULL OUTER JOIN {tableB}
  ON {join condition}
WHERE {tableA.col} IS NULL OR {tableB.col} IS NULL;
```

---

## 💡 실전 활용

### 프로젝션 적용

**필요한 컬럼만 선택:**

```sql
SELECT
  book.book_id AS id,
  book.name AS book,
  author.name AS author,
  publisher.name AS publisher
FROM book INNER JOIN author
  ON book.author_id = author.author_id
INNER JOIN publisher
  ON author.publisher_id = publisher.publisher_id
WHERE author.name = 'jimmy';
```

**결과:**
```
id | book     | author | publisher
1  | Java     | jimmy  | malang
4  | Calculus | jimmy  | malang
```

---

### 다중 테이블 JOIN

**3개 테이블 조인:**

```sql
SELECT *
FROM book INNER JOIN author
  ON book.author_id = author.author_id
INNER JOIN publisher
  ON author.publisher_id = publisher.publisher_id;
```

**특징:**
✅ 순차적으로 JOIN 수행
✅ 각 JOIN 조건 명확히 지정

---

## ❓ 면접 질문 예시

### Q1. JOIN이란 무엇인가요?

**답변:**
RDB에서 기본키와 외래키로 연관된 두 개 이상의 테이블을 묶어 하나의 결과 테이블로 만드는 방법입니다. 정규화로 분리된 테이블들을 결합하여 의미있는 데이터를 조회할 수 있습니다.

### Q2. Inner Join과 Outer Join의 차이는?

**답변:**
Inner Join은 두 테이블 모두에 연관된 값이 있는 레코드만 조회하는 교집합 연산입니다. Outer Join은 한쪽 테이블이라도 값이 있으면 모두 출력하며, 매칭되지 않는 값은 NULL로 채웁니다. Outer Join은 Left, Right, Full로 나뉩니다.

### Q3. Left Join과 Right Join의 차이는?

**답변:**
Left Join은 왼쪽(기준) 테이블의 모든 레코드를 포함하고 오른쪽 테이블에서 매칭되는 데이터를 가져옵니다. Right Join은 오른쪽(기준) 테이블의 모든 레코드를 포함하고 왼쪽 테이블에서 매칭되는 데이터를 가져옵니다. 매칭되지 않는 값은 NULL로 채워집니다.

### Q4. Full Outer Join을 MySQL에서 어떻게 구현하나요?

**답변:**
MySQL/MariaDB는 Full Outer Join을 직접 지원하지 않으므로 UNION을 사용합니다. Left Outer Join 결과와 Right Outer Join 결과를 UNION으로 합쳐서 Full Outer Join과 동일한 결과를 얻을 수 있습니다.

### Q5. Explicit Inner Join과 Implicit Inner Join의 차이는?

**답변:**
Explicit Inner Join은 INNER JOIN 키워드를 명시적으로 사용하고 ON 절로 조인 조건을 지정합니다. Implicit Inner Join은 FROM 절에 여러 테이블을 콤마로 나열하고 WHERE 절에 조인 조건을 지정합니다. 결과는 같지만 Explicit 방식이 가독성이 좋고 권장됩니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/DB/db_join.md`
- 내용: Inner Join, Outer Join, 벤 다이어그램

### 추가 학습 자료

- [혼자서 공부하는 SQL - 한빛소프트](https://www.hanbit.co.kr/store/books/look.php?p_code=B6846155853)