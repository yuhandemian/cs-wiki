---
title: "Spring의 IOC(제어의 역전)와 DI(의존성 주입)에 대해 설명해주세요."
difficulty: "intermediate"
frequency: "high"
---

## 핵심 답변
IOC(제어의 역전)란 객체의 생성부터 소멸까지 클래스 내부에서 개발자가 직접 `new`로 관리하던 흐름을 프레임워크인 Spring Container에게 넘기는 설계 원칙입니다. DI(의존성 주입)는 이러한 IOC를 구현하는 구체적인 디자인 패턴 중 하나로, 객체에 필요한 의존성을 외부 컨테이너(ApplicationContext)가 주입해주는 방식을 뜻합니다. 이를 통해 결합도를 낮추고 유연성과 테스트 용이성을 높일 수 있습니다.

## 꼬리 질문
- **Q. Spring에서 DI를 주입받는 세 가지 방식과 권장되는 방식은 무엇인가요?**
  - A: 필드 주입(Field Injection), 수정자 주입(Setter Injection), 생성자 주입(Constructor Injection) 세 가지가 있습니다. 이 중 스프링 공식 문서에서 제일 권장하는 방식은 생성자 주입으로, 순환 참조를 시작시점에 감지할 수 있고 필드를 `final`로 선언하여 불변성을 보장할 수 있기 때문입니다.
