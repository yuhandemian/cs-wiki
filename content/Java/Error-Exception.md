---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Error & Exception
tags: []
---

# Error & Exception (오류와 예외)

## 📝 Throwable 계층 구조

```
Throwable
├── Error
│   ├── StackOverflowError
│   └── OutOfMemoryError
└── Exception
    ├── RuntimeException (Unchecked)
    │   ├── NullPointerException
    │   └── IllegalArgumentException
    └── IOException (Checked)
```

---

## 🔑 Throwable

**예외와 관련된 최상위 클래스**

### 주요 메서드

#### getMessage()

**발생한 예외에 대한 구체적인 메시지 반환**

```java
try {
    // ...
} catch (Exception e) {
    System.out.println(e.getMessage());
}
```

---

#### printStackTrace()

**예외에 대한 자세한 디버깅 정보 출력**

```java
try {
    // ...
} catch (Exception e) {
    e.printStackTrace();
}
```

---

## ❌ Error (오류)

**복구 불가능한 심각한 상황**

### 특징

❌ **개발자가 미리 예측 불가**
❌ **처리 방법: 디버깅뿐**
❌ **프로그램 비정상 종료**

---

### 대표적인 Error

#### StackOverflowError

**호출 깊이가 깊어지거나 재귀 지속 시 발생**

```java
public void recursion() {
    recursion();  // 무한 재귀
}
```

**예방:**
- 재귀 종료 조건 명확히
- 가시적인 loop 사용

---

#### OutOfMemoryError

**JVM 메모리 부족 시 발생**

**예방:**
- 메모리 누수 차단
- Heap 크기 증가

---

## ✅ Exception (예외)

**개발자가 예측하여 방지 가능한 상황**

### 특징

✅ **심각도가 낮음**
✅ **예외 처리로 정상 흐름 유지 가능**
✅ **개발자 로직 실수 또는 사용자 영향**

---

### 대표적인 Exception

#### NullPointerException

**null 객체 사용 시도 시 발생**

```java
String str = null;
str.length();  // NullPointerException
```

---

#### IllegalArgumentException

**허가되지 않거나 부적절한 argument**

```java
public void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("나이는 음수일 수 없습니다");
    }
}
```

---

## 🔀 Checked vs Unchecked Exception

### Checked Exception

**컴파일 시점에 예외 처리 확인**

**특징:**
- RuntimeException 제외한 Exception
- 반드시 try-catch 또는 throws 필요
- 컴파일 에러 발생

**예시:**
- IOException
- SQLException
- FileNotFoundException

---

### Unchecked Exception

**컴파일 시점에 예외 처리 미확인**

**특징:**
- RuntimeException 계열
- try-catch 선택적
- 런타임에 발생

**예시:**
- NullPointerException
- ArrayIndexOutOfBoundsException
- IllegalArgumentException

---

## 📊 Checked vs Unchecked 비교

| 특징 | Checked | Unchecked |
|------|---------|-----------|
| **상속** | Exception | RuntimeException |
| **처리** | 필수 | 선택 |
| **확인 시점** | 컴파일 | 런타임 |
| **트랜잭션 롤백** | X | O (Spring) |

---

## 🔧 예외 처리 기법

### try-catch

```java
try {
    // 예외가 발생할 수 있는 코드
    int[] arr = {10};
    System.out.println(arr[2]);
} catch (ArrayIndexOutOfBoundsException e) {
    // 예외 처리
    System.out.println("배열 크기 확인 필요");
}
System.out.println("프로그램 종료");
```

**출력:**
```
배열 크기 확인 필요
프로그램 종료
```

---

### 예외 처리 없을 때

```java
int[] arr = {10};
System.out.println(arr[2]);  // 예외 발생
System.out.println("프로그램 종료");  // 실행 안 됨
```

**출력:**
```
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 2
```

---

## 💡 Checked를 Unchecked로 변환

**throws 남발 방지**

```java
public static String extractRequestLine(BufferedReader br) {
    try {
        String requestLine = br.readLine();
        if (requestLine == null) {
            throw new InvalidHttpRequestException("request line이 없습니다.");
        }
        return requestLine;
    } catch (IOException e) {
        // Checked → Unchecked 변환
        throw new InvalidHttpRequestException("입력 값이 잘못되었습니다.");
    }
}
```

**장점:**
✅ 예외 발생 지점 명확
✅ 코드 가독성 향상
✅ 호출 메서드에서 선택적 처리

---

## 🎯 예외 사용 가이드

### Checked Exception 사용

**호출 메서드가 예외로 의미있는 작업 가능**

```java
public void readFile(String path) throws IOException {
    // 파일 읽기
}
```

---

### Unchecked Exception 사용

**호출 메서드가 예외 해결 능력 없음**

```java
public void validateAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("나이는 음수일 수 없습니다");
    }
}
```

---

## ❓ 면접 질문 예시

### Q1. Error와 Exception의 차이는?

**답변:**
Error는 실행 중 일어날 수 있는 치명적 오류로 컴파일 시점에 체크 불가하며, 오류 발생 시 프로그램은 비정상 종료됩니다. Exception은 Error보다 경미한 오류이며 try-catch문을 사용하여 비정상 종료를 막을 수 있습니다.

### Q2. Checked Exception과 Unchecked Exception의 차이는?

**답변:**
Checked Exception은 RuntimeException을 제외한 Exception으로 컴파일 시점에 예외 처리를 반드시 해야 합니다. Unchecked Exception은 RuntimeException 계열로 예외 처리를 명시적으로 할 필요는 없지만 런타임에 발생할 수 있습니다.

### Q3. 예외 처리를 하는 이유는?

**답변:**
예외 처리를 통해 프로그램의 비정상 종료를 방지하고 정상적인 흐름을 유지할 수 있습니다. 또한 예외 상황에 대한 적절한 대응으로 사용자 경험을 개선하고 시스템 안정성을 높일 수 있습니다.

### Q4. Checked Exception을 Unchecked Exception으로 변환하는 이유는?

**답변:**
무분별한 throws 사용은 코드 가독성을 떨어뜨리고 예외 발생 지점을 알 수 없게 만듭니다. Checked Exception을 Unchecked Exception으로 변환하면 예외가 발생한 메서드에서 처리하거나 개발자에게 처리를 위임할 수 있어 예외 발생 지점이 명확해집니다.

### Q5. 대표적인 RuntimeException은?

**답변:**
NullPointerException (null 객체 사용), ArrayIndexOutOfBoundsException (배열 범위 초과), IllegalArgumentException (부적절한 인자), ArithmeticException (산술 연산 오류) 등이 있습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/java/java_error_vs_exception.md`
- 내용: Error, Exception, Checked/Unchecked, 예외 처리

### 추가 학습 자료

- [[wellbell's blog] Error 와 Exception(Checked, Unchecked)](https://wellbell.tistory.com/198)
- [[넥스트리소프트]](https://www.nextree.co.kr/p3239/)
- [[Inpa Dev's blog]](https://inpa.tistory.com/entry/JAVA-%E2%98%95-%EC%97%90%EB%9F%ACError-%EC%99%80-%EC%98%88%EC%99%B8-%ED%81%B4%EB%9E%98%EC%8A%A4Exception-%F0%9F%92%AF-%EC%B4%9D%EC%A0%95%EB%A6%AC)