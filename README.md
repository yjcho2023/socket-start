# socket-start

## 1. 프로젝트 개요
Socket.IO를 활용한 실시간 채팅 기능을 학습하고 구현하기 위한 예제 프로젝트입니다.<br>
프론트엔드(React)와 백엔드(Express)를 분리한 모노레포 구조로 구성하였으며, Socket.IO를 이용한 기본적인 연결 과정과 실시간 메시지 송수신 흐름을 구현했습니다.

<br>

## 2. 주요 특징
- Socket.IO 기반 실시간 채팅 구현
- React + Express 모노레포 구조
- WebSocket 기반 클라이언트-서버 통신
- Create React App(CRA) → Vite 마이그레이션
- JavaScript → TypeScript 마이그레이션

<br>

## 3. 주요 기능 및 동작 방식

### 1) 화면 구성

- **메인 화면:**
  * 사용자가 닉네임을 입력한 뒤 채팅방에 입장한다.
  * 입력한 닉네임은 채팅방에서 사용자 식별 정보로 사용된다.

- **채팅 화면:**
  * 서버와 Socket.IO 연결을 생성한다.
  * 실시간으로 메시지를 송수신한다.
  * 모든 채팅 메시지는 전송 시각과 함께 표시된다.
  * 사용자의 입장 및 퇴장 여부를 시스템 메시지로 확인할 수 있다.


### 2) 실시간 통신 흐름

1. 사용자가 채팅방에 입장하면 Socket.IO 연결이 생성된다.
2. 서버는 입장 이벤트를 수신한 뒤 모든 클라이언트에 입장 알림을 전달한다.
3. 사용자가 메시지를 전송하면 클라이언트는 닉네임, 메시지, 전송 시간을 서버로 전달한다.
4. 서버는 전달받은 데이터를 연결된 모든 클라이언트에게 브로드캐스트한다.
5. 각 클라이언트는 수신한 메시지를 즉시 화면에 반영한다.
6. 사용자가 연결을 종료하면 서버는 퇴장 이벤트를 감지하고 남아있는 사용자에게 퇴장 알림을 전송한다.

<br>

## 4. 사용 기술

본 프로젝트는 **모노레포(Monorepo)** 구조로 구성되어 있으며, 프론트엔드와 백엔드를 하나의 저장소에서 관리합니다.

### Root

| 기술 | 설명 |
| ---- | ------ |
| `concurrently` | 프론트엔드와 백엔드 개발 서버를 하나의 명령으로 동시에 실행   |
| `nodemon` | 서버 코드 변경 시 자동으로 서버를 재시작하여 개발 편의성 제공 |
<br>

### Frontend (`/client`)

| 기술 | 설명 |
| ----- | ----- |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | 컴포넌트 기반 사용자 인터페이스 구현 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white) | 정적 타입을 적용하여 코드 안정성과 유지보수성 향상 |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | 빠른 개발 서버와 번들링 환경 제공 |
| ![tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white) | 유틸리티 클래스 기반 스타일링 |
| `React Router DOM` | 페이지 간 라우팅 처리 |
| `Socket.IO Client` | 서버와 실시간 양방향 통신 |
<br>

### Backend (`/server`)

| 기술 | 설명 |
| --------- | ------- |
| ![express](https://img.shields.io/badge/express-000000?style=flat-square&logo=express&logoColor=white) | REST API 및 Socket.IO 서버 구성 |
| ![socketio](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=Socket.io&logoColor=white) | 실시간 이벤트 기반 통신 기능 구현 |
| `CORS` | 클라이언트와 서버 간 교차 출처 요청 허용 |

<br>
<br>

## 5. 디렉토리 구조
```bash
📦socket-start
 ┣ 📂client
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┣ 📜Chatroom.tsx
 ┃ ┃ ┃ ┗ 📜Home.tsx
 ┃ ┃ ┣ 📜App.tsx
 ┃ ┃ ┣ 📜main.tsx
 ┃ ┃ ┗ 📜style.css
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜index.html
 ┃ ┣ 📜package-lock.json
 ┃ ┣ 📜package.json
 ┃ ┣ 📜postcss.config.cjs
 ┃ ┣ 📜tailwind.config.cjs
 ┃ ┣ 📜tsconfig.json
 ┃ ┗ 📜vite.config.ts
 ┣ 📂server
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜package-lock.json
 ┃ ┣ 📜package.json
 ┃ ┗ 📜server.js
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

<br>

## 6. 설치 및 실행 방법
프로젝트를 실행하기 위해서는 최상위(Root), 프론트엔드(Client), 백엔드(Server) 디렉토리의 의존성 패키지를 모두 설치해야 합니다.

### 1) 의존성 설치
프로젝트를 처음 내려받은 경우, 아래 순서대로 각 디렉토리에서 패키지를 설치합니다.

```bash
# Root
npm install

# Server
cd server
npm install
cd ..

# Client
cd client
npm install
cd ..
```
<br>

### 2) 프로젝트 실행

#### ① 전체 실행 (권장)

최상위(Root) 디렉토리에서 아래 명령어를 실행하면, `concurrently`를 통해 Express 서버와 Vite 개발 서버가 동시에 실행됩니다.

```bash
npm start
```

#### ② Root에서 개별 실행

필요에 따라 Root 디렉토리에서 각각 실행할 수 있습니다.

```bash
# Backend
npm run server

# Frontend
npm run client
```

#### ③ 각 디렉토리에서 개별 실행

각 디렉토리로 이동하여 독립적으로 실행할 수도 있습니다.

```bash
# Backend
cd server
node server.js

# Frontend
cd client
npm run dev
```
<br>

### 3) 접속 주소

- **Frontend (Vite)**: http://localhost:5173
- **Backend (Express)**: http://localhost:8080