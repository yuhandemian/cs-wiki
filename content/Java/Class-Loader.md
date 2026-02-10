---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Class Loader
tags: []
---

# Class Loader (클래스 로더)

## 📝 클래스 로더란?

**런타임 시점에 클래스를 로드하고 링크하는 동적 로딩 방식**

**각 클래스를 동적으로 로드하는 역할**

---

## 🔄 동적 로딩 과정

### 1. 로딩 (Loading)

**바이트코드를 메서드 영역에 적재**

**클래스 정보 저장**

- 로드된 클래스와 부모 클래스 정보
- Class/Interface/Enum 관련 여부
- 변수나 메서드 정보

---

### 2. 링크 (Linking)

**검증:** 자바 및 JVM 명세 준수 확인

**준비:** 필요한 메모리 할당

**분석:** 심볼릭 레퍼런스를 실제 레퍼런스로 변환

---

### 3. 초기화 (Initialization)

**클래스 변수를 적절한 값으로 초기화**

**정적 필드를 설정된 값으로 초기화**

---

## 🔍 클래스 로더 종류

### 1. Bootstrap Class Loader

**최상위 계층 클래스 로더**

**자바 자체의 클래스 로더와 Object 클래스 로드**

---

#### Java 8 이전

**`/jre/lib/rt.jar` 및 핵심 라이브러리 로드**

---

#### Java 9 이후

**`/rt.jar`가 `/lib` 내에 모듈화**

**자바 자체의 클래스 로더만 로드**

---

### 2. Extension/Platform Class Loader

**부트스트랩 클래스 로더의 자식**

**확장 자바 클래스 로드**

---

#### Java 8 이전

**`${JAVA_HOME}/jre/lib/ext` 내 클래스 로드**

**URLClassLoader 상속**

---

#### Java 9 이후

**PlatformClassLoader로 변경**

**BulletinClassLoader 상속**

---

### 3. System Class Loader

**사용자 지정 ${`CLASSPATH`} 클래스 로드**

---

### 4. User-Defined Class Loader

**최하위 계층**

**사용자가 직접 정의하고 생성**

---

## 💡 동작 방식

### 클래스 로드 절차

**1. 메서드 영역에 클래스 존재 확인**

**2. 없으면 System Class Loader에 요청**

**3. Extension Class Loader에 위임**

**4. Bootstrap Class Loader에 위임**

**5. Bootstrap 경로에서 검색**

**6. 없으면 Extension 경로에서 검색**

**7. 없으면 System 경로에서 검색**

**8. 없으면 ClassNotFoundException 발생**

---

## 🚧 클래스 로더 3원칙

### 1. 위임 원칙 (Delegation)

**리소스 찾을 때 상위 클래스 로더로 위임**

---

### 2. 가시 범위 원칙 (Visibility)

**하위 → 상위 로드 클래스: 알 수 있음**

**상위 → 하위 로드 클래스: 알 수 없음**

---

### 3. 유일성 원칙 (Uniqueness)

**하위는 상위가 로드한 클래스 재로드 불가**

**위임 원칙으로 고유한 로딩 보장**

---

## 📝 동적 로딩 유형

### 1. 로드타임 동적 로딩

**프로그램 실행 전 필요한 모든 클래스 로드**

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("hello world!!!");
    }
}
```

**Object, HelloWorld, String, System 클래스 로드**

---

### 2. 런타임 동적 로딩

**프로그램 실행 중 필요한 시점에 클래스 로드**

```java
Car car = new SportsCar();
car.move();
```

**다형성 원리로 실행 시점에 SportsCar 로드**

**JVM은 실행 전까지 어떤 클래스인지 알 수 없음**

---

## 👀 동적 로딩 장단점

### 장점

**런타임 전까지 메모리 낭비 방지**

**필요한 시점에만 로드**

---

### 단점

**런타임 에러 조기 발견 어려움**

**동적 로딩 시간 비용 발생**

**성능 저하 가능성**

---

## ❓ 면접 질문 예시

### Q1. 클래스 로더란 무엇인가요?

**답변:**
클래스 로더는 Java에서 런타임 시점에 클래스를 로드하고 링크하는 동적 로딩 방식을 담당합니다. 컴파일 시점이 아닌 런타임 시점에 각 클래스를 동적으로 로드하며, 로딩-링크-초기화 과정을 거쳐 명령을 실행합니다.

### Q2. 클래스 로더의 종류는?

**답변:**
클래스 로더는 계층 구조로 되어 있습니다. 최상위는 Bootstrap Class Loader로 자바 자체의 클래스를 로드합니다. Extension/Platform Class Loader는 확장 자바 클래스를 로드하고, System Class Loader는 사용자 지정 CLASSPATH의 클래스를 로드합니다. 최하위는 User-Defined Class Loader로 사용자가 직접 정의합니다.

### Q3. 클래스 로더의 동작 방식을 설명해주세요.

**답변:**
클래스 로드 시 먼저 메서드 영역에 클래스가 있는지 확인합니다. 없으면 System Class Loader에 요청하고, Extension Class Loader를 거쳐 Bootstrap Class Loader까지 위임됩니다. Bootstrap 경로에서 검색하고, 없으면 Extension, System 경로 순으로 검색합니다. 모든 경로에서 찾지 못하면 ClassNotFoundException을 발생시킵니다.

### Q4. 클래스 로더 3원칙은?

**답변:**
첫째, 위임 원칙은 리소스를 찾을 때 상위 클래스 로더로 요청을 위임합니다. 둘째, 가시 범위 원칙은 하위 클래스 로더는 상위가 로드한 클래스를 알 수 있지만 상위는 하위가 로드한 클래스를 알 수 없습니다. 셋째, 유일성 원칙은 하위 클래스 로더는 상위가 로드한 클래스를 재로드하면 안 됩니다.

### Q5. 로드타임 동적 로딩과 런타임 동적 로딩의 차이는?

**답변:**
로드타임 동적 로딩은 프로그램 실행 전 필요한 모든 클래스를 로드합니다. 런타임 동적 로딩은 프로그램 실행 중 필요한 시점에 클래스를 로드합니다. 다형성 원리를 사용할 때 JVM은 실행 전까지 어떤 구체 클래스인지 알 수 없어 런타임에 로드됩니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [java_class_loader.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Java/java_class_loader.md)
- 내용: Class Loader, 동적 로딩, 클래스 로더 종류

### 추가 학습 자료

- [JVM의 클래스 로더란?](https://steady-coding.tistory.com/593)
- [자바의 클래스로더 알아보기](https://leeyh0216.github.io/posts/java_class_loader)
- [클래스는 언제 메모리에 로딩 & 초기화 되는가](https://inpa.tistory.com/entry/JAVA-%E2%98%95-%ED%81%B4%EB%9E%98%EC%8A%A4%EB%8A%94-%EC%96%B8%EC%A0%9C-%EB%A9%94%EB%AA%A8%EB%A6%AC%EC%97%90-%EB%A1%9C%EB%94%A9-%EC%B4%88%EA%B8%B0%ED%99%94-%EB%90%98%EB%8A%94%EA%B0%80-%E2%9D%93)