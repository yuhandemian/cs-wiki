---
category: Database
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: B-Tree & B+Tree
tags: []
---

# B-Tree & B+Tree

## 📝 B-Tree란?

**데이터가 정렬된 상태로 유지되는 트리**

**특징:** 한 노드당 자식 노드가 2개 이상 가능

**장점:** 어떤 값에 대해서도 같은 시간에 결과 획득

---

## 🌳 B-Tree 구조

**Root Node:** 가장 상단 노드

**Branch Node:** 중간 노드

**Leaf Node:** 가장 아래 노드

---

## ✅ B-Tree 특징

### 1. 균일성

**어떤 값에 대해서도 같은 시간에 결과**

**시간 복잡도:** O(logN)

---

### 2. 균형 트리

**루트부터 리프까지 거리가 일정**

**성능:** 안정화

**주의:** 갱신 반복 시 균형 깨짐 → 성능 약화

---

### 3. 정렬 상태 유지

**항상 정렬된 상태**

**부등호 연산:** 문제없음

---

## 🔄 B-Tree 삽입

### 기본 과정

```
1. 빈 트리 → Root node 생성
2. Key가 들어갈 Leaf node 탐색
3. 자리 있으면 → 정렬 유지하며 삽입
4. 자리 없으면 → 노드 분할
```

---

### 노드 분할

**중앙값 기준으로 분할**

**중앙값:** 부모 노드로 합쳐지거나 새 노드 생성

**왼쪽 키:** 왼쪽 자식

**오른쪽 키:** 오른쪽 자식

---

## 🗑️ B-Tree 삭제

### Leaf Node 삭제

**Case 1:** Key 수가 최소보다 큼 → 단순 삭제

**Case 2:** 형제 노드의 Key 수가 최소보다 큼 → 형제에서 빌림

**Case 3:** 모두 최소 & 부모가 최소보다 큼 → 병합

**Case 4:** 모두 최소 → 트리 재구조화

---

### Non-Leaf Node 삭제

**Case 1:** 현재/자식 노드 Key 수가 최소보다 큼 → Predecessor/Successor로 대체

**Case 2:** 모두 최소 → 병합 후 재구조화

---

## 🌟 B+Tree란?

**B-Tree를 확장한 구조**

**특징:** Leaf node에만 데이터 저장

**나머지 노드:** Key만 저장

---

## ✅ B+Tree 특징

### 1. Leaf Node에만 데이터 저장

**Branch Node:** Key만 저장

---

### 2. 메모리 효율성

**더 많은 Key 수용 가능**

**트리 높이 낮아짐**

**Cache Hit 증가**

---

### 3. 중복 Key 허용

---

### 4. Linked List 연결

**Leaf Node끼리 연결**

**순차 접근 용이**

---

### 5. 빠른 Full Scan

**Leaf Node만 선형 탐색**

**B-Tree 대비 빠름**

---

## 🔄 B+Tree 삽입

### Case 1: Key 수가 최대 미만

**가장 앞 아님:** 단순 삽입

**가장 앞:** 부모 Key 변경 + Linked List 연결

---

### Case 2: Key 수가 최대

**분할 필요**

**Leaf Node 분할:** 중간 Key를 오른쪽에 붙여 분할

**Linked List 연결**

---

## 🗑️ B+Tree 삭제

### Case 1: 가장 앞이 아닌 경우

**B-Tree와 동일**

---

### Case 2: 가장 앞인 경우

**Branch Node에 중복 Key 존재**

**오른쪽에서 가장 작은 값으로 대체**

---

## 🆚 Hash Table vs B+Tree

### Hash Table

**시간 복잡도:** O(1)

**단점:**
- 정렬 안 됨
- 부등호 연산 비효율적
- 등호 연산만 특화

---

### B+Tree

**시간 복잡도:** O(logN)

**장점:**
- 정렬 상태 유지
- 부등호 연산 효율적
- 모든 연산에 O(logN) 보장

**DB Index:** B+Tree 사용

---

## ❓ 면접 질문 예시

### Q1. B-Tree의 특징은 무엇인가요?

**답변:**
B-Tree는 데이터가 정렬된 상태로 유지되는 트리로 한 노드당 자식 노드가 2개 이상 가능합니다. 균일성(어떤 값에 대해서도 O(logN)), 균형 트리(루트부터 리프까지 거리 일정), 정렬 상태 유지(부등호 연산 가능)의 특징이 있습니다.

### Q2. B+Tree와 B-Tree의 차이점은?

**답변:**
B+Tree는 B-Tree를 확장한 것으로 Leaf node에만 데이터를 저장하고 나머지 노드는 Key만 저장합니다. 더 많은 Key를 수용하여 트리 높이가 낮아지고, Leaf node끼리 Linked List로 연결되어 순차 접근이 용이하며, Full Scan 시 B-Tree보다 빠릅니다.

### Q3. DB Index에 Hash Table이 아닌 B+Tree를 사용하는 이유는?

**답변:**
Hash Table은 O(1)로 빠르지만 값이 정렬되지 않아 부등호 연산에 매우 비효율적입니다. Hash는 등호 연산만 특화되어 있고 데이터가 조금만 달라져도 완전히 다른 hash 값을 생성하므로 부등호 연산이 자주 사용되는 DB에는 적합하지 않습니다. B+Tree는 O(logN)이지만 정렬 상태를 유지하여 부등호 연산이 효율적입니다.

### Q4. B-Tree의 삽입 과정을 설명해주세요.

**답변:**
빈 트리면 Root node를 생성하고, Key가 들어갈 Leaf node를 탐색합니다. 자리가 있으면 정렬을 유지하며 삽입하고, 자리가 없으면 노드를 분할합니다. 분할 시 중앙값을 기준으로 나누며, 중앙값은 부모 노드로 올라가고 왼쪽 키는 왼쪽 자식, 오른쪽 키는 오른쪽 자식으로 생성됩니다.

### Q5. B+Tree가 Full Scan에서 빠른 이유는?

**답변:**
B+Tree는 모든 데이터가 Leaf node에만 저장되어 있고 Leaf node끼리 Linked List로 연결되어 있어 한 번의 선형 탐색만 하면 됩니다. 반면 B-Tree는 모든 노드를 탐색해야 하므로 B+Tree가 Full Scan에서 더 빠릅니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [db_b_tree_b+tree.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Database/db_b_tree_b+tree.md)
- 내용: B-Tree, B+Tree, 삽입/삭제

### 추가 학습 자료

- [B-Tree 구조](https://rebro.kr/169)
- [B+Tree 구조](https://rebro.kr/167)
- [DB 인덱스 자료 구조](https://velog.io/@sem/DB-인덱스-자료-구조-B-Tree)
- [B-Tree vs B+Tree](https://zorba91.tistory.com/293)