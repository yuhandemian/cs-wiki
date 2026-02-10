---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: Filter & Interceptor
tags: []
---

# Filter & Interceptor (필터와 인터셉터)

## 📝 개념 정의

### Filter (필터)

**DispatcherServlet 전/후에 URL 패턴에 맞는 모든 요청에 대해 부가 작업을 처리하는 기능**

**특징:**
- 웹 컨테이너(Tomcat)에서 관리
- Spring 범위 밖에서 처리
- Spring Bean 등록 가능

---

### Interceptor (인터셉터)

**DispatcherServlet이 Controller 호출 전/후에 요청과 응답을 참조하거나 가공하는 기능**

**특징:**
- Spring에서 제공
- Spring Context에서 동작
- Spring Bean 주입 가능

---

## 🔄 처리 흐름

```
Client
  ↓
Filter (전처리)
  ↓
DispatcherServlet
  ↓
Interceptor (preHandle)
  ↓
Controller
  ↓
Interceptor (postHandle)
  ↓
ViewResolver
  ↓
View
  ↓
Interceptor (afterCompletion)
  ↓
DispatcherServlet
  ↓
Filter (후처리)
  ↓
Client
```

---

## 🔧 Filter 메서드

### 1. init()

**필터 객체 초기화 및 서비스 추가**

```java
public void init(FilterConfig filterConfig) throws ServletException {
    // 필터 초기화
}
```

**특징:**
- 웹 컨테이너가 1회 호출
- 이후 요청은 doFilter로 처리

---

### 2. doFilter()

**요청 처리 핵심 메서드**

```java
public void doFilter(ServletRequest request,
                    ServletResponse response,
                    FilterChain chain)
                    throws IOException, ServletException {
    // 전처리
    System.out.println("Filter 전처리");
    
    // 다음 필터 또는 서블릿으로 전달
    chain.doFilter(request, response);
    
    // 후처리
    System.out.println("Filter 후처리");
}
```

**특징:**
- URL 패턴에 맞는 모든 요청 처리
- FilterChain으로 다음 대상에 전달

---

### 3. destroy()

**필터 객체 제거 및 자원 반환**

```java
public void destroy() {
    // 자원 반환
}
```

**특징:**
- 웹 컨테이너가 1회 호출
- 이후 doFilter 처리 안 됨

---

## 💻 Filter 구현 예시

```java
@Component
public class LogFilter implements Filter {
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("LogFilter 초기화");
    }
    
    @Override
    public void doFilter(ServletRequest request,
                        ServletResponse response,
                        FilterChain chain)
                        throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String requestURI = httpRequest.getRequestURI();
        
        System.out.println("요청 URI: " + requestURI);
        
        try {
            chain.doFilter(request, response);
        } finally {
            System.out.println("응답 완료: " + requestURI);
        }
    }
    
    @Override
    public void destroy() {
        System.out.println("LogFilter 종료");
    }
}
```

---

## 🎯 Interceptor 메서드

### 1. preHandle()

**Controller 호출 전 실행**

```java
public boolean preHandle(HttpServletRequest request,
                        HttpServletResponse response,
                        Object handler)
                        throws Exception {
    // 전처리
    System.out.println("Interceptor 전처리");
    
    // true: 다음 단계 진행
    // false: 작업 중단
    return true;
}
```

**특징:**
- 전처리 작업 또는 요청 정보 가공
- handler: @RequestMapping 메서드 정보
- 반환값 true: 진행, false: 중단

---

### 2. postHandle()

**Controller 호출 후 실행**

```java
public void postHandle(HttpServletRequest request,
                      HttpServletResponse response,
                      Object handler,
                      ModelAndView modelAndView)
                      throws Exception {
    // 후처리
    System.out.println("Interceptor 후처리");
}
```

**특징:**
- 후처리 작업
- ModelAndView 정보 제공
- RestAPI(@RestController)에서는 자주 사용 안 됨
- 예외 발생 시 호출 안 됨

---

### 3. afterCompletion()

**모든 작업 완료 후 실행**

```java
public void afterCompletion(HttpServletRequest request,
                           HttpServletResponse response,
                           Object handler,
                           Exception ex)
                           throws Exception {
    // 최종 처리
    System.out.println("Interceptor 최종 처리");
    
    if (ex != null) {
        System.out.println("예외 발생: " + ex.getMessage());
    }
}
```

**특징:**
- View 렌더링 후 실행
- 리소스 반환에 적합
- 예외 발생해도 반드시 호출

---

## 💻 Interceptor 구현 예시

```java
@Component
public class LogInterceptor implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(HttpServletRequest request,
                            HttpServletResponse response,
                            Object handler)
                            throws Exception {
        String requestURI = request.getRequestURI();
        System.out.println("요청 URI: " + requestURI);
        
        // 인증 체크 예시
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            response.sendRedirect("/login");
            return false;  // 중단
        }
        
        return true;  // 진행
    }
    
    @Override
    public void postHandle(HttpServletRequest request,
                          HttpServletResponse response,
                          Object handler,
                          ModelAndView modelAndView)
                          throws Exception {
        System.out.println("Controller 처리 완료");
    }
    
    @Override
    public void afterCompletion(HttpServletRequest request,
                               HttpServletResponse response,
                               Object handler,
                               Exception ex)
                               throws Exception {
        String requestURI = request.getRequestURI();
        System.out.println("응답 완료: " + requestURI);
        
        if (ex != null) {
            System.out.println("예외 발생: " + ex.getMessage());
        }
    }
}
```

---

## 📊 Filter vs Interceptor 비교

| 특징 | Filter | Interceptor |
|------|--------|-------------|
| **관리 컨테이너** | 서블릿 컨테이너 | Spring 컨테이너 |
| **Spring 예외 처리** | X | O |
| **Request/Response 조작** | O | X |
| **실행 시점** | DispatcherServlet 전/후 | Controller 전/후 |
| **Bean 주입** | 가능 (제한적) | 자유롭게 가능 |

---

## 🎯 Filter 사용 용도

### 1. 공통 보안 및 인증/인가

**모든 요청에 대한 보안**

```java
public void doFilter(ServletRequest request,
                    ServletResponse response,
                    FilterChain chain)
                    throws IOException, ServletException {
    // XSS 방지
    // CSRF 토큰 검증
    chain.doFilter(request, response);
}
```

---

### 2. 모든 요청 로깅/감사

**요청/응답 로깅**

---

### 3. 이미지/데이터 압축 및 인코딩

**문자열 인코딩 설정**

```java
request.setCharacterEncoding("UTF-8");
response.setCharacterEncoding("UTF-8");
```

---

### 4. Spring과 분리되어야 하는 기능

**웹 컨테이너 레벨 처리**

---

## 🎯 Interceptor 사용 용도

### 1. 세부적인 보안 및 인증/인가

**특정 URL 패턴 인증**

```java
public boolean preHandle(HttpServletRequest request,
                        HttpServletResponse response,
                        Object handler) {
    // 세션 체크
    // 권한 체크
    return true;
}
```

---

### 2. API 호출 로깅/감사

**Controller 단위 로깅**

---

### 3. Controller 데이터 가공

**요청 데이터 전처리**

```java
public boolean preHandle(HttpServletRequest request,
                        HttpServletResponse response,
                        Object handler) {
    // 데이터 검증
    // 데이터 변환
    return true;
}
```

---

## 💡 선택 가이드

### Filter 사용

✅ Spring과 무관한 전역 처리
✅ Request/Response 객체 조작 필요
✅ 모든 요청에 대한 공통 처리

---

### Interceptor 사용

✅ Spring Bean 주입 필요
✅ Controller 단위 처리
✅ Spring 예외 처리 필요

---

## ❓ 면접 질문 예시

### Q1. Filter와 Interceptor의 차이는?

**답변:**
Filter는 서블릿 컨테이너에서 관리되며 DispatcherServlet 전/후에 동작하고, Request/Response 객체를 조작할 수 있습니다. Interceptor는 Spring 컨테이너에서 관리되며 Controller 전/후에 동작하고, Spring Bean을 자유롭게 주입받을 수 있으며 Spring 예외 처리가 가능합니다.

### Q2. Filter와 Interceptor는 각각 언제 사용하나요?

**답변:**
Filter는 공통 보안/인증, 모든 요청 로깅, 문자열 인코딩, Spring과 분리되어야 하는 기능에 사용합니다. Interceptor는 세부적인 보안/인증, API 호출 로깅, Controller 데이터 가공, Spring Bean 주입이 필요한 경우에 사용합니다.

### Q3. Interceptor의 preHandle, postHandle, afterCompletion의 차이는?

**답변:**
preHandle은 Controller 호출 전에 실행되며 반환값이 false면 작업을 중단합니다. postHandle은 Controller 호출 후 실행되며 예외 발생 시 호출되지 않습니다. afterCompletion은 View 렌더링 후 실행되며 예외 발생해도 반드시 호출되어 리소스 반환에 적합합니다.

### Q4. Filter에서 Request/Response 객체를 조작할 수 있는 이유는?

**답변:**
Filter는 서블릿 컨테이너 레벨에서 동작하여 DispatcherServlet에 도달하기 전에 Request/Response 객체를 직접 조작할 수 있습니다. 반면 Interceptor는 Spring 레벨에서 동작하여 이미 생성된 객체를 참조만 할 수 있습니다.

### Q5. Filter와 Interceptor를 함께 사용할 수 있나요?

**답변:**
네, 함께 사용할 수 있습니다. Filter는 전역적인 공통 처리(인코딩, 보안)를 담당하고, Interceptor는 Spring 레벨의 세부적인 처리(인증, 로깅)를 담당하도록 역할을 분리하여 사용하면 효과적입니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [Filter, Interceptor.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Spring/Filter,%20Interceptor.md)
- 내용: Filter, Interceptor, 메서드, 사용 용도