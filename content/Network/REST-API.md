---
category: Network
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: REST API
tags: []
---

# REST API

## 📝 REST 개념

**REST (Representational State Transfer):**
**자원을 이름으로 구분하여 해당 자원의 상태를 주고 받는 아키텍처 스타일**

**핵심:**
- HTTP URI로 자원 명시
- HTTP Method로 CRUD 수행
- 자원의 표현으로 상태 전달

---

## 🔧 REST 구성 요소

### 1. 자원 (Resource)

**HTTP URI로 표현**
```
https://api.example.com/users/123
```

### 2. 행위 (Verb)

**HTTP Method로 표현**
- GET, POST, PUT, DELETE, PATCH

### 3. 표현 (Representations)

**HTTP Message Payload**
- JSON, XML 등

---

## 📋 CRUD Operation

| 동작 | HTTP Method | 설명 |
|------|-------------|------|
| **Create** | POST | 데이터 생성 |
| **Read** | GET | 데이터 조회 |
| **Update** | PUT, PATCH | 데이터 수정 |
| **Delete** | DELETE | 데이터 삭제 |

---

## 🎯 REST 특징

### 1. Server-Client (서버-클라이언트 구조)

**역할 분리:**
- 서버: 자원 관리
- 클라이언트: 사용자 인증, 세션 관리

**장점:**
✅ 독립적 개발
✅ 유지보수 용이

---

### 2. Stateless (무상태)

**서버가 클라이언트 상태 저장 안 함**

**특징:**
- 각 요청은 독립적
- 필요한 정보를 모두 포함

**장점:**
✅ 서버 확장성 향상
✅ 구현 단순화

---

### 3. Cacheable (캐시 처리 가능)

**HTTP 캐싱 기능 활용**

**장점:**
✅ 응답 시간 단축
✅ 서버 부하 감소

---

### 4. Layered System (계층화)

**다중 계층 구조 가능**

**예시:**
- 로드밸런서
- 프록시 서버
- 게이트웨이

---

### 5. Uniform Interface (인터페이스 일관성)

**일관된 인터페이스**

**장점:**
✅ 이해하기 쉬움
✅ 사용하기 쉬움

---

## 🔑 HTTP Method

### 1. GET

**리소스 조회**

```http
GET /users/123
```

**특징:**
- 안전 (Safe)
- 멱등성 (Idempotent)
- 캐시 가능

---

### 2. POST

**리소스 생성**

```http
POST /users
Content-Type: application/json

{
  "name": "John",
  "age": 25
}
```

**특징:**
- 안전하지 않음
- 멱등성 없음 (여러 번 호출 시 중복 생성)

---

### 3. PUT

**리소스 전체 수정**

```http
PUT /users/123
Content-Type: application/json

{
  "name": "John Updated",
  "age": 26
}
```

**특징:**
- 안전하지 않음
- 멱등성 있음 (여러 번 호출해도 결과 동일)

---

### 4. PATCH

**리소스 일부 수정**

```http
PATCH /users/123
Content-Type: application/json

{
  "age": 26
}
```

---

### 5. DELETE

**리소스 삭제**

```http
DELETE /users/123
```

**특징:**
- 안전하지 않음
- 멱등성 있음

---

## 📐 REST API 설계 규칙

### 1. URI는 명사, 소문자 사용

```
❌ Bad: http://api.com/Studying/
✅ Good: http://api.com/study/
```

### 2. 마지막에 슬래시(/) 포함 안 함

```
❌ Bad: http://api.com/study/
✅ Good: http://api.com/study
```

### 3. 언더바 대신 하이픈 사용

```
❌ Bad: http://api.com/study_blog
✅ Good: http://api.com/study-blog
```

### 4. 파일 확장자 URI에 포함 안 함

```
❌ Bad: http://api.com/photo.png
✅ Good: http://api.com/photo
```

### 5. 행위를 포함하지 않음

```
❌ Bad: http://api.com/delete-post/1
✅ Good: DELETE http://api.com/post/1
```

---

## ✅ RESTful API

### 개념

**REST 아키텍처 스타일을 올바르게 지킨 API**

### RESTful 하지 않은 예

❌ 모든 CRUD를 POST로 처리
❌ URI 규칙 위반
❌ HTTP Method 잘못 사용

### RESTful 작동 원리

1. **클라이언트 요청**
   - URI, Method, Header, Body

2. **서버 인증**
   - 권한 확인

3. **서버 처리**
   - 비즈니스 로직 수행

4. **서버 응답**
   - 상태 코드, 데이터

---

## 📊 HTTP 상태 코드

### 2XX: 성공

- **200 OK**: 일반 성공
- **201 Created**: POST 성공
- **204 No Content**: 성공, 응답 본문 없음

### 4XX: 클라이언트 오류

- **400 Bad Request**: 잘못된 요청
- **401 Unauthorized**: 인증 필요
- **403 Forbidden**: 권한 없음
- **404 Not Found**: 리소스 없음

### 5XX: 서버 오류

- **500 Internal Server Error**: 서버 오류
- **503 Service Unavailable**: 서비스 불가

---

## 🔐 RESTful API 인증 방법

### 1. HTTP 기본 인증

**Base64 인코딩**

```http
Authorization: Basic dXNlcjpwYXNzd29yZA==
```

### 2. Bearer 인증 (토큰)

**JWT 등 토큰 사용**

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. API Key

**고유 키 할당**

```http
X-API-Key: abc123def456
```

### 4. OAuth

**암호 + 토큰 결합**
- 가장 안전
- 범위와 수명 제어

---

## 📈 REST 장단점

### 장점

✅ **HTTP 표준 활용**
- 추가 인프라 불필요

✅ **플랫폼 독립적**
- 모든 플랫폼에서 사용 가능

✅ **명확한 의도**
- API 메시지가 직관적

✅ **서버-클라이언트 분리**
- 독립적 개발

### 단점

❌ **HTTP Method 제한적**
- GET, POST, PUT, DELETE 등

❌ **Header 처리 전문성 요구**
- 테스트 시 복잡

❌ **구형 브라우저 호환 문제**
- IE 등에서 제한

---

## ❓ 면접 질문 예시

### Q1. REST란 무엇인가요?

**답변:**
Representational State Transfer의 약자로, HTTP URI로 자원을 명시하고 HTTP Method로 해당 자원에 대한 CRUD를 수행하는 아키텍처 스타일입니다. 자원의 표현으로 상태를 주고받으며, 무상태성과 캐시 가능성 등의 특징을 가집니다.

### Q2. REST의 특징을 설명해주세요.

**답변:**
1) Server-Client: 역할 분리로 독립적 개발
2) Stateless: 서버가 클라이언트 상태 저장 안 함
3) Cacheable: HTTP 캐싱 기능 활용
4) Layered System: 다중 계층 구조 가능
5) Uniform Interface: 일관된 인터페이스 제공

### Q3. PUT과 POST의 차이는?

**답변:**
POST는 리소스를 생성하며 멱등성이 없어 여러 번 호출 시 중복 생성됩니다. PUT은 리소스를 전체 수정하며 멱등성이 있어 여러 번 호출해도 결과가 동일합니다. POST는 주로 생성, PUT은 수정에 사용됩니다.

### Q4. RESTful API란 무엇인가요?

**답변:**
REST 아키텍처 스타일을 올바르게 지킨 API를 의미합니다. URI 규칙을 준수하고, HTTP Method를 적절히 사용하며, 무상태성 등 REST 원칙을 따르는 API입니다. 모든 CRUD를 POST로 처리하거나 URI에 행위를 포함하면 RESTful하지 않습니다.

### Q5. REST API 설계 시 주의할 점은?

**답변:**
1) URI는 명사와 소문자 사용
2) 마지막에 슬래시 포함 안 함
3) 언더바 대신 하이픈 사용
4) 파일 확장자 포함 안 함
5) 행위를 URI에 포함하지 않고 HTTP Method로 표현

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/Network/network_rest_api_restful.md`
- 내용: REST, REST API, RESTful, HTTP Method

### 추가 학습 자료

- [REST API 제대로 알고 사용하기](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)
- [REST](http://www.incodom.kr/REST)