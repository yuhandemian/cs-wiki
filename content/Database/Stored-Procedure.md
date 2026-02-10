---
category: Database
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Stored Procedure
tags: []
---

# Stored Procedure (저장 프로시저)

## 📝 개념 정의

**일련의 쿼리를 마치 하나의 함수처럼 실행하기 위한 쿼리문들의 집합**

**핵심:**
- 특정 로직의 쿼리를 함수로 만들어 놓은 것
- 서버에서 실행되어 속도가 빠름
- 리턴값이 없거나 많을 수도 있음

---

## 🆚 저장 프로시저 vs 함수

| 특징 | 저장 프로시저 | 함수 |
|------|--------------|------|
| **목적** | 일련의 작업 처리 | 여러 작업을 위한 기능 |
| **리턴값** | 없거나 많을 수 있음 | 필수 (1개) |
| **실행 위치** | 서버 | 클라이언트 |
| **속도** | 빠름 | 느림 |

---

## 🔄 일반 쿼리문 vs 저장 프로시저

### 일반 쿼리문 작동 방식

```sql
SELECT name FROM userTbl;
```

**처리 과정:**
```
1. 구문 분석 (Syntax Check)
   ↓
2. 개체 이름 확인 (Object Name Check)
   ↓
3. 사용 권한 확인 (Permission Check)
   ↓
4. 최적화 (Optimization)
   ↓
5. 컴파일 및 실행 계획 등록 (Compile & Cache)
   ↓
6. 실행 (Execute)
```

**매번 모든 단계 수행!**

---

### 저장 프로시저 작동 방식

#### 1. 정의 단계

```
1. 구문 분석
   ↓
2. 지연된 이름 확인 (개체 존재 여부 미확인)
   ↓
3. 생성 권한 확인
   ↓
4. 시스템 테이블 등록
```

**특징:**
✅ 테이블이 존재하지 않아도 정의 가능
⚠️ 실행 시점에 개체 존재 확인

---

#### 2. 처음 실행

```
1. 구문 분석
   ↓
2. 개체 이름 확인 (지연된 확인 수행)
   ↓
3. 사용 권한 확인
   ↓
4. 최적화
   ↓
5. 컴파일 및 실행 계획 등록
   ↓
6. 실행
```

---

#### 3. 이후 실행

```
1. 캐시에서 실행 계획 가져오기
   ↓
2. 실행
```

**특징:**
✅ 대부분의 단계 생략
✅ 캐시 활용으로 빠른 실행

---

## ✅ 저장 프로시저 장점

### 1. 성능 향상

✅ **여러 쿼리 한 번에 실행**
- 네트워크 왕복 감소

✅ **캐시 활용**
- 컴파일된 실행 계획 재사용
- 옵티마이저 비용 절감

---

### 2. 유지보수 및 재활용

✅ **개발 언어 비의존적**
- Java, Python 등 어디서든 호출 가능

✅ **중앙 집중 관리**
- SP 파일만 수정하면 모든 애플리케이션에 반영
- 코드 재사용성 향상

---

### 3. 보안 강화

✅ **권한 제어**
- 테이블 직접 접근 차단
- SP에만 접근 권한 부여

✅ **SQL Injection 방지**
- 파라미터화된 쿼리 사용

---

### 4. 네트워크 부하 감소

✅ **최소한의 데이터 전송**
- 쿼리 전체 텍스트 대신 SP 이름과 파라미터만 전송

**예시:**
```
❌ 전송: SELECT * FROM users WHERE age > 20 AND city = 'Seoul' ...
✅ 전송: CALL GET_USERS(20, 'Seoul')
```

---

## ❌ 저장 프로시저 단점

### 1. DB 확장 어려움

❌ **서버 증설 제약**
- DB 서버 수 늘리기 어려움
- DB 교체 거의 불가능

---

### 2. 데이터 분석 어려움

❌ **영향 분석 복잡**
- 여러 곳에서 사용 시 수정 영향 파악 어려움

❌ **이력 관리 힘듦**
- 배포, 버전 관리 복잡

❌ **추적 어려움**
- 에러 발생 시 원인 파악 힘듦

---

### 3. 낮은 처리 성능 (특정 경우)

❌ **문자/숫자 연산**
- C, Java보다 느릴 수 있음

---

## 📐 문법과 예시

### 기본 구조

```sql
DELIMITER $$
CREATE PROCEDURE 'TEST_PROC' (
    -- 파라미터 선언
    PARAM_NAME VARCHAR(20),
    PARAM_AGE INT
)
BEGIN
    -- 변수 선언
    DECLARE PARAM_NUM INTEGER;
    
    -- 쿼리문1
    SELECT COUNT(*) + 1
        INTO PARAM_NUM
        FROM table1;
        
    -- 쿼리문2
    INSERT INTO table1(total_count, user_name, user_age)
    VALUES(PARAM_NUM, PARAM_NAME, PARAM_AGE);
END $$
DELIMITER ;
```

**규칙:**
- 파라미터: 프로시저명() 안에 선언
- SQL문/변수: BEGIN ~ END 사이 작성
- SELECT 결과: INTO로 변수에 저장
- 문장 끝: 세미콜론(;)
- DELIMITER: 프로시저 작성 완료 전 실행 방지

---

### 호출

```sql
CALL TEST_PROC('테스트이름', 21);
```

**처리 과정:**
1. Database 카탈로그에서 프로시저 이름 찾기
2. SQL문 컴파일
3. 메모리(Cache)에 저장
4. 프로시저 실행

---

### IN, OUT, INOUT 파라미터

```sql
DELIMITER $$
CREATE PROCEDURE 'TEST_PROC2'(
    IN loopCount1 INT,     -- 입력
    IN loopCount2 INT,     -- 입력
    OUT rst1 INT,          -- 출력
    OUT rst2 INT,          -- 출력
    INOUT rst3 INT         -- 입출력
)
BEGIN
    DECLARE NUM1 INTEGER DEFAULT 0;
    DECLARE NUM2 INTEGER DEFAULT 0;
    DECLARE NUM3 INTEGER DEFAULT 0;
    
    WHILE NUM1 < loopCount1 DO
        WHILE NUM2 < loopCount2 DO
            SET NUM3 = NUM3 + 1;
            SET NUM2 = NUM2 + 1;
        END WHILE;
        
        SET NUM1 = NUM1 + 1;
        SET NUM2 = 0;
    END WHILE;
    
    SET rst1 = NUM1;
    SET rst2 = NUM3;
    SET rst3 = rst1 + rst2 + rst3;
END $$
DELIMITER ;
```

---

### 파라미터 타입

#### IN

**값 전달만 가능**
- 프로시저 내부에서 수정 가능
- 원본 값은 유지 (복사본 사용)

#### OUT

**값 반환만 가능**
- 초기값 NULL
- 프로시저 종료 시 새 값 반환
- 초기값 접근 불가

#### INOUT

**값 전달 + 반환**
- 호출자가 초기화
- 프로시저가 수정
- 수정된 값 반환

---

### 호출 예시

```sql
-- 변수 초기화
DECLARE @NUM1 = 0;
DECLARE @NUM2 = 0;
DECLARE @NUM3 = 0;

-- NUM3에 값 할당
SET @NUM3 = 30;

-- 프로시저 호출
CALL TEST_PROC2(10, 20, @NUM1, @NUM2, @NUM3);

-- 결과 확인
SELECT @NUM1, @NUM2, @NUM3;
-- RESULT => @NUM1: 10, @NUM2: 200, @NUM3: 240
```

---

## 🔧 관리 명령어

### 프로시저 목록 확인

```sql
SHOW PROCEDURE STATUS;
```

### 프로시저 내용 확인

```sql
SHOW CREATE PROCEDURE 프로시저이름;
```

### 프로시저 삭제

```sql
DROP PROCEDURE 프로시저이름;
```

---

## ❓ 면접 질문 예시

### Q1. 저장 프로시저란 무엇인가요?

**답변:**
일련의 쿼리를 마치 하나의 함수처럼 실행하기 위한 쿼리문들의 집합입니다. 특정 로직의 쿼리를 함수로 만들어 서버에서 실행되므로 속도가 빠르고, 리턴값이 없거나 많을 수도 있습니다.

### Q2. 저장 프로시저와 함수의 차이는?

**답변:**
저장 프로시저는 일련의 작업을 처리하며 리턴값이 없거나 많을 수 있고 서버에서 실행되어 빠릅니다. 함수는 여러 작업을 위한 기능으로 리턴값이 필수이며 클라이언트에서 실행되어 프로시저보다 느립니다.

### Q3. 저장 프로시저의 장점은?

**답변:**
1) 성능 향상: 캐시 활용으로 컴파일 비용 절감, 여러 쿼리 한 번에 실행
2) 유지보수: 개발 언어 비의존적, 중앙 집중 관리
3) 보안 강화: 테이블 직접 접근 차단, SQL Injection 방지
4) 네트워크 부하 감소: SP 이름과 파라미터만 전송

### Q4. IN, OUT, INOUT 파라미터의 차이는?

**답변:**
IN은 값 전달만 가능하며 원본 값은 유지됩니다. OUT은 값 반환만 가능하며 초기값은 NULL이고 프로시저 종료 시 새 값을 반환합니다. INOUT은 값 전달과 반환 모두 가능하며 호출자가 초기화하고 프로시저가 수정한 값을 반환합니다.

### Q5. 저장 프로시저의 단점은?

**답변:**
1) DB 확장 어려움: DB 서버 증설이 어렵고 교체 거의 불가능
2) 데이터 분석 어려움: 영향 분석 복잡, 이력 관리 힘듦
3) 낮은 처리 성능: 문자/숫자 연산은 C, Java보다 느릴 수 있음

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [db_stored_procedure.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Database/db_stored_procedure.md)
- 내용: 저장 프로시저 개념, 작동 방식, 장단점, 문법

### 추가 학습 자료

- [저장 프로시저 (Stored Procedure)](https://velog.io/@sweet_sumin/%EC%A0%80%EC%9E%A5-%ED%94%84%EB%A1%9C%EC%8B%9C%EC%A0%80-Stored-Procedure)
- [[MSSQL] 저장 프로시저 (Stored Procedure) 란?](https://devkingdom.tistory.com/323)
- [[MySQL] 스토어드 프로시저(Stored Procedure) 기본](https://spiderwebcoding.tistory.com/7)