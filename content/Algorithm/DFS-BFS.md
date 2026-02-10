---
category: Algorithm
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 2
subtopic: DFS & BFS
tags: []
---

# DFS & BFS (깊이 우선 탐색과 너비 우선 탐색)

## 📝 개념 정의

**트리나 그래프를 탐색하는 두 가지 대표적인 알고리즘**

---

## 🌊 BFS (Breadth-First Search, 너비 우선 탐색)

**루트에서 시작하여 각 층을 왼쪽에서 오른쪽으로 탐색**

### 동작 방식

```
1층: 루트 탐색
2층: 왼쪽 → 오른쪽
3층: 왼쪽 → 오른쪽
...
```

---

### 특징

✅ 가까운 노드부터 우선 탐색
✅ Queue 자료구조 사용

❌ 메모리 많이 사용 (각 층의 모든 자식 노드 저장)
❌ 큰 트리에서 느림

---

### 시간 복잡도

**O(n)**

**n = 노드 수**

---

### 구현

**Queue 사용**

```python
from collections import deque

def bfs(graph, start):
    visited = []
    queue = deque([start])
    
    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.append(node)
            queue.extend(graph[node])
    
    return visited
```

---

### 적합한 경우

- **최단 경로** 찾기
- **레벨 순서** 탐색
- **가까운 노드** 우선 탐색

---

## 🏔️ DFS (Depth-First Search, 깊이 우선 탐색)

**한 가지를 따라 끝까지 내려간 후 돌아와서 다른 가지 탐색**

### 동작 방식

```
1. 한 가지를 끝까지 탐색
2. 더 이상 갈 곳 없으면 돌아감
3. 확인하지 않은 자식이 있는 가장 가까운 조상으로 이동
4. 반복
```

---

### 특징

✅ 메모리 요구량 적음 (각 층의 모든 자식 저장 불필요)
✅ 특정 층을 마지막에 탐색하지 않음
✅ 깊은 곳에 있는 노드 빨리 찾음

---

### 시간 복잡도

**O(n)**

**n = 노드 수**

---

### 구현

**Stack 또는 재귀 사용**

#### 재귀 방식

```python
def dfs_recursive(graph, node, visited=[]):
    if node not in visited:
        visited.append(node)
        for neighbor in graph[node]:
            dfs_recursive(graph, neighbor, visited)
    return visited
```

#### Stack 방식

```python
def dfs_stack(graph, start):
    visited = []
    stack = [start]
    
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.append(node)
            stack.extend(reversed(graph[node]))
    
    return visited
```

---

### 적합한 경우

- **모든 경로** 탐색
- **백트래킹** 문제
- **깊은 곳**에 있는 노드 찾기
- **사이클 감지**

---

## 📊 BFS vs DFS 비교

| 특징 | BFS | DFS |
|------|-----|-----|
| **탐색 방식** | 너비 우선 (층별) | 깊이 우선 (가지별) |
| **자료구조** | Queue | Stack / 재귀 |
| **메모리** | 많음 | 적음 |
| **최단 경로** | 보장 | 보장 안 됨 |
| **구현** | 반복문 | 재귀 / 반복문 |
| **적합** | 가까운 노드, 최단 경로 | 깊은 노드, 모든 경로 |

---

## 🎯 사용 예시

### BFS 예시

**회사 조직도에서 같은 직급 찾기**

```
CEO (1층)
  ↓
부사장들 (2층) ← BFS로 빠르게 찾음
  ↓
팀장들 (3층)
```

---

### DFS 예시

**회사 조직도에서 신입사원 찾기**

```
CEO
  ↓
부사장
  ↓
팀장
  ↓
신입사원 ← DFS로 빠르게 찾음
```

---

## 💡 완전 탐색에서의 활용

### BFS/DFS는 완전 탐색 기법 중 하나

**완전 탐색 기법:**
1. 단순 Brute-Force (for/if문)
2. 비트마스크
3. 재귀함수
4. 순열
5. **BFS/DFS** ← 길 찾기 등에 주로 사용

---

## ❓ 면접 질문 예시

### Q1. BFS와 DFS의 차이는?

**답변:**
BFS는 너비 우선 탐색으로 루트에서 시작하여 각 층을 왼쪽에서 오른쪽으로 탐색하며 Queue를 사용합니다. DFS는 깊이 우선 탐색으로 한 가지를 끝까지 탐색한 후 돌아와서 다른 가지를 탐색하며 Stack 또는 재귀를 사용합니다. BFS는 메모리를 많이 사용하지만 최단 경로를 보장하고, DFS는 메모리를 적게 사용하지만 최단 경로를 보장하지 않습니다.

### Q2. BFS가 적합한 경우는?

**답변:**
BFS는 최단 경로를 찾거나 레벨 순서로 탐색해야 할 때, 가까운 노드를 우선적으로 탐색해야 할 때 적합합니다. 예를 들어 미로에서 출구까지의 최단 거리를 찾거나, 회사 조직도에서 같은 직급의 사람들을 찾을 때 유용합니다.

### Q3. DFS가 적합한 경우는?

**답변:**
DFS는 모든 경로를 탐색해야 하거나 백트래킹 문제, 깊은 곳에 있는 노드를 찾아야 할 때 적합합니다. 예를 들어 미로의 모든 경로를 탐색하거나, 회사 조직도에서 신입사원을 찾거나, 그래프에서 사이클을 감지할 때 유용합니다.

### Q4. BFS와 DFS의 시간 복잡도는?

**답변:**
BFS와 DFS 모두 시간 복잡도는 O(n)입니다. 여기서 n은 노드의 수입니다. 두 알고리즘 모두 모든 노드를 한 번씩 방문하기 때문에 시간 복잡도는 동일하지만, 메모리 사용량과 탐색 순서가 다릅니다.

### Q5. BFS는 왜 메모리를 많이 사용하나요?

**답변:**
BFS는 각 층을 탐색할 때 그 층에 있는 모든 노드의 자식 노드를 Queue에 저장해야 하기 때문에 메모리를 많이 사용합니다. 반면 DFS는 한 가지를 끝까지 탐색하므로 현재 경로상의 노드만 저장하면 되어 메모리 요구량이 적습니다.

---

## 📚 원본 참고 자료

### 출처 1: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/Algorithm/algorithm_tree.md`
- 내용: BFS, DFS, 트리 탐색

### 출처 2: 2023-CS-Study
- 링크: [algorithm_brute_force_search.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Algorithm/algorithm_brute_force_search.md)
- 내용: 완전 탐색, BFS/DFS 활용

### 추가 학습 자료

- [프로그래밍 면접 이렇게 준비한다](http://www.yes24.com/Product/Goods/75187284)