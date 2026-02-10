---
category: Algorithm
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: high
prerequisites:
- Binary-Search
related:
- Heap
- DFS-BFS
- Binary-Search
sources: 1
subtopic: Tree
tags:
- tree
- binary-tree
- bst
- traversal
- heap
---

# Tree (트리)

## 📝 트리란?

**0개 이상의 다른 노드에 대한 레퍼런스가 들어 있는 노드로 구성**

**비선형 자료구조**

---

## 🔑 주요 용어

### 부모 (Parent)

**다른 노드를 가리키는 노드**

**루트 제외 모든 노드에 부모 하나씩**

---

### 자식 (Child)

**루트 제외 모든 노드는 부모의 자식**

---

### 자손 (Descendant)

**자식 노드로 이어지는 경로로 도달 가능한 모든 노드**

---

### 조상 (Ancestor)

**어떤 노드를 자손으로 삼고 있는 노드**

---

### 잎 (Leaves)

**자식이 없는 노드**

---

## 🌲 이진 트리 (Binary Tree)

**한 노드에 자식이 최대 2개**

**왼쪽 자식 (Left Subtree)**

**오른쪽 자식 (Right Subtree)**

---

## 📊 이진 트리 속성

### 레벨 i의 최대 노드 개수

**2^(i-1)** (i >= 1)

---

### 높이 k의 최대 노드 개수

**2^k - 1** (k >= 1)

---

## 🔍 이진 검색 트리 (BST)

**Binary Search Tree**

**정렬된/순서가 정해진 자료 저장**

---

### BST 규칙

**왼쪽 자식 값 ≤ 부모 값**

**오른쪽 자식 값 ≥ 부모 값**

**값으로 정렬됨**

---

### BST 장점

**빠른 룩업 연산**

**효율적인 자료 저장**

---

### BST 시간복잡도

**평균:** O(log n)

**최악:** O(n) (편향 트리)

---

## 🏔️ 힙 (Heap)

**이진 트리의 일종**

**우선순위 큐 구현에 사용**

---

### Max Heap

**각 자식 값 ≤ 부모 값**

**루트 노드가 최대값**

---

### Min Heap

**각 자식 값 ≥ 부모 값**

**루트 노드가 최소값**

---

### Heap 시간복잡도

**삽입:** O(log n)

**삭제:** O(log n)

**룩업:** O(n)

---

## 🔎 너비 우선 검색 (BFS)

**Breadth-First Search**

**루트에서 시작하여 층별로 왼쪽→오른쪽 검색**

---

### BFS 특징

**시간복잡도:** O(n)

**메모리 사용량:** 많음 (층별 모든 자식 저장)

**큰 트리에는 비효율적**

---

## 🔎 깊이 우선 검색 (DFS)

**Depth-First Search**

**한 가지를 따라 끝까지 내려가는 방식**

**막다른 곳에서 돌아와 다른 경로 탐색**

---

### DFS 특징

**메모리 요구량:** 적음

**하위 노드 우선 검색 가능**

**재귀로 구현 용이**

---

## 🚶 종주 (Traversal)

**모든 노드를 방문하며 작업 수행**

---

### Preorder (VLR)

**Value → Left → Right**

**노드 먼저 방문**

```cpp
void preorder(treePointer ptr) {
    if (ptr) {
        print("%d", ptr->data);   // V
        preorder(ptr->leftChild);  // L
        preorder(ptr->rightChild); // R
    }
}
```

---

### Inorder (LVR)

**Left → Value → Right**

**왼쪽 자손 → 노드 → 오른쪽 자손**

```cpp
void inorder(treePointer ptr) {
    if (ptr) {
        inorder(ptr->leftChild);  // L
        print("%d", ptr->data);   // V
        inorder(ptr->rightChild); // R
    }
}
```

---

### Postorder (LRV)

**Left → Right → Value**

**자손 모두 처리 후 노드 처리**

```cpp
void postorder(treePointer ptr) {
    if (ptr) {
        postorder(ptr->leftChild);  // L
        postorder(ptr->rightChild); // R
        print("%d", ptr->data);     // V
    }
}
```

---

## ❓ 면접 질문 예시

### Q1. 트리란 무엇인가요?

**답변:**
트리는 0개 이상의 다른 노드에 대한 레퍼런스가 들어 있는 노드로 구성된 비선형 자료구조입니다. 루트를 제외한 모든 노드에는 부모가 하나씩 있으며, 자식이 없는 노드를 잎이라고 부릅니다.

### Q2. 이진 트리와 이진 검색 트리의 차이는?

**답변:**
이진 트리는 한 노드에 자식이 최대 2개까지만 있을 수 있는 트리입니다. 이진 검색 트리(BST)는 이진 트리의 일종으로, 왼쪽 자식의 값이 부모 값 이하이고 오른쪽 자식의 값이 부모 값 이상인 정렬된 트리입니다.

### Q3. Heap이란 무엇인가요?

**답변:**
Heap은 이진 트리의 일종으로 우선순위 큐를 구현하는 데 사용됩니다. Max Heap은 각 자식 값이 부모 값 이하여서 루트가 최대값이고, Min Heap은 각 자식 값이 부모 값 이상여서 루트가 최소값입니다. 삽입과 삭제는 O(log n), 룩업은 O(n)입니다.

### Q4. BFS와 DFS의 차이는?

**답변:**
BFS(너비 우선 검색)는 루트에서 시작하여 층별로 왼쪽에서 오른쪽으로 검색하며, 메모리 사용량이 많지만 최단 경로를 찾을 수 있습니다. DFS(깊이 우선 검색)는 한 가지를 따라 끝까지 내려가는 방식으로, 메모리 요구량이 적고 하위 노드를 우선 검색할 수 있습니다.

### Q5. Preorder, Inorder, Postorder의 차이는?

**답변:**
Preorder(VLR)는 노드를 먼저 방문한 후 왼쪽, 오른쪽 자손을 처리합니다. Inorder(LVR)는 왼쪽 자손을 먼저 처리한 후 노드, 오른쪽 자손을 처리합니다. Postorder(LRV)는 왼쪽, 오른쪽 자손을 모두 처리한 후 마지막에 노드를 처리합니다. 모두 재귀로 구현할 수 있습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/algorithm/algorithm_tree.md`
- 내용: Tree, Binary Tree, BST, Heap, BFS/DFS, Traversal

### 추가 학습 자료

- [프로그래밍 면접 이렇게 준비한다](http://www.yes24.com/Product/Goods/75187284)
- [Fundamentals of Data Structures in C](https://www.amazon.com/Fundamentals-Data-Structures-Ellis-Horowitz/dp/0929306406)
- [Tree 정리](https://fancy96.github.io/DataStructure-Tree/)