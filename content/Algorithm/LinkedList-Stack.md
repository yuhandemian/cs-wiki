---
category: Algorithm
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Linked List & Stack
tags: []
---

# Linked List & Stack (연결 리스트와 스택)

## 📝 연결 리스트란?

**동적 데이터 처리의 근간을 이루는 자료구조**

**특징:** 각 데이터 원소에 다음 원소에 대한 연결고리 포함

---

## 🔗 연결 리스트의 종류

### 1. 단일 연결 리스트 (Singly-Linked List)

**구조:**
- 머리 (Head): 첫 번째 원소
- 꼬리 (Tail): 마지막 원소
- 연결고리: 다음 노드 포인터/레퍼런스

**특징:**
- 앞으로만 종주 가능
- 첫 번째 원소부터 시작 필요
- 면접에서 가장 많이 출제

---

### 2. 이중 연결 리스트 (Doubly-Linked List)

**구조:**
- 다음 원소 연결고리
- 이전 원소 연결고리

**특징:**
- 양방향 종주 가능
- 어떤 원소에서든 전체 종주 가능
- 면접에서 잘 안 나옴 (단일이 더 어려움)

---

### 3. 원형 연결 리스트 (Circularly-Linked List)

**구조:**
- 끝(머리/꼬리) 없음
- 모든 연결고리가 널이 아닌 원소 가리킴

**특징:**
- 원소 하나면 자기 자신 가리킴
- 사이클 회피 문제 주의 (무한 루프)
- 면접에서 거의 안 나옴

---

## 🔧 기초 연산

### 1. 머리 원소 추적

**중요성:** 머리 원소를 잃어버리면 리스트 전체 손실

**주의사항:**
- 첫 번째 원소 앞에 추가 시 머리 갱신
- 첫 번째 원소 제거 시 머리 갱신

---

### Java 예시

```java
public ListElement&lt;Integer&gt; insertInFront(
    ListElement&lt;Integer&gt; list, int data) {
    ListElement&lt;Integer&gt; l = new ListElement&lt;Integer&gt;(data);
    l.setNext(list);
    return l; // 새로운 머리 반환
}

// 호출
head = insertInFront(head, data);
```

---

### C 예시

```c
bool insertInFront(IntElement **head, int data) {
    IntElement *newElem = malloc(sizeof(IntElement));
    if(!newElem) return false;
    
    newElem->data = data;
    newElem->next = *head;
    *head = newElem; // 머리 갱신
    return true;
}
```

---

### 2. 리스트 종주

**주의사항:** 항상 리스트 끝 확인

```java
public ListElement&lt;Integer&gt; find(
    ListElement&lt;Integer&gt; head, int data) {
    ListElement&lt;Integer&gt; elem = head;
    while(elem != null && elem.value() != data) {
        elem = elem.next();
    }
    return elem; // null이면 못 찾음
}
```

---

### 3. 원소 삽입/삭제

**주의사항:**
- 앞 원소의 연결고리 수정 필요
- 머리 원소 삭제 시 특별 처리
- 머리에서부터 종주 필요할 수 있음

---

## 📚 스택 (Stack)

### 스택이란?

**LIFO (Last-In-First-Out) 자료구조**

**특징:**
- 마지막에 들어간 것이 가장 먼저 나옴
- Push: 원소 삽입
- Pop: 원소 삭제

**용도:**
- 서브루틴 반환 주소, 매개변수, 지역변수 추적
- 토큰 추적 (파싱)

---

## 🆚 구현 방법 비교

### 동적 배열

**장점:**
✅ 임의 접근 가능 (인덱스로 즉시 접근)
✅ 메모리 국소성 (인접 원소가 메모리상 인접)
✅ 포인터 오버헤드 없음
✅ 대체로 빠름

**단점:**
❌ 크기 조절 시 모든 원소 복사 필요

---

### 연결 리스트

**장점:**
✅ 구현이 덜 복잡
✅ 크기 조절 불필요

**단점:**
❌ 메모리 할당자 오버헤드
❌ 메모리 국소성 떨어짐
❌ 각 원소마다 포인터 오버헤드

**면접 권장:** 연결 리스트 (구현이 간단)

---

## 🔨 스택 구현 (연결 리스트)

### 자료구조 정의

```c
#define MAX_STACKS 10
typedef struct {
    int key;
    /* other fields */
} element;

typedef struct stack *stackPointer;
typedef struct stack {
    element data;
    stackPointer link;
} Node;

stackPointer top[MAX_STACKS];
```

---

### Push 연산

```c
void push(int i, element item) {
    stackPointer temp;
    MALLOC(temp, sizeof(*temp));
    temp->data = item;
    temp->link = top[i];
    top[i] = temp; // 머리 갱신
}
```

**시간 복잡도:** O(1)

---

### Pop 연산

```c
element pop(int i) {
    stackPointer temp = top[i];
    element item;
    
    if (!temp)
        return stackEmpty(); // 비어있음
    
    item = temp->data;
    top[i] = temp->link; // 아래로 이동
    free(temp);
    return item;
}
```

**시간 복잡도:** O(1)

---

## ❓ 면접 질문 예시

### Q1. 연결 리스트의 종류와 특징을 설명해주세요.

**답변:**
연결 리스트는 단일, 이중, 원형 연결 리스트가 있습니다. 단일 연결 리스트는 다음 노드만 가리켜 앞으로만 종주 가능하며 면접에서 가장 많이 출제됩니다. 이중 연결 리스트는 이전/다음 노드를 모두 가리켜 양방향 종주가 가능합니다. 원형 연결 리스트는 끝이 없고 모든 노드가 다른 노드를 가리킵니다.

### Q2. 연결 리스트로 스택을 구현하는 이유는?

**답변:**
동적 배열보다 구현이 덜 복잡하기 때문입니다. 동적 배열은 임의 접근과 메모리 국소성 면에서 장점이 있지만, 스택은 한쪽 끝에서만 연산이 이뤄져 임의 접근의 장점이 없고, 크기 조절 시 모든 원소를 복사해야 합니다. 연결 리스트는 크기 조절이 필요 없고 구현이 간단하여 면접에 적합합니다.

### Q3. 스택의 특징과 용도는?

**답변:**
스택은 LIFO(Last-In-First-Out) 자료구조로 마지막에 들어간 것이 가장 먼저 나옵니다. Push로 원소를 삽입하고 Pop으로 원소를 삭제합니다. 서브루틴의 반환 주소, 매개변수, 지역변수를 추적하거나 프로그래밍 언어 파싱 시 토큰을 추적하는 데 사용됩니다.

### Q4. 연결 리스트에서 머리 원소 추적이 중요한 이유는?

**답변:**
단일 연결 리스트는 머리 원소를 통해서만 전체 리스트에 접근할 수 있기 때문입니다. 머리 원소를 잃어버리면 리스트 전체를 잃게 되며, 가비지 컬렉터에 의해 제거되거나 메모리 누수가 발생할 수 있습니다. 따라서 첫 번째 원소 앞에 추가하거나 제거할 때 반드시 머리 포인터를 갱신해야 합니다.

### Q5. 동적 배열과 연결 리스트의 차이는?

**답변:**
동적 배열은 인덱스로 임의 접근이 가능하고 메모리상 인접한 원소가 연속적이어서 메모리 국소성이 좋지만, 크기 조절 시 모든 원소를 복사해야 합니다. 연결 리스트는 각 원소마다 메모리를 동적 할당하여 크기 조절이 자유롭지만, 메모리 할당 오버헤드와 포인터 오버헤드가 있고 메모리 국소성이 떨어집니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/algorithm/algorithm_linkedlist.md`
- 내용: 연결 리스트, 스택, 삽입/삭제, 구현

### 추가 학습 자료

- [프로그래밍 면접 이렇게 준비한다](http://www.yes24.com/Product/Goods/75187284)
- [Fundamentals of Data Structures in C](https://www.amazon.com/Fundamentals-Data-Structures-Ellis-Horowitz/dp/0929306406)
- [연결 리스트 정리](https://fancy96.github.io/DataStructure-LinkedList/)