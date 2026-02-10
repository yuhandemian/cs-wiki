---
category: Spring
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: high
prerequisites:
- Spring-Framework
- DispatcherServlet
related:
- DispatcherServlet
- Filter-Interceptor
- Spring-Framework
sources: 1
subtopic: Spring Security
tags:
- spring-security
- authentication
- authorization
- filter-chain
---

# Spring Security

## 📝 Spring Security란?

**Spring 기반 애플리케이션의 보안(인증과 권한)을 담당하는 프레임워크**

**필터(Filter) 기반으로 동작**

**Spring MVC와 분리되어 관리 및 동작**

---

## 🔑 주요 용어

### 접근 주체 (Principal)

**보호된 대상에 접근하는 유저**

---

### 인증 (Authentication)

**'증명하다'의 의미**

**예:** 유저 아이디와 비밀번호로 로그인

---

### 인가 (Authorization)

**'권한 부여' 또는 '허가'**

**특정 목적 실현을 허용(Access)**

---

### 권한 (Role)

**인증된 주체가 애플리케이션 동작을 수행할 수 있는지 결정**

---

## 🔄 요청 흐름

```
Client (request) 
→ Filter 
→ DispatcherServlet 
→ Interceptor 
→ Controller
```

**Filter:** DispatcherServlet 전에 적용

**Interceptor:** DispatcherServlet과 Controller 사이

---

## 🛡️ Security Filter Chain

**Spring Security가 제공하는 10개 이상의 필터**

**순차적으로 실행되는 필터 체인**

**주요 필터:**
- UsernamePasswordAuthenticationFilter
- BasicAuthenticationFilter
- CsrfFilter
- ExceptionTranslationFilter
- FilterSecurityInterceptor

---

## 🔧 주요 모듈

### Authentication

**현재 접근 주체의 정보와 권한을 담는 인터페이스**

```java
public interface Authentication extends Principal, Serializable {
    // 권한 목록
    Collection&lt;? extends GrantedAuthority&gt; getAuthorities();
    
    // Credentials (주로 비밀번호)
    Object getCredentials();
    
    // Principal 객체
    Object getPrincipal();
    
    // 인증 여부
    boolean isAuthenticated();
    
    // 인증 여부 설정
    void setAuthenticated(boolean isAuthenticated);
}
```

---

### SecurityContext

**Authentication을 보관하는 역할**

**SecurityContext를 통해 Authentication 객체 획득**

---

### SecurityContextHolder

**현재 보안 컨텍스트의 세부 정보 저장**

**전역적으로 접근 가능**

---

### 모듈 연관 관계

```
1. 유저 로그인 (인증)
2. Authentication에 principal/credential 저장
3. SecurityContext에 Authentication 보관
4. SecurityContextHolder에 SecurityContext 저장
```

---

### UserDetails

**인증 성공 시 생성되는 객체**

**UsernamePasswordAuthenticationToken 생성에 사용**

```java
public interface UserDetails extends Serializable {
    // 권한 목록
    Collection&lt;? extends GrantedAuthority&gt; getAuthorities();
    
    String getPassword();
    String getUsername();
    
    // 계정 만료 여부
    boolean isAccountNonExpired();
    
    // 계정 잠김 여부
    boolean isAccountNonLocked();
    
    // 비밀번호 만료 여부
    boolean isCredentialsNonExpired();
    
    // 사용자 활성화 여부
    boolean isEnabled();
}
```

---

### UserDetailsService

**UserDetails 객체를 반환하는 메소드 하나만 보유**

**DB와 연결하여 사용자 정보 조회**

```java
public interface UserDetailsService {
    UserDetails loadUserByUsername(String username) 
        throws UsernameNotFoundException;
}
```

---

### UsernamePasswordAuthenticationToken

**Authentication을 구현한 클래스**

**User ID가 Principal, Password가 Credential**

```java
// 인증 전 객체 생성
public UsernamePasswordAuthenticationToken(
    Object principal, Object credentials) {
    super(null);
    this.principal = principal;
    this.credentials = credentials;
    setAuthenticated(false);
}

// 인증 후 객체 생성
public UsernamePasswordAuthenticationToken(
    Object principal, Object credentials,
    Collection&lt;? extends GrantedAuthority&gt; authorities) {
    super(authorities);
    this.principal = principal;
    this.credentials = credentials;
    super.setAuthenticated(true);
}
```

---

### AuthenticationManager

**인증 처리 담당**

**실질적으로 AuthenticationProvider가 처리**

**구현체:** ProviderManager

---

### AuthenticationProvider

**실제 인증 처리**

**인증 전 Authentication → 인증 후 Authentication 반환**

---

## 🔄 인증 처리 과정

### 1. 클라이언트 로그인 시도

---

### 2. AuthenticationFilter에서 인증 처리

**UsernamePasswordAuthenticationFilter 사용**

**커스텀 필터 생성 가능**

```java
@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(...) {
        // 커스텀 인증 로직
    }
}
```

---

### 3. UsernamePasswordAuthenticationToken 발급

**HttpServletRequest에서 ID/PW 추출**

**인증 토큰 생성**

---

### 4. AuthenticationManager에게 인증 객체 전달

**토큰이 올바른 유저인지 확인**

---

### 5. AuthenticationProvider에게 전달

---

### 6. UserDetailsService에 전달

**전달받은 사용자 정보로 DB 조회**

---

### 7. UserDetails 구현 객체 생성

**DB에서 찾은 사용자 정보로 UserDetails 생성**

```java
@Override
public UserDetails loadUserByUsername(String username) {
    User user = userRepository.findByUsername(username);
    return new CustomUserDetails(user);
}
```

---

### 8. AuthenticationProvider에 전달

---

### 9. 검증된 인증 객체를 ProviderManager에 전달

**인증 성공 시 권한을 담은 인증 객체**

---

### 10. AuthenticationFilter에 전달

---

### 11. SecurityContextHolder에 저장

**SecurityContext에 UserDetails 정보 저장**

---

## 🔍 로그인 사용자 정보 가져오기

### Bean에서 가져오기

```java
public static String getCurrentUser() {
    Object principal = SecurityContextHolder
        .getContext()
        .getAuthentication()
        .getPrincipal();
    User currentUser = (User) principal;
    return currentUser.getUsername();
}
```

---

### Controller에서 가져오기

```java
@PostMapping("/create")
public Response create(
    Principal principal,
    Authentication authentication) {
    // principal 또는 authentication 사용
}
```

---

### @AuthenticationPrincipal 사용

```java
@PostMapping("/create")
public Response create(
    @AuthenticationPrincipal CustomUserDetails userDetails) {
    // userDetails 사용
}
```

**Spring Security 3.2부터 지원**

**현재 로그인 사용자 객체를 인자에 주입**

---

## ❓ 면접 질문 예시

### Q1. Spring Security란 무엇인가요?

**답변:**
Spring Security는 Spring 기반 애플리케이션의 보안(인증과 권한)을 담당하는 프레임워크입니다. 필터 기반으로 동작하기 때문에 Spring MVC와 분리되어 관리되며, DispatcherServlet으로 가기 전에 적용되어 가장 먼저 URL 요청을 받습니다.

### Q2. 인증과 인가의 차이는?

**답변:**
인증(Authentication)은 '증명하다'의 의미로 유저 아이디와 비밀번호를 이용하여 로그인하는 과정입니다. 인가(Authorization)는 '권한 부여'나 '허가'의 의미로 인증된 사용자가 특정 목적을 실현하도록 허용하는 것입니다.

### Q3. Spring Security의 인증 처리 과정을 설명해주세요.

**답변:**
1) 클라이언트가 로그인 시도, 2) AuthenticationFilter에서 UsernamePasswordAuthenticationToken 발급, 3) AuthenticationManager에게 전달, 4) AuthenticationProvider가 UserDetailsService를 통해 DB 조회, 5) UserDetails 객체 생성, 6) 인증 성공 시 권한을 담은 인증 객체를 SecurityContextHolder에 저장합니다.

### Q4. UserDetails와 UserDetailsService의 역할은?

**답변:**
UserDetails는 인증 성공 시 생성되는 객체로 사용자 정보(username, password, 권한 등)를 담습니다. UserDetailsService는 UserDetails 객체를 반환하는 메소드를 가지며, DB와 연결하여 사용자 정보를 조회하는 역할을 합니다.

### Q5. SecurityContextHolder는 무엇인가요?

**답변:**
SecurityContextHolder는 현재 보안 컨텍스트의 세부 정보를 저장하는 곳입니다. SecurityContext를 담고 있으며, SecurityContext는 Authentication 객체를 보관합니다. 전역적으로 접근 가능하여 어디서든 현재 로그인한 사용자 정보를 가져올 수 있습니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 링크: [spring_security.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/Spring/spring_security.md)
- 내용: Spring Security, 인증/인가, Filter Chain

### 추가 학습 자료

- [부스트 캠프 - Spring Security 개요](https://www.boostcourse.org/web326/lecture/58997)
- [Spring Security 구조 및 처리 과정](https://dev-coco.tistory.com/174)
- [Spring Security + JWT](https://imbf.github.io/spring/2020/06/29/Spring-Security-with-JWT.html)
- [Spring Security 정리](https://hello-judy-world.tistory.com/216)