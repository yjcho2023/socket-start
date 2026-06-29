/* 메인 페이지 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(''); // 닉네임 상태관리

  // 닉네임 설정 핸들러 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 채팅방 입장 핸들러 함수
  const handleJoin = () => {
    if (nickname.trim()) {
      console.log('입장 버튼 클릭시 닉네임:', nickname); // 닉네임 확인용 로그
      navigate('/chat', { state: { nickname } });
      // 페이지 대 페이지 관계여서 state 객체로 닉네임 전달 (props 아님)
    }
  };

  return (
    <div className="main_wrap flex flex-col items-center justify-center min-h-screen">
      <div className="main_title text-center font-bold my-5 text-2xl">
        채팅방 입장하기
      </div>
      <div className="main_container text-center ">
        <input
          type="text"
          placeholder="닉네임을 입력해주세요!"
          value={nickname}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />
        <button
          type="submit"
          className="m-2 py-2 px-4 rounded-lg bg-sub_green text-white"
          onClick={handleJoin}
        >
          입장
        </button>
      </div>
    </div>
  );
}
