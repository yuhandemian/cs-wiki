---
title: "트랜잭션(Transaction)의 ACID 특성을 설명해주세요."
difficulty: "intermediate"
frequency: "high"
---

## 핵심 답변
트랜잭션은 데이터베이스를 조작하는 논리적 작업 단위입니다. ACID 특성이란 안전한 트랜잭션 수행을 보장하는 원자성(Atomicity), 일관성(Consistency), 고립성(Isolation), 지속성(Durability)을 일컫습니다. 원자성은 모두 성공하거나 모두 실패해야 함을, 일관성은 트랜잭션 전후에 데이터의 무결성이 유지되어야 함을, 고립성은 동시에 실행되는 트랜잭션들이 서로 간섭하지 않음을, 지속성은 성공한 트랜잭션 결과는 영구적으로 반영됨을 의미합니다.

## 꼬리 질문
- **Q. 트랜잭션 격리 단위(Isolation Level)와 발생할 수 있는 문제들에 대해 설명해주세요.**
  - A: Read Uncommitted, Read Committed, Repeatable Read, Serializable 4단계가 존재합니다. 각 단계에 따라 Phantom Read, Non-Repeatable Read, Dirty Read 같은 문제가 발생할 수 있습니다.
- **Q. 스프링에서 `@Transactional`은 어떻게 동작하나요?**
  - A: AOP 기반으로 프록시 객체가 생성되어 메서드 실행 전 트랜잭션을 시작하고, 종료 시 커밋 혹은 런타임 예외 시 롤백을 수행합니다.
