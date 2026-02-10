---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: HashMap
tags: []
---

# HashMap

## 📝 Hash란?

**해시 함수:** 임의 길이 데이터를 고정 길이 데이터로 매핑

**해싱:** 매핑 과정 자체

**해시 충돌:** 서로 다른 키가 동일한 해시값을 가지는 경우

---

## 🗂️ Hash Table

**배열과 해시 함수를 사용하여 Map 구현**

**키-값 쌍을 저장하는 자료구조**

**상수 시간 O(1)로 데이터 접근**

---

### 버킷 (Bucket)

**데이터가 저장되는 공간**

**슬롯(Slot)이라고도 함**

---

### 인덱스 계산

```java
int index = X.hashCode() % M;
```

**해시 코드의 나머지 값을 인덱스로 사용**

---

## 🔄 Hash Collision (해시 충돌)

### 발생 원인

**key는 다른데 hash가 같을 때**

**hash % capacity 결과가 같을 때**

**Many-to-one 대응**

---

## 💡 충돌 해결 방법

### 1. Open Addressing (개방 주소법)

**비어있는 버킷 활용**

**한 버킷당 하나의 엔트리만**

---

#### Linear Probing (선형 조사법)

**고정폭만큼 이동하여 빈 버킷 찾기**

**클러스터링 현상 발생**

---

#### Quadratic Probing (이차 조사법)

**제곱수만큼 이동 (1, 4, 9, 16...)**

**클러스터링 현상 발생**

---

#### Double Hashing (이중 해시)

**2개의 해시 함수 사용**

**클러스터링 문제 해결**

---

### 2. Separate Chaining (분리 연결법)

**한 버킷에 여러 엔트리 저장**

**연결 리스트로 노드 추가**

---

#### 장점

**유연함**

---

#### 단점

**메모리 문제 야기 가능**

**데이터 많아지면 캐시 효율성 감소**

---

## ☕ Java HashMap

**Separate Chaining 방식 사용**

**Open Addressing은 삭제 처리가 비효율적**

---

### Java 7 이전

**링크드 리스트만 사용**

---

### Java 8 이후

**데이터 개수에 따라 구조 변경**

**8개 이상:** 링크드 리스트 → Red-Black Tree

**트리 사용으로 성능 향상**

---

## 🆚 HashMap vs HashTable

### HashTable

**구현 변화 거의 없음**

**보조 해시 함수 미사용**

**Thread-safe (동기화)**

---

### HashMap

**지속적으로 개선**

**보조 해시 함수 사용**

**해시 충돌 덜 발생**

**성능상 이점**

**Thread-unsafe**

---

## 🔧 보조 해시 함수

**목적:** 해시 충돌 가능성 감소

**Java 8 구현:**

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

**상위 16비트 XOR 연산**

---

## ❓ 면접 질문 예시

### Q1. Hash란 무엇인가요?

**답변:**
Hash는 임의 길이의 데이터를 고정 길이의 데이터로 매핑하는 해시 함수를 사용하는 자료구조입니다. 주로 캐싱이나 key-value store(Redis, etcd 등)에서 사용되며, 특정 데이터를 임시 공간에 저장하고 나중에 키로 빠르게 찾을 때 활용됩니다.

### Q2. Hash Collision이란 무엇이고 어떻게 해결하나요?

**답변:**
Hash Collision은 서로 다른 키가 동일한 해시값을 가지는 경우입니다. 해결 방법은 두 가지입니다. 첫째, Open Addressing은 비어있는 버킷을 활용하여 Linear Probing, Quadratic Probing, Double Hashing 방식으로 해결합니다. 둘째, Separate Chaining은 한 버킷에 여러 엔트리를 연결 리스트로 저장합니다.

### Q3. Java HashMap은 어떻게 충돌을 해결하나요?

**답변:**
Java HashMap은 Separate Chaining 방식을 사용합니다. Java 7 이전에는 링크드 리스트만 사용했지만, Java 8부터는 하나의 버킷에 8개 이상의 키-값 쌍이 모이면 링크드 리스트를 Red-Black Tree로 변경하여 성능을 향상시킵니다.

### Q4. HashMap과 HashTable의 차이는?

**답변:**
HashTable은 구현 변화가 거의 없고 보조 해시 함수를 사용하지 않으며 Thread-safe합니다. HashMap은 지속적으로 개선되고 보조 해시 함수를 사용하여 해시 충돌이 덜 발생하고 성능상 이점이 있지만 Thread-unsafe합니다.

### Q5. 보조 해시 함수의 목적은?

**답변:**
보조 해시 함수의 목적은 키의 해시 값을 변형하여 해시 충돌 가능성을 줄이는 것입니다. Java 8에서는 상위 16비트 값을 XOR 연산하는 매우 단순한 형태의 보조 해시 함수를 사용합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/java/java_hashmap.md`
- 내용: Hash, HashMap, Hash Collision, Java HashMap

### 추가 학습 자료

- [해싱, 해시함수, 해시테이블](https://ratsgo.github.io/data%20structure&algorithm/2017/10/25/hash/)
- [맵(map)과 해시 테이블(hash table)](https://youtu.be/ZBu_slSH5Sk)
- [Java HashMap은 어떻게 동작하는가?](https://d2.naver.com/helloworld/831311)
- [HashMap 정리](https://hello-judy-world.tistory.com/205)