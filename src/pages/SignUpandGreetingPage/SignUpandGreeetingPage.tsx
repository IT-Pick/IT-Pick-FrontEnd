import React from 'react';
import itpickWhiteLogo from '@images/itpickWhiteLogo.png';
import { useNavigate } from 'react-router-dom';

const SignUpandGreetingPage: React.FC = () => {
  const navigate = useNavigate();
  const handleLoginPage = () => {
    navigate('/login');
  };
  return (
    <div className="w-custom max-w-custom mx-auto h-screen flex flex-col  bg-background">
      <div className="mt-[72px] ml-[32px] text-[20px] font-bold font-pretendards">
        <p className="text-black">회원가입이 완료되었어요.</p>
        <p>
          <span className="text-point500">로그인</span>
          <span className="text-black">하고</span>
        </p>
        <p className="text-black">잇픽에서 함께 소통해요!</p>
      </div>

      <div className="mt-[98px] flex items-center justify-center">
        <img
          src={itpickWhiteLogo}
          alt="itpick white logo"
          className="w-[80px] h-[114px]"
        />
      </div>
      <div className="flex justify-center">
        <div className="w-[352px] h-[48px] mt-[260px] px-[140px] py-3 bg-[#7620e4] rounded-xl flex justify-center items-center">
          <button
            className="text-center text-white text-base font-bold font-pretendard leading-tight"
            onClick={handleLoginPage}
          >
            로그인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpandGreetingPage;
