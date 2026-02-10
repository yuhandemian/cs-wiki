---
category: Data Structure
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: 배열과 연결 리스트
tags: []
---

# 배열 & 연결 리스트

## 📝 배열 (Array)

### 개념

**연속된 메모리 공간에 같은 타입의 데이터를 순차적으로 저장**하는 자료구조

**특징:**
- 고정된 크기
- 인덱스로 접근
- 메모리 연속 할당

### 장단점

**장점:**
✅ **빠른 접근**: O(1) - 인덱스로 즉시 접근
✅ **메모리 효율**: 포인터 오버헤드 없음
✅ **캐시 친화적**: 메모리 국소성

**단점:**
❌ **고정 크기**: 크기 변경 어려움
❌ **삽입/삭제 비효율**: O(n) - 요소 이동 필요

---

## 🔗 연결 리스트 (Linked List)

### 개념

**노드들이 포인터로 연결된 동적 자료구조**

**구성:**
- 데이터 (Data)
- 다음 노드 포인터 (Next)

---

## 📋 연결 리스트 종류

### 1. 단일 연결 리스트 (Singly Linked List)

**구조:**
```
[Data|Next] → [Data|Next] → [Data|NULL]
  Head                         Tail
```

**특징:**
- 다음 노드만 가리킴
- 앞으로만 순회 가능
- 머리(Head)부터 시작

**구현:**
```java
public class ListElement&lt;T&gt; {
    private ListElement&lt;T&gt; next;
    private T data;
    
    public ListElement(T value) {
        data = value;
    }
    
    public ListElement&lt;T&gt; next() { return next; }
    public T value() { return data; }
    public void setNext(ListElement&lt;T&gt; elem) { next = elem; }
}
```

---

### 2. 이중 연결 리스트 (Doubly Linked List)

**구조:**
```
NULL ← [Prev|Data|Next] ⇄ [Prev|Data|Next] → NULL
         Head                   Tail
```

**특징:**
- 이전/다음 노드 모두 가리킴
- 양방향 순회 가능
- 어느 노드에서든 전체 순회 가능

**장점:**
✅ 양방향 탐색
✅ 노드 삭제 용이

**단점:**
❌ 추가 포인터 필요
❌ 메모리 오버헤드

---

### 3. 원형 연결 리스트 (Circular Linked List)

**구조:**
```
[Data|Next] → [Data|Next] → [Data|Next]
  ↑                             ↓
  └─────────────────────────────┘
```

**특징:**
- 끝이 없음 (머리/꼬리 없음)
- 마지막 노드가 첫 노드를 가리킴
- 사이클 회피 주의

---

## 🔧 기본 연산

### 1. 머리 원소 추적

**중요:** 단일 연결 리스트는 머리 원소를 잃어버리면 전체 리스트 손실

**삽입 시 머리 갱신:**
```java
public ListElement&lt;Integer&gt; insertInFront(ListElement&lt;Integer&gt; list, int data) {
    ListElement&lt;Integer&gt; newNode = new ListElement<>(data);
    newNode.setNext(list);
    return newNode;  // 새로운 머리 반환
}

// 호출
head = insertInFront(head, data);
```

---

### 2. 리스트 순회

**끝 확인 필수:**
```java
public ListElement&lt;Integer&gt; find(ListElement&lt;Integer&gt; head, int data) {
    ListElement&lt;Integer&gt; elem = head;
    while (elem != null && elem.value() != data) {
        elem = elem.next();
    }
    return elem;  // null이면 못 찾음
}
```

---

### 3. 삽입과 삭제

**주의사항:**
- 앞 원소의 연결고리 수정 필요
- 머리 원소 삭제 시 특별 처리

**삽입:**
```cpp
void insertNode(listPointer *first, listPointer node) {
    listPointer p, q;
    p = q = *first;
    
    // 비어있는 경우
    if (!p) {
        *first = node;
        return;
    }
    
    while (TRUE) {
        p = q;
        q = q->link;
        // 맨 끝
        if (q == NULL) {
            p->link = node;
            return;
        }
    }
}
```

**삭제:**
```cpp
void deleteNode(listPointer *first, int data) {
    listPointer p, q;
    p = q = *first;
    
    // 비어있는 경우
    if (p == NULL) return;
    
    // 맨 앞
    if (p->data <= data) {
        *first = (*first)->link;
        free(p);
        return;
    }
    
    while (TRUE) {
        if (q->data <= data) {
            p->link = q->link;
            free(q);
            return;
        }
        p = q;
        q = q->link;
        if (q == NULL) return;  // 못 찾음
    }
}
```

---

## 📊 배열 vs 연결 리스트

| 특징 | 배열 | 연결 리스트 |
|------|------|-------------|
| **접근** | O(1) | O(n) |
| **삽입/삭제** | O(n) | O(1) (위치 알 때) |
| **메모리** | 연속 할당 | 분산 할당 |
| **크기** | 고정 | 동적 |
| **캐시** | 친화적 | 비친화적 |
| **오버헤드** | 없음 | 포인터 필요 |

---

## 💡 언제 무엇을 사용할까?

### 배열 사용

✅ **빠른 접근 필요**
✅ **크기 고정**
✅ **메모리 효율 중요**
✅ **순차 접근 많음**

### 연결 리스트 사용

✅ **동적 크기 필요**
✅ **삽입/삭제 빈번**
✅ **크기 예측 불가**
✅ **메모리 단편화 허용**

---

## ❓ 면접 질문 예시

### Q1. 배열과 연결 리스트의 차이는?

**답변:**
배열은 연속된 메모리에 데이터를 저장하여 인덱스로 O(1) 접근이 가능하지만 크기가 고정되고 삽입/삭제가 O(n)입니다. 연결 리스트는 노드들이 포인터로 연결되어 동적 크기이고 삽입/삭제가 O(1)이지만 접근이 O(n)입니다.

### Q2. 연결 리스트의 종류를 설명해주세요.

**답변:**
1) 단일 연결 리스트: 다음 노드만 가리켜 앞으로만 순회 가능
2) 이중 연결 리스트: 이전/다음 노드를 모두 가리켜 양방향 순회 가능
3) 원형 연결 리스트: 마지막 노드가 첫 노드를 가리켜 끝이 없음

### Q3. 연결 리스트에서 머리 원소 추적이 중요한 이유는?

**답변:**
단일 연결 리스트는 머리 원소를 잃어버리면 전체 리스트에 접근할 수 없습니다. 가비지 컬렉터에 의해 제거되거나 메모리 누수가 발생할 수 있으므로, 삽입/삭제 시 머리 포인터를 반드시 갱신해야 합니다.

### Q4. 배열과 연결 리스트 중 어떤 것을 선택해야 하나요?

**답변:**
빠른 접근이 필요하고 크기가 고정되어 있으면 배열을 사용합니다. 동적 크기가 필요하고 삽입/삭제가 빈번하면 연결 리스트를 사용합니다. 메모리 효율과 캐시 친화성이 중요하면 배열이 유리합니다.

### Q5. 이중 연결 리스트의 장단점은?

**답변:**
장점은 양방향 탐색이 가능하고 노드 삭제가 용이합니다. 단점은 이전 노드 포인터를 추가로 저장해야 하므로 메모리 오버헤드가 있고, 단일 연결 리스트보다 복잡합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [algorithm_linkedlist.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/algorithm/algorithm_linkedlist.md)
- 내용: 연결 리스트 종류, 기본 연산, 구현

### 추가 학습 자료

- [프로그래밍 면접 이렇게 준비한다](http://www.yes24.com/Product/Goods/75187284)
- [Fundamentals of Data Structures in C](https://www.amazon.com/Fundamentals-Data-Structures-Ellis-Horowitz/dp/0929306406)