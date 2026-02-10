---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: high
prerequisites:
- MVC-Pattern
- Controller-vs-RestController
related:
- MVC-Pattern
- View-Resolver
- Filter-Interceptor
sources: 1
subtopic: DispatcherServlet
tags:
- front-controller
- dispatcher-servlet
- spring-mvc
- request-routing
---

# DispatcherServlet (디스패처 서블릿)

## 📝 개념 정의

**Front Controller 패턴을 구현하는 Spring의 핵심 서블릿**

**핵심:**
- 모든 요청의 단일 진입점
- 요청을 적절한 Controller로 위임
- 공통 처리 담당

---

## 🎯 등장 배경

### MVC 패턴의 한계

#### 1. forward 중복

```java
RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
dispatcher.forward(request, response);
```

---

#### 2. 사용하지 않는 코드

```java
HttpServletRequest request, HttpServletResponse response
```

---

#### 3. 공통 처리 어려움

**기능 증가 → 공통 처리 부분 증가**

---

## 🔑 Front Controller 패턴

### 개념

**모든 요청이 단일 진입점으로 집중**

### 특징

✅ **FrontControllerServlet 하나로 요청 받음**
✅ **요청에 맞는 Controller 찾아 호출**
✅ **공통 처리 가능**
✅ **나머지 Controller는 Servlet 불필요**

---

### Front Controller 도입 전

```
Client → Controller1
Client → Controller2
Client → Controller3
```

**문제:**
- 각 Controller마다 공통 코드 중복
- 공통 처리 어려움

---

### Front Controller 도입 후

```
Client → FrontController → Controller1
                         → Controller2
                         → Controller3
```

**장점:**
- 공통 처리 한 곳에서
- 중복 코드 제거

---

## 💻 Front Controller 구현 예시

### 1. Front Controller 생성

```java
@WebServlet(urlPatterns = "/*")
public class FrontController extends HttpServlet {
    private Map&lt;String, Controller&gt; controllerMap;
    
    public FrontController() {
        controllerMap = new HashMap<>();
        // URL과 Controller 매핑
        controllerMap.put("/home", new HomeController());
        controllerMap.put("/user", new UserController());
    }
    
    @Override
    protected void service(HttpServletRequest request,
                          HttpServletResponse response)
                          throws ServletException, IOException {
        String uri = request.getRequestURI();
        String contextPath = request.getContextPath();
        String command = uri.substring(contextPath.length());
        
        Controller controller = controllerMap.get(command);
        
        if (controller != null) {
            String view = controller.handleRequest(request, response);
            if (view != null) {
                request.getRequestDispatcher(view).forward(request, response);
            }
        } else {
            // 기본 처리
            controller = new DefaultController();
            String view = controller.handleRequest(request, response);
            if (view != null) {
                request.getRequestDispatcher(view).forward(request, response);
            }
        }
    }
}
```

---

### 2. Controller 인터페이스

```java
public interface Controller {
    String handleRequest(HttpServletRequest request,
                        HttpServletResponse response);
}
```

---

### 3. Controller 구현

```java
public class HomeController implements Controller {
    @Override
    public String handleRequest(HttpServletRequest request,
                               HttpServletResponse response) {
        // Home page logic
        return "/home.jsp";
    }
}

public class UserController implements Controller {
    @Override
    public String handleRequest(HttpServletRequest request,
                               HttpServletResponse response) {
        // User-related logic
        return "/user.jsp";
    }
}
```

---

## 🌟 DispatcherServlet

**Spring의 Front Controller 구현체**

### 핵심 구성 요소

1. **HandlerMapping**: 요청 → Handler 매핑
2. **HandlerAdapter**: Handler 실행
3. **ViewResolver**: View 변환

---

## 🔄 DispatcherServlet 요청 처리 흐름

```
1. Client 요청
   ↓
2. DispatcherServlet 요청 받음
   ↓
3. HandlerMapping: 요청 → Handler 결정
   ↓
4. HandlerAdapter: Handler 실행
   ↓
5. ViewResolver: 결과 → View 변환
   ↓
6. DispatcherServlet: 응답 생성
```

---

## 💻 DispatcherServlet 구현 예시

### 1. DispatcherServlet 클래스

```java
public class DispatcherServlet extends HttpServlet {
    private HandlerMapping handlerMapping;
    private HandlerAdapter handlerAdapter;
    private ViewResolver viewResolver;
    
    @Override
    public void init() throws ServletException {
        // 초기화
        handlerMapping = new HandlerMapping();
        handlerAdapter = new HandlerAdapter();
        viewResolver = new ViewResolver();
    }
    
    @Override
    protected void service(HttpServletRequest request,
                          HttpServletResponse response)
                          throws ServletException, IOException {
        try {
            // 1. Handler 찾기
            Controller controller = handlerMapping.getHandler(request);
            
            // 2. Handler 실행
            ModelAndView modelAndView = 
                handlerAdapter.handle(request, response, controller);
            
            // 3. View 변환 및 응답
            viewResolver.resolveView(modelAndView, request, response);
        } catch (Exception e) {
            // 예외 처리
        }
    }
}
```

---

### 2. HandlerMapping

**요청을 적절한 Handler에 매핑**

```java
public class HandlerMapping {
    private Map&lt;String, Controller&gt; handlerMap;
    
    public HandlerMapping() {
        handlerMap = new HashMap<>();
        // URL과 Controller 매핑
        handlerMap.put("/user/list", new UserController());
    }
    
    public Controller getHandler(HttpServletRequest request) {
        String url = request.getRequestURI();
        return handlerMap.get(url);
    }
}
```

---

### 3. HandlerAdapter

**Handler 실행 및 요청 처리**

```java
public class HandlerAdapter {
    public ModelAndView handle(HttpServletRequest request,
                              HttpServletResponse response,
                              Controller controller) {
        try {
            // Controller 실행
            String view = controller.handleRequest(request, response);
            
            // ModelAndView에 저장
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.setViewName(view);
            
            return modelAndView;
        } catch (Exception e) {
            // 예외 처리
        }
        return null;
    }
}
```

---

### 4. ViewResolver

**처리 결과를 View로 변환**

```java
public class ViewResolver {
    public void resolveView(ModelAndView modelAndView,
                           HttpServletRequest request,
                           HttpServletResponse response)
                           throws ServletException, IOException {
        String viewName = modelAndView.getViewName();
        
        // viewName → 실제 경로
        String viewPath = getViewPath(viewName);
        
        // JSP로 forward
        request.getRequestDispatcher(viewPath).forward(request, response);
    }
    
    private String getViewPath(String viewName) {
        // viewName: "userList" → "/WEB-INF/views/userList.jsp"
        return "/WEB-INF/views/" + viewName + ".jsp";
    }
}
```

---

## 📊 DispatcherServlet 장점

### 1. 공통 처리 집중화

**한 곳에서 모든 공통 로직 처리**

---

### 2. 중복 코드 제거

**forward, viewPath 중복 제거**

---

### 3. 유지보수 향상

**공통 로직 수정 시 한 곳만 변경**

---

### 4. 확장성

**새로운 Controller 추가 용이**

---

## 🔍 Spring MVC 구조

```
Client
  ↓
DispatcherServlet
  ↓
HandlerMapping → @Controller 찾기
  ↓
HandlerAdapter → @RequestMapping 실행
  ↓
Controller → 비즈니스 로직
  ↓
ViewResolver → View 이름 → 실제 View
  ↓
View → JSP, Thymeleaf 등
  ↓
Client
```

---

## ❓ 면접 질문 예시

### Q1. DispatcherServlet의 역할은 무엇인가요?

**답변:**
Spring MVC에서 Front Controller 패턴을 구현하는 핵심 서블릿입니다. 모든 클라이언트 요청의 단일 진입점으로 작동하며, HandlerMapping을 통해 요청을 적절한 Controller로 위임하고, ViewResolver를 통해 결과를 View로 변환하여 응답합니다.

### Q2. DispatcherServlet과 Front Controller 패턴의 관계는?

**답변:**
DispatcherServlet은 Front Controller 패턴의 구현체입니다. Front Controller 패턴은 모든 요청이 단일 진입점으로 집중되어 공통 처리를 수행하는 패턴이고, DispatcherServlet은 이를 Spring에서 구현한 것입니다.

### Q3. DispatcherServlet의 동작 원리를 설명해주세요.

**답변:**
1) 클라이언트 요청이 DispatcherServlet에 도착
2) HandlerMapping이 요청을 처리할 Handler(Controller) 결정
3) HandlerAdapter가 결정된 Handler 실행
4) ViewResolver가 처리 결과를 적절한 View로 변환
5) DispatcherServlet이 변환된 View로 클라이언트에게 응답 생성

### Q4. HandlerMapping과 HandlerAdapter의 역할은?

**답변:**
HandlerMapping은 요청 URL을 분석하여 적절한 Handler(Controller)를 찾는 역할을 합니다. HandlerAdapter는 찾아진 Handler를 실행하고 요청을 처리하는 역할을 합니다. 이 두 컴포넌트는 DispatcherServlet과 협력하여 요청을 처리합니다.

### Q5. Front Controller 패턴의 장점은?

**답변:**
1) 공통 처리를 한 곳에서 집중화
2) 중복 코드 제거 (forward, viewPath 등)
3) 유지보수 향상 (공통 로직 수정 시 한 곳만 변경)
4) 확장성 (새로운 Controller 추가 용이)

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [spring_DispatcherServlet.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Spring/spring_DispatcherServlet.md)
- 내용: DispatcherServlet, Front Controller, HandlerMapping/Adapter/ViewResolver

### 추가 학습 자료

- [로키의 개발 블로그](https://yejun-the-developer.tistory.com/4)
- [제이의 기억 저장소](https://traeper.tistory.com/198)
- [nyximos](https://nyximos.tistory.com/69)
- 김영한 MVC 강의