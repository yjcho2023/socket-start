/* 채팅방 */

import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

export default function Chatroom() {
  const socketRef = useRef(null); // 소켓 객체를 useRef로 관리

  // 메인 페이지에서 닉네임 가져오기
  const location = useLocation();
  const nickname = location.state?.nickname;

  // 대화 내용과 메시지 상태관리
  const [msgs, setMsgs] = useState([]); // 대화내용
  const [msg, setMsg] = useState(''); // 내가 보낸 메시지

  /* 마운트시 소켓 연결 (퇴장 전까지 연결 유지) */
  useEffect(() => {
    console.log('메인에서 받은 닉네임:', nickname);

    // 메인에서 닉네임 못 받아왔을때 에러 처리
    if (!nickname) {
      console.error('닉네임이 없습니다!');
      return;
    }

    // 소켓 연결 한번만 설정
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:8080'); // 서버 연결
      socketRef.current.emit('join', { nickname }); // 이벤트 보내기
    }

    // 클린업 함수: 소켓 연결 해제
    return () => {
      if (socketRef.current) {
        console.log('소켓 연결 해제');
        socketRef.current.disconnect();
        socketRef.current = null; // 소켓 객체 초기화
      }
    };
  }, [nickname]);
  // 의존성 배열: 닉네임 변경 시마다 실행

  // 시간 포맷팅 함수
  const formatTime = () => {
    const now = new Date();
    return now.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  };

  /* 소켓 연결되면(입장하면) 메시지 받기 */
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('message', (data) => {
        setMsgs((prev) => [...prev, { ...data, time: formatTime() }]);
      });
    }

    // 클린업 함수: 언마운트시(퇴장하면) 수신 해제
    return () => {
      if (socketRef.current) {
        socketRef.current.off('message');
      }
    };
  }, []);

  // 소켓이 있을 때만(입장했을 때만) 메시지 보내기
  const handleSendMsg = () => {
    if (msg.trim() && socketRef.current) {
      socketRef.current.emit('message', { text: msg, nickname });
      setMsg(''); // 메시지 전송 후 입력창 비우기
    }
  };

  return (
    <>
      <div className="space-y-4 p-2 max-h-[85vh] overflow-y-auto">
        {/* 메시지 영역과 입력창 분리를 위해 max-h-85vh */}
        {msgs.map((msg, index) => (
          <div key={index}>
            <div className=" bg-lime-200 p-3 rounded-md w-5/6">
              <strong>{msg.nickname}</strong>: {msg.text}
            </div>
            <div className="text-sm text-gray-500 px-2 py-1">{msg.time}</div>
          </div>
        ))}
      </div>

      {/* 메시지 입력창과 보내기 버튼 고정 */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white shadow-lg flex items-center space-x-2">
        <div>
          <strong>{nickname}:&nbsp;</strong>
        </div>
        <input
          className="flex-grow p-2 border rounded-md"
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button
          className="bg-sub_green text-white py-2 px-4 rounded-md"
          onClick={handleSendMsg}
        >
          보내기
        </button>
      </div>
    </>
  );
}
