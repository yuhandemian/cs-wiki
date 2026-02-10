---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites:
- IoC-DI
- Spring-Framework
related:
- DI-Autowired
- IoC-DI
- ApplicationContext
sources: 1
subtopic: Dependency Injection & @Autowired
tags:
- dependency-injection
- spring-autowired
- inversion-of-control
- solid-principles
- spring-di
---

# Dependency Injection & @Autowired (의존성 주입)

## 📝 DI (Dependency Injection)

**객체 간 의존성을 약한 결합도로 만들어주는 설계 원칙**

**Spring 관점:**
- 클래스 간 의존관계를 Spring 컨테이너가 자동으로 연결
- 객체는 의존성 관리를 신경쓰지 않고 독립적으로 동작

---

## 💡 왜 결합도를 낮춰야 하나?

### 1. 재사용성 (Reusability)

**의존성을 외부에서 주입 → 객체 독립적 동작**

**예:** DB 연결 객체를 다른 DB에 재사용

---

### 2. 유지보수성 (Maintainability)

**결합도 낮음 → 변경 영향 범위 제한**

**예:** 데이터 소스 변경 시 해당 객체만 수정

---

### 3. 테스트 용이성 (Testability)

**모의 객체(Mocking) 주입 가능**

**예:** 테스트 환경에서 Mock 객체로 테스트

---

### 4. 확장성 (Scalability)

**새 기능 추가 시 해당 객체만 수정**

**예:** 새 알림 방법 추가 시 알림 객체만 수정

---

### 5. 관리 용이성 (Manageability)

**의존성 중앙 관리 가능**

**DI 컨테이너로 객체 생성과 의존성 설정 분리**

---

## 🎯 SOLID 원칙

**객체 지향 프로그래밍의 5가지 설계 원칙**

### 1. SRP (Single Responsibility Principle)

**단일 책임 원칙**

**클래스는 하나의 책임만**

---

### 2. OCP (Open-Closed Principle)

**개방-폐쇄 원칙**

**확장에는 열려있고, 수정에는 닫혀있어야**

---

### 3. LSP (Liskov Substitution Principle)

**리스코프 치환 원칙**

**상위 타입 객체는 하위 타입 객체로 대체 가능**

---

### 4. ISP (Interface Segregation Principle)

**인터페이스 분리 원칙**

**클라이언트는 사용하지 않는 메서드에 의존 금지**

---

### 5. DIP (Dependency Inversion Principle)

**의존성 역전 원칙**

**추상화에 의존, 구체화에 의존 금지**

---

## 🔧 @Autowired란?

**Spring에서 제공하는 의존성 주입 기능**

**Spring 컨텍스트에 등록된 Bean 객체 간 의존성 자동 주입**

---

## ❌ @Autowired 미사용 예시

```java
public class UserService {
    private UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public void saveUser(User user) {
        userRepository.saveUser(user);
    }
}
```

**문제점:**
- UserService가 UserRepository에 강하게 결합
- 유연성, 테스트 용이성 감소
- 다른 구현체로 변경 시 코드 수정 필요

---

### SOLID 원칙 위배

#### SRP 위배
- UserService가 사용자 저장 + UserRepository 인스턴스 생성 책임

#### OCP 위배
- 구체적 구현체에 직접 의존
- 구현체 변경 시 코드 수정 필요

#### LSP 위배
- 인터페이스가 아닌 구체적 구현체에 의존

#### ISP 위배
- 필요 없는 기능에도 의존 가능

#### DIP 위배
- 고수준 모듈이 저수준 모듈에 직접 의존

---

## ✅ @Autowired 사용 예시

```java
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public void saveUser(User user) {
        userRepository.save(user);
    }
}
```

**장점:**
✅ UserRepository 인스턴스 자동 생성 및 주입
✅ 의존성 명시 불필요
✅ 구현체 변경 시 코드 수정 불필요
✅ 유연성과 테스트 용이성 향상

---

### SOLID 원칙 준수

#### SRP 준수
- UserService는 사용자 저장 책임만

#### OCP 준수
- 구현체 변경 시 UserService 수정 불필요

#### LSP 준수
- 인터페이스에 의존, 어떤 구현체든 사용 가능

#### ISP 준수
- 필요한 메서드만 사용

#### DIP 준수
- 추상화된 인터페이스에 의존

---

## 💉 @Autowired 주입 방법

### 1. 생성자 주입 (Constructor Injection) ⭐

```java
public class UserService {
    private final UserRepository userRepository;
    
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

**특징:**
- 클래스 인스턴스화 시 모든 필수 의존성 주입
- 생성자 호출 시점에 딱 1번만 호출
- 생성자 1개만 있으면 @Autowired 생략 가능
- 불변성(Immutability) 강조

**장점:**
✅ 필수 의존성 강제 주입 → 객체 일관성 보장
✅ 의존성 변경에 유연
✅ 코드 가독성 높음
✅ 테스트 용이 (Mock 객체 주입 쉬움)

**단점:**
❌ 의존성 많으면 파라미터 개수 증가
❌ 매번 모든 의존성 주입 → 코드 중복 가능

---

### 2. 수정자 주입 (Setter Injection)

```java
public class UserService {
    private UserRepository userRepository;
    
    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

**특징:**
- Spring 컨테이너가 세터 메서드 호출하여 주입
- 생성자 주입 다음으로 이루어짐
- 선택적 의존성에 유용

**장점:**
✅ 선택적 의존성에 유연

**단점:**
❌ 외부에서 의존성 변경 어려움
❌ 세터 메서드 노출 → 객체 일관성 해칠 가능성
❌ 가독성 낮음

---

### 3. 필드 주입 (Field Injection)

```java
public class UserService {
    @Autowired
    private UserRepository userRepository;
    
    public void saveUser(User user) {
        userRepository.save(user);
    }
}
```

**특징:**
- Spring 컨테이너가 필드에 직접 접근하여 주입
- 필드를 `private`로 지정 가능 → 캡슐화 유지
- 코드 간결

**장점:**
✅ 코드 간결하고 읽기 쉬움
✅ 캡슐화 유지

**단점:**
❌ 외부에서 의존성 변경 어려움
❌ 선택적이 아닌 경우에도 `null` 가능
❌ 의존성 관계 파악 어려움

---

## 🏆 결론: 생성자 주입을 선택하라!

### 이유 1: 불변

**대부분의 의존관계는 변경할 일 없음**

**수정자 주입:**
- set 메서드를 public으로 열어둬야 함
- 실수로 변경 가능
- 좋은 설계 아님

**생성자 주입:**
- 객체 생성 때 딱 1번만 호출
- 불변하게 설계 가능

---

### 이유 2: 누락

**순수 Java 코드 단위 테스트 시**

**생성자 주입:**
- 주입 데이터 누락 시 `컴파일 오류` 발생
- IDE에서 바로 필수 주입 값 확인 가능

---

### 이유 3: final 키워드

**생성자 주입만 final 키워드 사용 가능**

**장점:**
- 생성자에서 값 설정 안 되면 컴파일 시점에 오류
- 수정자 주입은 생성자 호출 이후 → final 불가

---

### 💎 컴파일 오류가 세상에서 가장 빠르고 좋은 오류다!!

**권장:**
- 생성자 주입을 기본으로 사용
- 필수 값 아닌 경우 수정자 주입 옵션으로 부여
- 생성자 주입과 수정자 주입 동시 사용 가능

---

## ❓ 면접 질문 예시

### Q1. @Autowired 애노테이션은 무엇이며 어떻게 작동하나요?

**답변:**
@Autowired는 Spring 프레임워크에서 제공하는 의존성 주입 기능입니다. Spring 컨텍스트에 등록된 Bean 객체들 사이에서 의존성을 자동으로 주입하기 위해 사용됩니다. Spring은 @Autowired를 사용하여 의존성을 갖는 객체를 찾아서 해당 객체를 자동으로 생성하고 주입해줍니다.

### Q2. 의존성 주입을 사용하는 이유는?

**답변:**
의존성 주입을 사용하면 1) 재사용성: 객체를 독립적으로 재사용 가능, 2) 유지보수성: 변경 영향 범위 제한, 3) 테스트 용이성: Mock 객체 주입 가능, 4) 확장성: 새 기능 추가 시 해당 객체만 수정, 5) 관리 용이성: 의존성 중앙 관리 가능 등의 장점이 있습니다.

### Q3. @Autowired의 주입 방식과 차이점은?

**답변:**
1) 생성자 주입: 클래스 인스턴스화 시 모든 필수 의존성 주입, 불변성 보장, final 키워드 사용 가능
2) 수정자 주입: 세터 메서드로 주입, 선택적 의존성에 유용
3) 필드 주입: 필드에 직접 주입, 코드 간결하지만 테스트 어려움
생성자 주입이 가장 권장됩니다.

### Q4. 생성자 주입을 권장하는 이유는?

**답변:**
1) 불변: 대부분의 의존관계는 변경할 일이 없으며, 생성자 주입은 객체 생성 때 딱 1번만 호출되어 불변하게 설계 가능합니다.
2) 누락: 주입 데이터 누락 시 컴파일 오류가 발생하여 IDE에서 바로 확인 가능합니다.
3) final 키워드: 생성자 주입만 final 키워드 사용 가능하여 컴파일 시점에 오류를 막아줍니다.

### Q5. SOLID 원칙이란?

**답변:**
SOLID는 객체 지향 프로그래밍의 5가지 설계 원칙입니다.
1) SRP: 단일 책임 원칙 - 클래스는 하나의 책임만
2) OCP: 개방-폐쇄 원칙 - 확장에는 열려있고 수정에는 닫혀있어야
3) LSP: 리스코프 치환 원칙 - 상위 타입 객체는 하위 타입으로 대체 가능
4) ISP: 인터페이스 분리 원칙 - 사용하지 않는 메서드에 의존 금지
5) DIP: 의존성 역전 원칙 - 추상화에 의존, 구체화에 의존 금지

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [spring_@Autowired.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Spring/spring_@Autowired.md)
- 내용: DI, SOLID, @Autowired, 주입 방법

### 추가 학습 자료

- [Life with Coding](https://life-with-coding.tistory.com/433)
- [M42 Orion](https://m42-orion.tistory.com/100)
- [DevLog](https://devlog-wjdrbs96.tistory.com/166)