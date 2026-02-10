---
category: Network
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: SOP와 CORS
tags: []
---

# SOP & CORS

## 📝 출처 (Origin)

### 개념

**프로토콜 + 호스트 + 포트**

### 구성

```
https://www.domain.com:443
  ↓        ↓           ↓
프로토콜   호스트      포트
```

### 확인 방법

```javascript
console.log(document.location.origin);
// https://www.naver.com
```

---

## 🔍 동일 출처 예시

### ✅ 동일 출처

```
https://www.apple.com/kr/
https://www.apple.com/kr/iphone/
→ 경로만 다름, 동일 출처
```

```
https://www.youtube.com/
https://www.youtube.com:443
→ HTTPS 기본 포트 443, 동일 출처
```

### ❌ 다른 출처

```
https://www.starbucks.co.kr
http://www.starbucks.co.kr/
→ 프로토콜 다름, 다른 출처
```

---

## 🛡️ SOP (Same-Origin Policy)

### 개념

**동일 출처 정책 - 다른 출처의 리소스 접근 제한**

**핵심:**
- 보안을 위한 브라우저 정책
- 다른 출처 간 상호작용 제한
- 극히 제한적인 객체만 접근 가능

### 목적

✅ **보안 강화**
- 개인정보 유출 방지
- 피싱 사이트 차단
- 악의적 행동 방지

### 제한 사항

**다른 출처에서:**
- `XMLHttpRequest` 제한
- `Fetch API` 제한
- 문서/스크립트 접근 제한

---

## 🌐 CORS 등장 배경

### 과거 구조

```
┌─────────┐
│ Client  │
└────┬────┘
     │ 요청
     ▼
┌─────────┐
│ Server  │ ← HTML + 비즈니스 로직
└─────────┘
```

**특징:**
- 하나의 서버에서 모든 처리
- 같은 도메인에서만 통신

---

### 현대 구조

```
┌─────────┐
│ Client  │
└────┬────┘
     │ 요청
     ▼
┌──────────┐      ┌──────────┐
│ Frontend │ ───▶ │ API 서버 │
│  Server  │      │ (다른 도메인)│
└──────────┘      └──────────┘
```

**문제:**
- 프론트엔드와 API 서버 분리
- 다른 도메인 간 통신 필요
- SOP로 인해 차단

**해결:**
- CORS 정책 도입

---

## 🔓 CORS (Cross-Origin Resource Sharing)

### 개념

**교차 출처 리소스 공유 - 다른 출처 간 자원 공유 허용**

**핵심:**
- 서버가 허용한 출처만 접근 가능
- HTTP 헤더로 제어
- 브라우저가 실행

### 동작 방식

**1. 클라이언트 요청**
```http
GET /api/users
Origin: https://www.site.com
```

**2. 서버 응답**
```http
Access-Control-Allow-Origin: https://www.site.com
```

**3. 브라우저 확인**
- Origin과 Allow-Origin 비교
- 일치하면 응답 허용
- 불일치하면 차단

---

## 🔧 CORS 헤더

### Access-Control-Allow-Origin

**허용할 출처 지정**

```http
# 특정 출처 허용
Access-Control-Allow-Origin: https://www.site.com

# 모든 출처 허용
Access-Control-Allow-Origin: *
```

### Access-Control-Allow-Methods

**허용할 HTTP Method**

```http
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

### Access-Control-Allow-Headers

**허용할 헤더**

```http
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Access-Control-Max-Age

**Preflight 캐시 시간**

```http
Access-Control-Max-Age: 86400
```

---

## 📋 CORS 요청 종류

### 1. 간단한 요청 (Simple Requests)

**조건:**
- GET, HEAD, POST만 허용
- 안전한 헤더만 사용
- ReadableStream 사용 안 함

**동작:**
```
Client ────────────▶ Server
       (Origin 포함)
       
Client ◀──────────── Server
       (Allow-Origin 포함)
```

---

### 2. 프리플라이트 요청 (Preflight Requests)

**조건:**
- Simple Request 조건 미충족
- PUT, DELETE 등 사용
- 커스텀 헤더 사용

**동작:**
```
1. Preflight (OPTIONS)
Client ────────────▶ Server
       (확인 요청)
       
Client ◀──────────── Server
       (허용 여부)

2. 실제 요청
Client ────────────▶ Server
       (본 요청)
       
Client ◀──────────── Server
       (응답)
```

**Preflight 요청 헤더:**
```http
OPTIONS /api/users
Origin: https://www.site.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type
```

**Preflight 응답 헤더:**
```http
Access-Control-Allow-Origin: https://www.site.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 86400
```

---

### 3. 인증된 요청 (Credentialed Requests)

**조건:**
- 쿠키, 인증 헤더 포함
- TLS 클라이언트 인증서 사용

**클라이언트:**
```javascript
fetch('https://api.example.com/users', {
  credentials: 'include'  // 쿠키 포함
});
```

**서버:**
```http
Access-Control-Allow-Origin: https://www.site.com
Access-Control-Allow-Credentials: true
```

**주의:**
❌ 와일드카드(*) 사용 불가
✅ 명시적 출처 지정 필수

---

## 🔄 Preflight가 필요한 이유

### 목적

✅ **서버 보호**
- 요청 실행 전 검사
- 허용 여부 미리 확인

✅ **안전성**
- 다른 출처 요청 차단
- 서버 정책 준수

✅ **유연성**
- 서버가 허용 범위 조절
- 헤더/메서드 제어

---

## 📊 SOP vs CORS

| 특징 | SOP | CORS |
|------|-----|------|
| **목적** | 보안 | 자원 공유 |
| **기본 정책** | 차단 | 허용 (조건부) |
| **제어** | 브라우저 | 서버 + 브라우저 |
| **시기** | 과거 | 현대 |

---

## ❓ 면접 질문 예시

### Q1. SOP란 무엇인가요?

**답변:**
Same-Origin Policy의 약자로 동일 출처 정책을 의미합니다. 다른 출처에서 불러온 문서나 스크립트가 다른 출처의 리소스와 상호작용하는 것을 제한하는 브라우저 보안 정책입니다. 개인정보 유출과 피싱 사이트를 방지하기 위해 도입되었습니다.

### Q2. 출처(Origin)란 무엇인가요?

**답변:**
프로토콜, 호스트, 포트로 구성된 것을 출처라고 합니다. 이 세 가지가 모두 같아야 동일한 출처라고 말합니다. 예를 들어 https://www.domain.com:443에서 https는 프로토콜, www.domain.com은 호스트, 443은 포트입니다.

### Q3. CORS란 무엇이고 왜 필요한가요?

**답변:**
Cross-Origin Resource Sharing의 약자로 교차 출처 리소스 공유를 의미합니다. 현대 웹에서는 프론트엔드와 API 서버를 분리하는 경우가 많아 다른 도메인 간 통신이 필요한데, SOP로 인해 차단됩니다. CORS는 서버가 허용한 출처에서만 리소스에 접근할 수 있도록 HTTP 헤더로 제어하는 정책입니다.

### Q4. Preflight 요청이란 무엇인가요?

**답변:**
실제 요청을 보내기 전에 OPTIONS 메서드로 서버에 허용 여부를 확인하는 요청입니다. PUT, DELETE 등 Simple Request 조건을 충족하지 못하는 요청에서 발생하며, 서버가 해당 출처와 메서드, 헤더를 허용하는지 미리 확인하여 서버를 보호합니다.

### Q5. CORS 에러를 해결하는 방법은?

**답변:**
서버에서 Access-Control-Allow-Origin 헤더를 설정하여 허용할 출처를 명시합니다. 모든 출처를 허용하려면 *를 사용하고, 특정 출처만 허용하려면 해당 출처를 명시합니다. 또한 필요에 따라 Allow-Methods, Allow-Headers, Allow-Credentials 등의 헤더도 설정합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/Network/network_sop_and_cors.md`
- 내용: SOP, CORS, Preflight, 인증된 요청

### 추가 학습 자료

- [동일 출처 정책](https://developer.mozilla.org/ko/docs/Web/Security/Same-origin_policy)
- [교차 출처 리소스 공유 (CORS)](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)
- [CORS가 나오게 된 배경](https://www.youtube.com/watch?v=yTzAjidyyqs)