---
title: "안정 정렬(Stable Sort)과 불안정 정렬(Unstable Sort)의 차이점은 무엇인가요?"
difficulty: "beginner"
frequency: "medium"
---

## 핵심 답변
안정 정렬은 중복된 키 값을 가진 요소들의 상대적인 순서가 정렬 이후에도 유지되는 정렬 알고리즘을 말합니다. 반면 불안정 정렬은 중복된 키 값들의 순서가 보장되지 않는 알고리즘입니다. 대표적인 안정 정렬로는 병합 정렬(Merge Sort)과 삽입 정렬(Insertion Sort)이 있으며, 불안정 정렬로는 퀵 정렬(Quick Sort)과 힙 정렬(Heap Sort)이 있습니다.

## 꼬리 질문
- **Q. 퀵 정렬(Quick Sort)의 최악의 시간복잡도와 이를 방지하기 위한 개선법은?**
  - A: 최악의 시간복잡도는 O(N^2)이며, 피벗을 선택할 때 난수를 사용하거나(Randomized Quick Sort) 중앙값(Median of three)을 피벗으로 선택하는 방법으로 최악의 경우를 피할 수 있습니다. 피벗이 한쪽으로 계속 쏠리지 않도록 방지하는 원리입니다.
