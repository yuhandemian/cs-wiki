---
category: Network
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: SOAP
tags: []
---

# SOAP (Simple Object Access Protocol)

## 📝 SOAP란?

**HTTP, HTTPS, SMTP 등을 통해 XML 기반 메시지를 교환하는 프로토콜**

**목적:** 플랫폼/프로그래밍 언어에 관계없이 데이터 교환

**현재:** REST API로 많이 대체됨

---

## 🔑 SOAP의 특징

### 1. 단일 URI 사용

**REST API:** HTTP 메소드 및 URI로 요청 구분

**SOAP:** 모든 요청이 지정된 한 URI로 전송

---

### 2. XML 사용

**REST API:** JSON 사용

**SOAP:** XML 사용 → 데이터 분량 큼

**결과:** POST 자주 사용 (BODY에 담아 전송)

---

### 3. 웹 프론트엔드에서 거의 미사용

**이유:** CORS 문제 대비 어려움

---

## 📋 SOAP 문법

### Envelope 구조

```xml
<envelope>
    <header>
        ...
    </header>
    <body>
        ...
    </body>
</envelope>
```

**시작/종료:** envelope 태그

**특징:** Function driven (어느 서비스 요청하는지 명시)

**표현:** 동사 포함 문장 (REST API와 대조적)

**가독성:** REST API가 더 높음

---

## 📄 WSDL (Web Services Description Language)

**SOAP 서비스의 사용 설명서**

**목적:** 프로그램이 읽도록 작성 (사람보다 프로그램 중심)

**형식:** XML

**사용:** 클라이언트/서버 프로그램이 WSDL 로드 후 명세에 따라 구현

**저장:** UDDI에 저장

---

## 💽 UDDI (Universal Description, Discovery and Integration)

**WSDL의 저장소**

**역할:** 사용자가 서비스 사용 시 접근하는 저장소

---

## ✅ SOAP의 장점

### 1. 상세한 표준화

**서비스에 대한 명확한 규격 정의**

---

### 2. 개발 과정 간소화

**문서 기반으로 클라이언트/서버 기능 자동화**

---

### 3. 높은 보안

**WS-Security 등 보안 프로토콜 지원**

**메시지 무결성과 기밀성 인증**

---

### 4. 트랜잭션 지원

**복잡한 트랜잭션 안전 처리**

**여러 작업을 하나의 트랜잭션으로 처리 가능**

---

### 5. 상태 저장 가능

**Stateless한 REST와 달리 필요 시 상태 저장**

**여러 단계 작업에서 이전 상태 기억 가능**

---

## ⚠️ SOAP의 단점

### 1. 복잡하고 장황함

**사람이 작성하고 읽기 어려움**

---

### 2. 유연성 부족

**WSDL 변경 시 서버/클라이언트 모두 코드 변경 필요**

---

### 3. 캐싱 어려움

**복잡한 XML 구조로 캐싱 기준 설정 어려움**

---

### 4. POST만 사용

**HTTP POST는 일반적으로 캐싱 안 됨**

**이유:** 데이터 변경 작업에 주로 사용

---

### 5. 덜 개방적

**UDDI 중개소 존재로 제한적**

**해결:** REST 등장

---

## 🔒 SOAP의 사용처

### 보안 업계

**금융 거래, 의료 정보, 정부 서비스**

**이유:**
- WS-Security 보안 프로토콜 지원
- 메시지 무결성/기밀성 인증
- 트랜잭션 안전 처리
- 엄격한 규약 (유연성 부족이 장점으로 작용)
- 상태 저장 가능 (여러 단계 작업에 유리)

**결론:** 복잡하고 민감한 로직의 대규모 서비스에서 여전히 사용

---

## 🆚 SOAP vs REST API

### SOAP

**프로토콜:** XML 기반

**URI:** 단일 URI

**메소드:** 주로 POST

**상태:** Stateful 가능

**보안:** WS-Security

**용도:** 금융, 의료, 정부

---

### REST API

**프로토콜:** JSON 기반

**URI:** 리소스별 URI

**메소드:** GET, POST, PUT, DELETE

**상태:** Stateless

**보안:** HTTPS

**용도:** 일반 웹 서비스

---

## ❓ 면접 질문 예시

### Q1. SOAP란 무엇인가요?

**답변:**
SOAP는 Simple Object Access Protocol의 약자로 HTTP, HTTPS, SMTP 등을 통해 XML 기반의 메시지를 컴퓨터 네트워크 상에서 교환하는 프로토콜입니다. 플랫폼과 프로그래밍 언어에 관계없이 데이터를 교환하기 위해 사용하며, 현재는 REST API로 많이 대체되었습니다.

### Q2. SOAP와 REST API의 차이점은?

**답변:**
SOAP는 XML 기반으로 모든 요청이 단일 URI로 전송되며 주로 POST를 사용합니다. REST API는 JSON 기반으로 리소스별 URI를 사용하고 GET, POST, PUT, DELETE 등 다양한 메소드를 사용합니다. SOAP는 Stateful이 가능하고 WS-Security를 지원하여 보안이 강하지만, REST는 Stateless이고 가독성이 높으며 캐싱이 용이합니다.

### Q3. WSDL과 UDDI는 무엇인가요?

**답변:**
WSDL은 Web Services Description Language의 약자로 SOAP 서비스의 사용 설명서입니다. XML로 작성되며 프로그램이 읽도록 만들어져 클라이언트와 서버가 WSDL을 로드하여 명세에 따라 기능을 구현합니다. UDDI는 Universal Description, Discovery and Integration의 약자로 WSDL의 저장소이며, 사용자가 서비스를 사용할 때 접근하는 저장소입니다.

### Q4. SOAP의 장단점은?

**답변:**
장점은 상세한 표준화, 문서 기반 자동화로 개발 간소화, WS-Security 등 높은 보안, 트랜잭션 안전 처리, 상태 저장 가능입니다. 단점은 복잡하고 장황하여 가독성이 낮고, WSDL 변경 시 서버/클라이언트 모두 코드 변경 필요, 복잡한 XML로 캐싱 어려움, POST만 사용하여 캐싱 제한적, UDDI 중개소로 덜 개방적입니다.

### Q5. SOAP는 어디에 사용되나요?

**답변:**
SOAP는 금융 거래, 의료 정보 시스템, 정부 서비스 등 높은 보안 수준을 요구하는 서비스에서 사용됩니다. WS-Security 보안 프로토콜을 지원하여 메시지 무결성과 기밀성을 인증할 수 있고, 여러 작업을 하나의 트랜잭션으로 안전하게 처리할 수 있으며, 상태 저장이 가능하여 복잡하고 민감한 로직을 처리하는 대규모 서비스에 적합합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [network_soap.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Network/network_soap.md)
- 내용: SOAP, WSDL, UDDI, REST 비교

### 추가 학습 자료

- [SOAP (REST API가 대세가 된 이유)](https://www.youtube.com/watch?v=5o1IiHuUxPk)