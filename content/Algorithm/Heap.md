---
category: Algorithm
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Heap
tags: []
---

# Heap (힙)

## 📝 개념 정의

**우선순위 큐를 위해 만들어진 완전 이진 트리 자료구조**

**핵심:**
- 최댓값/최솟값을 빠르게 찾기 위한 자료구조
- 반정렬 상태 (느슨한 정렬)
- 중복 값 허용

---

## 🌳 완전 이진 트리 (Complete Binary Tree)

### 개념

**마지막 레벨 제외 모든 레벨이 가득 차있고, 마지막 레벨은 왼쪽부터 채워진 이진 트리**

### 특징

✅ **노드 개수로 구조 특정 가능**

**인덱스 관계:**
```
부모 index = (자식 index) / 2
왼쪽 자식 index = (부모 index) * 2
오른쪽 자식 index = (부모 index) * 2 + 1
```

---

## 📊 우선순위 큐 (Priority Queue)

### 개념

**우선순위가 가장 높은 데이터를 가장 먼저 삭제하는 자료구조**

### 구현 방법 비교

| 자료구조 | 삽입 | 삭제 |
|----------|------|------|
| **배열** | O(N) | O(N) |
| **연결 리스트** | O(N) | O(N) |
| **힙** | O(log N) | O(log N) |

**힙이 가장 효율적!**

---

## 🔑 Heap 특징

### 1. 완전 이진 트리

**구조적 특징**

### 2. 반정렬 상태

**부모 노드 ≥ (또는 ≤) 자식 노드**

- 큰 값이 상위 레벨
- 작은 값이 하위 레벨

### 3. 중복 허용

**이진 탐색 트리와 차이**

---

## 📐 Heap 종류

### 1. Max Heap (최대 힙)

**부모 노드 ≥ 자식 노드**

```
        9
       / \
      7   6
     / \
    3   2
```

**특징:**
- 루트 노드 = 최댓값
- key(부모) ≥ key(자식)

---

### 2. Min Heap (최소 힙)

**부모 노드 ≤ 자식 노드**

```
        1
       / \
      3   5
     / \
    7   9
```

**특징:**
- 루트 노드 = 최솟값
- key(부모) ≤ key(자식)

---

## 💾 Heap 구현

### 배열 사용

**완전 이진 트리 → 배열로 표현**

```
배열: [-, 9, 7, 6, 3, 2]
인덱스: 0  1  2  3  4  5

트리:
        9(1)
       /    \
     7(2)   6(3)
     /  \
   3(4) 2(5)
```

**특징:**
✅ 비어있는 공간 없음
✅ 인덱스 0 미사용 (계산 편의)
✅ 노드 번호 고정

---

## ➕ Heap 삽입

### 과정

1. **마지막 노드에 삽입**
2. **부모와 비교하여 교환**
3. **반복 (Heapify)**

### 예시: Max Heap에 8 삽입

```
Step 1: 마지막에 삽입
        9
       / \
      7   6
     / \ /
    3  2 8

Step 2: 부모(6)와 비교 → 교환
        9
       / \
      7   8
     / \ /
    3  2 6

Step 3: 부모(9)와 비교 → 교환 안 함 (완료)
```

### 코드

```c
void insert_max_heap(int x) {
    maxHeap[++heapSize] = x;
    
    for(int i = heapSize; i > 1; i /= 2) {
        if(maxHeap[i/2] < maxHeap[i]) {
            swap(i/2, i);
        } else {
            break;
        }
    }
}
```

### 시간 복잡도

**O(log N)**
- 트리 높이만큼 비교

---

## ➖ Heap 삭제

### 과정

1. **루트 노드 삭제**
2. **마지막 노드를 루트로 이동**
3. **자식과 비교하여 교환**
4. **반복 (Heapify)**

### 예시: Max Heap에서 삭제

```
Step 1: 루트 삭제, 마지막 노드(2)를 루트로
        2
       / \
      7   6
     /
    3

Step 2: 큰 자식(7)과 교환
        7
       / \
      2   6
     /
    3

Step 3: 큰 자식(3)과 교환 (완료)
        7
       / \
      3   6
     /
    2
```

### 코드

```c
int delete_max_heap() {
    if(heapSize == 0)
        return 0;
    
    int item = maxHeap[1];
    maxHeap[1] = maxHeap[heapSize];
    maxHeap[heapSize--] = 0;
    
    for(int i = 1; i*2 <= heapSize;) {
        if(maxHeap[i] > maxHeap[i*2] && maxHeap[i] > maxHeap[i*2+1]) {
            break;
        }
        else if (maxHeap[i*2] > maxHeap[i*2+1]) {
            swap(i, i*2);
            i = i*2;
        }
        else {
            swap(i, i*2+1);
            i = i*2+1;
        }
    }
    
    return item;
}
```

### 시간 복잡도

**O(log N)**
- 트리 높이만큼 비교

---

## 🔨 Build Heap

### 개념

**힙 조건을 만족하지 않는 배열을 힙으로 만드는 과정**

### Heapify vs Build Heap

| 구분 | Heapify | Build Heap |
|------|---------|------------|
| **시작** | 힙 만족 | 힙 미만족 |
| **연산** | 삽입/삭제 | 배열 전체 |
| **시간** | O(log N) | O(N log N) |

### 과정

```
초기 배열: [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]

Step 1: 마지막 부모 노드부터 Heapify
Step 2: 왼쪽으로 이동하며 Heapify
Step 3: 루트까지 반복

결과: Max Heap 완성
```

---

## 🎯 Heap 활용

✅ **시뮬레이션 시스템**
✅ **네트워크 트래픽 제어**
✅ **운영체제 작업 스케줄링**
✅ **수치 해석 계산**
✅ **우선순위 큐 구현**

---

## ❓ 면접 질문 예시

### Q1. Heap이란 무엇인가요?

**답변:**
우선순위 큐를 위해 만들어진 완전 이진 트리 자료구조입니다. 최댓값이나 최솟값을 빠르게 찾기 위해 사용되며, 부모 노드의 키 값이 자식 노드의 키 값보다 항상 크거나 작은 반정렬 상태를 유지합니다. 중복 값을 허용합니다.

### Q2. Max Heap과 Min Heap의 차이는?

**답변:**
Max Heap은 부모 노드의 키 값이 자식 노드의 키 값보다 크거나 같은 완전 이진 트리로 루트 노드가 최댓값입니다. Min Heap은 부모 노드의 키 값이 자식 노드의 키 값보다 작거나 같은 완전 이진 트리로 루트 노드가 최솟값입니다.

### Q3. Heap의 삽입 과정을 설명해주세요.

**답변:**
1) 새로운 요소를 힙의 마지막 노드에 삽입합니다
2) 부모 노드와 비교하여 Max Heap의 경우 자식이 더 크면 교환, Min Heap의 경우 자식이 더 작으면 교환합니다
3) 힙 조건을 만족할 때까지 반복합니다
시간 복잡도는 O(log N)입니다.

### Q4. 우선순위 큐를 Heap으로 구현하는 이유는?

**답변:**
배열이나 연결 리스트로 구현하면 삽입과 삭제의 시간 복잡도가 O(N)이지만, Heap으로 구현하면 O(log N)으로 효율적입니다. Heap은 완전 이진 트리 구조이므로 트리의 높이가 log(N+1)이기 때문입니다.

### Q5. Heapify와 Build Heap의 차이는?

**답변:**
Heapify는 힙 조건을 만족하는 상태에서 삽입이나 삭제가 발생할 때 다시 힙을 만드는 과정으로 O(log N)의 시간 복잡도를 가집니다. Build Heap은 힙 조건을 만족하지 않는 배열 전체를 힙으로 만드는 과정으로 여러 번의 Heapify를 거쳐 O(N log N)의 시간 복잡도를 가집니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [algorithm_heap.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Algorithm/algorithm_heap.md)
- 내용: Heap, 우선순위 큐, 삽입/삭제, Build Heap

### 추가 학습 자료

- [힙(Heap) 자료구조](https://chanhuiseok.github.io/posts/ds-4/)
- [힙(Heap) 자료구조 알아보기](https://gmlwjd9405.github.io/2018/05/10/data-structure-heap.html)