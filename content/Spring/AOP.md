---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: AOP
tags: []
---

# AOP (Aspect Oriented Programming)

## 📝 개념 정의

**관점 지향 프로그래밍 - 횡단 관심사를 모듈화하는 프로그래밍 패러다임**

**핵심:**
- OOP의 단점 보완
- 중복 코드 제거
- 관심사의 분리

---

## 🎯 등장 배경

### OOP의 한계

**OOP의 장점:**
- 프로그램 모듈화
- 코드 재사용
- 중복 제거

**OOP의 문제:**
- 프로그램이 커지면서 **모듈 내 중복 코드 발생**
- 여러 클래스에 흩어진 공통 기능
- 유지보수 어려움

**예시:**
```java
public class UserService {
    public void createUser() {
        System.out.println("로그: createUser 시작");  // 중복
        // 비즈니스 로직
        System.out.println("로그: createUser 종료");  // 중복
    }
}

public class OrderService {
    public void createOrder() {
        System.out.println("로그: createOrder 시작");  // 중복
        // 비즈니스 로직
        System.out.println("로그: createOrder 종료");  // 중복
    }
}
```

---

## 🔍 횡단 관심사 (Cross-cutting Concerns)

### 개념

**여러 모듈을 횡단하면서 존재하는 공통 기능**

### 대표적인 횡단 관심사

**1. 로깅 (Logging)**
- 메서드 실행 전후 로그
- 예외 발생 시 로그

**2. 보안 (Security)**
- 인증/인가 체크
- 권한 검증

**3. 트랜잭션 (Transaction)**
- 트랜잭션 시작/커밋/롤백

**4. 예외 처리 (Exception Handling)**
- 공통 예외 처리

**5. 성능 측정 (Performance)**
- 메서드 실행 시간 측정

---

## 💡 AOP의 목적

**횡단 관심사를 모듈화하여:**
✅ 중복 코드 제거
✅ 비즈니스 로직과 부가 기능 분리
✅ 유지보수성 향상
✅ 코드 가독성 향상

---

## 🏗️ AOP 주요 개념

### 1. Aspect

**횡단 관심사를 모듈화한 것**

```java
@Aspect
@Component
public class LoggingAspect {
    // Aspect 구현
}
```

### 2. Join Point

**Aspect가 적용될 수 있는 지점**
- 메서드 실행
- 생성자 호출
- 필드 접근

### 3. Pointcut

**Join Point 중 실제로 Aspect를 적용할 지점**

```java
@Pointcut("execution(* com.example.service.*.*(..))")
public void serviceLayer() {}
```

### 4. Advice

**Aspect가 Join Point에서 수행할 동작**

**종류:**
- `@Before`: 메서드 실행 전
- `@After`: 메서드 실행 후
- `@AfterReturning`: 정상 반환 후
- `@AfterThrowing`: 예외 발생 후
- `@Around`: 메서드 실행 전후

### 5. Weaving

**Aspect를 대상 객체에 적용하는 과정**

---

## 💻 AOP 구현 예시

### 1. 로깅 Aspect

```java
@Aspect
@Component
public class LoggingAspect {
    
    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("메서드 실행 전: " + joinPoint.getSignature().getName());
    }
    
    @AfterReturning(
        pointcut = "execution(* com.example.service.*.*(..))",
        returning = "result"
    )
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        System.out.println("메서드 실행 후: " + joinPoint.getSignature().getName());
        System.out.println("반환값: " + result);
    }
}
```

### 2. 성능 측정 Aspect

```java
@Aspect
@Component
public class PerformanceAspect {
    
    @Around("execution(* com.example.service.*.*(..))")
    public Object measureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        
        Object result = joinPoint.proceed();  // 메서드 실행
        
        long end = System.currentTimeMillis();
        System.out.println(joinPoint.getSignature().getName() + 
                          " 실행 시간: " + (end - start) + "ms");
        
        return result;
    }
}
```

### 3. 트랜잭션 Aspect (Spring 제공)

```java
@Service
public class UserService {
    
    @Transactional  // AOP로 구현됨
    public void createUser(User user) {
        // 비즈니스 로직만 작성
        userRepository.save(user);
    }
}
```

---

## 📐 Pointcut 표현식

### 기본 문법

```
execution(modifiers? return-type declaring-type?method-name(param) throws?)
```

### 예시

```java
// 모든 public 메서드
@Pointcut("execution(public * *(..))")

// service 패키지의 모든 메서드
@Pointcut("execution(* com.example.service.*.*(..))")

// UserService의 모든 메서드
@Pointcut("execution(* com.example.service.UserService.*(..))")

// create로 시작하는 메서드
@Pointcut("execution(* create*(..))")

// 파라미터가 없는 메서드
@Pointcut("execution(* *())")

// 파라미터가 1개인 메서드
@Pointcut("execution(* *(*))") 

// 특정 어노테이션이 붙은 메서드
@Pointcut("@annotation(org.springframework.transaction.annotation.Transactional)")
```

---

## 🔄 AOP 동작 원리

### Proxy 패턴

**Spring AOP는 Proxy 기반**

```
Client → Proxy → Target Object
          ↓
       Aspect 적용
```

**동작:**
1. Client가 메서드 호출
2. Proxy가 요청 가로채기
3. Aspect 로직 실행
4. Target 메서드 실행
5. Aspect 로직 실행
6. 결과 반환

---

## 📊 AOP vs OOP

| 특징 | OOP | AOP |
|------|-----|-----|
| **관점** | 객체 | 관심사 |
| **목적** | 모듈화 | 횡단 관심사 모듈화 |
| **단위** | 클래스 | Aspect |
| **관계** | 기본 패러다임 | OOP 보완 |

---

## ❓ 면접 질문 예시

### Q1. AOP란 무엇인가요?

**답변:**
Aspect Oriented Programming의 약자로 관점 지향 프로그래밍을 의미합니다. 횡단 관심사를 모듈화하여 OOP의 단점을 보완하는 패러다임입니다. 로깅, 보안, 트랜잭션 등 여러 모듈에 공통으로 적용되는 기능을 분리하여 중복 코드를 제거하고 유지보수성을 향상시킵니다.

### Q2. 횡단 관심사란 무엇인가요?

**답변:**
여러 모듈을 횡단하면서 존재하는 공통 기능을 말합니다. 대표적으로 로깅, 보안, 트랜잭션, 예외 처리, 성능 측정 등이 있습니다. 이러한 기능들은 비즈니스 로직과 별개로 여러 클래스에 중복되어 나타나므로 AOP로 모듈화하여 관리합니다.

### Q3. AOP의 주요 개념을 설명해주세요.

**답변:**
1) Aspect: 횡단 관심사를 모듈화한 것
2) Join Point: Aspect가 적용될 수 있는 지점
3) Pointcut: 실제로 Aspect를 적용할 지점
4) Advice: Aspect가 수행할 동작 (@Before, @After, @Around 등)
5) Weaving: Aspect를 대상 객체에 적용하는 과정

### Q4. Spring AOP의 동작 원리는?

**답변:**
Spring AOP는 Proxy 패턴을 기반으로 동작합니다. Client가 메서드를 호출하면 Proxy가 요청을 가로채서 Aspect 로직을 실행한 후 Target 메서드를 실행하고, 다시 Aspect 로직을 실행한 뒤 결과를 반환합니다. 이를 통해 비즈니스 로직과 부가 기능을 분리할 수 있습니다.

### Q5. @Transactional은 어떻게 동작하나요?

**답변:**
@Transactional은 AOP로 구현되어 있습니다. 메서드 실행 전에 트랜잭션을 시작하고, 정상 종료 시 커밋, 예외 발생 시 롤백을 자동으로 처리합니다. 개발자는 비즈니스 로직만 작성하면 되고, 트랜잭션 관리는 AOP가 담당합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [spring_psa_ioc_aop_pojo.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Spring/spring_psa_ioc_aop_pojo.md)
- 내용: AOP 개념, 횡단 관심사

### 추가 학습 자료

- [Aspect Oriented Programming(관점지향프로그래밍) 소개](https://3months.tistory.com/74)