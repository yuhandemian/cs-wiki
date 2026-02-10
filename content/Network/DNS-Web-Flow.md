---
category: Network
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 2
subtopic: DNS와 웹 통신 흐름
tags: []
---

# DNS와 웹 통신 흐름

## 📝 개념 정의

### DNS (Domain Name System)

**도메인 이름을 IP 주소로 변환**해주는 분산 데이터베이스 시스템입니다.

**비유:** 웹사이트를 위한 주소록

**필요성:**
- 사람: `www.google.com` (호스트 이름) 선호
- 라우터: `142.250.207.46` (IP 주소) 필요
- DNS가 이 둘을 연결

---

## 🎯 DNS 구조

### 분산 계층 데이터베이스

중앙 집중식 데이터베이스의 문제점:
- ❌ 서버 고장 시 전체 시스템 마비
- ❌ 트래픽 집중으로 과부하
- ❌ 먼 거리로 인한 지연
- ❌ 유지보수 어려움

**해결책:** 계층 형태로 분산

```
                [Root DNS Server]
                       |
        ┌──────────────┼──────────────┐
        |              |              |
    [.com TLD]    [.org TLD]    [.kr TLD]
        |
    [google.com]
        |
    [www.google.com]
```

### DNS 서버 계층

#### 1. 루트 DNS 서버
- 전 세계에 1000개 이상의 인스턴스 분산
- TLD 서버의 IP 주소 제공
- 최상위 계층

#### 2. TLD (Top-Level Domain) DNS 서버
- `.com`, `.org`, `.net`, `.kr` 등 관리
- 책임 DNS 서버의 IP 주소 제공

#### 3. 책임 (Authoritative) DNS 서버
- 조직의 자체 DNS 서버
- 실제 호스트 이름과 IP 주소 매핑 정보 보유

---

## 🔍 DNS Query 과정

### www.google.com 조회 예시

```
1. DNS Recursor (ISP DNS 서버)
   ↓ "www.google.com의 IP 주소는?"
2. Root DNS Server
   ↓ ".com TLD 서버로 가세요"
3. .com TLD Server
   ↓ "google.com 책임 서버로 가세요"
4. google.com Authoritative Server
   ↓ "142.250.207.46 입니다"
5. DNS Recursor
   ↓ IP 주소 반환
6. 클라이언트
```

### Query 유형

#### 재귀적 질의 (Recursive Query)
- DNS Recursor가 최종 답을 찾을 때까지 반복
- 클라이언트는 한 번만 요청

#### 반복적 질의 (Iterative Query)
- 각 DNS 서버가 다음 서버 주소만 알려줌
- 클라이언트가 직접 여러 서버에 요청

---

## 💾 DNS 캐싱

### 목적
- DNS 성능 향상
- 네트워크 DNS 메시지 수 감소

### 캐싱 위치 (우선순위순)

1. **브라우저 캐시**: 브라우저 자체 DNS 캐시
2. **OS 캐시**: 운영체제 DNS 캐시
3. **라우터 캐시**: 공유기 DNS 캐시
4. **ISP DNS 캐시**: 인터넷 서비스 제공자 DNS 캐시

### 특징
- 일정 시간(TTL) 후 자동 삭제
- IP 주소 변경에 대응

---

## 🌐 웹 통신의 전체 흐름

### www.google.com 접속 시 일어나는 일

#### 1. URL 입력
사용자가 브라우저 주소창에 `www.google.com` 입력

#### 2. DNS 조회 (캐시 확인)
브라우저 → OS → 라우터 → ISP 순으로 캐시 확인

#### 3. DNS Query (캐시 없을 경우)
ISP DNS 서버가 재귀적 질의로 IP 주소 탐색

#### 4. IP 주소 응답
DNS가 `142.250.207.46` 반환

#### 5. TCP 연결 수립
3-way handshake로 TCP 연결 생성

```
Client          Server
  |  SYN          |
  |-------------->|
  |  SYN-ACK      |
  |<--------------|
  |  ACK          |
  |-------------->|
```

#### 6. HTTP 요청
GET 요청으로 웹 페이지 요청

```http
GET / HTTP/1.1
Host: www.google.com
```

#### 7. 서버 처리

**웹 서버 (Web Server):**
- 정적 컨텐츠 처리 (HTML, CSS, 이미지)
- Apache, Nginx 등

**WAS (Web Application Server):**
- 동적 컨텐츠 처리 (JSP, PHP 등)
- 데이터베이스 조회
- 비즈니스 로직 수행
- Tomcat, JBoss 등

```
Client → Web Server → WAS → Database
                ↓
            응답 생성
```

#### 8. HTTP 응답
서버가 HTML 문서 및 상태 코드 반환

```http
HTTP/1.1 200 OK
Content-Type: text/html

<html>...</html>
```

**상태 코드:**
- `1xx`: 정보 메시지
- `2xx`: 성공 (200 OK)
- `3xx`: 리다이렉트
- `4xx`: 클라이언트 오류 (404 Not Found)
- `5xx`: 서버 오류 (500 Internal Server Error)

#### 9. 렌더링
브라우저가 HTML, CSS, JavaScript를 파싱하여 화면에 표시

---

## 🖥️ 웹 서버 vs WAS

### 웹 서버 (Web Server)

**역할:** 정적 컨텐츠 제공
- HTML, CSS, 이미지 파일
- 빠른 응답 속도

**예시:** Apache, Nginx

### WAS (Web Application Server)

**역할:** 동적 컨텐츠 생성
- 비즈니스 로직 처리
- 데이터베이스 연동
- 사용자별 맞춤 컨텐츠

**예시:** Tomcat, JBoss, WebSphere

### 시스템 구성

#### WAS만 사용 (WAS + DB)
```
Client → WAS (정적 + 동적) → DB
```
- ❌ WAS 과부하 가능
- ❌ 정적 리소스 처리로 애플리케이션 로직 지연

#### 웹 서버 + WAS 사용 (권장)
```
Client → Web Server (정적) → WAS (동적) → DB
```
- ✅ 역할 분담으로 효율적
- ✅ 정적 리소스 많으면 웹 서버 증설
- ✅ 동적 리소스 많으면 WAS 증설
- ✅ 장애 격리 (WAS 오류 시 웹 서버는 정상)

---

## 💡 심화 내용

### DNS 레코드 타입

| 타입 | 설명 | 예시 |
|------|------|------|
| **A** | 도메인 → IPv4 주소 | `google.com → 142.250.207.46` |
| **AAAA** | 도메인 → IPv6 주소 | `google.com → 2404:6800:4004:...` |
| **CNAME** | 도메인 별칭 | `www.google.com → google.com` |
| **MX** | 메일 서버 | `gmail.com → aspmx.l.google.com` |
| **NS** | 네임 서버 | `google.com → ns1.google.com` |

### DNS 보안 (DNSSEC)

- DNS 응답의 무결성 검증
- DNS 스푸핑 공격 방지
- 디지털 서명 사용

---

## ❓ 면접 질문 예시

### Q1. DNS란 무엇이고 왜 필요한가요?

**답변:**
DNS는 도메인 이름을 IP 주소로 변환해주는 시스템입니다. 사람은 `www.google.com`과 같은 이름을 기억하기 쉽지만, 컴퓨터는 IP 주소로 통신합니다. DNS가 이 둘을 연결하여 사용자는 기억하기 쉬운 도메인 이름으로 웹사이트에 접속할 수 있습니다.

### Q2. www.google.com을 입력하면 어떤 일이 일어나나요?

**답변:**
1. 브라우저가 DNS 캐시 확인
2. 캐시에 없으면 DNS Query로 IP 주소 조회
3. IP 주소를 받아 TCP 3-way handshake로 연결
4. HTTP GET 요청 전송
5. 웹 서버/WAS가 요청 처리
6. HTTP 응답 수신
7. 브라우저가 HTML 렌더링

### Q3. DNS 캐싱이 필요한 이유는?

**답변:**
매번 DNS Query를 수행하면 네트워크 트래픽이 증가하고 응답 시간이 길어집니다. DNS 캐싱을 통해 이전에 조회한 도메인의 IP 주소를 저장해두면, 다음 요청 시 빠르게 응답할 수 있어 성능이 향상됩니다.

### Q4. 웹 서버와 WAS를 분리하는 이유는?

**답변:**
웹 서버는 정적 컨텐츠를, WAS는 동적 컨텐츠를 처리하도록 역할을 분담하면 효율적입니다. 정적 리소스가 많으면 웹 서버를 증설하고, 동적 처리가 많으면 WAS를 증설할 수 있어 유연한 확장이 가능합니다. 또한 WAS 장애 시에도 웹 서버는 정적 컨텐츠를 제공할 수 있어 가용성이 높아집니다.

### Q5. DNS는 왜 분산 구조인가요?

**답변:**
중앙 집중식 DNS는 단일 장애점(SPOF)이 되어 서버 고장 시 전체 인터넷이 마비될 수 있습니다. 또한 전 세계의 모든 DNS 요청을 한 곳에서 처리하면 트래픽 과부하와 지연이 발생합니다. 분산 계층 구조로 설계하면 안정성과 성능을 모두 확보할 수 있습니다.

---

## 📚 원본 참고 자료

### 출처 1: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/Network/network_dns_and_network_flow.md`
- 내용: DNS 구조, DNS Query, 웹 통신 흐름, 웹 서버/WAS

### 출처 2: backend-interview-question
- 파일: `/Users/PARK/Desktop/MyBook/backend-interview-question/README.md` (라인 112-122)
- 내용: 웹 통신 흐름 면접 질문

### 추가 학습 자료

- [Web Server와 WAS의 차이](https://gmlwjd9405.github.io/2018/10/27/webserver-vs-was.html)
- James F. Kurose, Keith W. Ross, 『컴퓨터 네트워킹 하향식 접근』