---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: CountDownLatch & CyclicBarrier
tags: []
---

# CountDownLatch & CyclicBarrier

## 📝 개요

**스레드를 관리해주는 클래스**

**동기화 도구**

---

## 🔒 CountDownLatch

**어떤 스레드가 다른 스레드의 작업 완료를 기다리도록 하는 클래스**

---

## 🔑 CountDownLatch 작동 원리

**Latch:** 걸쇠

**await():** 코드 실행 중단

**countDown():** Latch 숫자 감소

**동작:** countDown()이 지정 횟수만큼 호출되면 await() 해제

---

## 💻 CountDownLatch 사용법

### 생성

```java
CountDownLatch countDownLatch = new CountDownLatch(5);
```

**인자:** Latch 숫자

---

### countDown()

```java
countDownLatch.countDown();
```

**Latch 숫자 1 감소**

---

### await()

```java
countDownLatch.await();
```

**Latch 숫자가 0이 될 때까지 대기**

---

## 📋 CountDownLatch 예제

```java
public class ExampleCountDownLatch {
    public static void main(String[] args) 
            throws InterruptedException {
        CountDownLatch countDownLatch = new CountDownLatch(5);
        
        ExecutorService es = Executors.newFixedThreadPool(5);
        for(int i = 0; i < 5; i++) {
            int n = i;
            es.execute(() -> {
                countDownLatch.countDown();
                System.out.println("order :: " + n);
            });
        }
        
        countDownLatch.await();
        es.shutdown();
        System.out.println("finish");
    }
}
```

---

### 실행 결과

```
order :: 0
order :: 1
order :: 2
order :: 3
order :: 4
finish
```

**await()로 메인 스레드 대기**

**다른 스레드에서 countDown() 5번 호출**

**Latch 0이 되면 "finish" 출력**

---

### countDown() 부족 시

```java
for(int i = 0; i < 4; i++) { // 4번만 실행
    // ...
}
```

**결과:** "finish" 출력 안 됨 (프로그램 종료 안 됨)

**이유:** Latch가 0이 안 됨

---

### Timeout 설정

```java
countDownLatch.await(5, TimeUnit.SECONDS);
```

**지정 시간 동안 대기 후 아래 코드 실행**

---

## 🔄 CyclicBarrier

**CountDownLatch와 유사하지만 재사용 가능**

**모든 스레드가 대기 상태가 되면 모두 해제**

---

## 🔑 CyclicBarrier 작동 원리

**count 값 이상의 인자 받음**

**각 스레드에서 await() 호출 → 대기 상태**

**await()가 count만큼 호출되면 모든 스레드 대기 해제**

---

## 💻 CyclicBarrier 사용법

### 생성

```java
CyclicBarrier cyclicBarrier = new CyclicBarrier(5);
```

**인자:** count 값

---

### await()

```java
cyclicBarrier.await();
```

**대기 상태 진입**

**count만큼 호출되면 모두 해제**

---

## 📋 CyclicBarrier 예제

```java
public class ExampleCyclicBarrier {
    public static void main(String[] args) 
            throws InterruptedException, BrokenBarrierException {
        CyclicBarrier cyclicBarrier = new CyclicBarrier(5);
        
        ExecutorService es = Executors.newFixedThreadPool(4);
        for(int i = 0; i < 4; i++) {
            int n = i;
            es.submit(() -> {
                cyclicBarrier.await();
                System.out.println("order :: " + n);
                return 1;
            });
        }
        
        Thread.sleep(5000);
        cyclicBarrier.await();
        
        es.shutdown();
        System.out.println("finish");
    }
}
```

---

### 실행 결과

```
order :: 3
order :: 2
order :: 1
order :: 0
finish
```

**메인 스레드가 마지막 await() 호출**

**모든 스레드 대기 해제**

**재귀 함수처럼 마지막부터 출력**

---

## 🆚 CountDownLatch vs CyclicBarrier

### CountDownLatch

**한 번만 사용 가능**

**countDown()으로 Latch 감소**

**await()로 대기**

**Latch 0이 되면 해제**

---

### CyclicBarrier

**재사용 가능**

**await()로 대기 상태 진입**

**count만큼 await() 호출되면 모두 해제**

**모든 스레드가 대기해야 해제**

---

## ❓ 면접 질문 예시

### Q1. CountDownLatch란 무엇인가요?

**답변:**
CountDownLatch는 어떤 스레드가 다른 스레드에서 작업이 완료될 때까지 기다릴 수 있도록 해주는 클래스입니다. await() 메소드로 코드 실행을 중단하고, 다른 스레드에서 원하는 횟수만큼 countDown() 메소드를 호출하면 코드가 진행됩니다.

### Q2. CyclicBarrier란 무엇인가요?

**답변:**
CyclicBarrier는 CountDownLatch와 비슷하지만 다른 점은 모든 스레드가 대기 상태가 되었을 때 모든 스레드의 대기 상태가 해제되고 재사용이 가능하다는 것입니다. 각 스레드에서 await()를 호출하면 대기 상태로 들어가고, count만큼 호출되면 모든 스레드가 해제됩니다.

### Q3. CountDownLatch와 CyclicBarrier의 차이점은?

**답변:**
CountDownLatch는 한 번만 사용 가능하고 countDown()으로 Latch를 감소시켜 0이 되면 await()가 해제됩니다. CyclicBarrier는 재사용 가능하고 모든 스레드가 await()를 호출하여 대기 상태가 되면 모두 해제됩니다. CountDownLatch는 작업 완료를 기다리는 용도, CyclicBarrier는 모든 스레드가 특정 지점에 도달할 때까지 기다리는 용도입니다.

### Q4. CountDownLatch의 await()에 timeout을 설정하는 이유는?

**답변:**
await()에 timeout을 설정하면 지정된 시간 동안만 대기하고 아래 코드를 실행합니다. 이는 countDown()이 충분히 호출되지 않아 무한정 대기하는 상황을 방지하고, 일정 시간 후 다른 처리를 할 수 있게 합니다.

### Q5. CyclicBarrier가 재사용 가능한 이유는?

**답변:**
CyclicBarrier는 모든 스레드가 await()를 호출하여 대기 상태가 해제되면 내부 카운터가 초기화되어 다시 사용할 수 있습니다. 반면 CountDownLatch는 한 번 Latch가 0이 되면 재사용할 수 없습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [java_countdownlatch_cyclicbarrier.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Java/java_countdownlatch_cyclicbarrier.md)
- 내용: CountDownLatch, CyclicBarrier, 차이점

### 추가 학습 자료

- [간서치의 IT세상](https://younghwannam.blogspot.com/2019/12/java-countdownlatch-cyclicbarrier-phaser.html)
- [codechacha.com](https://codechacha.com/ko/java-countdownlatch/)
- [자바봄](https://javabom.tistory.com/35)