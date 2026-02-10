---
category: Database
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Trigger
tags: []
---

# Trigger (트리거)

## 📝 트리거란?

**총의 방아쇠처럼 특정 동작에 반응해 자동 실행**

**정의:** 어떤 트랜잭션이 일어나면 자동으로 다른 명령을 실행하는 기능

**예시:**
- 상품 주문 → 자동으로 배송 내역 생성
- 회원가입 → 자동으로 환영 쿠폰 발급

---

## 🔑 트리거의 유형

### 행 트리거 (Row Trigger)

**실행:** 영향받은 행 각각에 대해 실행

**변수:** OLD, NEW 가상 줄 변수 사용

**용도:** 변경 전/후 행 읽기

---

### 문장 트리거 (Statement Trigger)

**실행:** INSERT, UPDATE, DELETE 문에 대해 한 번만 실행

---

## ⚙️ 트리거의 속성

### BEFORE / AFTER

**역할:** 트리거 실행 시기 지정

**BEFORE:** 작업 전 실행

**AFTER:** 작업 후 실행

---

### INSTEAD OF

**역할:** 트리거 실행 시기 지정

**용도:** 원래 작업 대신 실행

---

### WHEN

**역할:** 트리거 시작 조건식 수행

---

## 🔄 트리거 실행 경우

**INSERT:** 데이터 삽입 시

**UPDATE:** 데이터 수정 시

**DELETE:** 데이터 삭제 시

---

## 💡 트리거 예시

### 회원가입 시 쿠폰 발급

#### 1. 테이블 생성

```sql
CREATE TABLE shopMallPeople(
    ID INT NOT NULL,
    NAME VARCHAR(15) NOT NULL,
    createdDate DATE NOT NULL
);

CREATE TABLE cupon(
    ID INT NOT NULL,
    createdDate DATE NOT NULL,
    expirationDate DATE NOT NULL
);
```

---

#### 2. 트리거 생성

```sql
DELIMITER //
CREATE TRIGGER newPeopleTrigger
    AFTER INSERT
    ON shopMallPeople
    FOR EACH ROW
BEGIN
    INSERT INTO cupon VALUES (
        NEW.ID, 
        NEW.createdDate, 
        DATE_ADD(NEW.createdDate, INTERVAL 7 DAY)
    );
END //
DELIMITER ;
```

---

#### 3. 트리거 동작

```sql
INSERT INTO shopMallPeople 
VALUES(1111, 'judy', CURDATE());
```

**결과:**
- shopMallPeople에 회원 추가
- cupon에 자동으로 7일 유효 쿠폰 생성

---

## 📝 트리거 문법 설명

### DELIMITER

```sql
DELIMITER //
...
DELIMITER ;
```

**역할:** 트리거 시작과 끝 표시

---

### CREATE TRIGGER

```sql
CREATE TRIGGER [트리거이름]
```

**역할:** 트리거 이름 설정

---

### 조건 설정

```sql
AFTER [INSERT | DELETE | UPDATE]
ON [테이블명]
FOR EACH ROW
```

**역할:** 어떤 테이블의 어떤 작업 후 실행할지 정의

---

### 실행문

```sql
BEGIN
    실행문
END //
```

**역할:** 트리거가 실행할 명령

---

## 🔍 트리거 관리

### 트리거 확인

```sql
SHOW TRIGGERS;
```

---

### 트리거 삭제

```sql
DROP TRIGGER [트리거명];
```

---

## ✅ 트리거의 장점

### 1. 데이터 무결성 강화

**참조 무결성 유지**

---

### 2. 업무 규칙 설정

**자동화된 비즈니스 로직**

---

### 3. 검사 기능 확장

**복잡한 제약 조건 구현**

---

## ⚠️ 트리거의 단점

### 1. 유지보수의 어려움

**숨겨진 로직으로 디버깅 어려움**

---

### 2. 예상치 못한 오류

**연쇄 트리거로 인한 복잡성**

---

## 🆚 트리거 vs 프로시저

### Stored Procedure

**실행:** 사용자가 명시적으로 호출

**제어:** 사용자가 직접 실행

---

### Trigger

**실행:** 특정 조건 만족 시 자동 실행

**제어:** 시스템이 자동 실행

---

## ❓ 면접 질문 예시

### Q1. 트리거란 무엇인가요?

**답변:**
트리거는 어떤 트랜잭션이 일어나면 거기에 반응해서 다른 명령을 자동으로 실행하게 하는 기능입니다. 총의 방아쇠처럼 특정 동작(INSERT, UPDATE, DELETE)에 반응하여 자동으로 필요한 동작을 수행합니다.

### Q2. 트리거와 프로시저의 차이점은?

**답변:**
프로시저는 사용자가 미리 명령어를 저장해서 사용자가 명시적으로 실행하면 실행되지만, 트리거는 특정 조건(INSERT, UPDATE, DELETE)이 만족되면 자동으로 저장되었던 명령어가 실행됩니다. 프로시저는 사용자 제어, 트리거는 시스템 자동 실행입니다.

### Q3. 트리거의 장단점은?

**답변:**
장점은 데이터 무결성 강화(참조 무결성), 업무 규칙 설정(자동화된 비즈니스 로직), 검사 기능 확장입니다. 단점은 유지보수의 어려움(숨겨진 로직으로 디버깅 어려움)과 예상치 못한 오류 발생(연쇄 트리거로 인한 복잡성)입니다.

### Q4. 행 트리거와 문장 트리거의 차이는?

**답변:**
행 트리거는 테이블 안의 영향을 받은 행 각각에 대해 실행되며 OLD, NEW 가상 변수를 사용하여 변경 전/후 행을 읽을 수 있습니다. 문장 트리거는 INSERT, UPDATE, DELETE 문에 대해 한 번만 실행됩니다.

### Q5. 트리거는 언제 사용하나요?

**답변:**
트리거는 특정 작업 후 자동으로 다른 작업을 수행해야 할 때 사용합니다. 예를 들어 회원가입 시 자동으로 환영 쿠폰을 발급하거나, 상품 주문 시 자동으로 배송 내역을 생성하거나, 데이터 변경 시 로그를 자동으로 기록하는 등의 경우에 사용합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/DB/db_trigger.md`
- 내용: Trigger, 유형, 속성, 예시

### 추가 학습 자료

- [트리거 이해](https://hanhyx.tistory.com/20)
- [SQL 날짜 계산](https://lcs1245.tistory.com/entry/SQL-날짜계산하기)
- [트리거 키워드](https://m.blog.naver.com/alcmskfl17/221859839012)