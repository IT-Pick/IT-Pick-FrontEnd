import React from "react";
import tag_right_chev from "../../../assets/images/16x16/tag_ico_right.svg";

interface MainCardProps {
    keyword: string;
    newsContent: string;
    searchLink: string;
}

const MainCard: React.FC<MainCardProps> = ({ keyword, newsContent, searchLink }) =>{
    return (
        <div className="w-[350px] h-[112px] mx-auto mt-[24px] p-[16px] justify-center items-center rounded-[16px] bg-[white] flex flex-col gap-[12px]">
            <header className="w-full flex justify-between items-center">
                <div className="text-[20px] font-[700]">{keyword}</div>
                <a href={searchLink} className="flex text-[#c5d9ec] text-[14px]">
                    바로가기
                    <img src={tag_right_chev} alt="right chevron" color="0xFF914CE9"/>
                </a>
            </header>
            <div className="text-[14px] text-[#9EAAB5]">
                {newsContent}
            </div>
        </div>
    )
}

export default MainCard;