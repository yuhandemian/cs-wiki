---
category: Algorithm
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: 정렬 알고리즘
tags: []
---

# 정렬 알고리즘 (Sorting Algorithms)

## 📝 개념 정의

**데이터를 특정 순서대로 나열**하는 알고리즘입니다.

**목적:**
- 데이터 검색 효율성 향상
- 데이터 분석 및 처리 용이

---

## 🔢 주요 정렬 알고리즘

### 1. 버블 정렬 (Bubble Sort)

**방식:** 인접한 두 원소를 비교하여 정렬

**동작:**
1. 배열의 첫 원소부터 인접한 원소와 비교
2. 크기가 역순이면 교환
3. 배열 끝까지 반복
4. 변경이 없을 때까지 전체 반복

**예시:** `[7, 2, 65, 64, 47]` → `[2, 7, 47, 64, 65]`

**시간복잡도:**
- Best: O(n²)
- Average: O(n²)
- Worst: O(n²)

**특징:**
- 구현 간단
- 성능 비효율적
- 실무에서 거의 사용 안 함

---

### 2. 선택 정렬 (Selection Sort)

**방식:** 최소값을 찾아 맨 앞으로 이동

**동작:**
1. 리스트에서 최소값 찾기
2. 맨 앞 원소와 교환
3. 정렬된 부분 제외하고 반복

**시간복잡도:**
- Best: O(n²)
- Average: O(n²)
- Worst: O(n²)

**특징:**
- 교환 횟수 적음
- 성능 비효율적

---

### 3. 삽입 정렬 (Insertion Sort)

**방식:** 정렬된 부분에 새 원소를 적절한 위치에 삽입

**동작:**
1. 두 번째 원소부터 시작
2. 이전 정렬된 부분과 비교
3. 적절한 위치에 삽입
4. 배열 끝까지 반복

**시간복잡도:**
- Best: O(n) (이미 정렬된 경우)
- Average: O(n²)
- Worst: O(n²)

**특징:**
- 거의 정렬된 데이터에 효율적
- 작은 데이터셋에 유리

---

### 4. ⭐ 병합 정렬 (Merge Sort)

**방식:** 분할 정복 (Divide and Conquer)

**동작:**
1. 리스트를 절반으로 분할
2. 각 부분을 재귀적으로 정렬
3. 정렬된 부분들을 병합

**시간복잡도:**
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n log n)

**특징:**
✅ 안정적인 성능 (항상 O(n log n))
✅ 안정 정렬 (Stable Sort)
❌ 추가 메모리 필요 (O(n))

---

### 5. ⭐ 퀵 정렬 (Quick Sort)

**방식:** 피벗 기준으로 분할 정복

**동작:**
1. 피벗 선택 (보통 중간 원소)
2. 피벗보다 작은 값은 왼쪽, 큰 값은 오른쪽
3. 분할된 부분을 재귀적으로 정렬

**시간복잡도:**
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n²) (피벗이 최소/최대값일 때)

**특징:**
✅ 평균적으로 가장 빠름
✅ 추가 메모리 적음
❌ 최악의 경우 O(n²)
❌ 불안정 정렬 (Unstable Sort)

**최적화:**
- 랜덤 피벗 선택
- 중간값(Median) 피벗 선택

---

### 6. 힙 정렬 (Heap Sort)

**방식:** 힙 자료구조 활용

**시간복잡도:**
- Best: O(n log n)
- Average: O(n log n)
- Worst: O(n log n)

**특징:**
✅ 안정적인 성능
✅ 추가 메모리 불필요
❌ 불안정 정렬

---

## 📊 정렬 알고리즘 비교

| 알고리즘 | Best | Average | Worst | 공간복잡도 | 안정성 |
|----------|------|---------|-------|------------|--------|
| **Bubble** | O(n²) | O(n²) | O(n²) | O(1) | 안정 |
| **Selection** | O(n²) | O(n²) | O(n²) | O(1) | 불안정 |
| **Insertion** | O(n) | O(n²) | O(n²) | O(1) | 안정 |
| **Merge** | O(n log n) | O(n log n) | O(n log n) | O(n) | 안정 |
| **Quick** | O(n log n) | O(n log n) | O(n²) | O(log n) | 불안정 |
| **Heap** | O(n log n) | O(n log n) | O(n log n) | O(1) | 불안정 |

---

## 💡 실무 선택 가이드

### 데이터 크기가 작을 때 (\u003c 100)
- **Insertion Sort** 추천
- 구현 간단, 오버헤드 적음

### 데이터 크기가 클 때
- **Quick Sort** 추천 (평균적으로 가장 빠름)
- **Merge Sort** 추천 (안정적 성능 필요 시)

### 안정 정렬이 필요할 때
- **Merge Sort** 또는 **Insertion Sort**

### 메모리가 제한적일 때
- **Quick Sort** 또는 **Heap Sort**

---

## ❓ 면접 질문 예시

### Q1. 퀵 정렬에 대해 설명해주세요.

**답변:**
퀵 정렬은 분할 정복 방식으로 피벗을 선택하여 피벗보다 작은 값은 왼쪽, 큰 값은 오른쪽으로 분할한 후 재귀적으로 정렬하는 알고리즘입니다. 평균 시간복잡도는 O(n log n)으로 매우 빠르지만, 최악의 경우 O(n²)가 될 수 있습니다. 추가 메모리가 적게 필요하지만 불안정 정렬입니다.

### Q2. 정렬의 최악의 경우 O(n²)인데, 이 문제를 해결하는 방법은?

**답변:**
O(n log n)을 보장하는 Merge Sort나 Heap Sort를 사용할 수 있습니다. Quick Sort의 경우 랜덤 피벗 선택이나 중간값 피벗 선택으로 최악의 경우를 회피할 수 있습니다. 또한 Intro Sort처럼 Quick Sort를 사용하다가 재귀 깊이가 깊어지면 Heap Sort로 전환하는 하이브리드 방식도 있습니다.

### Q3. Merge Sort와 Quick Sort의 차이는?

**답변:**
Merge Sort는 항상 O(n log n)을 보장하고 안정 정렬이지만 O(n)의 추가 메모리가 필요합니다. Quick Sort는 평균 O(n log n)으로 빠르고 추가 메모리가 적지만, 최악의 경우 O(n²)이고 불안정 정렬입니다. 일반적으로 Quick Sort가 더 빠르지만, 안정성과 성능 보장이 필요하면 Merge Sort를 사용합니다.

### Q4. 안정 정렬과 불안정 정렬의 차이는?

**답변:**
안정 정렬은 같은 값을 가진 원소들의 상대적 순서가 정렬 후에도 유지되는 정렬입니다. 예를 들어, (3, a), (1, b), (3, c)를 정렬할 때 안정 정렬은 (1, b), (3, a), (3, c) 순서를 유지하지만, 불안정 정렬은 (1, b), (3, c), (3, a)가 될 수 있습니다.

### Q5. 어떤 상황에서 어떤 정렬을 사용해야 하나요?

**답변:**
- 데이터가 작으면 Insertion Sort (간단하고 오버헤드 적음)
- 평균적으로 빠른 성능이 필요하면 Quick Sort
- 안정적인 성능 보장이 필요하면 Merge Sort
- 메모리가 제한적이면 Heap Sort
- 안정 정렬이 필요하면 Merge Sort

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [algorithm_sort.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Algorithm/algorithm_sort.md)
- 내용: 정렬 알고리즘 종류, 시간복잡도