---
category: Java
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Stream API
tags: []
---

# Stream API

## 📝 Stream API란?

**객체 컬렉션을 처리하는 강력한 도구**

**목적:** 간결하고 읽기 쉬운 코드로 컬렉션 작업 수행

**특징:** 함수형 프로그래밍 방식

---

## 🔑 주요 기능

### 1. Functional Programming

**람다 식과 메소드 참조 사용**

**컬렉션 작업 수행**

---

### 2. Lazy Evaluation

**필요할 때만 요소 평가**

**메모리 사용량 감소**

**성능 향상**

---

### 3. Parallel Processing

**병렬 처리 가능**

**멀티 코어 프로세서 활용**

**처리 속도 향상**

---

### 4. Intermediate & Terminal Operations

**중간 연산:** 새 스트림 반환 (filter, map)

**최종 연산:** 최종 결과 생성

---

## ✅ Stream API 특징

### 1. 원본 데이터 변경 안 함

**원본 데이터 조회만**

**별도 요소로 Stream 생성**

**정렬/필터링은 별도 Stream에서 처리**

---

### 2. 일회용

**한 번 사용하면 재사용 불가**

**다시 필요하면 재생성**

---

### 3. 내부 반복

**for/while 문법 숨김**

**간결한 코드 작성 가능**

---

### 4. 지연 연산

**filter-map 기반 API**

**성능 최적화**

---

### 5. 병렬 처리 지원

**parallelStream() 메소드**

**손쉬운 병렬 처리**

---

## 📊 Stream API 3단계

### 1. 생성하기

**배열, 컬렉션, 임의의 수, 파일 등에서 생성**

---

### 2. 가공하기 (중간 연산)

**원본 데이터를 원하는 형태로 처리**

**반환값이 Stream → 연속 연결 가능**

---

### 3. 결과 만들기 (최종 연산)

**요소 소모하며 연산 수행**

**한 번만 처리 가능**

---

## 🔧 Stream 생성

### 1. 컬렉션

```java
List&lt;String&gt; list = Arrays.asList("a", "b", "c");
Stream&lt;String&gt; stream = list.stream();
```

**Collection 인터페이스에 stream() 메소드 정의**

---

### 2. 배열

```java
String[] arr = {"a", "b", "c"};
Stream&lt;String&gt; stream = Arrays.stream(arr);
```

**기본 타입:** IntStream, LongStream, DoubleStream

---

### 3. 가변 매개변수

```java
Stream&lt;Double&gt; stream = Stream.of(1.1, 2.2, 3.3);
```

---

### 4. 지정 범위 연속 정수

```java
IntStream stream = IntStream.range(1, 5);      // 1,2,3,4
IntStream stream = IntStream.rangeClosed(1, 5); // 1,2,3,4,5
```

**range():** 마지막 정수 미포함

**rangeClosed():** 마지막 정수 포함

---

### 5. 난수

```java
IntStream stream = new Random().ints(4);
```

**매개변수 없으면 무한 스트림 → limit() 필요**

---

### 6. 람다 표현식

```java
IntStream stream = IntStream.iterate(2, n -> n + 2).limit(10);
```

**iterate(), generate() 메소드**

---

### 7. 파일

```java
Stream&lt;String&gt; stream = Files.lines(Path path);
```

**한 행을 요소로 하는 스트림**

---

### 8. 빈 스트림

```java
Stream&lt;Object&gt; stream = Stream.empty();
```

---

## 🔄 중간 연산

### 1. 필터링

**filter():** 조건에 맞는 요소만

**distinct():** 중복 제거 (equals() 사용)

---

### 2. 변환

**map():** 함수 적용하여 변환

**flatMap():** 각 배열 요소를 하나로 합침

---

### 3. 제한

**limit():** 개수만큼만

**skip():** 개수만큼 제외

---

### 4. 정렬

**sorted():** 정렬 (기본 오름차순)

---

### 5. 연산 결과 확인

**peek():** 요소 소모 없이 중간 결과 확인

---

## 🎯 최종 연산

### 1. 출력

**forEach():** 각 요소 소모하여 동작 수행

---

### 2. 소모

**reduce():** 요소들을 하나로 줄임

---

### 3. 검색

**findFirst():** 첫 번째 요소

**findAny():** 임의 요소 (병렬 스트림)

---

### 4. 검사

**anyMatch():** 일부 요소가 조건 만족

**allMatch():** 모든 요소가 조건 만족

**noneMatch():** 모든 요소가 조건 불만족

---

### 5. 통계

**count():** 총 개수

**max(), min():** 최대/최소값

---

### 6. 연산

**sum(), average():** 합계/평균 (기본 타입 스트림)

---

### 7. 수집

**collect():** Collectors 객체로 수집

**변환:** toArray(), toList(), toSet(), toMap()

**통계:** counting(), maxBy(), minBy(), summingInt()

**소모:** reducing(), joining()

**그룹화:** groupingBy(), partitioningBy()

---

## ❓ 면접 질문 예시

### Q1. Stream API란 무엇인가요?

**답변:**
Stream API는 Java에서 객체 컬렉션을 처리하는 강력한 도구로 간결하고 읽기 쉬운 코드로 컬렉션 작업을 수행할 수 있습니다. 함수형 프로그래밍 방식을 사용하여 데이터를 필터링, 변환, 집계할 수 있으며, 병렬 처리가 가능하도록 설계되어 멀티 코어 프로세서를 활용할 수 있습니다.

### Q2. Stream API의 특징은?

**답변:**
Stream API는 원본 데이터를 변경하지 않고, 일회용이며, 내부 반복으로 작업을 처리합니다. filter-map 기반 API로 지연 연산을 통해 성능을 최적화하고, parallelStream() 메소드로 손쉬운 병렬 처리를 지원합니다.

### Q3. 중간 연산과 최종 연산의 차이는?

**답변:**
중간 연산은 filter, map 등으로 새 스트림을 반환하여 연속으로 연결할 수 있습니다. 최종 연산은 forEach, collect 등으로 최종 결과를 생성하며, 지연되었던 모든 중간 연산이 최종 연산에서 수행되고 스트림은 더 이상 사용할 수 없습니다.

### Q4. Stream을 어떻게 생성하나요?

**답변:**
Stream은 컬렉션(stream()), 배열(Arrays.stream()), 가변 매개변수(Stream.of()), 범위(IntStream.range()), 난수(Random.ints()), 람다(iterate(), generate()), 파일(Files.lines()), 빈 스트림(Stream.empty()) 등 다양한 방법으로 생성할 수 있습니다.

### Q5. parallelStream()은 무엇인가요?

**답변:**
parallelStream()은 스트림을 병렬로 처리하는 메소드입니다. 멀티 코어 프로세서를 활용하여 처리 속도를 높일 수 있으며, 내부적으로 Fork/Join 프레임워크를 사용하여 작업을 분할하고 병합합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [java_stream_api.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Java/java_stream_api.md)
- 내용: Stream API, 중간/최종 연산, 생성 방법