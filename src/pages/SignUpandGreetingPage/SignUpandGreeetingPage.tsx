import React from "react";
import itpickWhiteLogo from '@images/itpickWhiteLogo.png';

const SignUpandGreetingPage: React.FC = () => {
    return (
        <div className="w-[390px] h-screen mx-auto flex flex-col  bg-background">
            <div className="mt-[72px] ml-[32px] text-[20px] font-bold font-pretendards">
                <p className="text-black">회원가입이 완료되었어요.</p>
                <p>
                    <span className="text-point500">로그인</span>
                    <span className="text-black">하고</span>
                </p>
                <p className="text-black">잇픽에서 함께 소통해요!</p>
            </div>
            
            <div className="mt-[98px] flex items-center justify-center">
                <img src={itpickWhiteLogo} alt="itpick white logo" className="w-[80px] h-[114px]"/>
            </div>
            <div className="flex justify-center">
                <div className="w-[352px] h-[48px] mt-[260px] px-[140px] py-3 bg-[#7620e4] rounded-xl flex justify-center items-center">
                    <div className="text-center text-white text-base font-bold font-pretendard leading-tight">로그인하기</div>
                </div>
            </div>
            
        </div>
    );
}

export default SignUpandGreetingPage;