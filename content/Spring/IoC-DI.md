---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: high
prerequisites:
- Spring-Framework
related:
- DI-Autowired
- IoC-DI
- ApplicationContext
sources: 1
subtopic: IoC와 DI
tags:
- inversion-of-control
- dependency-injection
- spring-di
- constructor-injection
---

# IoC & DI

## 📝 개념 정의

### IoC (Inversion of Control)

**제어의 역전 - 객체의 생성과 관리를 개발자가 아닌 프레임워크가 담당**

### DI (Dependency Injection)

**의존성 주입 - 외부에서 의존성을 주입받는 방식**

**관계:**
- DI는 IoC를 구현하는 방법 중 하나
- IoC는 개념, DI는 구현 기법

---

## 🎯 등장 배경

### Spring vs EJB

**공통 목표:**
- 로우 레벨 기술에 신경 쓰지 않고
- 비즈니스 로직에 집중

**차이점:**
- **EJB**: 제어를 코드에 침투적으로 반영
- **Spring**: 제어와 비즈니스 로직 분리

---

## 🔄 IoC (Inversion of Control)

### 기존 방식 (개발자가 제어)

```java
public class A {
    private B b;
    
    public A() {
        b = new B();  // 개발자가 직접 생성
    }
}
```

**특징:**
- 개발자가 객체 생성
- 개발자가 생명주기 관리
- A는 B에 강하게 의존

### Spring 방식 (프레임워크가 제어)

```java
public class A {
    @Autowired
    private B b;  // Spring이 주입
}
```

**특징:**
- Spring이 객체 생성
- Spring이 생명주기 관리
- 결합도 낮음

---

## 💉 DI (Dependency Injection)

### 의존성이란?

```java
public class A {
    private B b;  // A는 B에 의존
}
```

**"A는 B에 의존한다"**
- A가 B를 사용
- B 없이 A 동작 불가

### DI의 장점

✅ **결합도 감소**
- 인터페이스 기반 개발
- 구현체 교체 용이

✅ **테스트 용이**
- Mock 객체 주입 가능
- 단위 테스트 간편

✅ **코드 재사용성**
- 객체 재활용
- 유지보수 향상

---

## 🛠️ DI 3가지 방법

### 1. Field Injection

**가장 흔한 방법**

```java
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public UserService() {}
}
```

**장점:**
✅ 코드 간결

**단점:**
❌ 테스트 어려움
❌ 순환 참조 감지 어려움
❌ 불변성 보장 불가

---

### 2. Setter Injection

**선택적 의존성에 유용**

```java
@Service
public class UserService {
    private UserRepository userRepository;
    
    public UserService() {}
    
    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

**장점:**
✅ 선택적 의존성 주입 가능
✅ 런타임에 의존성 변경 가능

**단점:**
❌ 불변성 보장 불가
❌ NullPointerException 위험

---

### 3. ⭐ Constructor Injection (권장)

**Spring 공식 권장 방법**

```java
@Service
public class UserService {
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

**Lombok 활용:**
```java
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
}
```

**장점:**
✅ **불변성 보장** (final 사용)
✅ **순환 참조 방지** (컴파일 시점 감지)
✅ **테스트 용이** (생성자로 Mock 주입)
✅ **필수 의존성 명확**

**단점:**
❌ 코드 길이 증가 (Lombok으로 해결)

---

## 📊 DI 방법 비교

| 특징 | Field | Setter | Constructor |
|------|-------|--------|-------------|
| **불변성** | X | X | O |
| **순환 참조** | 런타임 | 런타임 | 컴파일 |
| **테스트** | 어려움 | 보통 | 쉬움 |
| **코드 간결성** | 높음 | 보통 | 낮음 |
| **권장도** | ❌ | △ | ✅ |

---

## 💡 IoC Container

### 역할

**Spring IoC Container:**
- Bean 생성
- Bean 관리
- Bean 주입

### 주요 구현체

**1. BeanFactory:**
- 기본 IoC Container
- Lazy Loading

**2. ApplicationContext:**
- BeanFactory 확장
- Eager Loading
- 이벤트 발행
- 국제화 지원

```java
ApplicationContext context = 
    new AnnotationConfigApplicationContext(AppConfig.class);
    
UserService userService = context.getBean(UserService.class);
```

---

## 🔍 Bean 등록 방법

### 1. Component Scan

```java
@Component
@Service
@Repository
@Controller
public class MyClass {
    // ...
}
```

### 2. Java Config

```java
@Configuration
public class AppConfig {
    @Bean
    public UserService userService() {
        return new UserService(userRepository());
    }
    
    @Bean
    public UserRepository userRepository() {
        return new UserRepositoryImpl();
    }
}
```

### 3. XML Config (레거시)

```xml
<bean id="userService" class="com.example.UserService">
    <constructor-arg ref="userRepository"/>
</bean>
```

---

## ❓ 면접 질문 예시

### Q1. IoC란 무엇인가요?

**답변:**
Inversion of Control의 약자로 제어의 역전을 의미합니다. 객체의 생성과 생명주기 관리를 개발자가 아닌 프레임워크가 담당하는 것입니다. 이를 통해 개발자는 비즈니스 로직에 집중할 수 있고, 객체 간 결합도를 낮출 수 있습니다.

### Q2. DI란 무엇이고 왜 사용하나요?

**답변:**
Dependency Injection의 약자로 외부에서 의존성을 주입받는 방식입니다. 객체 간 결합도를 낮추고, 테스트가 용이하며, 코드 재사용성을 높일 수 있습니다. 또한 인터페이스 기반 개발로 구현체를 쉽게 교체할 수 있습니다.

### Q3. DI의 3가지 방법과 권장 방법은?

**답변:**
Field Injection, Setter Injection, Constructor Injection이 있습니다. Spring은 Constructor Injection을 권장합니다. 이유는 불변성을 보장하고(final 사용), 순환 참조를 컴파일 시점에 감지하며, 테스트가 용이하고, 필수 의존성을 명확히 할 수 있기 때문입니다.

### Q4. IoC와 DI의 차이는?

**답변:**
IoC는 제어의 역전이라는 개념이고, DI는 IoC를 구현하는 구체적인 방법 중 하나입니다. IoC는 프레임워크가 객체를 관리한다는 큰 개념이고, DI는 외부에서 의존성을 주입한다는 구현 기법입니다.

### Q5. Constructor Injection이 Field Injection보다 좋은 이유는?

**답변:**
1) final 키워드로 불변성을 보장할 수 있습니다.
2) 순환 참조를 컴파일 시점에 감지할 수 있습니다.
3) 생성자로 Mock 객체를 주입하여 테스트가 용이합니다.
4) 필수 의존성이 명확하여 NullPointerException을 방지할 수 있습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/spring/spring_psa_ioc_aop_pojo.md`
- 내용: IoC, DI, DI 3가지 방법

### 추가 학습 자료

- [[TI/SPRING] IOC, DI 정의/장점](https://isoomni.tistory.com/entry/TISPRING-IOC-DI-정의-장점)
- [[Spring DI/IoC] IoC? DI? 그게 뭔데?](https://velog.io/@ohzzi/Spring-DIIoC-IoC-DI-그게-뭔데)