---
category: Operating System
curated_by: Claude Sonnet 4.5
difficulty: medium
generated: 2026-02-09
interview_frequency: medium
prerequisites: []
related: []
sources: 1
subtopic: System Call
tags: []
---

# System Call (시스템 콜)

## 📝 운영체제 (Operating System)

**컴퓨터 시스템의 하드웨어, 소프트웨어 자원을 효율적으로 운영 및 관리**

**중개자 역할:** 사용자/소프트웨어 ↔ 하드웨어

---

## 🔑 커널 (Kernel)

**운영체제의 핵심 부분**

**메모리에 상주하는 운영체제 부분**

### 커널의 역할

1. **보안**
2. **자원 관리** (CPU, 메모리, I/O 등)
3. **추상화**

---

## 👫 이중 동작 모드 (Dual-mode Operation)

**사용자 모드와 커널 모드로 나뉨**

**목적:** 사용자의 시스템 자원 접근 제한 → 보호

---

### 1. 사용자 모드 (User Mode)

**일반 사용자가 접근할 수 있는 영역 제한**

**특징:**
- 코드 작성, 프로세스 실행 가능
- 시스템 중요 연산 실행 불가
- 시스템 콜로만 커널 모드 접근 가능

---

### 2. 커널 모드 (Kernel Mode)

**= 수퍼바이저 모드, 특권 모드, 시스템 모드**

**운영체제가 CPU 제어권을 가지고 실행**

**특징:**
- 모든 메모리 접근 가능
- 모든 CPU 명령 실행 가능
- 운영체제 코드, 디바이스 드라이버 실행

---

## 🏴 modebit

**커널 모드와 사용자 모드 구분 플래그**

```
0 = 커널 모드
1 = 사용자 모드
```

**목적:** I/O 디바이스를 OS를 통해서만 사용 → 보호

---

## 📞 시스템 콜 (System Call)

**운영체제가 제공하는 서비스를 사용하기 위한 프로그래밍 인터페이스**

**일반적으로 API(라이브러리 함수)를 통해 사용**

---

### 왜 API를 통해 사용할까?

#### 직접 사용의 문제점

- C/C++ 같은 고급 언어는 직접 시스템 콜 불가
- 각 OS마다 시스템 콜 환경이 다름

#### API 사용의 장점

✅ **이식성 (Portability)** 보장
✅ 인자만 전달하면 됨
✅ 버전 관리 용이

**예:** Windows API, POSIX API, Java API

---

### 라이브러리 함수 (Library Function)

**미리 만들어진 함수들**

**내부적으로 시스템 콜 사용**

**목적:**
- 개발 편의성
- 시스템 콜 호출 최소화

---

#### 예시: printf()

```c
#include <stdio.h>
int main() {
    printf("Hello World!");
    return 0;
}
```

**동작 과정:**
1. 사용자 모드에서 stdio 라이브러리 호출
2. stdio가 시스템 콜 write() 호출
3. 커널 모드로 전환
4. 모니터에 문자열 출력
5. 사용자 모드로 복귀

---

#### 예시: write() vs printf()

**write() 시스템 콜:**
```c
ssize_t write(int fd, const void *buf, size_t count);
```
- 단순히 데이터를 파일에 쓰기

**printf() 라이브러리 함수:**
```c
int printf(const char *format-string, argument-list);
```
- format string으로 손쉽게 출력
- 내부적으로 파라미터 포매팅 후 write() 호출

---

#### 버퍼 사용

**read(), write():**
- 호출할 때마다 커널 모드 전환
- 비효율적

**fread(), fwrite():**
- 버퍼 사용
- 내부적으로 한 번만 read(), write() 실행
- 효율적 (wrapper 함수)

---

## 🔧 시스템 콜 종류

### 1. 프로세스 제어 (Process Control)

- exit, abort
- load, execute
- create process (fork)
- wait time, wait event
- signal event
- 메모리 할당/해제

---

### 2. 파일 조작 (File Manipulation)

- create, delete
- open, close, read, write
- reposition
- get/set file attribute

---

### 3. 디바이스 조작 (Device Manipulation)

- ioctl (하드웨어 제어, 상태 정보)
- request device, release device
- read, write, reposition
- get/set device attribute

---

### 4. 정보 유지 (Information Maintenance)

- getpid(), alarm(), sleep()
- time, date 설정/획득
- 시스템 데이터 설정/획득
- 프로세스/파일/장치 속성 획득/설정

---

### 5. 통신 (Communication)

- pipe(), shm_open(), mmap()
- 통신 연결 생성/제거
- 메시지 송신/수신
- 상태 정보 전달

---

### 6. 보호 (Protection)

- chmod()
- unmask()
- chown()

---

## 💻 시스템 콜 예시

```bash
cp in.txt out.txt
```

**동작 과정:**

1. I/O 시스템 콜로 입력 받기
2. `in.txt` 파일 존재 확인 (시스템 콜)
3. 파일 없으면 에러 발생 및 종료 (시스템 콜)
4. `out.txt` 파일명 존재 확인 (시스템 콜)
5. 파일 있으면 덮어쓰기/이어붙이기 선택
6. 파일 저장 (시스템 콜)

---

## 🔄 시스템 콜 동작 과정

### 1. 시스템 콜 호출

**응용 프로그램에서 시스템 콜 호출**

**→ 0x80 인터럽트 발생**

---

### 2. IDT 확인

**IDT (Interrupt Descriptor Table)로 인터럽트 종류 판단**

**0x80 = system_call()**

**→ 커널이 시스템 콜 동작 수행**

---

### 3. 매개변수 전달

#### 방법 1: 레지스터

**매개변수를 레지스터에 담기**

**문제:** 매개변수가 레지스터 수보다 많을 수 있음

---

#### 방법 2: 메모리 + 주소 ⭐

**매개변수를 메모리에 담고 주소를 레지스터에**

**장점:** 크기 제한 없음

**→ 가장 많이 사용**

---

#### 방법 3: 스택

**매개변수를 스택에 담기**

**문제:** 방법 1과 큰 차이 없음

---

## 💡 fork() 함수

**OS가 생성하는 함수**

**다른 프로세스를 복제 및 생성**

**특징:**
- 자식 프로세스 생성
- pid 값 제외하고 모든 값 복제
- 자식 프로세스 pid = 0
- 실행 안 되면 -1 반환

---

## ❓ 면접 질문 예시

### Q1. 시스템 콜에 대해 설명하세요.

**답변:**
시스템 콜은 운영체제가 제공하는 서비스를 사용하기 위한 프로그래밍 인터페이스입니다. 사용자 프로세스가 커널 모드로 전환하여 운영체제의 기능을 사용할 수 있게 해주며, 일반적으로 API(라이브러리 함수)를 통해 간접적으로 사용합니다.

### Q2. 운영체제의 Dual Mode에 대해 설명해주세요.

**답변:**
Dual Mode는 사용자 모드와 커널 모드로 나뉩니다. 사용자 모드는 일반 사용자가 접근할 수 있는 영역을 제한하여 시스템 중요 연산을 실행할 수 없으며, 커널 모드는 운영체제가 모든 메모리와 CPU 명령에 접근할 수 있습니다. 이를 통해 시스템 자원을 보호합니다.

### Q3. 시스템 콜의 유형에 대해 설명해주세요.

**답변:**
시스템 콜은 6가지 유형으로 나뉩니다. 1) 프로세스 제어: fork, exit 등, 2) 파일 조작: open, read, write 등, 3) 디바이스 조작: ioctl 등, 4) 정보 유지: getpid, time 등, 5) 통신: pipe, mmap 등, 6) 보호: chmod 등입니다.

### Q4. 서로 다른 시스템 콜을 어떻게 구분하나요?

**답변:**
시스템 콜은 각각 번호가 할당되어 있으며, 시스템 콜 인터페이스는 이 번호에 따라 인덱스되는 테이블을 유지합니다. 시스템 콜 호출 시 0x80 인터럽트가 발생하고, IDT(Interrupt Descriptor Table)에서 인터럽트 종류를 판단하여 해당 시스템 콜을 실행합니다.

### Q5. 왜 직접 시스템 콜을 사용하지 않고 API를 통해 사용하나요?

**답변:**
C/C++ 같은 고급 언어는 직접 시스템 콜을 할 수 없고, 각 운영체제마다 시스템 콜 환경이 다르기 때문입니다. API를 사용하면 이식성(Portability)을 보장하고, 인자만 전달하면 되어 개발이 편리하며, 버전 관리도 용이합니다.

---

## 📚 원본 참고 자료

### 출처: 2023-CS-Study
- 파일: [os_system_call.md](https://github.com/devSquad-study/2023-CS-Study/blob/main/OS/os_system_call.md)
- 내용: 운영체제, 커널, Dual Mode, 시스템 콜

### 추가 학습 자료

- [System Call 정리](https://nstgic3.tistory.com/16)
- [시스템 콜 이해하기](https://didu-story.tistory.com/311)
- [System Call 동작 과정](https://luckyyowu.tistory.com/133)