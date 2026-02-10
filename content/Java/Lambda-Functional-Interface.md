---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 2
subtopic: Lambda & Functional Interface
tags: []
---

# Lambda & Functional Interface (람다와 함수형 인터페이스)

## 📝 Lambda Expression (람다 표현식)

**함수를 하나의 식으로 표현한 것**

**= 익명 함수 (Anonymous Function)**

---

## 🔄 기존 함수 vs Lambda

### 기존 함수

```java
public int add(int a, int b) {
    return a + b;
}
```

---

### Lambda

```java
(a, b) -> a + b
```

**특징:**
- 메소드 이름 불필요
- 괄호 `()` + 화살표 `→` 사용
- 컴파일러가 문맥으로 타입 추론

---

## 🎯 Lambda 등장 이유

### 1. 불필요한 코드 줄이기

### 2. 가독성 향상

### 3. 함수를 변수처럼 선언

---

## ✅ Lambda 특징

### 1. 지역변수는 final

**Lambda 내 사용되는 지역변수는 final이 붙지 않아도 상수로 간주**

---

### 2. 변수명 중복 불가

**Lambda로 선언된 변수명은 다른 변수명과 중복 불가**

---

## 💚 Lambda 장점

### 1. 코드 간결

**불필요한 코드 제거**

---

### 2. 가독성 향상

**개발자 의도 명확**

---

### 3. 생산성 향상

**함수 만드는 과정 없이 한 번에 처리**

---

### 4. 병렬 프로그래밍 용이

**멀티 코어 활용**

---

## ❌ Lambda 단점

### 1. 재사용 불가

**익명 함수는 재사용 불가능**

---

### 2. 디버깅 어려움

**스택 트레이스 추적 어려움**

---

### 3. 코드 중복 가능

**Lambda 남발 시 비슷한 함수 중복 생성**

---

### 4. 재귀 부적합

**재귀 호출 시 성능 저하**

---

## 🔧 Functional Interface (함수형 인터페이스)

**추상 메소드가 오직 하나인 인터페이스**

**함수를 1급 객체처럼 다룰 수 있게 해주는 어노테이션**

---

### 특징

- **단 하나의 추상 메소드**만 허용
- 여러 개의 default/static 메소드 가능
- `@FunctionalInterface` 어노테이션 사용

---

### 선언

```java
@FunctionalInterface
public interface Math {
    public int calc(int first, int second);
}
```

---

### 사용

#### Lambda 방식

```java
Math plusLambda = (first, second) -> first + second;
System.out.println(plusLambda.calc(4, 2)); // 6
```

---

#### 익명 클래스 방식

```java
Math minusLambda = new Math() {
    @Override
    public int calc(int first, int second) {
        return first - second;
    }
};
System.out.println(minusLambda.calc(4, 2)); // 2
```

---

## 📦 Java 제공 함수형 인터페이스

### 1. Supplier&lt;T&gt;

**매개변수 없이 반환값만**

```java
Supplier&lt;String&gt; supplier = () -> "Hello";
System.out.println(supplier.get()); // Hello
```

**추상 메소드:**
- `T get()`

---

### 2. Consumer&lt;T&gt;

**매개변수 있고 반환값 없음**

```java
Consumer&lt;String&gt; consumer = str -> System.out.println(str);
consumer.accept("Hello"); // Hello
```

**추상 메소드:**
- `void accept(T t)`

**추가 메소드:**
- `andThen()`: 연쇄 실행

---

### 3. Function&lt;T, R&gt;

**매개변수 T → 반환값 R**

```java
Function&lt;Integer, Integer&gt; multiply = x -> x * 2;
System.out.println(multiply.apply(5)); // 10
```

**추상 메소드:**
- `R apply(T t)`

**추가 메소드:**
- `andThen()`: 첫 번째 함수 실행 후 다음 함수
- `compose()`: 첫 번째 함수 실행 전 먼저 함수
- `identity()`: 자기 자신 반환

---

### 4. Predicate&lt;T&gt;

**매개변수 T → 반환값 boolean**

```java
Predicate&lt;Integer&gt; isPositive = x -> x > 0;
System.out.println(isPositive.test(5)); // true
```

**추상 메소드:**
- `boolean test(T t)`

**추가 메소드:**
- `and()`, `or()`, `negate()`

---

## 📊 함수형 인터페이스 비교

| 인터페이스 | 매개변수 | 반환값 | 추상 메소드 |
|-----------|---------|--------|------------|
| **Supplier&lt;T&gt;** | 없음 | T | T get() |
| **Consumer&lt;T&gt;** | T | 없음 | void accept(T) |
| **Function&lt;T,R&gt;** | T | R | R apply(T) |
| **Predicate&lt;T&gt;** | T | boolean | boolean test(T) |

---

## 🔗 Method Reference (메소드 참조)

**함수형 인터페이스를 일반 메소드로 참조**

### 조건

1. 함수형 인터페이스 매개변수 타입 = 메소드 매개변수 타입
2. 함수형 인터페이스 매개변수 개수 = 메소드 매개변수 개수
3. 함수형 인터페이스 반환형 = 메소드 반환형

---

### 일반 메소드 참조

```java
Function&lt;String, Integer&gt; function = String::length;
System.out.println(function.apply("Hello")); // 5
```

---

### Static 메소드 참조

```java
Function&lt;Integer, String&gt; function = String::valueOf;
System.out.println(function.apply(123)); // "123"
```

---

### 생성자 참조

```java
Supplier&lt;ArrayList&gt; supplier = ArrayList::new;
ArrayList list = supplier.get();
```

---

## ❓ 면접 질문 예시

### Q1. Lambda Expression이란 무엇인가요?

**답변:**
Lambda Expression은 함수를 하나의 식으로 표현한 것으로 익명 함수의 한 종류입니다. 메소드 이름이 필요 없으며 괄호와 화살표를 이용해 함수를 선언합니다. 불필요한 코드를 줄이고 가독성을 높이기 위해 등장했으며, 컴파일러가 문맥을 살펴 타입을 추론합니다.

### Q2. 함수형 인터페이스란 무엇인가요?

**답변:**
함수형 인터페이스는 추상 메소드가 오직 하나인 인터페이스를 의미합니다. 함수를 1급 객체처럼 다룰 수 있게 해주는 어노테이션으로, @FunctionalInterface를 선언하여 단 하나의 추상 메소드만을 갖도록 제한합니다. 여러 개의 default 메소드와 static 메소드가 있어도 함수형 인터페이스로 취급됩니다.

### Q3. Lambda의 장단점은?

**답변:**
장점: 1) 코드를 간결하게 만들 수 있습니다. 2) 개발자의 의도가 명확히 드러나 가독성이 높아집니다. 3) 함수를 만드는 과정 없이 한 번에 처리할 수 있어 생산성이 높아집니다. 4) 병렬 프로그래밍이 용이합니다.
단점: 1) 익명 함수는 재사용이 불가능합니다. 2) 디버깅이 어렵습니다. 3) Lambda를 남발하면 비슷한 함수가 중복 생성되어 코드가 지저분해질 수 있습니다. 4) 재귀로 만들 경우 부적합합니다.

### Q4. Java에서 제공하는 함수형 인터페이스 4가지는?

**답변:**
1) Supplier&lt;T&gt;: 매개변수 없이 반환값만 갖는 인터페이스
2) Consumer&lt;T&gt;: 매개변수 있고 반환값 없는 인터페이스
3) Function&lt;T,R&gt;: 매개변수 T를 받아 R로 반환하는 인터페이스
4) Predicate&lt;T&gt;: 매개변수 T를 받아 boolean을 반환하는 인터페이스

### Q5. Method Reference란 무엇인가요?

**답변:**
Method Reference는 함수형 인터페이스를 Lambda식이 아닌 일반 메소드를 참조시켜 선언하는 방법입니다. 클래스이름::메소드이름 형식으로 참조하며, 일반 메소드, static 메소드, 생성자를 참조할 수 있습니다. 함수형 인터페이스의 매개변수 타입/개수/반환형이 메소드와 일치해야 합니다.

---

## 📚 원본 참고 자료

### 출처 1: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/java/java_lamda_functional-interface.md`
- 내용: Lambda, Functional Interface, Method Reference

### 출처 2: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/java/java_eight_characteristic.md`
- 내용: Java 8 Lambda 특징

### 추가 학습 자료

- [MangKyu's Diary](https://mangkyu.tistory.com/113)