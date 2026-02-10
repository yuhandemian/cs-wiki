---
category: Data Structure
curated_by: Claude Sonnet 4.5
difficulty: easy
generated: 2026-02-08
interview_frequency: high
prerequisites:
- Array-LinkedList
related:
- Array-LinkedList
- Tree
sources: 2
subtopic: 스택과 큐
tags:
- stack
- queue
- lifo
- fifo
---

# Stack & Queue

## 📚 Stack (스택)

### 개념

**데이터를 쌓아올린 형태의 자료구조 - 후입선출(LIFO)**

**비유:** 프링글스 통
- 아래서부터 차곡차곡 쌓음
- 위에서부터 하나씩 꺼냄

### 특징

**LIFO (Last In First Out):**
- 마지막에 들어간 것이 가장 먼저 나옴
- 한 방향으로만 저장
- Top에서만 삽입/조회/삭제

---

## 🔧 Stack 주요 메서드

### 1. isEmpty() / isFull()

스택이 비어있는지/가득 찼는지 확인

### 2. push()

**스택에 원소 삽입**
- 가득 차있으면 예외 발생

### 3. peek()

**Top 원소 조회**
- 제거하지 않음

### 4. pop()

**Top 원소 조회 및 제거**
- 비어있으면 예외 발생

---

## 💻 Stack 구현 (Java)

### 인터페이스

```java
public interface MyStack&lt;T&gt; {
    boolean isEmpty();
    boolean isFull();
    void push(T element);
    T peek();
    T pop();
    void clear();
}
```

### 구현

```java
public class MyStackImpl&lt;T&gt; implements MyStack&lt;T&gt; {
    private List&lt;Optional&lt;T&gt;&gt; myStack;
    private int limit;
    
    public MyStackImpl(int size) {
        this.myStack = new LinkedList<>();
        this.limit = size;
    }
    
    @Override
    public void push(T element) {
        if (isFull()) {
            throw new FullException();
        }
        myStack.add(Optional.ofNullable(element));
    }
    
    @Override
    public T pop() {
        try {
            return myStack.remove(myStack.size() - 1)
                          .orElseThrow(EmptyException::new);
        } catch (IndexOutOfBoundsException e) {
            throw new EmptyException();
        }
    }
}
```

---

## 🔗 연결 리스트로 Stack 구현

### 구조

```cpp
typedef struct stack *stackPointer;
typedef struct stack {
    element data;
    stackPointer link;
} Node;
stackPointer top[MAX_STACKS];
```

### Push 연산

```cpp
void push(int i, element item) {
    stackPointer temp;
    MALLOC(temp, sizeof(*temp));
    temp->data = item;
    temp->link = top[i];
    top[i] = temp;  // Top 갱신
}
```

### Pop 연산

```cpp
element pop(int i) {
    stackPointer temp = top[i];
    element item;
    
    if (!temp)
        return stackEmpty();
    
    item = temp->data;
    top[i] = temp->link;  // 아래로 이동
    free(temp);
    return item;
}
```

---

## 🍡 Queue (큐)

### 개념

**데이터를 순서대로 줄 세운 자료구조 - 선입선출(FIFO)**

**비유:** 놀이공원 줄서기
- 먼저 온 사람이 먼저 탐

### 특징

**FIFO (First In First Out):**
- 먼저 들어간 것이 먼저 나옴
- Front: 조회/삭제
- Rear: 삽입

---

## 🔧 Queue 주요 메서드

### 1. isEmpty() / isFull()

큐가 비어있는지/가득 찼는지 확인

### 2. enqueue()

**큐에 원소 삽입 (Rear)**
- 가득 차있으면 예외 발생

### 3. peek()

**Front 원소 조회**
- 제거하지 않음

### 4. dequeue()

**Front 원소 조회 및 제거**
- 비어있으면 예외 발생

---

## 💻 Queue 구현 (Java)

### 인터페이스

```java
public interface MyQueue&lt;T&gt; {
    boolean isEmpty();
    boolean isFull();
    void enqueue(T element);
    T peek();
    T dequeue();
    void clear();
}
```

### 구현

```java
public class MyQueueImpl&lt;T&gt; implements MyQueue&lt;T&gt; {
    private List&lt;Optional&lt;T&gt;&gt; myQueue;
    private int limit;
    
    public MyQueueImpl(int size) {
        this.myQueue = new LinkedList<>();
        this.limit = size;
    }
    
    @Override
    public void enqueue(T element) {
        if (isFull()) {
            throw new FullException();
        }
        myQueue.add(Optional.ofNullable(element));
    }
    
    @Override
    public T dequeue() {
        try {
            return myQueue.remove(0)  // Front에서 제거
                          .orElseThrow(EmptyException::new);
        } catch (IndexOutOfBoundsException e) {
            throw new EmptyException();
        }
    }
}
```

---

## 📊 Stack vs Queue

| 특징 | Stack | Queue |
|------|-------|-------|
| **원리** | LIFO | FIFO |
| **삽입** | push (Top) | enqueue (Rear) |
| **삭제** | pop (Top) | dequeue (Front) |
| **조회** | peek (Top) | peek (Front) |
| **비유** | 프링글스 통 | 줄서기 |

---

## 💡 활용 사례

### Stack 활용

✅ **함수 호출 스택**
- 반환 주소, 매개변수, 지역변수 추적

✅ **수식 계산**
- 후위 표기법 계산

✅ **괄호 검사**
- 괄호 짝 맞추기

✅ **브라우저 뒤로가기**
- 방문 기록 관리

✅ **DFS (깊이 우선 탐색)**

### Queue 활용

✅ **프로세스 스케줄링**
- CPU 작업 대기열

✅ **프린터 대기열**
- 인쇄 작업 순서

✅ **BFS (너비 우선 탐색)**

✅ **캐시 구현**
- LRU 캐시

---

## 🔄 Deque (데크)

### 개념

**양쪽 끝에서 삽입/삭제 가능한 자료구조**

**특징:**
- Double-Ended Queue
- Stack + Queue 특성
- 양쪽 끝에서 연산

**활용:**
- Stack과 Queue 모두 필요할 때
- 양방향 탐색

---

## ❓ 면접 질문 예시

### Q1. Stack과 Queue의 차이는?

**답변:**
Stack은 LIFO(후입선출) 구조로 마지막에 들어간 것이 먼저 나오며, Top에서만 삽입/삭제가 일어납니다. Queue는 FIFO(선입선출) 구조로 먼저 들어간 것이 먼저 나오며, Rear에서 삽입, Front에서 삭제가 일어납니다.

### Q2. Stack으로 Queue를 구현할 수 있나요?

**답변:**
네, Stack 두 개를 사용하면 가능합니다. 하나는 enqueue용, 다른 하나는 dequeue용으로 사용합니다. enqueue 시 첫 번째 Stack에 push하고, dequeue 시 두 번째 Stack이 비어있으면 첫 번째 Stack의 모든 원소를 pop하여 두 번째 Stack에 push한 후 pop합니다.

### Q3. Stack과 Queue를 어디에 사용하나요?

**답변:**
Stack은 함수 호출 스택, 수식 계산, 괄호 검사, DFS에 사용됩니다. Queue는 프로세스 스케줄링, 프린터 대기열, BFS, 캐시 구현에 사용됩니다.

### Q4. Deque란 무엇인가요?

**답변:**
Double-Ended Queue의 약자로, 양쪽 끝에서 삽입과 삭제가 모두 가능한 자료구조입니다. Stack과 Queue의 특성을 모두 가지고 있어, 두 가지 기능이 모두 필요할 때 사용합니다.

### Q5. Stack을 연결 리스트로 구현하는 이유는?

**답변:**
동적 배열보다 구현이 간단하고, 크기 조절을 위한 복사 작업이 필요 없습니다. 면접에서는 연결 리스트로 구현하는 것이 코드가 짧고 명확하여 선호됩니다. 다만 실무에서는 메모리 국소성 때문에 동적 배열이 더 빠를 수 있습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/Algorithm/algorithm_stack_and_queue.md`
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/Algorithm/algorithm_linkedlist.md`
- 내용: Stack/Queue 개념, 구현, 활용

### 추가 학습 자료

- [프로그래밍 면접 이렇게 준비한다](http://www.yes24.com/Product/Goods/75187284)