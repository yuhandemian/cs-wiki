---
category: Algorithm
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Red-Black Tree
tags: []
---

# Red-Black Tree (레드-블랙 트리)

## 📝 이진 탐색 트리(BST)의 단점

**균등 트리:** O(logN)

**편향 트리:** O(N) ❌

**문제:** 최악의 경우 한쪽으로 편향 → 모든 노드 확인 필요

**해결:** Red-Black Tree (균형 트리)

---

## 🔴 Red-Black Tree ⚫

**이진 탐색 트리의 단점을 개선한 자료구조**

**특징:**
- BST의 한 종류
- 스스로 균형(balancing) 잡는 트리
- 모든 경우에 O(logN) 보장
- 모든 노드는 red 또는 black

---

## ✅ 5가지 속성

1. **모든 노드는 red 또는 black**

2. **루트 노드는 black**

3. **모든 nil(leaf) 노드는 black**

4. **red의 자녀들은 반드시 black**
   - red가 연속적으로 존재 불가

5. **임의의 노드에서 자손 nil 노드까지 가는 경로의 black 수는 같음**
   - 자기 자신은 카운트 제외

---

## 🔑 주요 개념

### nil 노드

**존재하지 않음을 의미하는 노드**

**특징:**
- 자녀가 없을 때 자녀를 nil 노드로 표기
- 값이 있는 노드와 동등하게 취급
- RB 트리에서 leaf 노드는 nil 노드

---

### Black Height

**노드 x에서 임의의 자손 nil 노드까지 내려가는 경로의 black 수**

**조건:** 자기 자신은 카운트 제외

**성립:** 속성 #5를 만족해야 함

---

## ⚖️ 균형 유지 원리

**삽입/삭제 시 주로 속성 #4, #5 위반**

**해결:** 구조 변경 (회전, 색상 변경)

**결과:** 자연스럽게 트리 균형 유지

---

## ➕ 삽입 동작

### 기본 과정

```
1. 삽입 전 RB 트리 속성 만족
2. BST와 동일하게 삽입
3. RB 트리 속성 위반 여부 확인
4. 위반 시 재조정
5. RB 트리 속성 다시 만족
```

**삽입 노드 색:** 항상 red

**이유:** 속성 #5 만족하기 위해

---

### 삽입 후 조정

#### Case 1: 루트 노드 삽입

**문제:** 속성 #2 위반 (루트는 black)

**해결:** red → black 변경

---

#### Case 2: red 연속 발생

**문제:** 속성 #4 위반 (red 연속 불가)

**해결:** 회전 (Rotation)

**회전 목적:**
- red를 반대편으로 옮김
- BST 특징 유지

---

#### Case 3: 자녀 색상이 같을 때

**해결:** 부모와 자녀 색상 교환

**이유:** 속성 #5 위반하지 않음

---

## 🔄 회전 (Rotation)

### 오른쪽 회전

```
    B              A
   / \            / \
  A   C    →     D   B
 / \                / \
D   E              E   C
```

---

### 왼쪽 회전

```
  A                B
 / \              / \
D   B      →     A   C
   / \          / \
  E   C        D   E
```

---

## ➖ 삭제 동작

### 기본 과정

```
1. 삭제 전 RB 트리 속성 만족
2. BST와 동일하게 삭제
3. RB 트리 속성 위반 여부 확인
4. 위반 시 재조정
5. RB 트리 속성 다시 만족
```

---

### 삭제되는 색

**자녀 0개 또는 1개:** 삭제되는 노드의 색

**자녀 2개:** 삭제되는 노드의 successor의 색

**successor:** 오른쪽 서브트리의 가장 작은 값

---

### 삭제 후 속성 위반

#### 삭제되는 색이 red

**결과:** 어떠한 속성도 위반 안 함 ✅

---

#### 삭제되는 색이 black

**위반 가능:** 속성 #2, #4, #5

**문제:** black 수가 달라짐

---

## 💡 Extra Black

**목적:** 속성 #5 다시 만족시키기

**방법:** 삭제된 색의 위치를 대체한 노드에 extra black 부여

**Doubly Black:** extra black이 부여된 black 노드

**Red-and-Black:** extra black이 부여된 red 노드

---

### 해결 방법

**Red-and-Black:** black으로 변경 → 끝

**Doubly Black:** Case 1, 2, 3, 4 중 하나로 해결

---

### Case 4

**조건:** Doubly black의 오른쪽 형제가 black & 그 형제의 오른쪽 자녀가 red

**해결:**
1. 오른쪽 형제는 부모 색으로
2. 오른쪽 형제의 오른쪽 자녀는 black으로
3. 부모는 black으로
4. 부모 기준 왼쪽 회전

---

### Case 3

**조건:** Doubly black의 오른쪽 형제가 black & 그 형제의 왼쪽 자녀가 red & 오른쪽 자녀는 black

**해결:**
1. 형제와 형제의 왼쪽 자녀 색 교환
2. 형제 기준 오른쪽 회전
3. Case 4 적용

---

### Case 2

**조건:** Doubly black의 형제가 black & 그 형제의 두 자녀 모두 black

**해결:**
- Doubly black과 형제의 black을 부모에게 전달
- 부모가 extra black 해결하도록 위임

---

### Case 1

**조건:** Doubly black의 형제가 red

**해결:**
1. 형제를 black으로 만들기
2. Case 2, 3, 4 중 하나로 해결

---

## ⏱️ 시간 복잡도

| 연산 | 평균 | 최악 |
|------|------|------|
| **Insert** | O(logN) | O(logN) |
| **Delete** | O(logN) | O(logN) |
| **Search** | O(logN) | O(logN) |

**모든 경우에 O(logN) 보장!**

---

## 🆚 AVL Tree vs Red-Black Tree

### AVL Tree

**장점:** 검색 성능 빠름

**단점:** 삽입/삭제 느림

**이유:** 균형을 더 엄격하게 유지

**적합:** 검색이 대부분인 상황

---

### Red-Black Tree

**장점:** 삽입/삭제 성능 좋음

**단점:** 검색 성능은 AVL보다 느림

**이유:** 균형을 덜 엄격하게 유지

**적합:** 삽입/삭제가 많은 상황

---

## 🔧 응용 사례

**Linux Kernel:** 내부에서 사용

**Java TreeMap:** 구현에 사용

**C++ STL map:** 구현에 사용

---

## ❓ 면접 질문 예시

### Q1. Red-Black Tree에 대해 설명해주세요.

**답변:**
Red-Black Tree는 이진 탐색 트리의 단점을 개선한 자가 균형 트리로, 모든 노드가 red 또는 black 색을 가지며 5가지 속성을 만족합니다. 삽입/삭제 시 속성을 위반하면 회전과 색상 변경으로 재조정하여 자연스럽게 균형을 유지하며, 모든 경우에 O(logN) 시간 복잡도를 보장합니다.

### Q2. Red-Black Tree를 사용하는 이유는?

**답변:**
이진 탐색 트리는 최악의 경우 한쪽으로 편향되어 O(N) 시간이 걸리지만, Red-Black Tree는 스스로 균형을 잡아 모든 경우에 O(logN)을 보장합니다. 삽입/삭제 성능이 좋아 Linux Kernel, Java TreeMap 등에서 사용됩니다.

### Q3. Red-Black Tree의 5가지 속성은?

**답변:**
1) 모든 노드는 red 또는 black, 2) 루트 노드는 black, 3) 모든 nil 노드는 black, 4) red의 자녀들은 반드시 black (red 연속 불가), 5) 임의의 노드에서 자손 nil 노드까지 가는 경로의 black 수는 같습니다.

### Q4. AVL Tree와 Red-Black Tree의 차이는?

**답변:**
AVL Tree는 균형을 더 엄격하게 유지하여 검색 성능이 빠르지만 삽입/삭제가 느립니다. Red-Black Tree는 균형을 덜 엄격하게 유지하여 삽입/삭제 성능이 좋지만 검색은 AVL보다 느립니다. 검색이 대부분이면 AVL, 삽입/삭제가 많으면 Red-Black Tree를 사용합니다.

### Q5. 삽입 시 새 노드를 red로 하는 이유는?

**답변:**
삽입 후에도 속성 #5(임의의 노드에서 자손 nil 노드까지 가는 경로의 black 수는 같음)를 만족하기 위해서입니다. black으로 삽입하면 경로의 black 수가 달라져 속성 #5를 위반하지만, red로 삽입하면 black 수는 변하지 않습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/algorithm/algorithm_red_black_tree.md`
- 내용: Red-Black Tree, BST, 삽입/삭제, 회전

### 추가 학습 자료

- [쉬운 코드 - Red-Black Tree](https://www.youtube.com/c/쉬운코드)
- [Red-Black Tree 정리](https://hello-judy-world.tistory.com/199)