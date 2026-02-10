---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Controller vs RestController
tags: []
---

# @Controller vs @RestController

## 📝 개요

**둘 다 Spring에서 Controller를 지정하는 어노테이션**

**주요 차이점:** ResponseBody 생성 방식

---

## 🎯 @Controller

**Spring MVC의 전통적인 컨트롤러 어노테이션**

**기본적으로 View를 반환**

---

## 🔄 @Controller 동작 과정

```
1. Client 요청
2. DispatcherServlet이 요청 받음
3. Controller가 ViewName 반환
4. DispatcherServlet이 ViewResolver 호출
5. ViewResolver가 View 찾아서 반환
6. View 렌더링 후 Client에 응답
```

---

## 📊 @RestController

**@Controller + @ResponseBody**

**View가 아닌 Data를 반환**

---

## 🔄 @RestController 동작 과정

```
1. Client 요청
2. DispatcherServlet이 요청 받음
3. Controller가 Data(객체) 반환
4. HttpMessageConverter가 동작
5. JSON 형태로 변환
6. Client에 응답
```

**일반적으로 JSON 형태의 데이터 반환**

**ResponseEntity 생성하여 헤더/쿠키/바디에 배치**

---

## 🆚 차이점 정리

### @Controller

**반환:** View

**용도:** 화면(HTML) 반환

**처리:** ViewResolver

---

### @RestController

**반환:** Data (JSON)

**용도:** API 응답

**처리:** HttpMessageConverter

---

## 💡 @Controller에서 Data 반환

**@ResponseBody 어노테이션 사용**

```java
@Controller
public class MyController {
    
    @GetMapping("/get")
    public @ResponseBody ResponseEntity&lt;Data&gt; getData() {
        return ResponseEntity.ok(myService.getData());
    }
}
```

**ViewResolver 대신 HttpMessageConverter 동작**

**데이터 타입에 따른 Converter 사용**

---

## 🔧 HttpMessageConverter

**@ResponseBody 사용 시 동작**

**객체를 JSON/XML 등으로 변환**

**다양한 Converter 내장:**
- MappingJackson2HttpMessageConverter (JSON)
- Jaxb2RootElementHttpMessageConverter (XML)
- StringHttpMessageConverter (String)

---

## ❓ 면접 질문 예시

### Q1. @Controller와 @RestController의 차이는?

**답변:**
@Controller는 Spring MVC의 전통적인 컨트롤러로 기본적으로 View를 반환하며 ViewResolver를 통해 View를 찾습니다. @RestController는 @Controller와 @ResponseBody가 합쳐진 어노테이션으로 View가 아닌 Data(주로 JSON)를 반환하며 HttpMessageConverter가 동작합니다.

### Q2. @Controller에서 JSON 데이터를 반환하려면?

**답변:**
@Controller에서 JSON 데이터를 반환하려면 @ResponseBody 어노테이션을 사용합니다. 이 경우 ViewResolver 대신 HttpMessageConverter가 동작하여 객체를 JSON으로 변환합니다. 일반적으로 ResponseEntity로 감싸서 반환합니다.

### Q3. ViewResolver는 무엇인가요?

**답변:**
ViewResolver는 Controller에서 반환한 ViewName을 실제 View로 변환하는 역할을 합니다. DispatcherServlet이 ViewResolver를 통해 해당하는 View를 찾아서 클라이언트에게 반환합니다.

### Q4. HttpMessageConverter는 언제 동작하나요?

**답변:**
HttpMessageConverter는 @ResponseBody 어노테이션이 사용되거나 @RestController가 사용될 때 동작합니다. ViewResolver 대신 동작하여 객체를 JSON, XML 등의 형태로 변환합니다. 데이터 타입에 따라 적절한 Converter를 사용합니다.

### Q5. @RestController는 언제 사용하나요?

**답변:**
@RestController는 RESTful API를 개발할 때 사용합니다. 화면(View)을 반환하는 것이 아니라 JSON 형태의 데이터를 반환하는 API 서버를 만들 때 적합합니다. 프론트엔드와 백엔드가 분리된 구조에서 주로 사용합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [spring_controller_vs_rest_controller.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Spring/spring_controller_vs_rest_controller.md)
- 내용: @Controller, @RestController, 차이점

### 추가 학습 자료

- [The Spring @Controller and @RestController Annotations](https://www.baeldung.com/spring-controller-vs-restcontroller)
- [@Controller와 @RestController의 차이](https://velog.io/@dyunge_100/Spring-Controller%EC%99%80-RestController%EC%9D%98-%EC%B0%A8%EC%9D%B4)