---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Spring vs Spring Boot
tags: []
---

# Spring vs Spring Boot

## 📝 Spring 특징

### 1. DI (Dependency Injection)

**의존성 주입**

**객체 간 결합을 느슨하게**

**코드 재사용성 증가**

**단위 테스트 용이**

---

### 2. IoC (Inversion of Control)

**제어의 역전**

**객체 생성 및 생명 주기를 프레임워크가 제어**

**개발자는 인터페이스에만 의존**

**코드 재사용성과 유지보수성 향상**

---

#### IoC 구현 방법

**컨테이너에 객체 등록**

**컨테이너에서 객체 주입**

**컨테이너가 객체 생명주기 관리**

---

### 3. AOP (Aspect Oriented Programming)

**관점 지향 프로그래밍**

**횡단 관심사 처리**

**로깅, 보안, 트랜잭션 등 분리**

**프록시 객체 사용**

---

## 🚀 Spring Boot 특징

### 1. Embedded Tomcat

**내장 Tomcat 사용**

**별도 Tomcat 설치 불필요**

**JAR로 간편하게 배포**

---

### 2. Starter를 통한 Dependency 자동화

**Spring Framework 문제점:**

- 각 dependency 호환 버전 일일이 맞춤
- 하나의 버전 변경 시 다른 dependency 영향
- 버전 관리 어려움

**Spring Boot 해결:**

- Starter가 대부분의 dependency 관리
- 호환 버전 자동 설정

---

### 3. EnableAutoConfiguration

**사전 정의한 라이브러리를 Bean에 자동 등록**

**설정 자동화**

---

## 🆚 Spring vs Spring Boot

### Spring

**수동 설정 필요**

**Tomcat 별도 설치**

**Dependency 버전 관리 복잡**

**설정 파일 많음**

---

### Spring Boot

**자동 설정**

**내장 Tomcat**

**Starter로 Dependency 자동화**

**최소한의 설정**

---

## 💡 결론

**Spring과 Spring Boot는 모두 Java 기반 웹 애플리케이션 프레임워크**

**Spring Boot는 Spring을 사용하기 쉽게 만드는 기능 제공**

**Spring Boot는 Spring의 복잡한 설정을 간소화**

---

## ❓ 면접 질문 예시

### Q1. Spring의 주요 특징은?

**답변:**
Spring의 주요 특징은 세 가지입니다. 첫째, DI(의존성 주입)로 객체 간 결합을 느슨하게 하여 코드 재사용성을 높이고 단위 테스트를 용이하게 합니다. 둘째, IoC(제어의 역전)로 객체 생성 및 생명 주기를 프레임워크가 제어하여 개발자는 인터페이스에만 의존할 수 있습니다. 셋째, AOP(관점 지향 프로그래밍)로 로깅, 보안, 트랜잭션 등 횡단 관심사를 분리합니다.

### Q2. IoC란 무엇인가요?

**답변:**
IoC(Inversion of Control, 제어의 역전)는 의존성 주입의 한 형태로, 객체의 생성 및 생명 주기를 제어하는 책임을 개발자가 아닌 프레임워크에 위임하는 것입니다. 개발자는 객체의 구체적인 구현에 의존하지 않고 인터페이스에만 의존할 수 있어 코드의 재사용성과 유지보수성이 향상됩니다.

### Q3. Spring Boot의 주요 특징은?

**답변:**
Spring Boot의 주요 특징은 세 가지입니다. 첫째, 내장 Tomcat을 사용하여 별도 Tomcat 설치 없이 JAR로 간편하게 배포할 수 있습니다. 둘째, Starter를 통한 Dependency 자동화로 호환 버전을 자동으로 설정하여 버전 관리가 편리합니다. 셋째, EnableAutoConfiguration으로 사전 정의한 라이브러리를 Bean에 자동 등록하여 설정을 자동화합니다.

### Q4. Spring과 Spring Boot의 차이는?

**답변:**
Spring은 수동 설정이 필요하고 Tomcat을 별도로 설치해야 하며 Dependency 버전 관리가 복잡하고 설정 파일이 많습니다. Spring Boot는 자동 설정을 제공하고 내장 Tomcat을 사용하며 Starter로 Dependency를 자동화하고 최소한의 설정만 필요합니다. Spring Boot는 Spring을 사용하기 쉽게 만드는 기능을 제공합니다.

### Q5. AOP란 무엇인가요?

**답변:**
AOP(Aspect Oriented Programming, 관점 지향 프로그래밍)는 횡단 관심사를 처리하는 데 사용됩니다. 횡단 관심사는 애플리케이션의 주요 기능과 관련이 없는 로깅, 보안, 트랜잭션 등을 의미합니다. AOP는 횡단 관심사를 애플리케이션 코드에서 분리하고 프록시 객체를 사용하여 추가합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [spring vs spring boot.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Spring/spring%20vs%20spring%20boot.md)
- 내용: Spring, Spring Boot, DI, IoC, AOP