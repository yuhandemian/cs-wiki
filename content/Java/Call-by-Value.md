---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Call by Value
tags: []
---

# Call by Value (값에 의한 호출)

## 📝 Call by Value vs Call by Reference

### Call by Value

**값만 전달하는 방식**

**특징:**
- 전달받은 값을 복사하여 처리
- 전달받은 값을 변경해도 원본 변경 안 됨

---

### Call by Reference

**주소를 전달하는 방식**

**특징:**
- 전달받은 값을 직접 참조
- 전달받은 값을 변경하면 원본도 변경

---

## 🔑 Java는 Call by Value만 존재

**Java 공식 문서:**
> "Java authors choose to only include one simple idea - pass-by-value"

**Java에는 Call by Reference가 없다!**

---

## 💡 Call by Value 예시

```java
public class MyClass {
    public static void main(String args[]) {
        int num1 = 10;
        int num2 = 20;

        System.out.println("Before: num1 = " + num1 + ", num2 = " + num2);
        
        ex_method(num1, num2);
        
        System.out.println("After: num1 = " + num1 + ", num2 = " + num2);
    }
    
    public static void ex_method(int num1, int num2) {
        num1 = 30;
        num2 = 40;
        
        System.out.println("Inside: num1 = " + num1 + ", num2 = " + num2);
    }
}
```

**출력:**
```
Before: num1 = 10, num2 = 20
Inside: num1 = 30, num2 = 40
After: num1 = 10, num2 = 20
```

**원본 값은 변경되지 않음!**

---

## 🔄 참조형 예시 (여전히 Call by Value)

```java
public class MyClass {
    int value;

    MyClass(int value) {
        this.value = value;
    }

    public static void swap(MyClass x, MyClass y) {
        int temp = x.value;
        x.value = y.value;
        y.value = temp;
    }
    
    public static void main(String[] args) {
        MyClass num1 = new MyClass(10);
        MyClass num2 = new MyClass(20);
        
        System.out.println("Before: num1 = " + num1.value + ", num2 = " + num2.value);
        
        swap(num1, num2);
        
        System.out.println("After: num1 = " + num1.value + ", num2 = " + num2.value);
    }
}
```

**출력:**
```
Before: num1 = 10, num2 = 20
After: num1 = 20, num2 = 10
```

**값이 변경되었다! Call by Reference인가?**

**아니다! 여전히 Call by Value다!**

---

## 🧩 Java 데이터 타입

### 1. 기본형 (Primitive Type)

**Boolean, Numeric Type**

**저장 방식:** Stack에 값 직접 저장

---

### 2. 참조형 (Reference Type)

**Class, Interface, Array, Enum**

**저장 방식:**
- Stack: 주소 값 저장
- Heap: 실제 객체 저장

---

## 🤔 왜 Call by Reference가 아닌가?

```java
public class main {
    public static void main(String[] args) {
        int var = 1;
        int[] arr = { 1 };

        // call by value
        add_value(var);
        System.out.println("primitive type : " + var); // 1

        // call by reference?
        add_reference(arr);
        System.out.println("reference type : " + arr[0]); // 101
    }

    static void add_value(int var_arg) {
        var_arg += 100;
    }

    static void add_reference(int[] arr_arg) {
        arr_arg[0] += 100;
    }
}
```

---

## 💡 핵심 차이점

### Primitive Type

```
Stack
┌─────┐
│ var │ → 1 (값 직접 저장)
└─────┘
```

**값 자체가 복사됨**

---

### Reference Type

```
Stack                Heap
┌─────┐             ┌─────┐
│ arr │ → 0x100 →  │  1  │
└─────┘             └─────┘
```

**주소 값이 복사됨**

---

## 🔍 Call by Reference가 아닌 이유

### 1. 포인터 숨김

**Java는 C와 달리 포인터를 철저히 숨김**

**개발자가 직접 메모리 주소 접근 불가**

---

### 2. 주소 값의 복사

**Call by Value로 동작**

**차이점:**
- 기본형: 원시값 복사
- 참조형: 주소값 복사

---

### 3. 변수의 독립성

**두 변수는 서로 별도로 분리되어 존재**

```java
add_reference(arr); // arr의 주소값을 담아 새로운 변수 선언
```

**각 변수는 서로 다른 scope에 존재**

**Call by Reference:** 두 변수가 완전히 같아야 함

**Java:** 같은 주소를 가진 별도의 변수

---

## 🆚 C언어의 Call by Reference

```c
#include <stdio.h>

void swap(int *, int *);

int main() {
    int a = 10;
    int b = 20;
    
    swap(&a, &b); // 주소 전달
}

void swap(int *a, int *b) {
    int temp;
    
    temp = *a;
    *a = *b;
    *b = temp;
}
```

**C는 진짜 Call by Reference 가능**

**Java는 불가능**

---

## 📌 정리

**Java는 항상 Call by Value**

**기본형:** 값 복사

**참조형:** 주소 값 복사 (Call by Address라고도 함)

**Call by Reference는 존재하지 않음**

---

## ❓ 면접 질문 예시

### Q1. Call by Value와 Call by Reference의 차이점은?

**답변:**
Call by Value는 함수 인자를 전달할 때 값을 복사하여 전달하는 방식으로, 전달받은 값을 변경해도 원본은 변경되지 않습니다. Call by Reference는 주소를 전달하는 방식으로, 전달받은 값을 변경하면 원본도 변경됩니다. Java는 Call by Value만 존재하며 Call by Reference는 없습니다.

### Q2. Java에 포인터 개념이 없는 이유는?

**답변:**
Java는 C와 달리 포인터를 철저하게 숨겨 개발자가 직접 메모리 주소에 접근하지 못하게 했습니다. 이는 메모리 안전성을 보장하고 프로그래밍을 단순화하기 위함입니다. 대신 참조형 타입을 통해 간접적으로 객체에 접근할 수 있습니다.

### Q3. C++의 Call by Reference와 Java의 Reference 차이점은?

**답변:**
C++의 Call by Reference는 진짜 참조로 두 변수가 완전히 같은 메모리를 가리킵니다. Java의 Reference는 주소 값의 복사로, 같은 객체를 가리키는 별도의 변수입니다. Java는 Call by Value로 동작하며 참조형의 경우 주소 값이 복사되는 것입니다.

### Q4. Java에서 참조형 변수를 전달하면 값이 변경되는데 왜 Call by Value인가요?

**답변:**
Java는 참조형 변수를 전달할 때 주소 값을 복사하여 전달합니다. 두 변수가 같은 주소를 가지고 있어 같은 객체를 참조하지만, 각 변수는 서로 다른 scope에 별도로 존재합니다. Call by Reference라면 두 변수가 완전히 같아야 하지만, Java는 주소 값의 복사이므로 Call by Value입니다.

### Q5. 기본형과 참조형의 메모리 저장 방식 차이는?

**답변:**
기본형(int, double, boolean 등)은 Stack의 변수 안에 값을 직접 저장합니다. 참조형(Integer, Object, Array 등)은 Stack의 변수에는 객체의 주소 값을 저장하고, 실제 객체는 Heap 영역에 저장됩니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/java/java_call_by_value.md`
- 내용: Call by Value, Call by Reference, Java 데이터 타입

### 추가 학습 자료

- [명품자바에센셜](http://www.yes24.com/Product/Goods/63041975)
- [자바는 Call by reference 개념이 없다](https://inpa.tistory.com/entry/JAVA-%E2%98%95-%EC%9E%90%EB%B0%94%EB%8A%94-Call-by-reference-%EA%B0%9C%EB%85%90%EC%9D%B4-%EC%97%86%EB%8B%A4-%E2%9D%93)
- [[Java] Call by value와 Call by reference](https://re-build.tistory.com/3)
- [[Java] Java는 Call by reference가 없다](https://deveric.tistory.com/92)