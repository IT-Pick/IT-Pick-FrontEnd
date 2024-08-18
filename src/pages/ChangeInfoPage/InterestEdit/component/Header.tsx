import React from "react";

const Header: React.FC = () => {
    return(
        <div className="pt-[72px] flex justify-between items-end">
            <div className="text-[24px] font-[700]">
                <span className="text-point500">관심 주제</span>
                <span className="whitespace-pre-line">를</span>
                <div>모두 선택해주세요.</div>
            </div>
        </div>
    )
}

export default Header;