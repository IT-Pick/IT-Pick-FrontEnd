import React from 'react';
import ico_search from "@images/ico_search.svg";

interface SearchBarProps {
  onClick: () => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClick, placeholder }) => {
  return (
    <div 
      className="w-[342px] h-[40px] flex items-center rounded-full bg-white cursor-pointer pl-4 pr-4" 
      onClick={onClick}
    >
      <div className="flex justify-between items-center w-full">
        <span className="text-gray2 font-pretendard font-normal text-[16px]">{placeholder}</span>
        <img src={ico_search} alt="Search Icon" className="w-5 h-5" />
      </div>
    </div>
  );
}

export default SearchBar;
