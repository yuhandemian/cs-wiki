---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Validation & @Valid
tags: []
---

# Validation & @Valid (검증)

## 📝 검증은 왜 필요한가?

**Controller의 중요한 역할: HTTP 요청이 정상인지 검증**

### 클라이언트 검증만으로는 부족

❌ 클라이언트 검증은 조작 가능 → 보안 취약
✅ 서버에서도 잘못된 요청 검증 필요

---

## 🔍 Bean Validation

**Bean Validation 2.0 (JSR-380) 기술 표준**

**= 검증 Annotation과 인터페이스 모음**

**구현체:** Hibernate Validator (일반적으로 사용)

---

### 의존성 추가

```gradle
implementation 'org.springframework.boot:spring-boot-starter-validation'
```

**추가되는 라이브러리:**
- `jakarta.validation-api`: Bean Validation 인터페이스
- `hibernate-validator`: 구현체

---

## 📋 Validation Annotation 종류

### 논리 검증

- `@AssertFalse`: false 값만 통과
- `@AssertTrue`: true 값만 통과

---

### 숫자 검증

- `@DecimalMax(value=, inclusive=)`: 지정 값 이하 실수
- `@DecimalMin(value=, inclusive=)`: 지정 값 이상 실수
- `@Digits(integer=, fraction=)`: 지정 정수/소수 자릿수보다 적음
- `@Max(value=)`: 지정 값 이하
- `@Min(value=)`: 지정 값 이상

---

### Null 검증

- `@NotNull`: null 아님
- `@NotEmpty`: null, "" 아님
- `@NotBlank`: null, "", " " 아님 ⭐
- `@Null`: null만 통과

**권장:**
- 문자열: `@NotBlank` (공백까지 체크)
- Collection: `@NotEmpty`
- 객체: `@NotNull`

---

### 기타 검증

- `@Email`: 이메일 형식
- `@Future`: 현재보다 미래 날짜
- `@Past`: 현재보다 과거 날짜
- `@Pattern(regex=, flag=, message=)`: 정규식 만족
- `@Size(min=, max=)`: 문자열/배열 크기 범위

---

## 💻 DTO에 적용하기

### @Valid 필수

**Controller 메서드 매개변수에 `@Valid` 붙여야 동작**

```java
@PostMapping("/records")
public ResponseEntity&lt;?&gt; createRecord(
    @Valid @RequestBody CreateRecordRequest request
) {
    ...
}
```

---

### DTO 예시

```java
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateRecordRequest {
    
    @NotNull(message = "지출 비용을 입력해주세요.")
    @Min(value = 0, message = "지출 비용 최소 값은 0입니다.")
    @Max(value = 999999, message = "지출 비용 최대 값은 999999입니다.")
    private Integer price;
    
    @NotBlank(message = "지출 명을 입력해주세요.")
    @Size(min = 1, max = 16, message = "지출 명은 16자 이하입니다.")
    private String title;
    
    @NotBlank(message = "내용을 입력해주세요.")
    @Size(min = 1, max = 80, message = "내용은 80자 이하입니다.")
    private String content;
    
    private String imgUrl;
    
    @NotNull(message = "지출 평가를 입력해주세요.")
    @Min(value = 1, message = "점수는 1부터 시작합니다.")
    @Max(value = 4, message = "점수는 4이하 입니다.")
    private Integer evaluation;
}
```

---

### 메시지에 입력 값 표시

```java
@Email(message = "올바르지 않은 이메일형식입니다: ${validatedValue}")
```

---

## 🔄 @Valid 동작 시점

### Spring MVC 구조

```
Client Request
    ↓
DispatcherServlet
    ↓
Handler Mapping
    ↓
Handler Adapter ← @Valid 동작
    ↓
Handler (Controller)
```

**핸들러 어댑터가 핸들러를 호출하는 과정에서 동작**

---

### RequestMappingHandlerAdapter

```
Handler Adapter
    ↓
Argument Resolver ← @Valid 동작
    ↓
JSON → 객체 변환
    ↓
Validation 검증
```

**Argument Resolver가 JSON을 객체로 변환하는 과정에서 동작**

---

### 예외 발생

**검증 실패 시:**
`MethodArgumentNotValidException` 발생

---

## 🧪 Controller 테스트

```java
@Test
void validationTest() {
    CreateRecordRequest request = CreateRecordRequest.builder()
        .price(3000)
        .title(" ") // 공백 - 실패
        .content("커피는 무죄야")
        .imgUrl("")
        .evaluation(1)
        .build();
    
    // 테스트 실행
    mockMvc.perform(post("/records")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isBadRequest());
}
```

---

## 🧪 DTO 단독 테스트

```java
class CreateRecordRequestTest {
    
    private static ValidatorFactory factory;
    private static Validator validator;
    
    @BeforeAll
    public static void init() {
        factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }
    
    @Test
    void title_validation() {
        CreateRecordRequest request = CreateRecordRequest.builder()
            .price(3000)
            .title(" ") // 공백
            .content("커피는 무죄야")
            .imgUrl("")
            .evaluation(1)
            .build();
        
        Set&lt;ConstraintViolation&lt;CreateRecordRequest&gt;&gt; violations = 
            validator.validate(request);
        
        for (ConstraintViolation&lt;CreateRecordRequest&gt; violation : violations) {
            System.err.println(violation.getMessage());
        }
    }
}
```

**대부분 Controller와 통합 테스트 권장**

---

## 🤔 고민: DTO vs Domain 검증

### 문제 상황

**제약조건 변경 시 DTO와 Domain 모두 수정 필요**

```java
// DTO
@Min(value = 1, message = "점수는 1부터")
@Max(value = 4, message = "점수는 4이하") // 5 → 4로 변경

// Domain
if (evaluation < 1 || evaluation > 4) { // 5 → 4로 변경
    throw new IllegalArgumentException();
}
```

**문제:**
- 한 번의 요구사항 변경 → 여러 곳 수정
- 유지보수성 저하

---

### 장단점

#### DTO 검증 장점

✅ Controller 단에서 요청 차단
✅ 빠른 실패 (Fail Fast)

#### DTO 검증 단점

❌ 제약조건 변경 시 여러 곳 수정
❌ 중복 코드 가능성

---

### 권장 사항

**상황에 따라 선택**

1. **간단한 형식 검증**: DTO에서 처리
2. **비즈니스 로직 검증**: Domain에서 처리
3. **중요한 제약조건**: 양쪽 모두 검증

---

## ❓ 면접 질문 예시

### Q1. Bean Validation이란 무엇인가요?

**답변:**
Bean Validation은 Bean Validation 2.0 (JSR-380)이라는 기술 표준으로, 검증 어노테이션과 여러 인터페이스의 모음입니다. 일반적으로 Hibernate Validator 구현체를 사용하며, 어노테이션 하나로 검증 로직을 매우 편리하게 적용할 수 있습니다.

### Q2. @NotNull, @NotEmpty, @NotBlank의 차이는?

**답변:**
@NotNull은 null 값이 아닐 경우만 통과하며 주로 객체에 사용합니다. @NotEmpty는 null과 빈 문자열("")이 아닌 경우 통과하며 주로 Collection에 사용합니다. @NotBlank는 null, 빈 문자열, 공백(" ")이 아닌 경우 통과하며 문자열에 사용하는 것이 권장됩니다.

### Q3. @Valid는 언제 동작하나요?

**답변:**
@Valid는 핸들러 어댑터가 핸들러(Controller)를 호출하는 과정에서 동작합니다. 좀 더 자세히는 RequestMappingHandlerAdapter가 Argument Resolver를 통해 JSON 타입의 데이터를 객체로 변환하는 과정에서 동작하며, 검증 실패 시 MethodArgumentNotValidException이 발생합니다.

### Q4. DTO에서 검증하는 것과 Domain에서 검증하는 것의 차이는?

**답변:**
DTO 검증은 Controller 단에서 잘못된 요청을 빠르게 차단할 수 있다는 장점이 있지만, 제약조건 변경 시 여러 곳을 수정해야 하는 단점이 있습니다. Domain 검증은 비즈니스 로직과 함께 관리할 수 있지만 Controller까지 요청이 도달한다는 단점이 있습니다. 일반적으로 간단한 형식 검증은 DTO에서, 비즈니스 로직 검증은 Domain에서 처리하는 것이 권장됩니다.

### Q5. 서버에서 검증이 필요한 이유는?

**답변:**
클라이언트 검증은 조작할 수 있어 보안에 취약합니다. 또한 클라이언트를 거치지 않은 요청(예: API 직접 호출)도 있을 수 있습니다. 따라서 서버에서도 잘못된 요청을 검증하는 로직이 반드시 필요합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: `/Users/PARK/Desktop/MyBook/2023-CS-Study/spring/spring_@valid.md`
- 내용: Bean Validation, @Valid, Annotation 종류, 테스트

### 추가 학습 자료

- [인프런 김영한 님] 스프링 MVC 2편 - 백엔드 웹 개발 활용 기술
- [Hibernate Validator 공식 문서](https://docs.jboss.org/hibernate/validator/6.2/reference/en-US/html_single/)
- [[Spring] Validation Annotation이란?](https://seongwon.dev/Spring-MVC/20220622-Valid%EB%9E%80/)