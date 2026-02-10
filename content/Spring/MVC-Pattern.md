---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-08
interview_frequency: medium
prerequisites:
- DispatcherServlet
- View-Resolver
related:
- DispatcherServlet
- View-Resolver
- Controller-vs-RestController
sources: 1
subtopic: MVC Pattern
tags:
- mvc-pattern
- model-view-controller
- servlet
- jsp
---

# MVC Pattern (MVC 패턴)

## 📝 개념 정의

**Model, View, Controller의 각 머릿글자를 따온 표현으로 구성요소를 세 가지 역할로 구분한 패턴**

**핵심:**
- Model: 데이터와 비즈니스 로직
- View: 사용자 인터페이스
- Controller: Model과 View 중개

---

## 🎯 MVC 등장 배경

### JSP만 사용했을 때 문제점

❌ **비즈니스 로직 노출**
❌ **가독성 저하**
❌ **유지보수 어려움**

**해결:**
✅ JSP는 View 로직만 처리
✅ 비즈니스 로직은 Servlet에서 처리

---

## 🔑 MVC 구성 요소

### Model

**데이터와 비즈니스 로직**

```java
public class Member {
    private Long id;
    private String username;
    private int age;
    
    // getter, setter
}
```

---

### View

**사용자 인터페이스 (JSP)**

```jsp
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<body>
    <p>username: ${member.username}</p>
    <p>age: ${member.age}</p>
</body>
</html>
```

---

### Controller

**Model과 View 중개 (Servlet)**

```java
@WebServlet(name = "saveServlet", urlPatterns = "/save")
public class SaveServlet extends HttpServlet {
    private Repository repository = Repository.getInstance();
    
    @Override
    protected void service(HttpServletRequest request, 
                          HttpServletResponse response) 
                          throws ServletException, IOException {
        // 1. 파라미터 받기
        String username = request.getParameter("username");
        Integer age = Integer.parseInt(request.getParameter("age"));
        
        // 2. 비즈니스 로직 (Model)
        Member newMember = new Member(username, age);
        Member savedMember = repository.save(newMember);
        
        // 3. Model을 View에 전달
        request.setAttribute("member", savedMember);
        
        // 4. View로 forward
        String viewPath = "/WEB-INF/save-result.jsp";
        RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
        dispatcher.forward(request, response);
    }
}
```

---

## 🔄 redirect vs forward

### redirect

**클라이언트가 다시 요청**

```java
response.sendRedirect("/new-url");
```

**특징:**
- 클라이언트가 인지 가능
- URL 경로 변경
- 2번의 요청

---

### forward

**서버 내부 호출**

```java
RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
dispatcher.forward(request, response);
```

**특징:**
- 클라이언트가 알 수 없음
- URL 경로 변경 안 됨
- 1번의 요청

---

## 📂 디렉토리 구조

```
webapp/
├── index.html
└── WEB-INF/
    ├── join-form.jsp
    ├── save-result.jsp
    └── members.jsp
```

**WEB-INF 사용 이유:**
✅ 외부에서 직접 호출 불가
✅ Controller를 통해서만 접근

---

## 💻 MVC 패턴 구현 예시

### 1. 회원 등록 폼 Controller

```java
@WebServlet(name = "joinFormServlet", urlPatterns = "/join")
public class JoinFormServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request,
                          HttpServletResponse response)
                          throws ServletException, IOException {
        String viewPath = "/WEB-INF/join-form.jsp";
        RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
        dispatcher.forward(request, response);
    }
}
```

---

### 2. 회원 등록 폼 View

```jsp
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<body>
    <form action="save" method="post">
        <label>
            username: <input type="text" name="username" />
        </label>
        <label>
            age: <input type="text" name="age" />
        </label>
        <button type="submit">submit&lt;/button&gt;
    </form>
</body>
</html>
```

---

### 3. 회원 저장 Controller

```java
@WebServlet(name = "saveServlet", urlPatterns = "/save")
public class SaveServlet extends HttpServlet {
    private Repository repository = Repository.getInstance();
    
    @Override
    protected void service(HttpServletRequest request,
                          HttpServletResponse response)
                          throws ServletException, IOException {
        // 파라미터 받기
        String username = request.getParameter("username");
        Integer age = Integer.parseInt(request.getParameter("age"));
        
        // 비즈니스 로직
        Member newMember = Member.builder()
                .username(username)
                .age(age)
                .build();
        Member savedMember = repository.save(newMember);
        
        // Model 설정
        request.setAttribute("member", savedMember);
        
        // View로 forward
        String viewPath = "/WEB-INF/save-result.jsp";
        RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
        dispatcher.forward(request, response);
    }
}
```

---

### 4. 결과 View

```jsp
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<body>
    <p>id: ${member.id}</p>
    <p>username: ${member.username}</p>
    <p>age: ${member.age}</p>
</body>
</html>
```

---

### 5. 회원 목록 Controller

```java
@WebServlet(name = "memberListServlet", urlPatterns = "/members")
public class MemberListServlet extends HttpServlet {
    private Repository repository = Repository.getInstance();
    
    @Override
    protected void service(HttpServletRequest request,
                          HttpServletResponse response)
                          throws ServletException, IOException {
        List&lt;Member&gt; members = repository.findAll();
        
        request.setAttribute("members", members);
        
        String viewPath = "/WEB-INF/members.jsp";
        RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
        dispatcher.forward(request, response);
    }
}
```

---

### 6. 회원 목록 View (JSTL)

```jsp
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<body>
    <h1>all members&lt;/h1&gt;
    <table>
        <thead>
            <th>id&lt;/th&gt;
            <th>username&lt;/th&gt;
            <th>age&lt;/th&gt;
        </thead>
        <tbody>
            <c:forEach var="item" items="${members}">
                <tr>
                    <td>${item.id}</td>
                    <td>${item.username}</td>
                    <td>${item.age}</td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</body>
</html>
```

---

## ✅ MVC 패턴 장점

### 1. 명확한 역할 분리

**Model, View, Controller 분리**

---

### 2. 유지보수 용이

**각 계층 독립적 수정 가능**

---

### 3. 재사용성 향상

**Model과 View 재사용**

---

## ❌ MVC 패턴의 한계

### 1. 중복 코드

**각 Servlet마다 반복**

```java
// viewPath 상위 경로와 .jsp 접미사 중복
String viewPath = "/WEB-INF/save-result.jsp";

// forward 코드 중복
RequestDispatcher dispatcher = request.getRequestDispatcher(viewPath);
dispatcher.forward(request, response);
```

---

### 2. 유의미하지 않은 코드

**response 사용 안 함**

```java
protected void service(HttpServletRequest request,
                      HttpServletResponse response)  // 사용 안 함
```

---

### 3. 공통 처리 어려움

**기능 증가 시 공통 처리 부분 증가**

---

## 💡 해결 방안

**Front Controller 패턴 도입**

✅ Controller 호출 전 공통 처리
✅ 중복 코드 제거
✅ 유지보수 향상

---

## ❓ 면접 질문 예시

### Q1. MVC 패턴이란 무엇인가요?

**답변:**
Model, View, Controller의 각 머릿글자를 따온 표현으로 구성요소를 세 가지 역할로 구분한 패턴입니다. Model은 데이터와 비즈니스 로직, View는 사용자 인터페이스, Controller는 Model과 View를 중개하는 역할을 합니다.

### Q2. MVC 패턴의 장점은?

**답변:**
1) 명확한 역할 분리로 코드 이해가 쉬움
2) 각 계층을 독립적으로 수정할 수 있어 유지보수가 용이
3) Model과 View를 재사용할 수 있어 재사용성 향상

### Q3. redirect와 forward의 차이는?

**답변:**
redirect는 클라이언트가 새로운 URL로 다시 요청하는 방식으로 URL이 변경되고 2번의 요청이 발생합니다. forward는 서버 내부에서 일어나는 호출로 클라이언트가 알 수 없고 URL이 변경되지 않으며 1번의 요청만 발생합니다.

### Q4. WEB-INF 디렉토리를 사용하는 이유는?

**답변:**
외부(클라이언트)에서 JSP 파일을 직접 호출할 수 없게 하기 위함입니다. WEB-INF 경로에 있는 파일은 Controller를 통해서만 호출할 수 있어 보안성이 향상됩니다.

### Q5. MVC 패턴의 한계는?

**답변:**
1) 각 Servlet마다 viewPath와 forward 코드가 중복됨
2) response 객체처럼 유의미하지 않은 코드 존재
3) 공통 처리가 어려움
이러한 문제를 해결하기 위해 Front Controller 패턴을 도입합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [spring_03_mvc.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Spring/spring_03_mvc.md)
- 내용: MVC 패턴, redirect/forward, 구현 예시

### 추가 학습 자료

- 김영한 MVC 강의