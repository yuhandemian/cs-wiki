---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: 객체 지향 프로그래밍
tags: []
---

# 객체 지향 프로그래밍 (OOP)

## 📝 개념 정의

**데이터를 추상화하여 상태와 행위를 가진 객체로 만들고, 객체들의 유기적인 결합과 협력으로 프로그램을 구성**하는 패러다임입니다.

**핵심:**
- 객체 = 상태(속성) + 행위(기능)
- 인간 친화적이고 직관적인 코드 작성

---

## 🎯 OOP의 장점

✅ **유연하고 변경에 용이**
- 컴퓨터 부품 교체처럼 일부만 변경 가능

✅ **인간 친화적**
- 직관적인 코드 작성

✅ **코드 재사용성**
- 반복적인 코드 최소화

---

## 🔑 OOP 4대 특징

### 1. 추상화 (Abstraction)

**개념:** 객체의 **공통적인 속성과 기능을 추출**하여 정의

**예시:** 서울 지하철 노선도
- 불필요한 사항 제거
- 공통 부분만 간단하게 표현

#### 인터페이스를 통한 추상화

```java
public interface Phone {
    void takePicture();
    void makeCall();
}

public class Galaxy implements Phone {
    @Override
    public void takePicture() {
        System.out.println("갤럭시로 사진을 찍습니다");
    }
    
    @Override
    public void makeCall() {
        System.out.println("갤럭시로 전화를 겁니다");
    }
}
```

**역할과 구현의 분리:**
- 인터페이스: 역할 정의
- 구현 클래스: 실제 동작 구현

---

### 2. 상속 (Inheritance)

**개념:** 기존 클래스를 **재활용하여 새로운 클래스 작성**

#### 상속 전

```java
public class Galaxy {
    String model;
    String color;
    int size;
    boolean isRecordingSupportive;
    
    void takePicture() { ... }
    void makeCall() { ... }
    void samsungPay() { ... }
}

public class IPhone {
    String model;  // 중복!
    String color;  // 중복!
    int size;      // 중복!
    boolean isICloudSupportive;
    
    void takePicture() { ... }  // 중복!
    void makeCall() { ... }     // 중복!
    void applePay() { ... }
}
```

#### 상속 후

```java
public class Phone {
    String model;
    String color;
    int size;
    
    void takePicture() {
        System.out.println("사진을 찍습니다");
    }
    
    void makeCall() {
        System.out.println("전화를 겁니다");
    }
}

public class Galaxy extends Phone {
    boolean isRecordingSupportive;
    
    void samsungPay() {
        System.out.println("삼성 페이로 지불합니다");
    }
}

public class IPhone extends Phone {
    boolean isICloudSupportive;
    
    @Override  // 메서드 오버라이딩
    void takePicture() {
        System.out.println("아이폰으로 사진을 찍습니다");
    }
    
    void applePay() {
        System.out.println("애플 페이로 지불합니다");
    }
}
```

**장점:**
✅ 반복 코드 제거
✅ 변경 용이 (상위 클래스만 수정)
✅ 메서드 오버라이딩으로 재정의 가능

---

### 3. 다형성 (Polymorphism)

**개념:** 객체의 속성이나 기능이 **상황에 따라 여러 형태**를 가질 수 있는 성질

#### 핵심 의미

**한 타입의 참조변수로 여러 타입의 객체 참조**

```java
// 기존 방식
Galaxy galaxy = new Galaxy();
IPhone iphone = new IPhone();

// 다형성 활용
Phone galaxy = new Galaxy();
Phone iphone = new IPhone();
```

#### 다형성의 장점

**1. 배열 활용**

```java
Phone[] phones = new Phone[2];
phones[0] = new Galaxy();
phones[1] = new IPhone();

for (Phone phone : phones) {
    phone.takePicture();  // 각자의 방식으로 동작
}
```

**2. 결합도 낮추기**

```java
// 결합도 높음 (나쁜 예)
public class Client {
    void usePhone(Galaxy galaxy) {
        galaxy.takePicture();
    }
    
    void usePhone(IPhone iphone) {
        iphone.takePicture();
    }
}

// 결합도 낮음 (좋은 예)
public class Client {
    void usePhone(Phone phone) {  // 인터페이스 사용
        phone.takePicture();
    }
}
```

**효과:**
- 매개변수 변경 시 코드 수정 불필요
- 유연하고 확장 가능한 설계

---

### 4. 캡슐화 (Encapsulation)

**개념:** 연관있는 속성과 기능을 하나의 캡슐로 만들어 **외부로부터 보호**

#### 목적

**1. 데이터 보호 (Data Protection)**
- 외부로부터 속성과 기능 보호

**2. 데이터 은닉 (Data Hiding)**
- 내부 동작 감추기
- 필요한 부분만 노출

#### 접근 제어자

| 제어자 | 같은 클래스 | 같은 패키지 | 자식 클래스 | 전체 |
|--------|-------------|-------------|-------------|------|
| **private** | O | X | X | X |
| **default** | O | O | X | X |
| **protected** | O | O | O | X |
| **public** | O | O | O | O |

#### 캡슐화 예시

**결합도 높음 (나쁜 예):**

```java
public class Galaxy {
    public void takePicture() { ... }
    public void makeCall() { ... }
    public void samsungPay() { ... }
}

public class Client {
    private Galaxy galaxy;
    
    public void usePhone() {
        galaxy.takePicture();  // Galaxy 메서드 변경 시 수정 필요
        galaxy.makeCall();
        galaxy.samsungPay();
    }
}
```

**결합도 낮음 (좋은 예):**

```java
public class Galaxy {
    private void takePicture() { ... }
    private void makeCall() { ... }
    private void samsungPay() { ... }
    
    public void operate() {  // 내부 동작 캡슐화
        takePicture();
        makeCall();
        samsungPay();
    }
}

public class Client {
    private Galaxy galaxy;
    
    public void usePhone() {
        galaxy.operate();  // 간단한 인터페이스만 노출
    }
}
```

---

## 📊 OOP 4대 특징 요약

| 특징 | 핵심 개념 | 효과 |
|------|-----------|------|
| **추상화** | 공통 속성/기능 추출 | 역할과 구현 분리 |
| **상속** | 클래스 재활용 | 코드 중복 제거 |
| **다형성** | 여러 형태 가능 | 유연성, 확장성 |
| **캡슐화** | 데이터 보호/은닉 | 결합도 낮춤 |

---

## ❓ 면접 질문 예시

### Q1. 객체 지향 프로그래밍이란 무엇인가요?

**답변:**
데이터를 추상화하여 상태와 행위를 가진 객체로 만들고, 객체들의 유기적인 결합과 협력으로 프로그램을 구성하는 패러다임입니다. 인간 친화적이고 직관적인 코드 작성이 가능하며, 유연하고 변경에 용이한 프로그램을 만들 수 있습니다.

### Q2. OOP의 4대 특징을 설명해주세요.

**답변:**
1) 추상화: 공통 속성과 기능을 추출하여 정의합니다.
2) 상속: 기존 클래스를 재활용하여 코드 중복을 제거합니다.
3) 다형성: 한 타입의 참조변수로 여러 타입의 객체를 참조할 수 있습니다.
4) 캡슐화: 데이터를 보호하고 은닉하여 외부에는 필요한 부분만 노출합니다.

### Q3. 캡슐화란 무엇인가요?

**답변:**
연관있는 속성과 기능을 하나의 캡슐로 만들어 외부로부터 보호하는 것입니다. 데이터 보호와 데이터 은닉을 목적으로 하며, 접근 제어자를 사용하여 내부 동작을 감추고 필요한 부분만 노출합니다. 이를 통해 객체 간 결합도를 낮출 수 있습니다.

### Q4. 다형성의 장점은 무엇인가요?

**답변:**
한 타입의 참조변수로 여러 타입의 객체를 참조할 수 있어 코드가 유연하고 확장 가능해집니다. 예를 들어, 인터페이스 타입의 매개변수를 사용하면 구현 클래스가 변경되어도 코드 수정이 불필요하며, 객체 간 결합도를 낮출 수 있습니다.

### Q5. 상속과 인터페이스의 차이는?

**답변:**
상속은 클래스 간 계층 관계를 만들어 코드를 재사용하며, 메서드 오버라이딩으로 재정의가 가능합니다. 인터페이스는 역할만 정의하고 구현은 구현 클래스에서 하므로 추상화 정도가 더 높습니다. 상속은 구체적인 구현을 공유하고, 인터페이스는 역할과 구현을 분리합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/java/java_object_oriented.md`
- 내용: OOP 4대 특징, 예시 코드

### 추가 학습 자료

- [[JONGMINFIRE.DEV] 객체지향 프로그래밍이란?](https://jongminfire.dev/객체지향-프로그래밍이란)
- [[simplelearn] What is Encapsulation in Java](https://www.simplilearn.com/tutorials/java-tutorial/java-encapsulation)