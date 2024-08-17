import React from "react";
import itpickWhiteLogo from '@images/itpickWhiteLogo.png';

const SignUpandGreetingPage: React.FC = () => {
    return (
        <div className="w-[390px] h-screen mx-auto flex flex-col items-center justify-between bg-background">
            <div className="w-[241px] h-[102px] mt-[72px] ml-[32px] text-[16px] font-bold font-pretendards">
                <p className="text-black "></p>회원가입이 완료되었어요.
                <p className="text-point500"></p>로그인
                <span className="text-black "></span>하고
                <p className="text-black "></p>잇픽에서 함께 소통해요!
            </div>
            <div className="flex justify-center items-center w-[80px] h-auto">
                <img src={itpickWhiteLogo} alt="itpick white logo" className="w-[114px] h-[114px]"/>
            </div>


            <div className="w-[352px] h-12 bottom-[100px] px-[140px] py-3 bg-[#7620e4] rounded-xl justify-center items-center absolute">
                <div className="text-center text-white text-base font-bold font-['Pretendard'] leading-tight">로그인하기</div>
            </div>
        </div>




    );
}

export default SignUpandGreetingPage;