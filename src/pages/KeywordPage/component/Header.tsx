import React from "react";
import tag_right_chev from "../../../assets/images/16x16/tag_ico_right.svg";
import { useNavigate } from "react-router-dom";

// interface HeaderProps {
//   community_name: string;
// }

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleRankingClick = () => {
    navigate(-1);
  };

  return (
    <header className="w-full flex justify-between items-center py-[16px] px-[24px] bg-[white]">
      <h1 className="text-[20px] text-black font-pretendard font-bold leading-[28px]">
        키워드 상세
      </h1>
      <div
        className="text-[#914CE9] text-[14px] font-[500] cursor-pointer flex"
        onClick={handleRankingClick}
      >
        랭킹보기
        <img src={tag_right_chev} alt="right chevron" color="0xFF914CE9" />
      </div>
    </header>
  );
};

export default Header;
