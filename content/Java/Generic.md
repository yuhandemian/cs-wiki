---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Generic
tags: []
---

# Generic (제네릭)

## 📝 개념 정의

**클래스나 메서드를 일반화된 타입 매개 변수로 선언하는 기법**

**핵심:**
- 모든 종류의 타입을 다룰 수 있도록 일반화
- C++ 템플릿과 유사
- 컴파일 시점에 타입 안정성 보장

---

## 🔤 타입 매개변수 관례

| 타입 | 설명 |
|------|------|
| **`<T>`** | Type |
| **`<E>`** | Element |
| **`<K>`** | Key |
| **`<V>`** | Value |
| **`<N>`** | Number |

---

## 📐 Generic 선언

### 클래스 및 인터페이스

```java
public class ClassName&lt;T&gt; { ... }
public interface InterfaceName&lt;T&gt; { ... }
```

---

### 타입 2개

```java
public class ClassName&lt;T, K&gt; { ... }

// HashMap
public class HashMap&lt;K, V&gt; { ... }
```

---

### 객체 생성

```java
public class MyClass&lt;T, K&gt; { ... }

public class Main {
    public static void main(String[] args) {
        MyClass&lt;String, Integer&gt; a = new MyClass<>();
    }
}
```

**주의:**
❌ Primitive Type 불가 (int, double, char)
✅ Reference Type만 가능 (Integer, Double, String)

---

## 💻 Generic 클래스 예시

```java
class MyClass&lt;K, V&gt; {
    private K first;
    private V second;
    
    void set(K first, V second) {
        this.first = first;
        this.second = second;
    }
    
    K getFirst() {
        return first;
    }
    
    V getSecond() {
        return second;
    }
}

// 사용
MyClass&lt;String, Integer&gt; a = new MyClass<>();
a.set("hi", 10);

System.out.println(a.getFirst());   // hi
System.out.println(a.getSecond());  // 10
```

---

## 🔧 Generic 메서드

### 선언

```java
public <T> T genericMethod(T o) {
    return o;
}

[접근제어자] <제네릭타입> [반환타입] [메서드명] ([제네릭타입] [파라미터]) {
    ...
}
```

**특징:**
- 반환타입 이전에 `<>` 제네릭 타입 선언
- 클래스 제네릭과 독립적

---

### 예시

```java
class MyClass&lt;E&gt; {
    private E element;
    
    void set(E element) {
        this.element = element;
    }
    
    E get() {
        return element;
    }
    
    // 제네릭 메서드
    <T> T genericMethod(T o) {
        return o;
    }
}

// 사용
MyClass&lt;String&gt; a = new MyClass<>();
a.set("10");

System.out.println(a.get());  // 10 (String)

// 제네릭 메서드는 파라미터 타입에 따라 결정
System.out.println(a.genericMethod(3).getClass().getName());  // Integer
System.out.println(a.genericMethod("ABCD").getClass().getName());  // String
```

---

## 🔒 static 메서드와 Generic

### 문제

```java
class ErrorClass&lt;E&gt; {
    static E genericMethod(E o) {  // ❌ 에러!
        return o;
    }
}
```

**이유:**
- static 메서드는 객체 생성 전에 메모리에 올라감
- E 타입을 어디서 얻을 수 없음

---

### 해결

```java
class MyClass&lt;E&gt; {
    // 제네릭 메서드로 선언
    static <E> E genericMethod(E o) {
        return o;
    }
}

// 사용
MyClass.genericMethod(3);  // Integer
MyClass.genericMethod("ABCD");  // String
```

**핵심:**
✅ 제네릭 메서드의 타입은 지역변수처럼 사용
✅ 메서드 호출 시 타입 지정

---

## 🎯 제한된 Generic

### extends (상한 경계)

**T와 T의 자손 타입만 가능**

```java
<K extends T>
<? extends T>
```

**예시:**
```java
class Food {}
class Fruit extends Food {}
class Apple extends Fruit {}

<T extends Fruit>  // Fruit, Apple만 가능
<T extends Food>   // Food, Fruit, Apple 가능
```

---

### super (하한 경계)

**T와 T의 부모 타입만 가능**

```java
<? super T>
```

**예시:**
```java
<? super Fruit>  // Fruit, Food만 가능
<? super Apple>  // Apple, Fruit, Food 가능
```

**주의:**
❌ `<T super T>` 존재하지 않음!

---

## 🌟 와일드 카드

### Unbounded Wildcard

```java
<?>  // 모든 타입 가능
```

**특징:**
- Unknown Type (Any Type 아님)
- 타입보다 사용 방법이 중요할 때

---

### Bounded Wildcard

```java
<? extends T>  // T와 T의 자손
<? super T>    // T와 T의 부모
```

---

## 🆚 `<T extends T>` vs `<? extends T>`

| 특징 | `<T extends T>` | `<? extends T>` |
|------|-----------------|-----------------|
| **타입 지정** | 특정 타입으로 지정 | 타입 미지정 |
| **사용** | 클래스 선언 | 메서드 파라미터 |
| **목적** | 타입 제한 | 유연한 사용 |

---

## 💡 PECS 원칙

**Producer Extends, Consumer Super**

### Producer (생산자)

**외부에서 데이터 생산 → extends**

```java
public void addAll(Collection&lt;? extends E&gt; c) {
    // c에서 데이터를 읽어옴 (생산)
}
```

---

### Consumer (소비자)

**외부에서 데이터 소모 → super**

```java
public void copyTo(Collection&lt;? super E&gt; dest) {
    // dest에 데이터를 씀 (소비)
}
```

---

## 🔍 Type Erasure (타입 소거)

**컴파일 시 타입 검사 후 런타임 시 타입 삭제**

```java
// 컴파일 전
List&lt;String&gt; list = new ArrayList<>();

// 컴파일 후 (런타임)
List list = new ArrayList();
```

**목적:**
✅ 컴파일 시 안정성 보장
✅ 하위 호환성 유지

---

## ✅ Generic 장점

### 1. 컴파일 시점 타입 체크

**잘못된 타입 방지**

```java
List&lt;String&gt; list = new ArrayList<>();
list.add("hello");
// list.add(123);  // ❌ 컴파일 에러
```

---

### 2. 타입 변환 불필요

**명시적 캐스팅 제거**

```java
// Generic 없이
List list = new ArrayList();
list.add("hello");
String str = (String) list.get(0);  // 캐스팅 필요

// Generic 사용
List&lt;String&gt; list = new ArrayList<>();
list.add("hello");
String str = list.get(0);  // 캐스팅 불필요
```

---

### 3. 코드 재사용성

**비슷한 기능 통합**

```java
// Generic 없이
class IntegerBox {
    private Integer value;
}
class StringBox {
    private String value;
}

// Generic 사용
class Box&lt;T&gt; {
    private T value;
}
```

---

## ❓ 면접 질문 예시

### Q1. Generic이란 무엇인가요?

**답변:**
클래스나 메서드를 일반화된 타입 매개 변수로 선언하는 기법입니다. 모든 종류의 타입을 다룰 수 있도록 일반화하여 컴파일 시점에 타입 안정성을 보장하고, 타입 변환을 제거하며, 코드 재사용성을 높입니다.

### Q2. Generic의 장점은?

**답변:**
1) 컴파일 시점에 타입을 체크하여 잘못된 타입 방지
2) 명시적 타입 변환 불필요
3) 비슷한 기능을 통합하여 코드 재사용성 향상

### Q3. Object를 사용하지 않고 Generic을 사용하는 이유는?

**답변:**
Object를 사용하면 모든 타입을 받을 수 있지만 타입 안정성이 보장되지 않고 명시적 캐스팅이 필요합니다. Generic을 사용하면 컴파일 시점에 타입을 체크하여 런타임 에러를 방지하고 캐스팅 없이 사용할 수 있습니다.

### Q4. `<T extends T>`와 `<? extends T>`의 차이는?

**답변:**
`<T extends T>`는 클래스 선언 시 사용하며 T를 특정 타입으로 지정합니다. `<? extends T>`는 메서드 파라미터에 사용하며 타입이 지정되지 않아 더 유연합니다. 전자는 타입 제한, 후자는 유연한 사용이 목적입니다.

### Q5. `<T super T>` 문법이 존재하지 않는 이유는?

**답변:**
Type Erasure로 Object로 변환되기 때문에 T는 결국 Object와 다르지 않습니다. 또한 타입 파라미터는 클래스와 인터페이스를 가리지 않아 T가 어떤 타입인지 모호해집니다. 예를 들어 `<T super HashMap>`에서 T는 AbstractMap, Map, Cloneable, Serializable, Object가 모두 올 수 있어 특정할 수 없습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [java_generic.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Java/java_generic.md)
- 내용: Generic 개념, 클래스/메서드, extends/super, 와일드카드

### 추가 학습 자료

- [명품자바에센셜](http://www.yes24.com/Product/Goods/63041975)
- [자바[Java] - 제너릭(Generic)의 이해](https://st-lab.tistory.com/153)
- [[Java] Generic에 대한 관찰 - 2](https://velog.io/@kasania/Java-Generic%EC%97%90-%EB%8C%80%ED%95%9C-%EA%B4%80%EC%B0%B0-2)