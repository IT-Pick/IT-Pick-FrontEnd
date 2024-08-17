import React, { useState, useEffect } from 'react';
import { getUserNickname } from '../../../apis/getUserNickname';

const GreetingMessage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const fetchedNickname = await getUserNickname();
        setNickname(fetchedNickname);
      } catch (error) {
        console.error('닉네임 불러오는 중 오류 발생:', error);
      }
    };

    if (isLoggedIn) {
      fetchNickname();
    }
  }, [isLoggedIn]);

    return (
      <div className="text-[#2E333B] font-pretendard text-[20px] font-bold ml-[24px]">
        {isLoggedIn ? (
          <>
            {/* 닉네임 받아오기 */}
            <span className="block">{nickname ? `${nickname}` : '유저'}님,</span>
            <span className="block">
              오늘의 <span className="text-[#7620E4]">연예</span> 소식을 확인해보세요!
            </span>
          </>
        ) : (
          <>
            <span className="block">반가워요,</span>
            <span className="block">
              로그인하고 소식을 확인해보세요!
            </span>
          </>
        )}
      </div>
    );
  };

  export default GreetingMessage;
