---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites:
- DI-Autowired
- ApplicationContext
related:
- DI-Autowired
- ApplicationContext
- IoC-DI
sources: 1
subtopic: Bean Scope
tags:
- bean-scope
- singleton-scope
- prototype-scope
- web-scope
- dependency-injection
---

# Bean Scope (빈 스코프)

## 📝 Spring Bean이란?

**Spring IoC 컨테이너에 등록된 Java 객체**

**Java Bean과는 다름**

---

### Bean 등록 방법

#### 1. 클래스 레벨 Annotation

```java
@Component
public class MyBean {
    ...
}
```

---

#### 2. Configuration 정의

```java
@Configuration
public class MyConfig {
    @Bean
    public MyBean myBean() {
        return new MyBean();
    }
}
```

---

#### 3. XML 파일 설정

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans ...>
    ...
</beans>
```

---

## 🔍 Bean Scope 종류

### 1. Singleton

**디폴트 Spring Bean Scope**

**싱글톤으로 관리**

---

### 2. Prototype

**빈 요청할 때마다 새로운 빈 객체 생성**

---

### 3. Web Scope

**웹에서만 동작하는 빈 스코프**

#### Request

**클라이언트 요청마다 새로운 빈 객체 생성**

**Use-case:** 로그 남긴 요청 확인

---

#### Session

**HTTP Session과 같은 생명주기**

---

#### Application

**서블릿 컨텍스트와 같은 생명주기**

---

#### WebSocket

**웹 소켓과 같은 생명주기**

---

## ⚠️ 문제 상황

**Singleton 빈이 Prototype 빈을 포함하는 경우**

```java
@Component
public class MySingletonBean {
    private final MyPrototypeBean prototypeBean;
    
    @Autowired
    MySingletonBean(MyPrototypeBean prototypeBean) {
        this.prototypeBean = prototypeBean;
    }
    
    public MyPrototypeBean getPrototypeBean() {
        return prototypeBean;
    }
}

@Component
@Scope(value = "prototype")
public class MyPrototypeBean {
    ...
}
```

---

### 문제점

**Singleton 빈 생성 시점에 주입이 끝난 상태**

**→ 항상 같은 인스턴스 반환**

**→ Prototype 의미 없음**

---

## 🔧 해결 방법 3가지

### 1. Dependency Lookup (원초적)

**ApplicationContext를 주입받아 사용**

```java
@Component
public class MySingletonBean {
    private final ApplicationContext applicationContext;
    
    @Autowired
    MySingletonBean(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }
    
    public MyPrototypeBean getPrototypeBean() {
        return applicationContext.getBean(MyPrototypeBean.class);
    }
}
```

**문제점:**
❌ Spring 컨테이너에 종속적
❌ 확장성 저하

---

### 2. ObjectProvider 주입

**Dependency Lookup을 제공하는 인터페이스**

```java
@Component
public class MySingletonBean {
    private final ObjectProvider&lt;MyPrototypeBean&gt; objectProvider;
    
    @Autowired
    MySingletonBean(ObjectProvider&lt;MyPrototypeBean&gt; objectProvider) {
        this.objectProvider = objectProvider;
    }
    
    public MyPrototypeBean getPrototypeBean() {
        return objectProvider.getObject();
    }
}
```

**문제점:**
❌ 여전히 Spring 컨테이너에 종속적
❌ Web Scope에서 동작 안 함

---

### 3. Proxy (권장)

**@Scope에 proxyMode 속성 추가**

```java
@Component
@Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class MyPrototypeBean {
    public void printBeans() {
        System.out.println("prototype: " + this);
    }
}
```

---

### Proxy 동작 원리

**CGLIB 바이트 코드 조작 라이브러리 사용**

**가짜 객체를 만들어두고 요청 시마다 진짜 클래스 반환**

---

### Proxy 장점

✅ Spring 컨테이너 종속성 제거
✅ Web Scope에서도 동작
✅ 테스트 용이

---

## 📊 해결 방법 비교

| 방법 | Spring 종속 | Web Scope | 권장 |
|------|------------|-----------|------|
| **ApplicationContext** | O | X | X |
| **ObjectProvider** | O | X | △ |
| **Proxy** | X | O | ✅ |

---

## ❓ 면접 질문 예시

### Q1. Spring Bean이란 무엇인가요?

**답변:**
Spring Bean은 Spring IoC 컨테이너에 등록된 Java 객체입니다. Java Bean과는 다르며, @Component 클래스 레벨 어노테이션, @Configuration에서 @Bean 정의, XML 파일 설정 등의 방법으로 IoC 컨테이너에 등록할 수 있습니다.

### Q2. Bean Scope의 종류는?

**답변:**
1) Singleton: 디폴트 스코프로 싱글톤으로 관리됩니다.
2) Prototype: 빈을 요청할 때마다 새로운 빈 객체를 생성합니다.
3) Web Scope: Request(클라이언트 요청마다), Session(HTTP Session 생명주기), Application(서블릿 컨텍스트 생명주기), WebSocket(웹 소켓 생명주기)이 있습니다.

### Q3. Singleton 빈이 Prototype 빈을 포함할 때 문제점은?

**답변:**
Singleton 빈 생성 시점에 Prototype 빈의 주입이 끝난 상태가 되어 항상 같은 인스턴스를 반환하게 됩니다. 이는 Prototype의 의미가 없어지는 문제입니다. 해결 방법으로는 ApplicationContext 주입, ObjectProvider 주입, Proxy 모드 설정이 있으며, Proxy 모드가 가장 권장됩니다.

### Q4. Proxy 모드는 어떻게 동작하나요?

**답변:**
Proxy 모드는 @Scope 어노테이션에 proxyMode 속성을 추가하여 설정합니다. Spring 컨테이너가 CGLIB 바이트 코드 조작 라이브러리를 사용하여 해당 클래스를 상속받은 가짜 객체를 만들어두고, 요청이 올 때마다 진짜 클래스를 반환해줍니다.

### Q5. Proxy 모드의 장점은?

**답변:**
1) Spring 컨테이너에 대한 종속성을 제거할 수 있습니다.
2) Web Scope에서도 동작합니다. 예를 들어 Request 스코프 빈을 테스트할 때 웹 요청 없이도 테스트가 가능합니다.
3) 테스트 용이성이 향상됩니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [spring_bean_scope.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Spring/spring_bean_scope.md)
- 내용: Bean Scope, Singleton, Prototype, Proxy

### 추가 학습 자료

- [Spring 공식 문서 - Bean Scopes](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html)