---
title: "해시 테이블(Hash Table)의 원리와 해시 충돌(Hash Collision) 해결 방식은?"
difficulty: "intermediate"
frequency: "high"
---

## 핵심 답변
해시 테이블은 키(Key)를 해시 함수에 넣어 얻은 버킷 인덱스(Hash 값)에 대응하는 원소를 저장하는 자료구조로, O(1)의 평균 탐색 속도를 갖습니다. 서로 다른 키가 동일한 해시 값을 갖는 해시 충돌(Collision)이 발생할 수 있는데, 이를 해결하기 위해 해시 버킷에 연결 리스트를 다는 체이닝(Chaining) 방식과, 비어있는 다른 슬롯을 찾아 저장하는 개방 주소법(Open Addressing - 선형탐사, 제곱탐사 등) 방식이 자주 쓰입니다.

## 꼬리 질문
- **Q. Java의 HashMap은 해시 충돌을 어떤 방식으로 해결하나요?**
  - A: 기본적으로 체이닝(Separate Chaining) 방식을 사용합니다. Java 8부터는 하나의 버킷 안에 충돌 노드의 수가 특정 임계치(8개)를 넘어가면 연결 리스트 구조를 레드-블랙 트리(Red-Black Tree)로 변환해 O(N)의 최악의 탐색 시간을 O(logN)으로 최적화합니다.
