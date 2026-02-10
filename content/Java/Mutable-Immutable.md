---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Mutable & Immutable
tags: []
---

# Mutable & Immutable (가변 & 불변)

## 📝 개념 정의

### Immutable (불변) 객체

**객체 생성 이후 상태가 바뀌지 않는 객체**

**종류:**
- String
- Boolean, Integer, Float, Long (Wrapper 타입)

---

### Mutable (가변) 객체

**객체 생성 이후 상태가 변경 가능한 객체**

**종류:**
- StringBuilder, StringBuffer
- ArrayList, HashMap
- 일반 사용자 정의 클래스

---

## 🤔 String은 정말 불변일까?

```java
String name = "정윤";
name = "jeongyoon";

System.out.println(name);  // jeongyoon
```

**변경된 것처럼 보이지만...**

❌ 객체 값이 변경된 것이 아님
✅ 새로운 객체 생성 + 참조값 변경

---

## 💡 불변 객체를 사용하는 이유

### 1. 단순함

**생성 시점부터 파괴 시점까지 상태 유지**

---

### 2. Thread Safety (스레드 안전성)

**동기화 문제 해결**

- Multi-thread 환경에서 동기화 문제 = 공유 자원 동시 쓰기
- 불변 객체는 항상 동일한 값 반환
- 동기화 처리 없이 객체 공유 가능

---

### 3. 값 변경 방지

**예기치 않은 값 변경 차단**

---

### 4. 방어적 복사 불필요

**불변 객체를 필드로 사용 시**

---

## 📊 String vs StringBuilder vs StringBuffer

| 특징 | String | StringBuilder | StringBuffer |
|------|--------|---------------|--------------|
| **가변성** | Immutable | Mutable | Mutable |
| **동기화** | - | X | O |
| **속도** | 느림 | 빠름 | 보통 |
| **사용** | 변경 적음 | 단일 스레드 | 멀티 스레드 |

---

### String (Immutable)

**ReadOnly - 읽기만 가능**

```java
String str = "Hello";
str += " World";  // 새 객체 생성
```

---

### StringBuilder (Mutable)

**단일 스레드 환경**

```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");  // 같은 객체 수정
```

---

### StringBuffer (Mutable)

**멀티 스레드 환경 - synchronized**

```java
StringBuffer sb = new StringBuffer("Hello");
sb.append(" World");  // 동기화 보장
```

---

## 🔨 불변 객체 구현 방법

### 1. Setter 제거

**상태 변경 메서드 사용 안 함**

```java
public class Person {
    private final String name;
    
    public Person(String name) {
        this.name = name;
    }
    
    public String getName() {
        return name;
    }
    
    // ❌ setName() 없음
}
```

---

### 2. final 클래스

**상속 방지**

```java
public final class ImmutableClass {
    // ...
}
```

---

### 3. 모든 필드 private final

```java
public final class Person {
    private final String name;
    private final int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

---

### 4. 가변 컴포넌트 접근 차단

**방어적 복사 사용**

---

## 🛡️ 방어적 복사 (Defensive Copy)

### 개념

**생성자 인자나 getter에서 객체 복사본 반환**

---

### 방어적 복사 없을 때

```java
public class Names {
    private final List&lt;Name&gt; names;
    
    public Names(List&lt;Name&gt; names) {
        this.names = names;  // 주소 공유
    }
}

// 사용
List&lt;Name&gt; originalNames = new ArrayList<>();
originalNames.add(new Name("judy"));

Names crewNames = new Names(originalNames);
originalNames.add(new Name("neo"));  // crewNames도 변경됨!
```

---

### 방어적 복사 적용

```java
public class Names {
    private final List&lt;Name&gt; names;
    
    public Names(List&lt;Name&gt; names) {
        // 방어적 복사
        this.names = new ArrayList<>(names);
    }
}

// 사용
List&lt;Name&gt; originalNames = new ArrayList<>();
originalNames.add(new Name("judy"));

Names crewNames = new Names(originalNames);
originalNames.add(new Name("neo"));  // crewNames는 변경 안 됨!
```

---

## ⚠️ 방어적 복사의 한계

### 얕은 복사 (Shallow Copy)

**컬렉션 주소만 변경, 내부 요소는 주소 공유**

```java
List&lt;Name&gt; names = new ArrayList<>();
names.add(new Name("judy"));

Names baseNames = new Names(names);
List&lt;Name&gt; getNames = baseNames.getNames();

// 내부 요소 변경 가능
getNames.get(0).setName("neo");  // baseNames도 변경됨!
```

**해결:**
✅ 내부 요소도 불변으로 만들기

---

## 🔒 final의 한계

### reference 타입/collection은 final이어도 불변 아님

```java
public class Names {
    private final List&lt;Name&gt; names;
    
    public List&lt;Name&gt; getNames() {
        return names;  // 주소 반환
    }
}

// 사용
List&lt;Name&gt; getNames = baseNames.getNames();
getNames.add(new Name("hash"));  // baseNames도 변경됨!
```

---

## 💊 해결 방법

### 1. Getter에서도 방어적 복사

```java
public List&lt;Name&gt; getNames() {
    return new ArrayList<>(names);
}
```

---

### 2. Unmodifiable Collection

```java
public List&lt;Name&gt; getNames() {
    return Collections.unmodifiableList(names);
}

// 사용
List&lt;Name&gt; getNames = baseNames.getNames();
getNames.add(new Name("hash"));  // UnsupportedOperationException
```

---

## 📋 방어적 복사 vs Unmodifiable Collection

| 특징 | 방어적 복사 | Unmodifiable |
|------|-------------|--------------|
| **방식** | 복사본 반환 | 읽기 전용 뷰 |
| **수정 시도** | 원본 영향 X | 예외 발생 |
| **메모리** | 추가 사용 | 효율적 |
| **사용** | 생성자 | Getter |

---

## 🎯 사용 가이드

### 생성자 인자로 객체 받을 때

**방어적 복사 사용**

```java
public Names(List&lt;Name&gt; names) {
    this.names = new ArrayList<>(names);
}
```

---

### Getter로 객체 리턴할 때

**방어적 복사 또는 Unmodifiable 선택**

```java
// 방어적 복사
public List&lt;Name&gt; getNames() {
    return new ArrayList<>(names);
}

// Unmodifiable
public List&lt;Name&gt; getNames() {
    return Collections.unmodifiableList(names);
}
```

---

## ❓ 면접 질문 예시

### Q1. Mutable 객체와 Immutable 객체의 차이는?

**답변:**
Mutable 객체는 객체 생성 이후 상태가 변경 가능한 객체이고, Immutable 객체는 객체 생성 이후 상태가 바뀌지 않는 객체입니다. String, Boolean, Integer 등은 Immutable이고, StringBuilder, ArrayList 등은 Mutable입니다.

### Q2. 불변 객체를 사용하는 이유는?

**답변:**
1) 단순함: 생성 시점부터 파괴 시점까지 상태 유지
2) Thread Safety: Multi-thread 환경에서 동기화 처리 없이 객체 공유 가능
3) 값 변경 방지: 예기치 않은 값 변경 차단
4) 방어적 복사 불필요: 불변 객체를 필드로 사용 시 안전

### Q3. String, StringBuilder, StringBuffer의 차이는?

**답변:**
String은 Immutable 객체로 변경 시 새 객체를 생성합니다. StringBuilder는 Mutable 객체로 단일 스레드 환경에서 사용하며 빠릅니다. StringBuffer는 Mutable 객체로 synchronized 키워드로 멀티 스레드 환경에서 동기화를 보장하지만 속도가 느립니다.

### Q4. 방어적 복사와 Unmodifiable Collection의 차이는?

**답변:**
방어적 복사는 생성자나 getter에서 객체의 복사본을 반환하여 외부 변경으로부터 보호합니다. Unmodifiable Collection은 읽기 전용 뷰를 반환하여 수정 시도 시 예외를 발생시킵니다. 방어적 복사는 주로 생성자에서, Unmodifiable은 getter에서 사용합니다.

### Q5. 방어적 복사를 사용하면 항상 불변성을 보장하나요?

**답변:**
아니요. 방어적 복사는 얕은 복사로 컬렉션의 주소만 바뀌고 내부 요소들은 여전히 주소를 공유합니다. 원본의 내부 요소를 바꾸면 복사본도 바뀌게 됩니다. 완전한 불변성을 보장하려면 내부 요소들도 불변이어야 합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [java_mutable_immutable.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Java/java_mutable_immutable.md)
- 내용: Mutable/Immutable, String/StringBuilder/StringBuffer, 방어적 복사

### 추가 학습 자료

- [[Tecoble] 방어적 복사와 Unmodifiable Collection](https://tecoble.techcourse.co.kr/post/2021-04-26-defensive-copy-vs-unmodifiable/)
- [이펙티브 자바 아이템 17] 변경 가능성을 최소화하라