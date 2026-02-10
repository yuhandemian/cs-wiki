---
category: Network
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 2
subtopic: OSI 7계층과 TCP/IP 4계층
tags: []
---

# OSI 7계층과 TCP/IP 4계층

## 📝 개념 정의

### OSI 7계층 모델

**국제표준화기구(ISO)**에서 개발한 네트워크 통신의 표준 모델입니다.

**목적:**
- 네트워크 통신을 7개 계층으로 표준화
- 계층별 독립적인 역할 분담
- 문제 발생 시 원인 파악 용이
- 각 계층의 독립적 발전 가능

### TCP/IP 4계층 모델

**실무에서 실제로 사용**되는 네트워크 프로토콜 모델입니다.

**특징:**
- 프로토콜 집합 기반으로 구성
- 데이터 전송에 특화
- 인터넷의 표준 프로토콜

---

## 🎯 OSI 7계층 상세

### 계층별 특징

| 계층 | 이름 | PDU | 주요 기능 | 프로토콜 예시 |
|------|------|-----|-----------|---------------|
| **7** | 응용 계층&lt;br /&gt; (Application) | Data | 사용자와 직접 상호작용&lt;br /&gt; 응용 프로그램 통신 제어 | HTTP, SMTP, FTP, DNS |
| **6** | 표현 계층&lt;br /&gt; (Presentation) | Data | 데이터 형식 정의&lt;br /&gt; 암호화, 압축, 인코딩 | JPEG, PNG, SSL/TLS |
| **5** | 세션 계층&lt;br /&gt; (Session) | Data | 통신 세션 구성&lt;br /&gt; 동기화, 에러 복구 | SSH, TLS |
| **4** | 전송 계층&lt;br /&gt; (Transport) | Segment | 신뢰성 있는 데이터 전송&lt;br /&gt; 흐름 제어, 오류 제어 | TCP, UDP |
| **3** | 네트워크 계층&lt;br /&gt; (Network) | Packet | 경로 설정 (라우팅)<br /> 논리 주소 지정 | IP, ICMP, ARP |
| **2** | 데이터 링크 계층&lt;br /&gt; (Data Link) | Frame | 물리적 주소 지정&lt;br /&gt; 오류 감지 | MAC, Ethernet |
| **1** | 물리 계층&lt;br /&gt; (Physical) | Bit | 전기 신호 변환&lt;br /&gt; 비트 전송 | 케이블, 모뎀, 허브 |

### 계층별 상세 설명

#### 7계층: 응용 계층 (Application Layer)
- **역할**: 사용자와 직접 상호작용하는 계층
- **기능**: 응용 프로그램의 정보 활용 및 통신 제어
- **예시**: 웹 브라우저(HTTP), 이메일(SMTP), 파일 전송(FTP)

#### 6계층: 표현 계층 (Presentation Layer)
- **역할**: 데이터 형식 정의 및 변환
- **기능**: 
  - 데이터 암호화/복호화
  - 압축/압축 해제
  - 문자 인코딩 변환 (ASCII, UTF-8 등)
- **예시**: JPEG, PNG, MPEG, SSL/TLS

#### 5계층: 세션 계층 (Session Layer)
- **역할**: 통신 세션 관리
- **기능**:
  - 포트 번호 기반 세션 구성
  - 상호작용 및 동기화 제공
  - 연결 세션의 에러 복구
- **예시**: SSH, TLS, NetBIOS

#### 4계층: 전송 계층 (Transport Layer)
- **역할**: 노드 간 신뢰성 있는 데이터 전송
- **기능**:
  - 패킷 재전송
  - 흐름 제어 (Flow Control)
  - 혼잡 제어 (Congestion Control)
  - 오류 제어 (Error Control)
- **PDU**: Segment
- **프로토콜**: TCP (신뢰성), UDP (속도)

#### 3계층: 네트워크 계층 (Network Layer)
- **역할**: 경로 설정 및 논리 주소 지정
- **기능**:
  - 최적 경로 설정 (라우팅)
  - 패킷 전송
  - 논리 주소(IP 주소) 관리
- **PDU**: Packet
- **프로토콜**: IP, ICMP, ARP

#### 2계층: 데이터 링크 계층 (Data Link Layer)
- **역할**: 물리적 주소 지정 및 오류 감지
- **기능**:
  - MAC 주소 기반 통신
  - 프레임 헤더/트레일러 추가
  - 전송 오류 감지
- **PDU**: Frame
- **프로토콜**: MAC, Ethernet, PPP

#### 1계층: 물리 계층 (Physical Layer)
- **역할**: 물리적 신호 전송
- **기능**:
  - 디지털 비트를 전기/무선/광 신호로 변환
  - 노드 간 데이터 전송
- **PDU**: Bit
- **장비**: 케이블, 모뎀, 허브, 리피터

---

## 🔄 캡슐화와 역캡슐화

### 캡슐화 (Encapsulation)
데이터 전송 시 **상위 계층 → 하위 계층**으로 내려가며 각 계층의 헤더를 추가하는 과정

```
Application Layer:  [Data]
   ↓
Transport Layer:    [TCP Header | Data]
   ↓
Network Layer:      [IP Header | TCP Header | Data]
   ↓
Data Link Layer:    [Frame Header | IP Header | TCP Header | Data | Frame Trailer]
   ↓
Physical Layer:     01010101... (Bits)
```

### 역캡슐화 (Decapsulation)
데이터 수신 시 **하위 계층 → 상위 계층**으로 올라가며 각 계층의 헤더를 제거하는 과정

---

## 🆚 OSI 7계층 vs TCP/IP 4계층

### TCP/IP 4계층 구조

| TCP/IP 계층 | OSI 계층 대응 | 주요 프로토콜 |
|-------------|---------------|---------------|
| **4. 응용 계층** | 5, 6, 7계층 | HTTP, FTP, SMTP, DNS |
| **3. 전송 계층** | 4계층 | TCP, UDP |
| **2. 인터넷 계층** | 3계층 | IP, ICMP, ARP |
| **1. 네트워크 인터페이스** | 1, 2계층 | Ethernet, Wi-Fi |

### 공통점

✅ **계층 구조**: 둘 다 계층별로 역할 분담
✅ **캡슐화**: 데이터 전송 시 헤더 추가
✅ **프로토콜 사용**: 각 계층에서 프로토콜 정의
✅ **다중화/역다중화**: 여러 애플리케이션 동시 통신

### 차이점

| 특성 | OSI 7계층 | TCP/IP 4계층 |
|------|-----------|--------------|
| **개발 목적** | 표준화 모델 | 실무 구현 |
| **계층 수** | 7개 | 4개 |
| **구성 기준** | 역할 기반 | 프로토콜 기반 |
| **사용** | 학습 도구, 표준 | 실제 인터넷 통신 |
| **유연성** | 이론적으로 완벽 | 실용적 |

---

## 💡 실무 적용 예시

### 웹 서버 소프트웨어 (Apache, Nginx)

**동작 계층:**
- **7계층 (Application)**: HTTP 프로토콜 처리
- **4계층 (Transport)**: TCP 연결 관리

### 라우팅 기능

#### L4 라우팅 (Transport Layer)
- TCP/UDP 포트 정보 기반
- 예시: Nginx upstream 블록으로 포트별 로드 밸런싱

#### L7 라우팅 (Application Layer)
- HTTP URI 기반
- 예시: 서브 도메인별 라우팅, 리버스 프록시

---

## ❓ 면접 질문 예시

### Q1. OSI 7계층을 나누는 이유는?

**답변:**
통신 과정을 단계별로 파악할 수 있어 문제 발생 시 해당 계층만 확인하면 되므로 트러블슈팅이 용이합니다. 또한 각 계층이 독립적으로 발전할 수 있어, 마치 자동차 타이어를 교체하듯이 특정 계층의 프로토콜만 변경할 수 있습니다.

### Q2. OSI 7계층과 TCP/IP 4계층의 차이는?

**답변:**
OSI 7계층은 네트워크 통신의 표준화 모델로 역할 기반으로 7개 계층으로 구성되어 있습니다. TCP/IP 4계층은 실제 인터넷에서 사용되는 프로토콜 집합으로, 프로토콜 기반으로 4개 계층으로 구성됩니다. OSI는 학습 도구와 표준으로, TCP/IP는 실무 구현에 사용됩니다.

### Q3. 각 계층의 PDU는?

**답변:**
- 물리 계층: Bit
- 데이터 링크 계층: Frame
- 네트워크 계층: Packet
- 전송 계층: Segment
- 응용 계층: Data

### Q4. 웹 브라우저에서 웹 서버에 접속할 때 거치는 계층은?

**답변:**
1. 응용 계층: HTTP 요청 생성
2. 전송 계층: TCP 연결 수립 (3-way handshake)
3. 네트워크 계층: IP 주소로 라우팅
4. 데이터 링크 계층: MAC 주소로 프레임 전송
5. 물리 계층: 전기 신호로 변환 및 전송

### Q5. 캡슐화와 역캡슐화란?

**답변:**
캡슐화는 데이터 전송 시 상위 계층에서 하위 계층으로 내려가며 각 계층의 헤더를 추가하는 과정입니다. 역캡슐화는 데이터 수신 시 하위 계층에서 상위 계층으로 올라가며 각 계층의 헤더를 제거하는 과정입니다.

### Q6. L4 스위치와 L7 스위치의 차이는?

**답변:**
L4 스위치는 전송 계층에서 동작하여 TCP/UDP 포트 정보를 기반으로 트래픽을 분산합니다. L7 스위치는 응용 계층에서 동작하여 HTTP URI, 쿠키 등의 정보를 기반으로 더 정교한 트래픽 분산이 가능합니다.

---

## 📚 원본 참고 자료

### 출처 1: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/Network/network_osi_7_layer.md`
- 내용: OSI 7계층 각 계층 설명, TCP/IP 4계층 비교

### 출처 2: backend-interview-question
- 파일: `/Users/PARK/Desktop/MyBook/backend-interview-question/README.md` (라인 201-220)
- 내용: OSI 7계층 면접 질문, 웹 서버 동작 계층

### 추가 학습 자료

- [OSI 7 Layer와 TCP/IP 비교](http://blog.skby.net/osi-7-layer%EC%99%80-tcp-ip-%EB%B9%84%EA%B5%90/)
- [위키독스 - OSI 7계층](https://wikidocs.net/187325)