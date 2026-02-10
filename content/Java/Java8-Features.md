---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Java 8 Features
tags: []
---

# Java 8 Features (자바 8의 특징)

## 📝 주요 특징 5가지

1. Lambda Expression (람다 표현식)
2. Functional Interface (함수형 인터페이스)
3. Default Method (디폴트 메소드)
4. Stream API (스트림)
5. Optional (옵셔널)

---

## 🔀 Lambda Expression

**메서드로 전달할 수 있는 익명 함수를 단순한 문법으로 표기**

```java
// 기존
new Thread(new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello");
    }
}).start();

// Lambda
new Thread(() -> System.out.println("Hello")).start();
```

---

## 🔧 Functional Interface

**추상 메서드가 오직 하나인 인터페이스**

**특징:**
- 여러 개의 default/static 메소드 가능
- `@FunctionalInterface` 어노테이션으로 규칙 강제

```java
@FunctionalInterface
public interface Math {
    public int calc(int first, int second);
}

// 사용
Math plusLambda = (first, second) -> first + second;
System.out.println(plusLambda.calc(4, 2)); // 6
```

---

## 🎨 Default Method

**인터페이스 내에서 구현 가능한 메소드**

**이전 버전:**
- 인터페이스 내 추상 메소드만 선언 가능

**Java 8:**
- static, default 메소드 구현 가능

```java
public interface MyInterface {
    // 추상 메소드
    void abstractMethod();
    
    // default 메소드
    default void defaultMethod() {
        System.out.println("Default Method");
    }
    
    // static 메소드
    static void staticMethod() {
        System.out.println("Static Method");
    }
}
```

---

## 🌊 Stream API

**컬렉션과 배열의 데이터 처리를 도와주는 기술**

### 이전 방식

```java
List&lt;String&gt; list = Arrays.asList("a", "b", "c");
for (String s : list) {
    System.out.println(s.toUpperCase());
}
```

---

### Stream 방식

```java
List&lt;String&gt; list = Arrays.asList("a", "b", "c");
list.stream()
    .map(String::toUpperCase)
    .forEach(System.out::println);
```

---

### Stream 장점

#### 1. 코드 간결

**로직이 명확하게 드러남**

---

#### 2. 병렬 처리 가능

```java
list.parallelStream()
    .map(String::toUpperCase)
    .forEach(System.out::println);
```

---

### Stream 문제점

**이전 방식:**
- for/for-each 문으로 데이터 가공
- 로직 복잡 시 코드 양 증가
- 로직 섞임 → 이해 어려움

**Stream 해결:**
- 선언적 코드
- 가독성 향상
- 병렬 처리 지원

---

## 📦 Optional

**NullPointerException 방지를 위한 클래스**

**= null 대신 사용하는 래퍼 클래스**

---

### Optional 개념

**"존재할 수도 있지만 안 할 수도 있는 객체"**

**= null이 될 수도 있는 객체를 감싸는 래퍼**

---

### Optional 장점

✅ NPE 유발 null 직접 다루지 않음
✅ null 체크 직접 하지 않아도 됨

---

### Optional 객체 생성

#### 1. empty()

**null을 담고 있는 객체**

```java
Optional&lt;Member&gt; maybeMember = Optional.empty();
```

---

#### 2. of()

**null이 아닌 객체**

```java
Optional&lt;Member&gt; maybeMember = Optional.of(aMember);
```

**주의:**
- null 넘어오면 NPE 발생

---

#### 3. ofNullable()

**null인지 아닌지 모르는 객체**

```java
Optional&lt;Member&gt; maybeMember = Optional.ofNullable(aMember);
Optional&lt;Member&gt; maybeNotMember = Optional.ofNullable(null);
```

---

### Optional 값 접근

#### get()

**비어있으면 NoSuchElementException**

---

#### orElse(T other)

**비어있으면 인자 반환**

```java
String name = optional.orElse("Default");
```

---

#### orElseGet(Supplier&lt;? extends T&gt; other)

**비어있으면 Supplier 실행 결과 반환**

```java
String name = optional.orElseGet(() -> "Default");
```

---

#### orElseThrow(Supplier&lt;? extends X&gt; exceptionSupplier)

**비어있으면 예외 발생**

```java
String name = optional.orElseThrow(() -> new IllegalArgumentException());
```

---

### Optional 잘못된 사용

#### ❌ isPresent() 사용

```java
Optional&lt;String&gt; maybeText = Optional.ofNullable(text);
int length;
if (maybeText.isPresent()) {
    length = maybeText.get().length();
} else {
    length = 0;
}
```

**문제:**
- null 체크와 동일
- Optional 사용 의미 없음

---

#### ✅ 올바른 사용

```java
int length = Optional.ofNullable(text)
    .map(String::length)
    .orElse(0);
```

**목적:**
- null 처리를 Optional 클래스에 위임

---

## 🖥️ JVM 변화

### Java 7 이전

```
Heap
├── Young Generation
├── Old Generation
└── Permanent Generation (PermGen)
    ├── Class 메타데이터
    ├── Method 메타데이터
    ├── static 객체/상수
    ├── 상수화된 String
    └── JIT 최적화 정보
```

**문제:**
- PermGen 고정 크기
- 메타데이터 증가 → OOM (Out Of Memory Error)

---

### Java 8

```
Heap
├── Young Generation
├── Old Generation
└── static 객체/상수, String (이동)

Native Memory
└── Metaspace (신규)
    ├── Class 메타데이터
    ├── Method 메타데이터
    └── JIT 최적화 정보
```

---

### 변경 사항

#### Metaspace에 저장

- Class 메타데이터
- Method 메타데이터
- Class 관련 배열 객체 메타데이터
- JIT 최적화 정보

---

#### Heap에 저장

- static 객체/상수
- 상수화된 String

---

### 개선 효과

✅ **Heap 저장 데이터 → GC 대상**
✅ **Native 영역 → OS 레벨 관리**
✅ **자동 크기 조절**
✅ **메모리 영역 상한 크게 인식 불필요**

---

## ❓ 면접 질문 예시

### Q1. Java 8의 주요 특징은?

**답변:**
Java 8의 주요 특징은 1) Lambda Expression: 익명 함수를 간결하게 표현, 2) Functional Interface: 추상 메소드가 하나인 인터페이스, 3) Default Method: 인터페이스 내 구현 가능, 4) Stream API: 컬렉션 데이터 처리 지원, 5) Optional: NullPointerException 방지입니다.

### Q2. Stream API의 장점은?

**답변:**
Stream API는 컬렉션과 배열의 데이터 처리를 도와주는 기술입니다. 장점으로는 1) 코드가 간결하고 로직이 명확하게 드러남, 2) 병렬 처리가 가능하여 성능 향상, 3) 선언적 코드로 가독성 향상이 있습니다. 이전 방식의 for문 반복과 로직 섞임 문제를 해결합니다.

### Q3. Optional을 사용하는 이유는?

**답변:**
Optional은 NullPointerException을 방지하기 위한 클래스입니다. null이 될 수도 있는 객체를 감싸는 래퍼 클래스로, NPE를 유발할 수 있는 null을 직접 다루지 않아도 되고 null 체크를 직접 하지 않아도 됩니다. null 처리를 Optional 클래스에 위임하여 코드를 간결하게 만들 수 있습니다.

### Q4. Java 8에서 JVM이 어떻게 변경되었나요?

**답변:**
Java 8에서 PermGen이 삭제되고 Native Memory에 Metaspace가 추가되었습니다. Class/Method 메타데이터는 Metaspace로, static 객체와 상수화된 String은 Heap으로 이동했습니다. 이로 인해 Heap 데이터는 GC 대상이 되고, Native 영역은 OS 레벨에서 자동으로 크기를 조절하여 OOM 문제가 개선되었습니다.

### Q5. Optional의 잘못된 사용 예시는?

**답변:**
isPresent()로 null 체크 후 get()으로 값을 가져오는 방식은 잘못된 사용입니다. 이는 기존 null 체크와 동일하여 Optional을 사용하는 의미가 없습니다. 대신 map(), orElse(), orElseGet() 등을 사용하여 null 처리를 Optional 클래스에 위임해야 합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/java/java_eight_characteristic.md`
- 내용: Java 8 특징, Lambda, Stream, Optional, JVM 변화

### 추가 학습 자료

- [Java 8의 주요 변경 사항과 실무 적용 포인트](https://bbubbush.tistory.com/23)
- [JVM의 Java8 에서의 변화](https://becomeweasel.tistory.com/entry/JVM%EC%9D%98-Java-8%EC%97%90%EC%84%9C%EC%9D%98-%EB%B3%80%ED%99%94)
- [자바8 Optional 2부: null을 대하는 새로운 방법](https://www.daleseo.com/java8-optional-after/)