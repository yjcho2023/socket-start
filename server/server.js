/* 서버 설정 */
// 모듈 불러오기
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express(); // 인스턴스 생성

const allowedOrigins = ['http://localhost:3000'];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
);

const server = http.createServer(app); // http 서버 생성
const PORT = 8080;
const connectedUsers = new Map(); // 닉네임 중복 방지

const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
  allowEIO3: true,
});

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, '../client/build')));

// React의 기본 index.html 반환 설정
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// 클라이언트와 연결
io.on('connection', (socket) => {
  console.log('🔗 새로운 유저 연결:', socket.id);

  socket.on('join', (data) => {
    console.log('socket join data:', data);
    if (connectedUsers.has(data.nickname)) {
      console.log('🚨 이미 연결된 닉네임:', data.nickname);
      return;
    }
    const nickname = data.nickname;

    connectedUsers.set(nickname, socket.id);
    socket.nickname = nickname; // 닉네임 저장

    console.log(`✅ ${nickname} 님이 입장`);

    socket.broadcast.emit('message', {
      text: `${nickname} 님이 입장하셨습니다👏`,
      nickname,
    });
  });

  socket.on('message', (data) => {
    console.log('메세지: ', data);
    console.log(`📤 메시지 전송:`, data.text);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    const nickname = socket.nickname;

    if (nickname) {
      connectedUsers.delete(nickname); // 연결 해제시 소켓ID 삭제
      console.log(`❌ 유저 퇴장: ${nickname}`);

      socket.broadcast.emit('message', {
        text: `${nickname} 님이 퇴장하셨습니다😥`,
        nickname,
      });
    }
  });
});

// 서버 실행
server.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}}`);
});
