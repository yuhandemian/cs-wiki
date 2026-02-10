---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: equals & hashCode
tags: []
---

# equals & hashCode

## 📝 java.lang 패키지

**자바 프로그래밍의 가장 기본 패키지**

**특징:** import문 없이 사용 가능

**포함 클래스:** Object, String, StringBuffer, StringBuilder, Math, Wrapper

---

## 🔑 Object 클래스

**모든 클래스의 최고 조상**

**특징:**
- 멤버 변수 없음
- 11개 메서드만 보유
- 모든 인스턴스가 가져야 할 기본 기능

---

## ⚖️ equals(Object obj)

**객체의 참조변수를 비교하여 boolean 값 반환**

### Object 클래스의 equals

```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

**기본 동작:** 참조변수의 값(주소값)으로 판단

**결과:** 서로 다른 두 객체는 항상 false

---

### equals 오버라이딩

**목적:** 주소가 아닌 객체 내용 비교

```java
class Person {
    long id;
    
    @Override
    public boolean equals(Object obj) {
        if(obj instanceof Person) {
            return id == ((Person) obj).id;
        } else
            return false;
    }
    
    Person(long id) {
        this.id = id;
    }
}
```

**결과:** 서로 다른 인스턴스라도 같은 id면 true

---

### String 클래스의 equals

**String도 equals를 오버라이딩함**

**동작:** 문자열 값을 비교

**결과:** 같은 내용의 문자열이면 항상 true

---

## 🔢 hashCode()

**해싱 기법에 사용되는 해시 함수 구현**

**해싱:** 다량의 데이터를 저장하고 검색하는 기법

**해시 함수:** 값을 입력하면 저장 위치(해시코드) 반환

---

### Object 클래스의 hashCode

**객체의 주소값을 int 값으로 변환하여 해시코드 생성**

**32 bit JVM:** 서로 다른 두 객체는 같은 해시코드 불가

**64 bit JVM:** 8 byte 주소 → 4 byte 해시코드 → 중복 가능

---

### hashCode 오버라이딩

**인스턴스 변수 값으로 객체를 판단하려면:**

✅ equals 메서드 오버라이딩
✅ hashCode 메서드도 오버라이딩 필요

**이유:** 같은 객체라면 해시코드도 같아야 함

---

### String 클래스의 hashCode

```java
String str1 = new String("hello");
String str2 = new String("hello");

System.out.println(str1.hashCode()); // 12345
System.out.println(str2.hashCode()); // 12345
```

**문자열 내용이 같으면 동일한 해시코드 반환**

---

## 🤝 equals와 hashCode를 같이 재정의해야 하는 이유

### equals만 재정의할 경우

```java
public class Product {
    private final String name;

    public Product(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(name, product.name);
    }
}
```

---

### List 사용 시

```java
List&lt;Product&gt; products = new ArrayList<>();
products.add(new Product("아메리카노"));
products.add(new Product("아메리카노"));

System.out.println(products.size()); // 2
```

**예상대로 2 출력**

---

### HashSet 사용 시

```java
Set&lt;Product&gt; products = new HashSet<>();
products.add(new Product("아메리카노"));
products.add(new Product("아메리카노"));

System.out.println(products.size()); // 2 (예상: 1)
```

**문제:** 중복 제거 안 됨!

**예상:** 1 출력

**실제:** 2 출력

---

## ⚠️ 문제 발생 이유

### Hash Collection의 비교 과정

```
1. hashCode() 리턴 값 비교
   ↓ 일치
2. equals() 리턴 값 비교
   ↓ true
3. 같은 객체로 판단
```

**두 조건 모두 만족해야 같은 객체!**

---

### Product 클래스의 문제

**hashCode 미정의 → Object의 hashCode 사용**

**Object의 hashCode:** 객체의 고유 주소 값 사용

**결과:** 객체마다 다른 해시코드 반환

**equals 비교 전에 이미 다른 객체로 판단!**

---

## ✅ 해결 방안: hashCode 오버라이딩

```java
public class Product {
    private final String name;

    public Product(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(name, product.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
```

---

### Objects.hash() 메서드

**장점:** 간편하게 hashCode 재정의 가능

**단점:** 속도가 느림

**이유:**
- 인자를 담기 위한 배열 생성
- 기본 타입은 박싱/언박싱 필요

**권장:** 성능에 민감하지 않으면 사용 OK

---

## 🤔 무조건 재정의해야 할까?

**원칙:** equals 오버라이딩 시 hashCode도 재정의

**실무:**
- Hash Collection 사용 시 → 재정의 필수
- Hash Collection 미사용 시 → 요구사항에 따라 결정

**권장:** Collection 사용 시 재정의

---

## 📊 Hash Collection

**종류:** HashMap, HashSet, HashTable

**특징:** hash 값으로 객체 비교

**요구사항:**
✅ equals 오버라이딩
✅ hashCode 오버라이딩

---

## ❓ 면접 질문 예시

### Q1. equals와 hashCode를 같이 재정의해야 하는 이유는?

**답변:**
Hash Collection(HashMap, HashSet)은 객체가 논리적으로 같은지 비교할 때 1) hashCode 메서드의 리턴 값이 일치하고 2) equals 메서드의 리턴 값이 true여야 같은 객체로 판단합니다. equals만 재정의하면 Object의 hashCode가 사용되어 객체마다 다른 해시코드를 반환하므로, equals 비교 전에 이미 다른 객체로 판단됩니다.

### Q2. Object 클래스의 equals 메서드는 어떻게 동작하나요?

**답변:**
Object 클래스의 equals 메서드는 두 객체의 참조변수 값(주소값)을 비교합니다. return (this == obj)로 구현되어 있어 서로 다른 두 객체를 비교하면 항상 false를 반환합니다. 객체의 내용을 비교하려면 equals 메서드를 오버라이딩해야 합니다.

### Q3. hashCode 메서드의 역할은?

**답변:**
hashCode 메서드는 해싱 기법에 사용되는 해시 함수를 구현한 것으로, 객체를 입력하면 저장 위치를 알려주는 해시코드를 반환합니다. Object 클래스의 hashCode는 객체의 주소값을 int 값으로 변환하여 반환하며, 같은 객체라면 같은 해시코드를 반환해야 합니다.

### Q4. String 클래스는 equals와 hashCode를 어떻게 구현했나요?

**답변:**
String 클래스는 equals 메서드를 오버라이딩하여 문자열의 내용을 비교하도록 구현했습니다. 같은 내용의 문자열이면 항상 true를 반환합니다. hashCode 메서드도 오버라이딩하여 문자열 내용이 같으면 동일한 해시코드를 반환하도록 구현했습니다.

### Q5. Objects.hash() 메서드의 장단점은?

**답변:**
Objects.hash() 메서드는 간편하게 hashCode를 재정의할 수 있는 장점이 있지만, 인자를 담기 위한 배열이 만들어지고 기본 타입은 박싱과 언박싱을 거쳐야 하므로 속도가 느린 단점이 있습니다. 성능에 민감하지 않은 대부분의 프로그램은 사용해도 문제없지만, 민감한 경우 직접 재정의하는 것이 좋습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [java_equals_hashcode.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Java/java_equals_hashcode.md)
- 내용: Object 클래스, equals, hashCode, Hash Collection

### 추가 학습 자료

- [자바의 정석](https://product.kyobobook.co.kr/detail/S000001550352) - 9장, 11장
- [Java 공식문서: HashMap](https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html)
- [Tecoble: equals와 hashCode는 왜 같이 재정의해야 할까?](https://tecoble.techcourse.co.kr/post/2020-07-29-equals-and-hashCode/)
- [Guide to hashCode() in Java](https://www.baeldung.com/java-hashcode)