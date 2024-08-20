import React from 'react';
import { useKeywordState } from '../../../context/KeywordStateContext';

interface SearchResultItemProps {
  title: string;
  sources: string[];
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ title, sources = [] }) => {
  const { setSelectedKeyword } = useKeywordState();

  const handleSearchItemClick = () => {
    setSelectedKeyword(title);  // title을 context에 저장
  };

  return (
    <div>
      <div onClick={handleSearchItemClick} className="h-[84px] mx-6 pt-3 justify-between">
        <h3 className="text-[16px] font-pretendard font-medium">{title}</h3>
        {sources.length > 0 && (
          <div className="flex mt-2">
            {sources.map((source, index) => (
              <span key={index} className="bg-point100 text-point500 text-[12px] font-pretendard font-medium px-2 py-1 rounded-2xl mr-1">
                {source}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="border-b-[2px] mx-3" />
    </div>
  );
};

export default SearchResultItem;
