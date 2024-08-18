import React, { useEffect, useState } from 'react';

interface PopularSearchesProps {
  searches: string[];
}

const PopularSearches: React.FC<PopularSearchesProps> = ({ searches }) => {
  const [currentTime, setCurrentTime] = useState('');

  const updateCurrentTime = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    
    const formattedTime = `${month}.${day} ${hour}:00 기준`;
    setCurrentTime(formattedTime);
  };

  useEffect(() => {
    updateCurrentTime();
  }, []);

  const halfLength = Math.ceil(searches.length / 2);
  const firstHalf = searches.slice(0, halfLength);
  const secondHalf = searches.slice(halfLength);

  return (
    <div className="mt-8 mb-4">
      <div className="flex justify-between items-center">
        <label className="block font-pretendard font-bold text-[14px] text-gray3 ml-8">통합 인기 검색어 순위</label>
        <span 
          className="text-gray2 mr-8 font-pretendard font-medium text-[14px]">{currentTime}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-8 ml-8 mr-8">
        <ul className="mt-3 space-y-4">
          {firstHalf.map((search, index) => (
            <li key={index}>
              <span className="font-pretendard font-bold text-[14px] text-gray3 mr-4">{index + 1}</span>
              <span className="font-pretendard font-semibold text-[14px] text-black">{search}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-3 space-y-4">
          {secondHalf.map((search, index) => (
            <li key={index}>
              <span className="font-pretendard font-bold text-[14px] text-gray3 mr-4">{index + halfLength + 1}</span>
              <span className="font-pretendard font-semibold text-[14px] text-black">{search}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopularSearches;
