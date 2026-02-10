---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites:
- OOP
related:
- HashMap
- Equals-HashCode
sources: 1
subtopic: Collection Framework
tags:
- collection-framework
- java-collections
- list-set-map
- data-structures
- interface-based
---

# Collection Framework

## 📝 개념 정의

**일반적으로 알려진 자료구조의 특징과 형태를 바탕으로 객체를 효율적으로 관리**할 수 있게 지원하는 프레임워크입니다.

**핵심:**
- Java 1.2부터 지원
- 표준화된 자료구조 제공
- 인터페이스 기반 설계

---

## 🏗️ 상속 구조

```
        Collection
       /     |     \
    List   Set    Queue
     |      |       |
ArrayList HashSet LinkedList
Vector  TreeSet
LinkedList
```

```
        Map
         |
    ┌────┴────┐
HashMap    TreeMap
HashTable
```

**특징:**
- 초록색: 인터페이스
- 파란색: 클래스
- 추상화된 인터페이스를 각 클래스에서 구현

---

## 📚 주요 컬렉션

### 1. List

**특징:**
- 순서 유지 (인덱스 존재)
- 중복 허용
- 배열과 유사한 구조

#### 주요 구현 클래스

**ArrayList:**
- 동적 크기 배열
- 동기화 X (멀티스레드 환경에서 주의)
- 빠른 속도

**Vector:**
- 동적 크기 배열
- 동기화 O (멀티스레드 안전)
- ArrayList보다 느림

**LinkedList:**
- 연결 리스트 구조
- 삽입/삭제 효율적

#### ArrayList vs Vector

| 특징 | ArrayList | Vector |
|------|-----------|--------|
| **동기화** | X | O |
| **속도** | 빠름 | 느림 |
| **멀티스레드** | 불안전 | 안전 |

**주의:**
- ArrayList는 멀티스레드 환경에서 동시 add 시 경합 발생 가능
- Vector는 동기화로 경합 방지

---

### 2. Set

**특징:**
- 중복 불허
- 순서 없음 (일반적으로)
- 인덱스 관리 X

#### 주요 구현 클래스

**HashSet:**
- 순서 없음
- 빠른 검색

**TreeSet:**
- 순서 있음 (정렬)
- 검색 특화

#### 중복 판별 방식

**`hashCode()`로 중복 판별**

```java
Set&lt;String&gt; set = new HashSet<>();
String str1 = "hi";
String str2 = new String("hi");

System.out.println(str1.hashCode());  // 3329
System.out.println(str2.hashCode());  // 3329

set.add(str1);
set.add(str2);

System.out.println(set.size());  // 1 (중복 제거됨)
```

**핵심:**
- `==` 연산자가 아닌 `equals()` 메서드로 비교
- `hashCode()`가 같으면 같은 객체로 판별

---

### 3. Map

**특징:**
- Key-Value 쌍으로 저장
- Key 중복 불가
- Value 중복 가능
- Key로 객체 관리

#### 주요 구현 클래스

**HashMap:**
- 순서 보장 X
- 동기화 X
- 빠른 속도

**HashTable:**
- 순서 보장 X
- 동기화 O
- 멀티스레드 안전

**TreeMap:**
- 순서 있음 (정렬)
- 검색 특화

#### HashMap vs HashTable

| 특징 | HashMap | HashTable |
|------|---------|-----------|
| **동기화** | X | O |
| **속도** | 빠름 | 느림 |
| **멀티스레드** | 불안전 | 안전 |

---

### 4. TreeSet과 TreeMap

**특징:**
- Tree 자료구조 기반
- 검색 기능 특화
- 순서 유지 (정렬)

**요구사항:**
- 저장되는 객체는 `Comparable` 인터페이스 구현 필수

**대안:**
```java
// Comparator 제공
new TreeSet<>(new ComparatorImpl());
```

---

### 5. Stack과 Queue

#### Stack

**특징:**
- LIFO (Last In First Out)
- Vector 클래스 상속
- 클래스로 구현

```java
Stack&lt;String&gt; stack = new Stack<>();
stack.push("A");
stack.pop();
```

#### Queue

**특징:**
- FIFO (First In First Out)
- 인터페이스
- LinkedList로 구현

```java
Queue&lt;String&gt; queue = new LinkedList<>();
queue.offer("A");
queue.poll();
```

---

## 🔒 수정 불가능한 컬렉션

### 생성 방법

**List, Set, Map:**
```java
List&lt;String&gt; list = List.of("A", "B", "C");
Set&lt;String&gt; set = Set.copyOf(list);
Map&lt;String, Integer&gt; map = Map.of("A", 1, "B", 2);
```

**배열 → List:**
```java
String[] arr = {"A", "B", "C"};
List&lt;String&gt; list = Arrays.asList(arr);
```

---

## 🛠️ Arrays와 Collections 클래스

### 역할

**정적 메서드 제공:**
- 채우기
- 복사
- 정렬
- 검색

**예시:**
```java
// Arrays
Arrays.sort(arr);
Arrays.fill(arr, 0);

// Collections
Collections.sort(list);
Collections.reverse(list);
```

---

## 📊 컬렉션 선택 가이드

### 언제 무엇을 사용할까?

| 요구사항 | 추천 컬렉션 |
|----------|-------------|
| **순서 + 중복 허용** | ArrayList, LinkedList |
| **중복 불허** | HashSet, TreeSet |
| **Key-Value** | HashMap, TreeMap |
| **정렬 필요** | TreeSet, TreeMap |
| **멀티스레드** | Vector, HashTable |
| **LIFO** | Stack |
| **FIFO** | Queue (LinkedList) |

---

## ❓ 면접 질문 예시

### Q1. Collection Framework란 무엇인가요?

**답변:**
일반적으로 알려진 자료구조의 특징과 형태를 바탕으로 객체를 효율적으로 관리할 수 있게 지원하는 프레임워크입니다. Java 1.2부터 지원하며, List, Set, Map 등의 인터페이스와 이를 구현한 다양한 클래스를 제공합니다.

### Q2. ArrayList와 Vector의 차이는?

**답변:**
둘 다 동적 크기 배열이지만, ArrayList는 동기화되지 않아 빠르지만 멀티스레드 환경에서 불안전합니다. Vector는 동기화되어 멀티스레드 환경에서 안전하지만 속도가 느립니다. 일반적으로 단일 스레드 환경에서는 ArrayList를 사용합니다.

### Q3. Set에서 중복을 어떻게 판별하나요?

**답변:**
`hashCode()` 메서드로 중복을 판별합니다. `==` 연산자가 아닌 `equals()` 메서드로 비교하여 true가 나오면 같은 객체로 판별합니다. 따라서 분명 다른 객체지만 같은 hashCode를 가지면 중복으로 간주됩니다.

### Q4. HashMap과 HashTable의 차이는?

**답변:**
HashMap은 동기화되지 않아 빠르지만 멀티스레드 환경에서 불안전합니다. HashTable은 동기화되어 멀티스레드 환경에서 안전하지만 속도가 느립니다. 현대 Java에서는 ConcurrentHashMap을 사용하는 것이 권장됩니다.

### Q5. TreeSet과 TreeMap의 특징은?

**답변:**
Tree 자료구조를 기반으로 하여 검색 기능에 특화되어 있으며, 순서를 유지합니다. 저장되는 객체는 Comparable 인터페이스를 구현해야 하며, 또는 생성 시 Comparator를 제공할 수 있습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [java_collection_framework.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Java/java_collection_framework.md)
- 내용: Collection 구조, List/Set/Map, Stack/Queue

### 추가 학습 자료

- [한빛미디어 - 이것이 자바다](https://product.kyobobook.co.kr/detail/S000061695652)
- [[Java] Stack 클래스는 무엇이고 문제점은 무엇일까?](https://devlog-wjdrbs96.tistory.com/244)