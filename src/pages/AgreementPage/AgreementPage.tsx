import React, { useState } from "react";
import ico_roundcheck_filled from "../../assets/images/24x24/ico_roundcheck_filled.svg";
import ico_roundcheck_outline from "../../assets/images/24x24/ico_roundcheck_outline.svg";
import { useNavigate } from "react-router-dom";

const AgreementPage: React.FC = () => {
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isAgeChecked, setIsAgeChecked] = useState(false);
    const [isInfoChecked, setIsInfoChecked] = useState(false);
    const [isAdChecked, setIsAdChecked] = useState(false);
    const navigate = useNavigate();

    const handleAllCheck = () => {
        const newCheckState = !isAllChecked;
        setIsAllChecked(newCheckState);
        setIsAgeChecked(newCheckState);
        setIsInfoChecked(newCheckState);
        setIsAdChecked(newCheckState);
    };

    const handleAgeCheck = () => {
        const newCheckState = !isAgeChecked;
        setIsAgeChecked(newCheckState);
        setIsAllChecked(newCheckState && isInfoChecked);
    };

    const handleInfoCheck = () => {
        const newCheckState = !isInfoChecked;
        setIsInfoChecked(newCheckState);
        setIsAllChecked(newCheckState && isInfoChecked);
    }

    const handleAdCheck = () => {
        const newCheckState = !isAdChecked;
        setIsAdChecked(newCheckState);
        setIsAllChecked(newCheckState && isAgeChecked);
    };

    const handleSignUpClick = () => {
        navigate('/new-set-profile');
    };

    const isFormValid = isAgeChecked && isInfoChecked;

    return (
        <div className="w-[390px] h-screen mx-auto pt-[72px] bg-background font-pretendard">
            <h1 className="text-2xl font-pretendard font-bold ml-6 mb-[64px]">
                <span className="text-point500">회원가입</span>
                <span className="text-black">을 위한<br />약관에 동의해주세요.</span>
            </h1>
            <div className="flex flex-col gap-[24px] mx-[20px]">
                <div className="w-[352px] h-[54px] bg-[#EDF0F3] p-[12px] border border-1 border-[#9EAAB5] rounded-[8px] flex items-center">
                    <img 
                        src={isAllChecked ? ico_roundcheck_filled : ico_roundcheck_outline} 
                        alt="check icon" 
                        className="cursor-pointer"
                        onClick={handleAllCheck}
                    />
                    <div className="text-black text-[16px] font-[700] ml-2">아래 약관에 모두 동의합니다.</div>
                </div>

                
                <div className="w-[334px] flex justify-between items-center ml-[8px]">
                    <div className="flex items-center justify-start gap-[12px]">
                        <img 
                            src={isAgeChecked ? ico_roundcheck_filled : ico_roundcheck_outline} 
                            alt="check icon" 
                            className="cursor-pointer"
                            onClick={handleAgeCheck}
                        />
                        <div className="w-[241px] text-black text-[14px] font-[500]">[필수] 만 14세 이상이며 이용 약관에 모두 동의합니다.</div>
                    </div>
                    <div onClick={()=>
                        window.open("https://emerald-server-298.notion.site/47a9e6d98af24d84a928a643f92cb930?pvs=4")
                    }className="text-gray3 text-[12px] font-[400] underline cursor-pointer">내용 보기</div>
                </div>

                <div className="w-[334px] flex justify-between items-center ml-[8px]">
                    <div className="flex items-center justify-start gap-[12px]">
                        <img 
                            src={isInfoChecked ? ico_roundcheck_filled : ico_roundcheck_outline} 
                            alt="check icon" 
                            className="cursor-pointer"
                            onClick={handleInfoCheck}
                        />
                        <div className="text-black text-[14px] font-[500]">[필수] 개인정보 처리방침에 동의합니다.</div>
                    </div>
                    <div onClick={()=>
                        window.open("https://emerald-server-298.notion.site/d2e2565ed7b34bbab37e78f7066c5e16?pvs=4")
                    }className="text-gray3 text-[12px] font-[400] underline cursor-pointer">내용 보기</div>
                </div>



                <div className="w-[334px] flex justify-between items-center ml-[8px]">
                    <div className="flex items-center justify-start gap-[12px]">
                        <img 
                            src={isAdChecked ? ico_roundcheck_filled : ico_roundcheck_outline} 
                            alt="check icon" 
                            className="cursor-pointer"
                            onClick={handleAdCheck}
                        />
                        <div className="text-black text-[14px] font-[500]">[선택] 광고 및 마케팅 수신에 동의합니다.</div>
                    </div>
                    <div onClick={()=>
                        window.open("https://emerald-server-298.notion.site/a2ec6bc8bf534cf3b6e76ee4f94e106b?pvs=4")
                    }className="text-gray3 text-[12px] font-[400] underline cursor-pointer">내용 보기</div>
                </div>
            </div>
            <button 
                onClick={handleSignUpClick}
                className={`w-[352px] h-[48px] ml-[19px] mt-[300px] py-2 rounded flex items-center justify-center font-pretendard font-bold text-[16px] text-white ${isFormValid ? 'bg-point500' : 'bg-gray2'}`}
                disabled={!isFormValid}
                style={{ border: 'none', padding: 0, borderRadius: '12px' }}
            >
                가입하기
            </button>
        </div>
    )
}

export default AgreementPage;
