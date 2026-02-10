---
category: Algorithm
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Hash
tags: []
---

# Hash (해시)

## 📝 개념 정의

**데이터를 고정된 크기의 고유한 값으로 변환시키는 함수**

**핵심:**
- 입력값 길이와 무관하게 일정한 길이 출력
- 같은 입력값 → 항상 같은 해시값
- 고유한 값 생성

---

## 🔑 Hash 함수 특징

### 1. 입력값 민감성

**조금만 변해도 완전히 다른 출력**

```
Input: "hello"  → Hash: a1b2c3d4
Input: "helo"   → Hash: x9y8z7w6
```

---

### 2. 역산 불가

**출력값으로 입력값 유추 어려움**

```
Hash: a1b2c3d4 → Input: ???
```

---

### 3. 결정성

**동일 입력 → 동일 출력**

```
"password" → 항상 같은 해시값
```

---

## 🎯 Hash 활용 분야

✅ **보안**
- 비밀번호 암호화
- 인증 과정

✅ **검색**
- 빠른 데이터 검색 (O(1))

✅ **데이터베이스**
- 인덱싱
- 캐싱

✅ **무결성 검증**
- 데이터 변조 확인

---

## 📊 HashMap

### 개념

**Key-Value 쌍으로 데이터 저장하는 해시 자료구조**

**Java 제공**

### 특징

✅ **Key 중복 불가**
- Value는 중복 가능

✅ **NULL 허용**
- Key, Value 모두 허용

❌ **순서 보장 안 함**

### 시간 복잡도

| 연산 | 평균 | 최악 |
|------|------|------|
| **검색** | O(1) | O(n) |
| **삽입** | O(1) | O(n) |
| **삭제** | O(1) | O(n) |

---

## 🔢 HashSet

### 개념

**중복되지 않는 요소들을 저장하는 집합**

**내부적으로 HashMap 사용**

### 특징

✅ **중복 불가**
- 중복 값 자동 제거

✅ **NULL 허용**

❌ **순서 보장 안 함**

### 주요 메서드

```java
HashSet&lt;String&gt; set = new HashSet<>();

// 추가
set.add("apple");

// 포함 확인
set.contains("apple");  // true

// 제거
set.remove("apple");

// 크기
set.size();

// 비어있는지 확인
set.isEmpty();

// 전체 삭제
set.clear();
```

---

## 🗂️ Hash Table

### 개념

**해시 함수로 Key와 Value를 연결하는 자료구조**

### 특징

✅ **빠른 연산**
- 검색, 삽입, 삭제 모두 O(1)

✅ **Key-Value 1:1 대응**
- Key와 Value 모두 유일

❌ **해시 충돌 가능**
- 성능 저하 가능

---

## 🔀 Hash Collision (해시 충돌)

### 문제

**서로 다른 Key가 같은 해시값을 가지는 경우**

```
Key1: "abc" → Hash: 123
Key2: "xyz" → Hash: 123 (충돌!)
```

---

## 🛠️ Collision 해결 방법

### 1. Open Addressing (개방 주소법)

**충돌 발생 시 다른 빈 slot 찾기**

**특징:**
✅ 추가 메모리 불필요
✅ 메모리 효율적

#### Linear Probing (선형 조사법)

**일정한 간격으로 이동**

```
충돌 발생 → +1 → +1 → +1 ...
```

**문제:**
❌ 클러스터링 발생
❌ 평균 탐색 시간 증가

---

#### Quadratic Probing (이차 조사법)

**제곱수로 이동**

```
충돌 발생 → +1² → +2² → +3² ...
```

**문제:**
❌ 여전히 클러스터링 가능

---

#### Double Hashing (이중 해시)

**2개의 해시 함수 사용**

```
Hash1: 최초 해시값
Hash2: 충돌 시 이동 폭
```

**특징:**
✅ 클러스터링 방지
✅ 균등한 분포

---

### 2. Separate Chaining (분리 연결법)

**Linked List (또는 Tree)로 충돌 해결**

```
Hash Table:
[0] → NULL
[1] → Node1 → Node2 → Node3
[2] → Node4
[3] → NULL
```

#### 시간 복잡도

| 연산 | 평균 | 최악 |
|------|------|------|
| **삽입** | O(1) | O(1) |
| **검색** | O(1) | O(n) |
| **삭제** | O(1) | O(n) |

**최악의 경우:**
- 모든 Key가 같은 해시값
- 길이 n의 Linked List 생성
- O(n) 시간 복잡도

---

## 📊 Java Hash 클래스 비교

### Hashtable

**특징:**
✅ 동기화 보장 (Thread-safe)
❌ 성능 저하

**사용:**
- 멀티스레드 환경

---

### HashMap

**특징:**
✅ 빠른 속도
❌ 동기화 미보장

**사용:**
- 단일 스레드 환경

---

### ConcurrentHashMap

**특징:**
✅ 동기화 보장
✅ 분할 잠금으로 성능 유지

**사용:**
- 멀티스레드 환경 (권장)

---

### LinkedHashMap

**특징:**
✅ 삽입 순서 보장

**사용:**
- 순서 중요한 경우

---

## ❓ 면접 질문 예시

### Q1. Hash란 무엇인가요?

**답변:**
데이터를 고정된 크기의 고유한 값으로 변환시키는 함수입니다. 입력값의 길이와 무관하게 일정한 길이의 값을 출력하며, 같은 입력값에 대해서는 항상 같은 해시값을 반환합니다. 보안, 검색, 데이터베이스 등 다양한 분야에서 사용됩니다.

### Q2. HashMap과 HashSet의 차이는?

**답변:**
HashMap은 Key-Value 쌍으로 데이터를 저장하며 Key는 중복 불가, Value는 중복 가능합니다. HashSet은 중복되지 않는 요소들을 저장하는 집합으로 내부적으로 HashMap을 사용하며 중복 값을 자동으로 제거합니다. 둘 다 순서를 보장하지 않습니다.

### Q3. Hash Collision이란 무엇이고 어떻게 해결하나요?

**답변:**
서로 다른 Key가 같은 해시값을 가지는 경우를 Hash Collision이라고 합니다. 해결 방법으로는 1) Open Addressing: 충돌 발생 시 다른 빈 slot을 찾는 방법 (Linear Probing, Quadratic Probing, Double Hashing) 2) Separate Chaining: Linked List나 Tree로 충돌을 해결하는 방법이 있습니다.

### Q4. Hashtable과 HashMap의 차이는?

**답변:**
Hashtable은 동기화를 보장하여 멀티스레드 환경에서 안전하지만 성능 저하가 발생합니다. HashMap은 동기화를 보장하지 않아 빠른 속도를 가지지만 멀티스레드 환경에서 안전하지 않습니다. 멀티스레드 환경에서는 ConcurrentHashMap을 사용하는 것이 권장됩니다.

### Q5. Hash Table의 시간 복잡도는?

**답변:**
평균적으로 검색, 삽입, 삭제 모두 O(1)의 시간 복잡도를 가집니다. 하지만 해시 충돌이 발생할 경우 최악의 경우 O(n)까지 성능이 저하될 수 있으므로 충돌을 최소화할 수 있는 해시 함수를 사용해야 합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/Algorithm/algorithm_hash.md`
- 내용: Hash, HashMap, HashSet, Hash Table, Collision 해결