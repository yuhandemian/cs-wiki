---
category: Network
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Load Balancing
tags: []
---

# Load Balancing & L4/L7 Switch

## 📝 로드밸런싱 개념

**다수의 서버에 트래픽을 분산하여 안정적인 서비스 제공**

**핵심:**
- 서버 부하 분산
- 가용성 향상
- 성능 최적화

---

## 🎯 등장 배경

### Scale-Up의 한계

```
Client → Server A (성능 향상)
         ↓
      성능 한계 도달
```

### Scale-Out 필요

```
         ┌─ Server A
Client → │─ Server B
         └─ Server C
```

**문제:**
- 클라이언트가 직접 서버 선택?
- 서버 장애 시 처리?

### 로드밸런서 도입

```
Client → Load Balancer → ┌─ Server A
                          │─ Server B
                          └─ Server C
```

**효과:**
✅ 단일 진입점
✅ 자동 부하 분산
✅ 장애 대응

---

## 🎯 로드밸런싱 목적

✅ **서버 자원 최적화**
- 효율적인 자원 사용

✅ **데이터 처리량 증가**
- 병렬 처리

✅ **응답 속도 감소**
- 빠른 응답

✅ **과부하 방지**
- 균등 분산

✅ **안정성/가용성 극대화**
- 장애 대응

---

## 🔄 로드밸런싱 알고리즘

### 정적 부하분산 (Static)

#### 1. Round Robin

**순차적 할당**

```
Request 1 → Server A
Request 2 → Server B
Request 3 → Server C
Request 4 → Server A (반복)
```

**특징:**
✅ 알고리즘 단순
✅ 골고루 분배
❌ 서버 성능 차이 미고려

**적합:**
- 서버 처리량 비슷할 때

---

#### 2. IP Hash

**클라이언트 IP 기반 매핑**

```
Client IP: 192.168.1.10 → 항상 Server A
Client IP: 192.168.1.20 → 항상 Server B
```

**특징:**
✅ 동일 클라이언트 → 동일 서버
✅ 세션 유지 용이
❌ Mega Proxy Problem (특정 서버 집중)

---

### 동적 부하분산 (Dynamic)

#### 1. Weighted Round Robin

**가중치 기반 분배**

```
Server A (가중치 2) → 20%
Server B (가중치 3) → 30%
Server C (가중치 5) → 50%
```

**특징:**
✅ 서버 성능 반영
✅ 유연한 분배

**적합:**
- 서버 처리량 상이할 때

---

#### 2. Least Connection

**연결 수 기반**

```
Server A: 5 connections
Server B: 3 connections ← 선택
Server C: 7 connections
```

**특징:**
✅ 실시간 부하 반영
✅ 동적 분배

**적합:**
- 세션 유지 시간 길 때
- 트래픽 불균등할 때

---

#### 3. Least Response Time

**응답 시간 기반**

```
Server A: 100ms
Server B: 50ms ← 선택
Server C: 150ms
```

**특징:**
✅ 성능 기반 선택
✅ 최적 응답

**적합:**
- 서버 성능 상이할 때

---

## 🔧 L4/L7 스위치

### 네트워크 스위치

**역할:**
- 클라이언트와 서버 중계
- 실제 서버 주소 숨김
- 로드밸런싱 수행

---

## 4️⃣ L4 스위치

### 개념

**전송 계층(Layer 4) 기반 로드밸런싱**

**사용 정보:**
- IP 주소
- PORT 번호
- MAC 주소

### 동작 방식

**1. IP/PORT 기반 분산**
```
Client → L4 Switch → Server
         (IP, PORT 변조)
```

**2. 커넥션 관리**
- 3-Way Handshake
- 커넥션 데이터 생성
- 일정 시간 후 삭제

### 특징

✅ **빠른 속도**
- 패킷 헤더만 확인

✅ **낮은 비용**
- 자원 소모 적음

❌ **단순한 분산**
- 세밀한 제어 어려움

---

## 7️⃣ L7 스위치

### 개념

**애플리케이션 계층(Layer 7) 기반 로드밸런싱**

**사용 정보:**
- URI
- Payload
- Cookie
- HTTP 헤더

### 동작 방식

**트래픽 내용 분석**
```
Client → L7 Switch → Server
         (URI, Cookie 분석)
```

**예시:**
```
/api/users → Server A
/api/orders → Server B
/images/* → Server C
```

### 특징

✅ **정교한 분산**
- 내용 기반 라우팅

✅ **패킷 필터링**
- 보안 강화

❌ **높은 비용**
- 자원 소모 큼

❌ **느린 속도**
- 내용 분석 필요

---

## 📊 L4 vs L7

| 특징 | L4 | L7 |
|------|----|----|
| **계층** | 전송 계층 | 애플리케이션 계층 |
| **정보** | IP, PORT | URI, Cookie, Header |
| **속도** | 빠름 | 느림 |
| **비용** | 저렴 | 비쌈 |
| **분산** | 단순 | 정교 |
| **보안** | 기본 | 패킷 필터링 |
| **세션** | 1개 (Client-Server) | 2개 (Client-L7, L7-Server) |

---

## 🔄 TCP 세션 차이

### L4 스위치

```
Client ⇄ L4 Switch ⇄ Server
        (1개 세션)
```

### L7 스위치

```
Client ⇄ L7 Switch ⇄ Server
   (세션 1)    (세션 2)
```

---

## ⚠️ 주의사항

### 로드밸런서 다중화

**문제:**
- 로드밸런서도 장애 가능

**해결:**
```
         ┌─ Load Balancer 1 (Active)
Client → │
         └─ Load Balancer 2 (Standby)
```

**효과:**
✅ 장애 대비
✅ 가용성 향상

---

## ❓ 면접 질문 예시

### Q1. 로드밸런싱이란 무엇인가요?

**답변:**
하나의 서버로 안정적인 서비스를 제공하기 어려워 Scale-Out할 경우, 클라이언트 요청을 다수의 서버에 적절히 분산하는 기술입니다. 서버 자원을 최적화하고 응답 속도를 개선하며 안정성과 가용성을 극대화합니다.

### Q2. 로드밸런싱 알고리즘을 설명해주세요.

**답변:**
정적 부하분산에는 Round Robin(순차 할당), IP Hash(IP 기반 매핑)가 있습니다. 동적 부하분산에는 Weighted Round Robin(가중치 기반), Least Connection(연결 수 기반), Least Response Time(응답 시간 기반)이 있습니다. 서버 상황과 요구사항에 따라 적절한 알고리즘을 선택합니다.

### Q3. L4와 L7 로드밸런싱의 차이는?

**답변:**
L4는 전송 계층에서 IP와 PORT 기반으로 부하를 분산하여 속도가 빠르고 비용이 저렴하지만 단순한 분산만 가능합니다. L7은 애플리케이션 계층에서 URI, Cookie, Header 등을 분석하여 정교한 분산이 가능하고 패킷 필터링으로 보안을 강화할 수 있지만 자원 소모가 크고 속도가 느립니다.

### Q4. Round Robin 방식의 장단점은?

**답변:**
장점은 알고리즘이 간단하고 각 서버에 골고루 분배된다는 것입니다. 단점은 서버 성능 차이를 고려하지 않아 특정 서버에 장애가 발생하면 처리 속도가 느려질 수 있습니다. 서버 처리량이 비슷할 때 적합합니다.

### Q5. 로드밸런서 자체의 장애는 어떻게 대비하나요?

**답변:**
로드밸런서도 일종의 장치이므로 다중화 등 장애 대비책을 마련해야 합니다. Active-Standby 구성으로 주 로드밸런서 장애 시 대기 로드밸런서가 즉시 전환되도록 하여 가용성을 향상시킵니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [network_l4_l7_switch_and_load_balancing.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Network/network_l4_l7_switch_and_load_balancing.md)
- 내용: 로드밸런싱, L4/L7 스위치, 알고리즘

### 추가 학습 자료

- [로드 밸런싱의 작동 방식 이해](https://www.cisco.com/c/ko_kr/support/docs/ip/border-gateway-protocol-bgp/5212-46.html)
- [[네트워크] 로드밸런서의 기본](https://etloveguitar.tistory.com/136)