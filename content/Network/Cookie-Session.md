---
category: Network
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Cookie와 Session
tags: []
---

# Cookie와 Session

## 📝 개념 정의

### HTTP의 특성

**무상태성 (Stateless):**
- 서버가 클라이언트의 이전 상태를 저장하지 않음
- 각 요청은 독립적으로 처리

**비연결성 (Connectionless):**
- 요청-응답 후 연결 종료
- 서버 자원 절약

**문제점:**
- 로그인 후 새로고침하면 로그인 풀림
- 장바구니 정보 유지 불가
- 사용자 식별 불가

**해결책:** Cookie와 Session

---

## 🍪 Cookie

### 개념

**클라이언트(브라우저)에 저장**되는 작은 데이터 파일입니다.

**특징:**
- Key-Value 형식으로 저장
- 브라우저에 저장 (최대 4KB)
- 만료 시간 설정 가능
- 도메인별로 관리

### 동작 과정

```
1. 클라이언트: 로그인 요청
   POST /login
   username=user&password=pass

2. 서버: 응답 헤더에 Cookie 설정
   HTTP/1.1 200 OK
   Set-Cookie: sessionId=abc123; Path=/; HttpOnly

3. 클라이언트: 쿠키 저장 (브라우저)

4. 이후 요청 시 자동으로 Cookie 전송
   GET /profile
   Cookie: sessionId=abc123

5. 서버: Cookie로 사용자 식별
```

### Cookie 속성

| 속성 | 설명 | 예시 |
|------|------|------|
| **Domain** | 쿠키가 전송될 도메인 | `Domain=example.com` |
| **Path** | 쿠키가 전송될 경로 | `Path=/` |
| **Expires** | 만료 날짜 | `Expires=Wed, 21 Oct 2026 07:28:00 GMT` |
| **Max-Age** | 만료까지 시간(초) | `Max-Age=3600` |
| **Secure** | HTTPS에서만 전송 | `Secure` |
| **HttpOnly** | JavaScript 접근 차단 | `HttpOnly` |
| **SameSite** | CSRF 공격 방지 | `SameSite=Strict` |

### 장점

✅ **간단한 구현**: 서버 부담 없음
✅ **빠른 접근**: 클라이언트에서 즉시 사용
✅ **만료 시간 설정**: 브라우저 종료 후에도 유지 가능

### 단점

❌ **보안 취약**: 브라우저에서 확인 가능, 조작 위험
❌ **용량 제한**: 최대 4KB
❌ **브라우저 의존**: 브라우저마다 지원 형태 다름
❌ **네트워크 부하**: 매 요청마다 전송

---

## 🔐 Session

### 개념

**서버 메모리에 저장**되는 사용자 정보입니다.

**특징:**
- 서버에 실제 데이터 저장
- 클라이언트에는 Session ID만 Cookie로 전달
- 브라우저 종료 시 삭제

### 동작 과정

```
1. 클라이언트: 로그인 요청
   POST /login
   username=user&password=pass

2. 서버: 
   - 사용자 정보를 서버 메모리에 저장
   - Session ID 생성 (예: abc123)
   - Session ID를 Cookie로 전송
   
   HTTP/1.1 200 OK
   Set-Cookie: SESSIONID=abc123

3. 클라이언트: Session ID만 Cookie에 저장

4. 이후 요청 시 Session ID 전송
   GET /profile
   Cookie: SESSIONID=abc123

5. 서버: 
   - Session ID로 서버 메모리에서 사용자 정보 조회
   - 사용자 식별 및 응답
```

### 장점

✅ **보안 강화**: 실제 데이터는 서버에 저장
✅ **용량 제한 없음**: 서버 메모리 허용 범위 내
✅ **사용자 식별**: Session ID로 간편하게 식별

### 단점

❌ **서버 부하**: 사용자 증가 시 메모리 부담
❌ **확장성 문제**: 서버 여러 대 사용 시 Session 공유 필요
❌ **브라우저 종료 시 삭제**: 영구 저장 불가

---

## 🆚 Cookie vs Session 비교

| 특성 | Cookie | Session |
|------|--------|---------|
| **저장 위치** | 클라이언트 (브라우저) | 서버 (메모리/DB) |
| **보안** | 취약 (조작 가능) | 상대적으로 안전 |
| **용량** | 최대 4KB | 제한 없음 (서버 자원) |
| **속도** | 빠름 | 느림 (서버 조회 필요) |
| **만료** | 설정 가능 (영구 저장 가능) | 브라우저 종료 시 삭제 |
| **서버 부담** | 없음 | 있음 (메모리 사용) |
| **사용 예시** | 자동 로그인, 팝업 다시 보지 않기 | 로그인 상태 유지, 장바구니 |

---

## 💡 실무 활용

### Cookie 사용 예시

#### 1. 자동 로그인
```http
Set-Cookie: rememberMe=true; Max-Age=2592000
```

#### 2. 팝업 다시 보지 않기
```javascript
document.cookie = "hidePopup=true; max-age=86400";
```

#### 3. 사용자 선호 설정
```http
Set-Cookie: theme=dark; Path=/
```

### Session 사용 예시

#### 1. 로그인 상태 유지
```python
session['user_id'] = user.id
session['username'] = user.name
```

#### 2. 장바구니
```python
session['cart'] = [
    {'product_id': 1, 'quantity': 2},
    {'product_id': 5, 'quantity': 1}
]
```

#### 3. 임시 데이터 저장
```python
session['form_data'] = request.form
```

---

## 🔒 보안 고려사항

### Cookie 보안

#### 1. HttpOnly 플래그
- JavaScript로 Cookie 접근 차단
- XSS 공격 방지

```http
Set-Cookie: sessionId=abc123; HttpOnly
```

#### 2. Secure 플래그
- HTTPS에서만 Cookie 전송
- 중간자 공격 방지

```http
Set-Cookie: sessionId=abc123; Secure
```

#### 3. SameSite 속성
- CSRF 공격 방지

```http
Set-Cookie: sessionId=abc123; SameSite=Strict
```

### Session 보안

#### 1. Session ID 재생성
- 로그인 성공 시 Session ID 변경
- Session Fixation 공격 방지

#### 2. Session Timeout
- 일정 시간 후 자동 만료
- 무단 접근 방지

#### 3. Session 암호화
- 민감한 정보는 암호화하여 저장

---

## 🚀 대안: JWT (JSON Web Token)

### Session의 확장성 문제 해결

**문제:**
- 서버가 여러 대일 때 Session 공유 어려움
- 서버 메모리 부담

**해결책: JWT**
- 토큰에 사용자 정보 포함
- 서버에 저장하지 않음 (Stateless)
- 확장성 우수

### JWT vs Session

| 특성 | Session | JWT |
|------|---------|-----|
| **저장 위치** | 서버 | 클라이언트 |
| **확장성** | 낮음 | 높음 |
| **서버 부담** | 높음 | 낮음 |
| **보안** | 서버 제어 가능 | 토큰 탈취 위험 |
| **만료 제어** | 즉시 가능 | 토큰 만료까지 대기 |

---

## ❓ 면접 질문 예시

### Q1. Cookie와 Session의 차이점은?

**답변:**
Cookie는 클라이언트(브라우저)에 저장되고, Session은 서버에 저장됩니다. Cookie는 브라우저 종료 후에도 유지될 수 있지만, Session은 브라우저 종료 시 삭제됩니다. Cookie는 보안에 취약하지만 서버 부담이 없고, Session은 상대적으로 안전하지만 서버 메모리를 사용합니다.

### Q2. Cookie와 Session이 필요한 이유는?

**답변:**
HTTP는 무상태성과 비연결성 특징으로 인해 클라이언트의 상태를 유지할 수 없습니다. 로그인 상태나 장바구니 정보를 유지하기 위해 Cookie와 Session이 필요합니다. Cookie는 클라이언트에 정보를 저장하여 간단하게 상태를 유지하고, Session은 보안이 중요한 정보를 서버에 저장하여 안전하게 관리합니다.

### Q3. Session을 사용할 때의 단점과 해결 방법은?

**답변:**
Session의 주요 단점은 서버 메모리 부담과 확장성 문제입니다. 사용자가 많아지면 서버 메모리가 부족해지고, 서버가 여러 대일 때 Session 공유가 어렵습니다. 해결 방법으로는 Redis 같은 외부 Session 저장소를 사용하거나, JWT 같은 토큰 기반 인증으로 전환할 수 있습니다.

### Q4. Cookie의 보안을 강화하는 방법은?

**답변:**
1) HttpOnly 플래그로 JavaScript 접근 차단하여 XSS 공격 방지
2) Secure 플래그로 HTTPS에서만 전송하여 중간자 공격 방지
3) SameSite 속성으로 CSRF 공격 방지
4) 민감한 정보는 Cookie에 저장하지 않고 Session 사용

### Q5. JWT를 사용하는 이유는?

**답변:**
Session은 서버에 저장되어 확장성 문제가 있습니다. 서버가 여러 대일 때 Session 공유가 어렵고, 사용자가 많아지면 서버 메모리 부담이 큽니다. JWT는 토큰 자체에 사용자 정보를 포함하여 서버에 저장하지 않으므로(Stateless) 확장성이 우수하고 서버 부담이 적습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/Network/network_cookie_and_session.md`
- 내용: Cookie/Session 개념, 동작 과정, 장단점, 면접 질문

### 추가 학습 자료

- [튜나의 개발일지 - 쿠키와 세션](https://devuna.tistory.com/23)
- [우아한 테크 코스 - Cookie & Session vs JWT](https://tecoble.techcourse.co.kr/post/2021-05-22-cookie-session-jwt/)
- [joie-kim - Session 기반 인증](https://joie-kim.github.io/Session-Auth/)