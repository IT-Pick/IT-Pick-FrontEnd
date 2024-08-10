import React from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const handleSkip = () => {
        navigate('/');
    }
    return(
        <div className="pt-[72px] flex justify-between items-end">
            <div className="text-[24px] font-[700]">
                <span className="text-point500">관심 주제</span>
                <span className="whitespace-pre-line">를</span>
                <div>모두 선택해주세요.</div>
            </div>
            <button onClick={handleSkip} className="text-gray3 text-[14px] font-[500] underline">
                건너뛰기
            </button>
        </div>
    )
}

export default Header;