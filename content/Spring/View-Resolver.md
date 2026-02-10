---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: View Resolver
tags: []
---

# View Resolver

## 📝 View Resolver란?

**Controller에서 요청하는 View를 찾아 DispatcherServlet에 반환**

**ViewName을 실제 View로 변환**

---

## 🔄 Spring MVC 동작 순서

### 1. DispatcherServlet이 HTTP 요청 받음

---

### 2. Handler Mapping을 통해 Controller 찾음

**요청 URL에 매핑된 Controller 검색**

---

### 3. Handler Adapter 찾음

**Controller를 실행할 Handler Adapter 검색**

---

### 4. Handler Adapter를 통해 Controller 접근

---

### 5. Controller 실행

**비즈니스 로직 처리**

---

### 6. ModelAndView를 DispatcherServlet에 전달

**Handler Adapter가 Controller 반환값 전달**

---

### 7. ViewResolver로 View 찾기

**논리적 이름을 물리적 이름으로 변환**

**렌더링 담당 View 반환**

---

### 8. View 렌더링 후 Client에 전달

---

## 🔧 View Resolver 종류

### 1. InternalResourceViewResolver

**기본 설정된 View Resolver**

**JSP 파일 경로 설정**

```properties
spring.mvc.view.prefix=/WEB-INF/views/
spring.mvc.view.suffix=.jsp
```

**prefix:** 파일 경로

**suffix:** 파일 접미사

---

### 2. BeanNameViewResolver

**View Resolver 체인에서 유용**

**같은 이름의 View 타입 빈 선택**

**재정의/교체 불필요**

---

### 3. ContentNegotiatingViewResolver

**View 타입 빈이 실제 존재할 때만 추가**

**Composite Resolver**

**Accept HTTP 헤더와 일치하는 항목 찾기**

---

### 4. ThymeleafViewResolver

**Thymeleaf 템플릿 사용 시 추가**

**prefix와 suffix로 리소스 찾기**

```properties
spring.thymeleaf.prefix=classpath:/templates/
spring.thymeleaf.suffix=.html
```

**기본값:**
- prefix: `classpath:/templates/`
- suffix: `.html`

**재정의:** 같은 이름의 빈 정의

---

### 5. FreeMarkerViewResolver

**FreeMarker 사용 시 추가**

**prefix와 suffix로 리소스 찾기**

```properties
spring.freemarker.templateLoaderPath=classpath:/templates/
spring.freemarker.prefix=
spring.freemarker.suffix=.ftlh
```

**기본값:**
- templateLoaderPath: `classpath:/templates/`
- suffix: `.ftlh`

**재정의:** 같은 이름의 빈 정의

---

### 6. GroovyMarkupViewResolver

**Groovy 템플릿 사용 시 추가**

**prefix와 suffix로 리소스 찾기**

```properties
spring.groovy.prefix=classpath:/templates/
spring.groovy.suffix=.tpl
```

**기본값:**
- prefix: `classpath:/templates/`
- suffix: `.tpl`

**재정의:** 같은 이름의 빈 정의

---

### 7. MustacheViewResolver

**Mustache 사용 시 추가**

**prefix와 suffix로 리소스 찾기**

```properties
spring.mustache.prefix=classpath:/templates/
spring.mustache.suffix=.mustache
```

**기본값:**
- prefix: `classpath:/templates/`
- suffix: `.mustache`

**재정의:** 같은 이름의 빈 정의

---

## ❓ 면접 질문 예시

### Q1. View Resolver란 무엇인가요?

**답변:**
View Resolver는 Controller에서 요청하는 View를 찾아 DispatcherServlet에 반환하는 역할을 합니다. Controller가 반환한 논리적 ViewName을 실제 물리적 View로 변환하여 렌더링을 담당하는 View를 반환합니다.

### Q2. InternalResourceViewResolver는 무엇인가요?

**답변:**
InternalResourceViewResolver는 기본적으로 설정된 View Resolver로 JSP 파일을 처리합니다. spring.mvc.view.prefix로 파일 경로를, spring.mvc.view.suffix로 파일 접미사를 설정하여 ViewName에 prefix와 suffix를 붙여 실제 JSP 파일을 찾습니다.

### Q3. ThymeleafViewResolver의 기본 설정은?

**답변:**
ThymeleafViewResolver는 Thymeleaf 템플릿 사용 시 자동으로 추가되며, 기본 prefix는 classpath:/templates/, 기본 suffix는 .html입니다. ViewName에 prefix와 suffix를 붙여 템플릿 파일을 찾습니다.

### Q4. View Resolver는 Spring MVC에서 어느 시점에 동작하나요?

**답변:**
View Resolver는 Controller가 실행되고 ModelAndView를 반환한 후 동작합니다. DispatcherServlet이 ModelAndView를 받아 ViewResolver를 통해 논리적 ViewName을 물리적 View로 변환하고, 해당 View를 렌더링하여 클라이언트에게 응답합니다.

### Q5. 여러 View Resolver를 동시에 사용할 수 있나요?

**답변:**
네, Spring은 View Resolver 체인을 지원하여 여러 View Resolver를 동시에 사용할 수 있습니다. 우선순위에 따라 순차적으로 View를 찾으며, BeanNameViewResolver나 ContentNegotiatingViewResolver가 이러한 체인 구조에서 유용하게 사용됩니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/spring/spring_view_resolver.md`
- 내용: View Resolver, 종류, 동작 순서

### 추가 학습 자료

- [Spring Boot - Customize ViewResolvers](https://godekdls.github.io/Spring%20Boot/howto.spring-mvc/#1248-customize-viewresolvers)
- [Spring Boot Reference](https://docs.spring.io/spring-boot/docs/2.5.2/reference/htmlsingle/)