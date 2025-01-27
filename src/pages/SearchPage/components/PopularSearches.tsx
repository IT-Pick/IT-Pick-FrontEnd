import React, { useEffect, useState } from 'react';
import { getRankingInfo } from '@apis/getRankingInfo';

const PopularSearches: React.FC = () => {
  const [searches, setSearches] = useState<string[]>([]);
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
    fetchPopularSearches();
  }, []);

  const fetchPopularSearches = async () => {
    try {
      const rankingData = await getRankingInfo('total', 'real_time', '');
      const top8Searches = rankingData.slice(0, 8).map(item => item.name); // 상위 8개의 name 가져오기
      setSearches(top8Searches);
    } catch (error) {
      console.error('인기 검색어 데이터를 불러오는 중 오류 발생:', error);
      setSearches([]);
    }
  };

  // maxLength 이상이면 ... 처리
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const halfLength = Math.ceil(searches.length / 2);

  return (
    <div className="mt-8 mb-4">
      <div className="flex justify-between items-center">
        <label className="block font-pretendard font-bold text-[14px] text-gray3 ml-8">통합 인기 검색어 순위</label>
        <span 
          className="text-gray2 mr-8 font-pretendard font-medium text-[14px]">{currentTime}
        </span>
      </div>
      <div className="flex ml-8 mr-8">
  <div className="flex flex-col">
    {searches.slice(0, halfLength).map((search, index) => (
      <div key={index} className="flex items-center mt-3">
        <span className="font-pretendard font-bold text-[14px] text-gray3 mr-4">{index + 1}</span>
        <span className="font-pretendard font-semibold text-[14px] text-black">{truncateText(search, 10)}</span>
      </div>
    ))}
  </div>
  <div className="flex flex-col ml-16">
    {searches.slice(halfLength).map((search, index) => (
      <div key={index + halfLength} className="flex items-center mt-3">
        <span className="font-pretendard font-bold text-[14px] text-gray3 mr-4">{index + halfLength + 1}</span>
        <span className="font-pretendard font-semibold text-[14px] text-black">{truncateText(search, 10)}</span>
      </div>
    ))}
  </div>
</div>
</div>

  );
};

export default PopularSearches;
