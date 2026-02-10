---
category: Database
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Connection Pool
tags: []
---

# Connection Pool (커넥션 풀)

## 📝 DB Connection이란?

**DB와 애플리케이션 간 통신 수단**

**필요 요소:**
- Database Driver
- Database 연결 정보 (URL)

**Java:** JDBC 사용, URL 타입

---

## 🔧 JDBC (Java Database Connectivity)

**자바로 다양한 RDBMS에 접속하여 SQL 수행하는 표준 인터페이스**

**장점:**
✅ DBMS 변경 시 JDBC만 교체하면 됨
✅ 하나의 JDBC API로 모든 DB 작업 처리

---

### JDBC 실행 과정

```
1. DB 벤더에 맞는 드라이버 로드
2. DriverManager.getConnection()으로 Connection 객체 생성
3. PreparedStatement 객체 받기
4. executeQuery() 수행, ResultSet 받아 데이터 처리
5. ResultSet, PreparedStatement, Connection close
```

**getConnection():** 가장 부하가 많이 걸리는 과정

---

### 주요 객체

**Connection:**
- DB 연결 객체
- Statement 객체 생성
- SQL문 commit/rollback
- 보통 Connection 하나당 트랜잭션 하나 관리

**Statement/PreparedStatement:**
- SQL문 실행 객체

**ResultSet:**
- 쿼리문 결과 객체

---

## ⚠️ 기존 방식의 문제점

```java
Connection conn = null;
PreparedStatement pstmt = null;
ResultSet rs = null;

try {
    // 1. 드라이버 연결 DB 커넥션 객체 얻음
    connection = DriverManager.getConnection(DBURL, DBUSER, DBPASSWORD);
    
    // 2. 쿼리 수행을 위한 PreparedStatement 생성
    pstmt = conn.createStatement();
    
    // 3. 쿼리 실행
    rs = pstmt.executeQuery(sql);
} finally {
    conn.close();
    pstmt.close();
    rs.close();
}
```

**문제점:**
❌ 요청마다 JDBC Driver 로드
❌ Connection 객체 생성 및 종료 반복
❌ 매우 비효율적

---

## 🌐 TCP 기반 통신의 문제

**백엔드 서버 ↔ DB 서버:** 네트워크 통신

**TCP 특징:**
✅ 높은 송수신 신뢰성
❌ 3-way/4-way handshake 시간 비용

**문제:** 매번 connection 열고 닫는 시간적 비용

**해결:** DBCP (Database Connection Pool)

---

## 💡 DBCP (Database Connection Pool)

**WAS 실행 시 일정량의 Connection 객체를 미리 생성하여 Pool로 관리**

```
1. WAS 실행 → Connection Pool 생성
2. 클라이언트 요청 → Connection 빌려옴
3. 쿼리 요청 처리
4. 작업 완료 → Connection Pool에 반환
```

---

## 🔄 HikariCP 동작 원리

### 1. Connection 요청

**Thread가 Connection 요청**

**→ 유휴 Connection 찾아 반환**

**HikariCP:** 이전 사용한 Connection 우선 반환

---

### 2. 유휴 Connection 없을 때

**HandOffQueue를 Polling**

**→ 다른 Thread가 Connection 반납 대기**

---

### 3. Connection 반납

**Connection Pool이 사용 내역 기록**

**→ HandOffQueue에 반납된 Connection 삽입**

**→ Polling하던 Thread가 Connection 획득**

---

## ✅ DBCP 장점

1. **빠른 DB 접속**
   - 미리 연결된 객체 사용
   - 생성/삭제 과정 제거

2. **DB Connection 수 제한**
   - 과도한 접속으로 인한 자원 고갈 방지

3. **유지 보수 용이**
   - DB 접속 모듈 공통화
   - DB 환경 변경 시 쉬운 대응

4. **재사용**
   - Connection 재사용으로 비용 절감

---

## ⚙️ DB 서버 설정

### 1. max_connections

**Client와 맺을 수 있는 최대 connection 수**

**문제 상황:**
- max_connections = 4
- DBCP 최대 connection = 4
- 서버 추가 시 connection 맺을 수 없음

---

### 2. wait_timeout

**Connection이 inactive할 때 대기 시간**

**목적:**
- 비정상 종료 대비
- 네트워크 단절 대비
- Resource 낭비 방지

---

## ⚙️ DBCP 설정 (HikariCP)

### 1. minimumIdle

**Pool에서 유지하는 최소 idle connection 수**

---

### 2. maximumPoolSize

**Pool이 가질 수 있는 최대 connection 수**

**= idle + active(in-use) 합계**

**우선순위:** maximumPoolSize > minimumIdle

---

### 권장 사항 ⭐

**minimumIdle = maximumPoolSize (Pool size 고정)**

**이유:**
- Connection 생성 속도 < 트래픽 증가 속도
- 응답 속도 저하 방지

---

### 3. maxLifetime

**Pool에서 connection의 최대 수명**

**동작:**
- 수명 초과 시 idle이면 즉시 제거
- Active이면 반환 후 제거
- 제거 후 즉시 새 connection 생성

**권장:** DB connection time limit보다 몇 초 짧게

---

### 4. connectionTimeout

**Pool에서 connection 받기 위한 대기 시간**

**동작:**
- 사용 가능한 connection 없을 때 대기
- Timeout 초과 시 exception 발생

---

## ❓ 면접 질문 예시

### Q1. Connection Pool이란?

**답변:**
Connection Pool은 WAS가 실행될 때 일정량의 Connection 객체를 미리 만들어서 Pool처럼 관리하는 것입니다. 클라이언트 요청이 오면 Connection 객체를 빌려주고, 작업이 끝나면 Pool에 반환합니다. 이를 통해 매번 Connection을 생성하고 삭제하는 비용을 줄일 수 있습니다.

### Q2. Connection Pool을 왜 쓰나요?

**답변:**
1) 빠른 DB 접속: 미리 연결된 객체를 사용하여 생성/삭제 과정을 제거합니다.
2) DB Connection 수 제한: 과도한 접속으로 인한 서버 자원 고갈을 방지합니다.
3) 유지 보수 용이: DB 접속 모듈을 공통화하여 DB 환경 변경 시 쉽게 대응합니다.
4) 재사용: Connection을 재사용하여 새 객체를 만드는 비용을 줄입니다.

### Q3. 실시간 통신과 Pool 사용 시 차이는?

**답변:**
실시간 통신은 매번 TCP 3-way/4-way handshake를 수행하여 Connection을 열고 닫아야 하므로 시간적 비용이 큽니다. Connection Pool을 사용하면 미리 생성된 Connection을 재사용하므로 handshake 과정을 생략하여 빠른 응답이 가능합니다.

### Q4. HikariCP의 동작 원리는?

**답변:**
Thread가 Connection을 요청하면 유휴 Connection을 찾아 반환하며, 이전에 사용한 Connection을 우선적으로 반환합니다. 유휴 Connection이 없으면 HandOffQueue를 Polling하여 다른 Thread가 Connection을 반납하기를 기다립니다. Connection이 반납되면 Pool이 사용 내역을 기록하고 HandOffQueue에 삽입하여 대기 중인 Thread가 획득합니다.

### Q5. minimumIdle과 maximumPoolSize를 같게 설정하는 이유는?

**답변:**
Pool size를 고정하기 위함입니다. minimumIdle을 maximumPoolSize보다 작게 설정하면 트래픽 증가 시 Connection을 동적으로 생성해야 하는데, Connection 생성 속도보다 트래픽이 빠르게 증가하면 응답 속도가 느려집니다. Pool size를 고정하면 이러한 문제를 방지할 수 있습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/DB/db_connection_pool.md`
- 내용: DB Connection, JDBC, Connection Pool, HikariCP

### 추가 학습 자료

- [Naver D2 - Commons DBCP 이해하기](https://d2.naver.com/helloworld/5102792)
- [Connection Pool 정리](https://brownbears.tistory.com/289)