---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: JVM 구조
tags: []
---

# JVM (Java Virtual Machine)

## 📝 개념 정의

**자바 프로그램을 실행하고, 다른 언어로 작성된 코드도 자바 바이트코드로 컴파일하여 실행**할 수 있도록 만들어주는 소프트웨어입니다.

**핵심:**
- 자바 가상 머신
- .class 바이트코드를 실행하는 환경
- OS 독립적인 실행 환경 제공

---

## 🔄 JVM 작동 방식

### 실행 과정

1. **메모리 할당**
   - JVM이 OS로부터 메모리 할당

2. **컴파일**
   - 자바 컴파일러(javac)가 `.java` → `.class` 변환

3. **클래스 로딩**
   - Class Loader가 `.class`를 Runtime Data Area로 로딩

4. **해석**
   - Execution Engine이 바이트코드 해석

5. **실행**
   - Runtime Data Area에 배치되어 실행
   - GC 작동 및 스레드 동기화

---

## 🏗️ JVM 구조

```
┌─────────────────────────────────────┐
│       Class Loader System           │
├─────────────────────────────────────┤
│      Runtime Data Area              │
│  ┌──────────┬──────────────────┐   │
│  │  Method  │      Heap        │   │ ← 모든 스레드 공유
│  │   Area   │      Area        │   │
│  ├──────────┴──────────────────┤   │
│  │  Stack │ PC Reg │ Native   │   │ ← 스레드별 생성
│  │  Area  │        │ Method   │   │
│  └────────┴────────┴──────────┘   │
├─────────────────────────────────────┤
│       Execution Engine              │
│  (Interpreter + JIT + GC)           │
└─────────────────────────────────────┘
```

---

## 📦 클래스 로더 시스템 (Class Loader)

### 역할

**생성된 클래스 파일들을 Runtime Data Area로 적재**

### 3단계 과정

#### 1. 적재 (Loading)

- 컴파일된 클래스를 메모리에 적재
- `static main()` 메서드부터 시작
- 이미 로드된 클래스는 unload 불가

#### 2. 연결 (Linking)

**검증 (Verification)**
- 바이트코드가 올바르게 변환되었는지 확인

**준비 (Preparation)**
- Static 저장 공간을 위한 메모리 할당

**실행 (Resolution)**
- Symbolic reference → Direct reference
- 실제 객체 주소 참조

#### 3. 초기화 (Initialize)

- Static 변수를 프로그래머가 입력한 값으로 정의

---

## 💾 Runtime Data Area (메모리)

### 모든 스레드 공유 (GC 대상)

#### 1. 메서드 영역 (Method Area)

**저장 내용:**
- 클래스 수준 정보 (이름, 부모 클래스, 메서드, 변수)
- Type 정보 (Class, Interface, Enum)
- FQCN (Fully Qualified Class Name)

**특징:**
- JVM 시작 시 생성
- 프로그램 종료까지 유지
- 모든 스레드 공유

**FQCN 예시:**
```java
// FQCN 사용
org.springframework.boot.SpringApplication.run(...);

// 일반 사용 (import 후)
SpringApplication.run(...);
```

#### 2. 힙 영역 (Heap Area)

**저장 내용:**
- `new` 키워드로 생성된 객체와 배열
- 인스턴스 변수

**구조:**

```
┌─────────────────────────────────────┐
│      Young Generation               │
│  ┌──────┬──────────┬──────────┐    │
│  │ Eden │ Survivor │ Survivor │    │
│  │      │    0     │    1     │    │
│  └──────┴──────────┴──────────┘    │
├─────────────────────────────────────┤
│   Tenured Generation (Old)          │
└─────────────────────────────────────┘
```

**Young Generation:**
- 새로 생성된 객체 저장
- Eden → Survivor 0/1 이동
- Minor GC 발생

**Tenured Generation (Old):**
- 오래된 객체 저장
- Major GC 발생 (Stop-the-World)

---

### 스레드별 생성

#### 3. 스택 영역 (Stack Area)

**저장 내용:**
- 지역 변수
- 파라미터
- 리턴 값
- 연산 임시 값

#### 4. PC 레지스터 (PC Register)

**저장 내용:**
- 현재 스레드가 실행되는 부분의 주소와 명령

#### 5. 네이티브 메서드 스택 (Native Method Stack)

**저장 내용:**
- C, C++, 어셈블리 등 네이티브 코드 실행 시 사용
- JNI (Java Native Interface)

---

## ⚙️ 실행 엔진 (Execution Engine)

### 역할

**Method Area의 바이트코드를 실행**

### 구성 요소

**1. 인터프리터 (Interpreter)**
- 바이트코드를 한 줄씩 해석 및 실행

**2. JIT 컴파일러 (Just-In-Time Compiler)**
- 반복되는 코드를 네이티브 코드로 컴파일
- 성능 향상

**3. 가비지 컬렉터 (Garbage Collector)**
- 더 이상 참조되지 않는 객체 제거
- Heap 메모리 관리

---

## 🗑️ 가비지 컬렉터 (GC)

### 역할

**더 이상 사용하지 않는 메모리를 자동으로 회수**

### 특징

✅ 개발자가 메모리 관리 불필요
✅ Heap 영역의 참조되지 않은 객체 제거
❌ 실행 시점 예측 불가
❌ GC 실행 시 다른 스레드 일시 정지 (Stop-the-World)

### GC 종류

**Minor GC:**
- Young Generation에서 발생
- 빠른 실행

**Major GC:**
- Old Generation에서 발생
- Stop-the-World 발생
- 시간이 오래 걸림

---

## 📊 메모리 영역 비교

| 영역 | 공유 여부 | 저장 내용 | GC 대상 |
|------|-----------|-----------|---------|
| **Method Area** | 모든 스레드 | 클래스 정보 | X |
| **Heap Area** | 모든 스레드 | 객체, 배열 | O |
| **Stack Area** | 스레드별 | 지역 변수, 파라미터 | X |
| **PC Register** | 스레드별 | 실행 주소 | X |
| **Native Method Stack** | 스레드별 | 네이티브 코드 | X |

---

## ❓ 면접 질문 예시

### Q1. JVM의 개념과 역할을 설명해주세요.

**답변:**
JVM은 자바 가상 머신으로, 자바 프로그램을 실행하는 소프트웨어입니다. 자바 컴파일러가 생성한 .class 바이트코드를 OS에 독립적으로 실행할 수 있도록 합니다. 메모리 관리, 가비지 컬렉션, 스레드 동기화 등을 자동으로 처리합니다.

### Q2. JVM의 작동 방식을 설명해주세요.

**답변:**
1) JVM이 OS로부터 메모리를 할당받습니다.
2) javac가 .java 파일을 .class 바이트코드로 컴파일합니다.
3) Class Loader가 바이트코드를 Runtime Data Area로 로딩합니다.
4) Execution Engine이 바이트코드를 해석하고 실행합니다.
5) 실행 과정에서 GC와 스레드 동기화가 이루어집니다.

### Q3. Runtime Data Area의 구조를 설명해주세요.

**답변:**
Runtime Data Area는 크게 모든 스레드가 공유하는 영역과 스레드별로 생성되는 영역으로 나뉩니다.
- 공유 영역: Method Area (클래스 정보), Heap Area (객체, 배열)
- 스레드별: Stack Area (지역 변수), PC Register (실행 주소), Native Method Stack (네이티브 코드)

### Q4. Heap 영역의 구조와 GC를 설명해주세요.

**답변:**
Heap은 Young Generation과 Old Generation으로 나뉩니다. Young Generation은 Eden과 Survivor 영역으로 구성되며, 새로 생성된 객체가 저장됩니다. 여기서 발생하는 GC를 Minor GC라고 합니다. Old Generation은 오래된 객체가 저장되며, 여기서 발생하는 GC를 Major GC라고 하며 Stop-the-World가 발생합니다.

### Q5. 가비지 컬렉터란 무엇인가요?

**답변:**
더 이상 참조되지 않는 객체를 자동으로 제거하여 메모리를 회수하는 기능입니다. 개발자가 메모리를 직접 관리하지 않아도 되지만, GC 실행 시 다른 스레드가 일시 정지되는 Stop-the-World 현상이 발생할 수 있습니다. 실행 시점은 예측할 수 없습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [java_jvm_architecture.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Java/java_jvm_architecture.md)
- 내용: JVM 구조, 메모리 영역, GC

### 추가 학습 자료

- [자바 가상 머신(JVM)의 동작 방식](https://coding-factory.tistory.com/828)
- [JVM 구조](https://goodgid.github.io/Java-JVM/)
- [Understanding JVM Architecture](https://medium.com/platform-engineer/understanding-jvm-architecture-22c0ddf09722)