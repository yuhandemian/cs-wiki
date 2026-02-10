---
category: Data Structure
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: 트리
tags: []
---

# Tree (트리)

## 📝 개념 정의

**0개 이상의 다른 노드에 대한 레퍼런스가 들어 있는 노드로 구성된 계층적 자료구조**

**핵심:**
- 비선형 자료구조
- 계층적 관계 표현
- 부모-자식 관계

---

## 🌳 트리 용어

### 기본 용어

**노드 (Node):**
- 트리의 기본 단위
- 데이터 + 자식 노드 레퍼런스

**루트 (Root):**
- 트리의 최상위 노드
- 부모가 없는 유일한 노드

**부모 (Parent):**
- 다른 노드를 가리키는 노드

**자식 (Child):**
- 부모 노드에 의해 가리켜지는 노드

**형제 (Sibling):**
- 같은 부모를 가진 노드들

**잎 (Leaf):**
- 자식이 없는 노드

**자손 (Descendant):**
- 특정 노드에서 자식 경로로 도달 가능한 모든 노드

**조상 (Ancestor):**
- 특정 노드를 자손으로 삼고 있는 모든 노드

---

## 🌲 이진 트리 (Binary Tree)

### 개념

**한 노드에 자식이 최대 2개까지만 있는 트리**

**구성:**
- 왼쪽 자식 (Left Child)
- 오른쪽 자식 (Right Child)

### 구현

```java
public class Node {
    private Node left;
    private Node right;
    private int value;
    
    public Node(Node left, Node right, int value) {
        this.left = left;
        this.right = right;
        this.value = value;
    }
    
    public Node getLeft() { return left; }
    public Node getRight() { return right; }
    public int getValue() { return value; }
}
```

### 이진 트리 속성

**레벨 i의 최대 노드 개수:** 2^(i-1) (i ≥ 1)

**높이 k의 최대 노드 개수:** 2^k - 1 (k ≥ 1)

---

## 🔍 이진 검색 트리 (BST)

### 개념

**정렬된 데이터를 저장하는 이진 트리**

**규칙:**
- 왼쪽 자식 ≤ 부모
- 오른쪽 자식 ≥ 부모

### 예시

```
      8
    /   \
   3     10
  / \      \
 1   6     14
    / \    /
   4   7  13
```

### 검색 구현

**재귀 방식:**
```cpp
element* search(treePointer root, int k) {
    if (!root) return NULL;
    if (k == root->data.key) return &(root->data);
    if (k < root->data.key)
        return search(root->leftChild, k);
    return search(root->rightChild, k);
}
```

**반복 방식:**
```cpp
element* iterSearch(treePointer tree, int k) {
    while (tree) {
        if (k == tree->data.key) return &(tree->data);
        if (k < tree->data.key)
            tree = tree->leftChild;
        else
            tree = tree->rightChild;
    }
    return NULL;
}
```

### 시간복잡도

**평균:** O(log n)
**최악:** O(n) (편향 트리)

---

## 📦 힙 (Heap)

### 개념

**우선순위 큐를 구현하기 위한 완전 이진 트리**

### Max Heap

**규칙:** 부모 ≥ 자식

```
      20
    /    \
   15     10
  /  \   /
 8    5 3
```

**특징:**
- 루트가 최대값
- 우선순위 큐 구현

### Min Heap

**규칙:** 부모 ≤ 자식

```
      3
    /   \
   5     10
  / \   /
 8  15 20
```

**특징:**
- 루트가 최소값

### 시간복잡도

- **삽입/삭제:** O(log n)
- **검색:** O(n)

### 활용

✅ 우선순위 큐
✅ 힙 정렬
✅ 다익스트라 알고리즘

---

## 🔎 트리 탐색

### 1. BFS (너비 우선 탐색)

**방식:** 레벨 순서로 탐색

**특징:**
- 루트 → 2층 → 3층...
- 큐 사용
- 최단 경로 찾기

**시간복잡도:** O(n)

**단점:**
❌ 메모리 많이 사용 (각 층의 모든 자식 저장)

---

### 2. DFS (깊이 우선 탐색)

**방식:** 끝까지 내려간 후 돌아옴

**특징:**
- 한 가지를 끝까지
- 스택 사용 (재귀)
- 메모리 효율적

**시간복잡도:** O(n)

**장점:**
✅ 메모리 적게 사용
✅ 깊은 노드 빨리 찾음

---

## 🔄 트리 순회 (Traversal)

### 1. Preorder (전위 순회)

**순서:** V → L → R

```cpp
void preorder(treePointer ptr) {
    if (ptr) {
        print("%d", ptr->data);     // V
        preorder(ptr->leftChild);   // L
        preorder(ptr->rightChild);  // R
    }
}
```

**결과:** 8, 3, 1, 6, 4, 7, 10, 14, 13

---

### 2. Inorder (중위 순회)

**순서:** L → V → R

```cpp
void inorder(treePointer ptr) {
    if (ptr) {
        inorder(ptr->leftChild);    // L
        print("%d", ptr->data);     // V
        inorder(ptr->rightChild);   // R
    }
}
```

**결과:** 1, 3, 4, 6, 7, 8, 10, 13, 14

**특징:** BST에서 오름차순 정렬

---

### 3. Postorder (후위 순회)

**순서:** L → R → V

```cpp
void postorder(treePointer ptr) {
    if (ptr) {
        postorder(ptr->leftChild);  // L
        postorder(ptr->rightChild); // R
        print("%d", ptr->data);     // V
    }
}
```

**결과:** 1, 4, 7, 6, 3, 13, 14, 10, 8

---

## 📊 순회 방법 비교

| 순회 | 순서 | 특징 | 활용 |
|------|------|------|------|
| **Preorder** | V-L-R | 노드 먼저 | 트리 복사 |
| **Inorder** | L-V-R | 왼쪽 먼저 | BST 정렬 |
| **Postorder** | L-R-V | 자식 먼저 | 트리 삭제 |

---

## ❓ 면접 질문 예시

### Q1. 트리란 무엇인가요?

**답변:**
노드들이 계층적 관계로 연결된 비선형 자료구조입니다. 루트 노드에서 시작하여 부모-자식 관계로 연결되며, 사이클이 없는 것이 특징입니다. 파일 시스템, 조직도, HTML DOM 등을 표현하는 데 사용됩니다.

### Q2. 이진 검색 트리(BST)란 무엇인가요?

**답변:**
왼쪽 자식은 부모보다 작거나 같고, 오른쪽 자식은 부모보다 크거나 같은 규칙을 가진 이진 트리입니다. 정렬된 데이터를 저장하며, 평균 O(log n)의 검색 시간을 제공합니다. 단, 편향 트리가 되면 O(n)이 될 수 있습니다.

### Q3. BFS와 DFS의 차이는?

**답변:**
BFS는 레벨 순서로 탐색하여 최단 경로를 찾는 데 유리하지만 메모리를 많이 사용합니다. DFS는 끝까지 내려간 후 돌아오는 방식으로 메모리 효율적이고 깊은 노드를 빨리 찾을 수 있습니다. BFS는 큐, DFS는 스택(재귀)을 사용합니다.

### Q4. Heap이란 무엇이고 어디에 사용하나요?

**답변:**
완전 이진 트리로 부모가 자식보다 크거나(Max Heap) 작은(Min Heap) 규칙을 가진 자료구조입니다. 우선순위 큐 구현, 힙 정렬, 다익스트라 알고리즘 등에 사용됩니다. 삽입/삭제는 O(log n)이지만 검색은 O(n)입니다.

### Q5. 트리 순회 방법을 설명해주세요.

**답변:**
1) Preorder(전위): V-L-R 순서로 노드를 먼저 방문, 트리 복사에 사용
2) Inorder(중위): L-V-R 순서로 왼쪽 먼저 방문, BST에서 오름차순 정렬
3) Postorder(후위): L-R-V 순서로 자식을 먼저 방문, 트리 삭제에 사용

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/Algorithm/algorithm_tree.md`
- 내용: 트리 개념, BST, Heap, BFS/DFS, 순회

### 추가 학습 자료

- [프로그래밍 면접 이렇게 준비한다](http://www.yes24.com/Product/Goods/75187284)
- [Fundamentals of Data Structures in C](https://www.amazon.com/Fundamentals-Data-Structures-Ellis-Horowitz/dp/0929306406)