---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites:
- Lambda-Functional-Interface
related:
- CountDownLatch-CyclicBarrier
- Lambda-Functional-Interface
sources: 1
subtopic: Asynchronous Programming
tags:
- asynchronous-programming
- callback
- future
- completablefuture
---

# Asynchronous Programming (비동기 처리)

## 📝 동기 vs 비동기

### 동기 (Synchronous)

**A 작업이 끝나는 동시에 B 작업 시작**

**순차 실행**

---

### 비동기 (Asynchronous)

**A 작업 완료 여부와 상관없이 B 작업 시작**

**별도의 작업 시작/종료 시간**

**멀티 스레드에서 작동**

---

## 🔄 동기 vs 비동기 예시

### 동기 코드

```java
// 작업1 (5초 소요)
task1();
// 작업2 (1초 소요)
task2();
// 총 6초 소요
```

**작업1이 끝난 후 작업2 시작**

**총 실행 시간: 6초**

---

### 비동기 코드

```java
// 작업1을 다른 스레드에 위임 (5초 소요)
async(task1());
// 작업2 즉시 시작 (1초 소요)
task2();
// 총 5초 소요
```

**작업1을 다른 스레드에 위임**

**메인 스레드는 작업2 즉시 시작**

**총 실행 시간: 5초**

---

## 💡 비동기 처리 방법 1: Callback

**다른 주체에게 작업을 맡김**

**작업 완료 시 콜백 함수 실행**

---

### CompletionHandler

**비동기 I/O 작업 결과 처리**

**콜백 객체 생성**

```java
CompletionHandler&lt;String, Void&gt; handler = 
    new CompletionHandler&lt;String, Void&gt;() {
    @Override
    public void completed(String result, Void attachment) {
        // 작업 성공 시 처리
    }
    
    @Override
    public void failed(Throwable exc, Void attachment) {
        // 작업 실패 시 처리
    }
};
```

**completed():** 작업 성공 시

**failed():** 작업 실패 시

---

### 실행 순서

```
작업3 시작 
→ 작업1 시작 
→ 작업2 시작 
→ 작업1 성공 (completed() 실행)
→ 작업3 종료 
→ 작업2 종료
```

---

### 함수형 인터페이스

```java
public void execute(Runnable callback) {
    // 작업1 수행
    task1();
    // 작업1 완료 후 콜백 실행
    callback.run();
}

// 사용
execute(() -> {
    // 작업1 완료 후 실행될 코드
    System.out.println("작업1 완료!");
});
```

---

## 💡 비동기 처리 방법 2: Future

**다른 주체에게 작업 위임**

**본 주체에서 작업 완료 여부 직접 확인**

---

### 확인 방법

#### 1. 논블로킹 확인

```java
Future&lt;String&gt; future = executor.submit(task);

if (future.isDone()) {
    // 작업 완료
}

if (future.isCancelled()) {
    // 작업 취소됨
}
```

---

#### 2. 블로킹 대기

```java
Future&lt;String&gt; future = executor.submit(task);

// 작업 완료까지 블로킹
String result = future.get();
```

---

### 사용 패턴

```
1. 오래 걸리는 작업을 다른 주체에 위임
2. 이쪽에서 할 일 수행
3. 작업 완료 후 get() 호출하여 결과 획득
```

---

## 💡 비동기 처리 방법 3: CompletableFuture

**Future의 한계 극복**

**블로킹 없이 결과 처리**

---

### Future의 한계

**결과 획득 시 잠시라도 블로킹 필요**

---

### CompletableFuture 장점

**논블로킹으로 결과 처리**

**then() 함수로 연속 작업**

---

### 예시

```java
CompletableFuture
    .supplyAsync(() -> {
        // 작업1
        return "hash";
    })
    .thenAccept(result -> {
        // 작업2 (작업1 결과 사용)
        System.out.println("결과: " + result);
    });

// 작업3 (메인 스레드)
task3();
```

---

### 실행 순서

```
작업3 시작 
→ 작업1 시작 
→ 작업1 종료 
→ 작업1 결과물: hash 
→ 작업2 시작 
→ 작업3 종료 
→ 작업2 종료
```

---

### CompletableFuture 메소드

**supplyAsync():** 비동기 작업 시작 (결과 반환)

**thenAccept():** 이전 작업 결과 사용 (논블로킹)

**thenApply():** 이전 작업 결과 변환

**thenCompose():** 이전 작업 결과로 새 CompletableFuture 생성

---

## ❓ 면접 질문 예시

### Q1. 동기와 비동기의 차이는?

**답변:**
동기는 A 작업이 끝나는 동시에 B 작업을 시작하는 순차 실행 방식입니다. 비동기는 A 작업의 완료 여부와 상관없이 B 작업을 시작하며, 작업들이 별도의 시작/종료 시간을 가집니다. 모든 비동기 방식은 멀티 스레드에서 작동합니다.

### Q2. Java에서 비동기를 처리하는 방법은?

**답변:**
Java에서는 Callback, Future, CompletableFuture 세 가지 방법으로 비동기를 처리합니다. Callback은 작업 완료 시 콜백 함수를 실행하고, Future는 작업 완료 여부를 직접 확인하며, CompletableFuture는 블로킹 없이 논블로킹으로 결과를 처리할 수 있습니다.

### Q3. CompletionHandler는 무엇인가요?

**답변:**
CompletionHandler는 비동기 I/O 작업의 결과를 처리하기 위한 콜백 객체입니다. completed() 메소드를 오버라이드하여 작업 성공 시 처리를 구현하고, failed() 메소드를 오버라이드하여 작업 실패 시 처리를 구현합니다.

### Q4. Future와 CompletableFuture의 차이는?

**답변:**
Future는 결과를 얻으려면 get()을 호출하여 잠시라도 블로킹 상태에 들어가야 합니다. CompletableFuture는 then() 함수(thenAccept, thenApply 등)를 통해 블로킹 없이 논블로킹을 유지하며 이전 작업의 결과를 바로 사용할 수 있습니다.

### Q5. 비동기 처리의 장점은?

**답변:**
비동기 처리는 오래 걸리는 작업을 다른 스레드에 위임하여 메인 스레드가 다른 작업을 계속 수행할 수 있게 합니다. 이를 통해 전체 실행 시간을 단축하고, 멀티 코어 프로세서를 효율적으로 활용하며, 사용자 경험을 개선할 수 있습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [java_asynchronous.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Java/java_asynchronous.md)
- 내용: 비동기 처리, Callback, Future, CompletableFuture