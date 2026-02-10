---
category: Network
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 2
subtopic: TCP와 UDP
tags: []
---

# TCP와 UDP

## 📝 개념 정의

### TCP (Transmission Control Protocol)

**연결 지향형 프로토콜**로, 데이터 전송의 신뢰성을 보장하는 전송 계층 프로토콜입니다.

**핵심 특징:**
- 연결 지향: 3-way handshake로 연결 수립
- 신뢰성 보장: 흐름 제어, 혼잡 제어, 오류 제어
- 순서 보장: 가상회선 패킷 교환 방식 사용
- 1:1 통신만 가능
- 바이트 스트림(byte-stream) 서비스 제공

### UDP (User Datagram Protocol)

**비연결형 프로토콜**로, 빠른 전송이 필요한 경우 사용되는 전송 계층 프로토콜입니다.

**핵심 특징:**
- 비연결형: 연결 수립 과정 없음
- 신뢰성 미보장: 수신 여부 확인 안 함
- 순서 미보장: 데이터그램 패킷 교환 방식
- 1:1, 1:N, N:N 통신 가능
- 데이터그램(datagram) 서비스 제공

---

## 🎯 핵심 비교

| 특성 | TCP | UDP |
|------|-----|-----|
| **연결 방식** | 연결 지향 (Connection-oriented) | 비연결 (Connectionless) |
| **신뢰성** | 보장 (재전송, 순서 보장) | 미보장 |
| **속도** | 느림 (오버헤드 존재) | 빠름 (오버헤드 최소) |
| **순서 보장** | 보장 | 미보장 |
| **통신 방식** | 1:1 (Unicast) | 1:1, 1:N, N:N |
| **데이터 경계** | 구분 안 함 (스트림) | 구분함 (데이터그램) |
| **패킷 교환** | 가상회선 방식 | 데이터그램 방식 |
| **헤더 크기** | 20-60 bytes | 8 bytes (고정) |
| **사용 예시** | HTTP, HTTPS, FTP, Email | DNS, 스트리밍, 게임, VoIP |

---

## 🔄 TCP 연결 및 해제 과정

### 포트 상태 정보

- **CLOSED**: 포트가 닫힌 상태
- **LISTEN**: 포트가 열린 상태로 연결 요청 대기 중
- **SYN_RCV**: 요청을 받고 상대방의 응답을 기다리는 중
- **ESTABLISHED**: 포트 연결 상태
- **FIN_WAIT_1/2**: 연결 종료 대기 중
- **CLOSE_WAIT**: 종료 요청을 받고 종료 준비 중
- **TIME_WAIT**: 연결 종료 후 일정 시간 대기

### 플래그 정보

TCP 헤더의 CONTROL BIT (6bit):
- **SYN (Synchronize)**: 연결 설정, 초기 시퀀스 번호 전송
- **ACK (Acknowledgement)**: 응답 확인, 패킷을 받았음을 의미
- **FIN (Finish)**: 연결 해제, 더 이상 전송할 데이터 없음

### 3-Way Handshake (연결 수립)

```
Client                    Server
  |                          |
  |  1. SYN (seq=x)         |
  |------------------------>|
  |                          |
  |  2. SYN-ACK (seq=y,     |
  |     ack=x+1)            |
  |<------------------------|
  |                          |
  |  3. ACK (ack=y+1)       |
  |------------------------>|
  |                          |
  |   [ESTABLISHED]          |
```

**단계별 설명:**
1. **SYN**: 클라이언트가 서버에 연결 요청 (ISN 전송)
2. **SYN-ACK**: 서버가 요청 수락 및 자신의 ISN 전송
3. **ACK**: 클라이언트가 최종 확인

**ISN (Initial Sequence Number)**: 
- 새로운 TCP 연결의 첫 번째 패킷에 할당된 임의의 시퀀스 번호
- 난수로 설정하는 이유: 이전 연결의 패킷과 구분하기 위함

### 4-Way Handshake (연결 해제)

```
Client                    Server
  |                          |
  |  1. FIN                 |
  |------------------------>|
  |  [FIN_WAIT_1]           |
  |                          |
  |  2. ACK                 |
  |<------------------------|
  |  [FIN_WAIT_2]    [CLOSE_WAIT]
  |                          |
  |  3. FIN                 |
  |<------------------------|
  |  [TIME_WAIT]            |
  |                          |
  |  4. ACK                 |
  |------------------------>|
  |                   [CLOSED]
  |                          |
  [CLOSED after timeout]
```

**단계별 설명:**
1. **FIN**: 클라이언트가 연결 종료 요청
2. **ACK**: 서버가 종료 요청 확인 (아직 보낼 데이터가 있을 수 있음)
3. **FIN**: 서버가 모든 데이터 전송 완료 후 종료 준비 완료
4. **ACK**: 클라이언트가 최종 확인

**TIME_WAIT 상태**:
- 소켓이 바로 소멸되지 않고 일정 시간(기본 240초) 유지
- 지연 패킷 처리 및 연결 오류 방지
- FIN 패킷보다 늦게 도착하는 패킷 대기

---

## 💡 패킷 교환 방식

### 가상회선 패킷 교환 (TCP)

- 각 패킷에 가상회선 식별자 포함
- 모든 패킷이 **동일한 경로**로 전송
- 패킷이 **순서대로 도착** 보장
- 연결 수립 → 데이터 전송 → 연결 해제 과정 필요

### 데이터그램 패킷 교환 (UDP)

- 각 패킷이 **독립적으로 이동**
- 패킷마다 **최적의 경로** 선택
- 서로 다른 경로로 전송 가능
- **도착 순서 보장 안 됨**
- 연결 수립 과정 불필요

---

## 🔍 심화 내용

### TCP 신뢰성 보장 메커니즘

#### 1. 흐름 제어 (Flow Control)
- 수신자의 처리 속도에 맞춰 전송 속도 조절
- 슬라이딩 윈도우 기법 사용

#### 2. 혼잡 제어 (Congestion Control)
- 네트워크 혼잡 상황 감지 및 전송량 조절
- Slow Start, Congestion Avoidance 알고리즘

#### 3. 오류 제어 (Error Control)
- 체크섬을 통한 데이터 무결성 검증
- 손실된 패킷 재전송

### UDP의 활용

UDP는 신뢰성을 보장하지 않지만, **애플리케이션 레벨에서 신뢰성을 추가**할 수 있습니다.

**예시: QUIC 프로토콜**
- HTTP/3의 기반 프로토콜
- UDP 위에 구현되어 TCP의 장점 활용
- 빠른 연결 수립 + 신뢰성 보장

---

## ❓ 면접 질문 예시

### Q1. TCP와 UDP의 차이점은?

**답변:**
TCP는 연결 지향형 프로토콜로 신뢰성을 보장하며, 흐름 제어, 혼잡 제어, 오류 제어를 수행합니다. 반면 UDP는 비연결형 프로토콜로 신뢰성을 보장하지 않지만 속도가 빠릅니다. TCP는 파일 전송과 같이 신뢰성이 중요한 서비스에, UDP는 스트리밍이나 게임처럼 연속성이 중요한 서비스에 사용됩니다.

### Q2. 3-way handshake와 4-way handshake의 차이는?

**답변:**
3-way handshake는 연결 수립 과정으로 SYN, SYN-ACK, ACK 3단계로 이루어집니다. 4-way handshake는 연결 해제 과정으로 FIN, ACK, FIN, ACK 4단계입니다. 연결 해제가 한 단계 더 많은 이유는 서버가 ACK를 보낸 후에도 아직 전송할 데이터가 남아있을 수 있기 때문입니다.

### Q3. ISN을 0부터 시작하지 않고 난수로 설정하는 이유는?

**답변:**
포트 번호는 유한 범위 내에서 재사용되기 때문에, 과거에 사용된 포트 번호 쌍이 다시 사용될 가능성이 있습니다. 순차적인 번호를 사용하면 이전 연결의 패킷으로 오인할 수 있어, 난수를 사용하여 이러한 문제를 방지합니다.

### Q4. TIME_WAIT 상태가 필요한 이유는?

**답변:**
FIN 패킷보다 늦게 도착하는 지연 패킷을 처리하기 위함입니다. 라우팅 지연이나 패킷 유실로 인한 재전송으로 FIN 이후에 패킷이 도착할 수 있으므로, 일정 시간(기본 240초) 동안 세션을 유지하여 잉여 패킷을 기다립니다.

### Q5. UDP도 신뢰성을 보장할 수 있나요?

**답변:**
UDP 자체는 신뢰성을 보장하지 않지만, 애플리케이션 레벨에서 신뢰성을 추가할 수 있습니다. 예를 들어 HTTP/3의 기반인 QUIC 프로토콜은 UDP 위에 구현되어 있지만, 자체적으로 재전송, 순서 보장 등의 기능을 제공하여 신뢰성을 확보합니다.

### Q6. 언제 TCP를 사용하고 언제 UDP를 사용하나요?

**답변:**
- **TCP 사용**: 데이터 무결성이 중요한 경우 (HTTP, FTP, 이메일, 파일 전송)
- **UDP 사용**: 실시간성이 중요하고 일부 데이터 손실이 허용되는 경우 (DNS, 스트리밍, 온라인 게임, VoIP)

---

## 📚 원본 참고 자료

### 출처 1: 2023-CS-Study
- 링크: [network_tcp_and_udp.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Network/network_tcp_and_udp.md)
- 내용: TCP/UDP 기본 개념, 3-way/4-way handshake, 패킷 교환 방식

### 출처 2: backend-interview-question
- 파일: `/Users/PARK/Desktop/MyBook/backend-interview-question/README.md` (라인 125-141)
- 내용: 면접 질문 및 답변, 실무 관점의 설명

### 추가 학습 자료

- [TCP와 3-Way, 4-Way Handshake란?](https://jeongkyun-it.tistory.com/180)
- [Packet Switching, 패킷 교환 방식](https://wonit.tistory.com/553)
- [TCP/UDP 차이 자세히 알아보기](https://velog.io/@hidaehyunlee/TCP-%EC%99%80-UDP-%EC%9D%98-%EC%B0%A8%EC%9D%B4)