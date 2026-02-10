---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 2
subtopic: Spring Framework 기본
tags: []
---

# Spring Framework

## 📝 개념 정의

**자바 기반의 엔터프라이즈 애플리케이션 개발을 위한 오픈소스 프레임워크**입니다.

**핵심:**
- POJO 기반 개발
- DI, IoC, AOP 지원
- 비즈니스 로직에 집중

---

## 🎯 Spring의 탄생 배경

### EJB의 문제점

**EJB (Enterprise Java Bean):**
- 엔터프라이즈 개발을 단순화하기 위해 Sun사에서 만든 스펙
- 복잡하고 제한적인 기술
- 환경에 종속적인 코드

**EJB 코드 예시:**

```java
import javax.ejb.*;

public class OrdersService implements SessionBean {
    private SessionContext ctx;  // EJB 종속
    
    public Orders placeOrder(String menuName) {
        Orders orders = new Orders(menuName);
        orders.init();
        return orders;
    }
    
    @Override
    public void setSessionContext(SessionContext ctx) {
        this.ctx = ctx;
    }
    
    // EJB 필수 메서드들...
}
```

**문제:**
- 변수, 예외처리, 상속 모두 EJB에 의존
- 비즈니스 로직과 기술이 혼재

---

## 💡 POJO (Plain Old Java Object)

### 개념

**다른 환경에 종속되지 않고, 필요에 따라 재사용 가능한 자바 오브젝트**

**마틴 파울러의 제안:**
- 복잡하고 제한적인 기술보다 자바의 단순 오브젝트 사용
- 비즈니스 로직을 빠르고 효과적으로 구현

### POJO를 지키기 위한 Spring의 3대 요소

```
┌─────────────────────────┐
│         POJO            │
│   (비즈니스 로직)         │
└───────────┬─────────────┘
            │
    ┌───────┴───────┐
    │               │
┌───▼───┐      ┌───▼───┐
│  IoC  │      │  AOP  │
│  DI   │      │       │
└───┬───┘      └───┬───┘
    │              │
    └──────┬───────┘
           │
       ┌───▼───┐
       │  PSA  │
       └───────┘
```

---

## 🔑 Spring의 3대 핵심 기술

### 1. IoC (Inversion of Control)

**개념:** 제어의 역전 - 객체의 생성과 관리를 프레임워크가 담당

**기존 방식:**
```java
public class A {
    private B b;
    
    public A() {
        b = new B();  // 개발자가 직접 생성
    }
}
```

**Spring 방식:**
```java
public class A {
    @Autowired
    private B b;  // Spring이 주입
}
```

---

### 2. DI (Dependency Injection)

**개념:** 외부에서 의존성을 주입

#### DI 3가지 방법

**1. Field Injection:**
```java
@Service
public class A {
    @Autowired
    private B b;
}
```

**2. Setter Injection:**
```java
@Service
public class A {
    private B b;
    
    @Autowired
    public void setB(B b) {
        this.b = b;
    }
}
```

**3. Constructor Injection (권장):**
```java
@Service
public class A {
    private final B b;
    
    public A(B b) {
        this.b = b;
    }
}
```

---

### 3. AOP (Aspect Oriented Programming)

**개념:** 관점 지향 프로그래밍 - 횡단 관심사를 모듈화

**목적:**
- OOP의 단점 보완
- 중복 코드 제거
- 유지보수성 향상

**횡단 관심사 (Cross-cutting Concerns):**
- 로깅
- 보안
- 트랜잭션
- 예외 처리

**예시:**
```java
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore() {
        System.out.println("메서드 실행 전 로깅");
    }
}
```

---

## 🔄 PSA (Portable Service Abstraction)

### 개념

**휴대용 서비스 추상화 - 비즈니스 로직 수정 없이 서비스 교체 가능**

**핵심:**
- 서비스 내용을 몰라도 사용 가능
- 구현체 교체 용이

### Spring이 제공하는 PSA

#### 1. Spring Web MVC

**기존 Servlet 방식:**
```java
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        // 복잡한 코드...
    }
}
```

**Spring 방식:**
```java
@Controller
public class MyController {
    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }
}
```

#### 2. Spring Transaction

**기존 방식:**
```java
connection.setAutoCommit(false);
try {
    // 비즈니스 로직
    connection.commit();
} catch (Exception e) {
    connection.rollback();
}
```

**Spring 방식:**
```java
@Transactional
public void businessLogic() {
    // 비즈니스 로직만 작성
}
```

**구현체 교체:**
- JDBC: `DatasourceTransactionManager`
- JPA: `JpaTransactionManager`
- Hibernate: `HibernateTransactionManager`

#### 3. Spring Cache

**사용:**
```java
@Cacheable("users")
public User getUser(Long id) {
    return userRepository.findById(id);
}
```

**구현체 교체:**
- `JCacheManager`
- `ConcurrentMapCacheManager`
- `EhCacheCacheManager`

---

## 🆚 Spring vs Spring Boot

### Spring의 특징

**장점:**
✅ DI, IoC, AOP 지원
✅ 유연한 설정
✅ 강력한 기능

**단점:**
❌ 복잡한 설정
❌ 의존성 버전 관리 어려움
❌ Tomcat 별도 설치 필요

### Spring Boot의 특징

**1. Embed Tomcat:**
- Tomcat 내장
- JAR로 간편 배포

**2. Starter Dependency:**
- 의존성 자동화
- 호환 버전 자동 관리

**3. Auto Configuration:**
- 사전 정의된 라이브러리 자동 Bean 등록

### 결론

**Spring Boot = Spring + 편의 기능**

---

## ❓ 면접 질문 예시

### Q1. Spring Framework란 무엇인가요?

**답변:**
자바 기반의 엔터프라이즈 애플리케이션 개발을 위한 오픈소스 프레임워크입니다. POJO 기반 개발을 지원하며, IoC, DI, AOP를 핵심 기술로 제공하여 비즈니스 로직에 집중할 수 있게 합니다.

### Q2. POJO란 무엇인가요?

**답변:**
Plain Old Java Object의 약자로, 다른 환경에 종속되지 않고 필요에 따라 재사용 가능한 자바 오브젝트를 의미합니다. EJB처럼 특정 기술에 종속되지 않고 순수 자바 객체로 비즈니스 로직을 구현하는 것을 말합니다.

### Q3. PSA란 무엇이고 왜 사용하나요?

**답변:**
Portable Service Abstraction으로, 서비스를 추상화하여 비즈니스 로직 수정 없이 구현체를 교체할 수 있게 합니다. 예를 들어, JDBC에서 JPA로 변경하거나 Tomcat에서 Netty로 변경해도 비즈니스 로직은 영향을 받지 않습니다. 개발자는 추상화된 인터페이스만 사용하면 됩니다.

### Q4. Spring과 Spring Boot의 차이는?

**답변:**
Spring Boot는 Spring을 더 쉽게 사용할 수 있도록 만든 프레임워크입니다. Embed Tomcat으로 별도 설치 없이 JAR로 배포 가능하고, Starter를 통해 의존성을 자동 관리하며, Auto Configuration으로 설정을 자동화합니다. Spring Boot는 Spring의 복잡한 설정을 간소화한 버전입니다.

### Q5. Spring의 3대 핵심 기술을 설명해주세요.

**답변:**
1) IoC (Inversion of Control): 객체의 생성과 관리를 프레임워크가 담당합니다.
2) DI (Dependency Injection): 외부에서 의존성을 주입하여 결합도를 낮춥니다.
3) AOP (Aspect Oriented Programming): 횡단 관심사를 모듈화하여 중복 코드를 제거합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [spring_psa_ioc_aop_pojo.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Spring/spring_psa_ioc_aop_pojo.md)
- 링크: [spring vs spring boot.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Spring/spring%20vs%20spring%20boot.md)
- 내용: POJO, PSA, IoC, DI, AOP, Spring vs Spring Boot

### 추가 학습 자료

- [[Spring] POJO 프로그래밍과 스프링 프레임워크의 탄생](https://mangkyu.tistory.com/281)
- [[Spring Boot] Spring PSA](https://ch4njun.tistory.com/270)