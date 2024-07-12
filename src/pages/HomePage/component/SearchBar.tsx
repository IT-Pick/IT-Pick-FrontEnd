import React from 'react';
import ico_search from "../../../assets/images/ico_search.svg";
import ico_itpick_logo from "../../../assets/images/ico_itpick_logo.svg";

const SearchBar: React.FC = () => {
  return (
    <div className="flex flex-col justify-start">
      <div className="mb-4 flex flex-col items-start">
        <div className="text-[#2E333B] font-pretendard text-[20px] font-bold ml-[24px]">
          <span className="block">현주님,</span>
          <span className="block">
            오늘의 <span className="text-[#7620E4]">연예</span> 소식을 확인해보세요!
          </span>
        </div>
      </div>

      <div className="relative flex items-center mt-4  ml-[24px] mr-[24px]">
        <img src={ico_itpick_logo} alt="Logo Icon" className="w-8 h-8 mr-[14.79px]" />
        <input 
          type="text" 
          placeholder="김현주 열애설"
          className="pl-4 pr-12 py-2 w-full rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300" 
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <img src={ico_search} alt="Search Icon" className="w-5 h-5 text-gray-400" />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;