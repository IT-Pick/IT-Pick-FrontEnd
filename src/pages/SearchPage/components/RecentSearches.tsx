import React from 'react';
import ico_delete_black from "../../../assets/images/16x16/tag_ico_delete_black.svg";

interface RecentSearchesProps {
  tags: string[];
  removeTag: (tag: string) => void;
  removeAllTags: () => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ tags, removeTag, removeAllTags }) => (
  <div className="mt-6 mb-4">
    <div className="flex justify-between items-center mb-2">
      <label className="block font-pretendard font-bold text-[14px] text-gray3 ml-8">최근 검색어</label>
      {tags.length > 0 && (
        <button 
          onClick={removeAllTags}
          className="text-gray2 mr-8 underline font-pretendard font-medium text-[14px]"
        >
          지우기
        </button>
      )}
    </div>
    <div className="ml-8 mr-8" style={{ height: '30px' }}>
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 h-full py-[2px]">
          {tags.map(tag => (
            <div key={tag} className="flex items-center bg-gray1 font-pretendard font-normal text-[14px] text-black px-2 py-1 rounded-full">
              <span>{tag}</span>
              <button onClick={() => removeTag(tag)} className="ml-2">
                <img src={ico_delete_black} alt="delete" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full text-gray3 text-[16px] font-pretendard font-medium">
          최근 검색어가 없어요
        </div>
      )}
    </div>
  </div>
);

export default RecentSearches;
