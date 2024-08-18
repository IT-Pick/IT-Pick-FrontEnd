import React, { useState } from 'react';
import ico_search from "../assets/images/ico_search.svg";

interface SearchBarProps {
  placeholder: string;
  onSearch: (term: string) => void;
  onSearchAll?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch, onSearchAll }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const saveSearchTermToLocalStorage = (term: string) => {
    let storedTags = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    if (!storedTags.includes(term)) {
      storedTags = [term, ...storedTags];
      if (storedTags.length > 3) storedTags.pop(); // 최근 검색어가 3개를 넘지 않도록 제한
      localStorage.setItem('recentSearches', JSON.stringify(storedTags));
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      saveSearchTermToLocalStorage(searchTerm);
      onSearch(searchTerm);
    }
  };

    //엔터 눌렀을 때 검색
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  
  //돋보기 버튼 눌렀을 때 검색
  const handleClick = () => {
    if (onSearchAll) {
      handleSearch();
    }
  };
  
  return (
    <div 
      className="w-[342px] relative" 
      onClick={handleClick} 
      style={onSearchAll ? { cursor: 'pointer' } : {}}
    >
      <input 
        type="text" 
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="pl-4 pr-12 py-2 w-full rounded-full border border-transparent focus:outline-none placeholder-gray2 font-pretendard font-normal text-[16px]" 
      />
      <button onClick={handleSearch} className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <img src={ico_search} alt="Search Icon" className="w-5 h-5" />
      </button>
    </div>
  );
}

export default SearchBar;
