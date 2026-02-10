---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: ApplicationContext
tags: []
---

# ApplicationContext

## 📝 ApplicationContext란?

**빈들의 생성과 의존성 주입 등의 역할을 하는 DI 컨테이너**

**스프링 컨테이너**

**Spring IoC Container의 역할 수행**

---

## 🏭 스프링 컨테이너 종류

### 1. BeanFactory

**Bean 생성과 관계 설정 담당**

**IoC 컨테이너**

**Spring의 최상위 인터페이스**

**Spring IoC Container의 기본 요소**

---

### 2. ApplicationContext

**BeanFactory를 상속받아 구현**

**Bean 생성 + 추가 기능**

**설정 정보를 이용한 Bean 간 관계 설정**

**제어 작업 총괄**

---

## 🔄 Spring IoC Container 동작 과정

### 1. 구성 메타데이터 읽기

**XML, Annotation 등**

---

### 2. POJOs 읽기

**Plain Old Java Objects**

---

### 3. Bean 생성

**Spring IoC Container에서 Bean 생성**

---

### 4. 시스템 구성

**Bean들을 통해 시스템 사용 가능**

---

## 🔧 ApplicationContext 상속 인터페이스

### EnvironmentCapable

**환경 설정 처리**

---

### ListableBeanFactory

**빈 리스트 처리**

**동일 타입 빈 여러 개 List로 주입**

---

### HierarchicalBeanFactory

**BeanFactory 간 계층(부모-자식) 관계 설정**

---

### MessageSource

**메시지 국제화**

---

### ApplicationEventPublisher

**이벤트 발행**

---

### ResourcePatternResolver

**설정 정보 처리**

---

## 📦 Bean 저장소

**key:** 빈 이름

**value:** 실제 빈 객체

**싱글톤으로 관리 (싱글톤 컨테이너)**

---

## 🔄 Bean 요청 시 처리 과정

### 1. Bean 목록 생성

**@Configuration 클래스 설정 정보 등록**

**@Bean 메서드 이름으로 Bean 목록 생성**

---

### 2. 클라이언트 Bean 요청

---

### 3. Bean 목록에서 검색

**ApplicationContext가 Bean 목록에서 이름 검색**

---

### 4. Bean 생성 및 반환

**설정 클래스로부터 Bean 생성 요청**

**Reflection API 이용**

**생성된 Bean 반환**

---

## ✅ ApplicationContext 장점

### 1. 구체적인 팩토리 클래스 알 필요 없음

**팩토리 클래스 증가해도 일관된 방식으로 Bean 획득**

**클라이언트는 어떤 팩토리 접근할지 몰라도 됨**

---

### 2. 종합 IoC 서비스 제공

**객체 생성과 관계 설정**

**객체 생성 방식과 시점 및 전략 다양화**

**후처리, 정보 조합, 인터셉트 등**

---

### 3. 다양한 빈 검색 방법 제공

**의존성 검색 (Dependency Lookup)**

**이름, 타입, 어노테이션으로 빈 검색**

---

## ❓ 면접 질문 예시

### Q1. ApplicationContext란 무엇인가요?

**답변:**
ApplicationContext는 빈들의 생성과 의존성 주입 등의 역할을 하는 DI 컨테이너이자 스프링 컨테이너입니다. BeanFactory를 상속받아 구현되었으며, Bean 생성뿐만 아니라 설정 정보를 이용한 Bean 간 관계 설정과 제어 작업을 총괄합니다.

### Q2. BeanFactory와 ApplicationContext의 차이는?

**답변:**
BeanFactory는 Bean 생성과 관계 설정을 담당하는 Spring의 최상위 인터페이스이자 IoC 컨테이너의 기본 요소입니다. ApplicationContext는 BeanFactory를 상속받아 구현되었으며, Bean 생성 외에도 메시지 국제화, 이벤트 발행, 설정 정보 처리 등 추가 기능을 제공합니다.

### Q3. ApplicationContext의 Bean 요청 처리 과정은?

**답변:**
첫째, 서비스 실행 시 @Configuration 클래스를 설정 정보로 등록하고 @Bean 메서드 이름으로 Bean 목록을 생성합니다. 둘째, 클라이언트가 Bean을 요청합니다. 셋째, ApplicationContext가 Bean 목록에서 요청한 이름을 검색합니다. 넷째, 설정 클래스로부터 Bean 생성을 요청하고 Reflection API를 이용하여 생성된 Bean을 반환합니다.

### Q4. ApplicationContext의 장점은?

**답변:**
첫째, 클라이언트는 구체적인 팩토리 클래스를 알 필요 없이 일관된 방식으로 Bean을 획득할 수 있습니다. 둘째, 객체 생성과 관계 설정뿐만 아니라 객체 생성 방식과 시점, 후처리, 인터셉트 등 종합 IoC 서비스를 제공합니다. 셋째, 이름, 타입, 어노테이션 등 다양한 방법으로 빈을 검색할 수 있습니다.

### Q5. ApplicationContext는 어떤 인터페이스를 상속받나요?

**답변:**
ApplicationContext는 EnvironmentCapable(환경 설정), ListableBeanFactory(빈 리스트 처리), HierarchicalBeanFactory(계층 관계 설정), MessageSource(메시지 국제화), ApplicationEventPublisher(이벤트 발행), ResourcePatternResolver(설정 정보 처리) 등을 상속받습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [spring_ApplicationContext.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Spring/spring_ApplicationContext.md)
- 내용: ApplicationContext, BeanFactory, Spring IoC Container

### 추가 학습 자료

- [ApplicationContext에 대해 알아보자](https://velog.io/@gehwan96/Spring-Boot-ApplicationContext%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90)
- [애플리케이션 컨텍스트와 스프링의 싱글톤](https://mangkyu.tistory.com/151)
- [ApplicationContext와 빈팩토리](https://mangkyu.tistory.com/210)
- [스프링 컨테이너](https://velog.io/@max9106/Spring-ApplicationContext)