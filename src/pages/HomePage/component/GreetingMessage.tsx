import React from 'react';

const GreetingMessage: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
    return (
      <div className="text-[#2E333B] font-pretendard text-[20px] font-bold ml-[24px]">
        {isLoggedIn ? (
          <>
            {/* 닉네임 받아오기 */}
            <span className="block">유저님,</span>
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
