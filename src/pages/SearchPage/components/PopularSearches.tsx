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
      setSearches(rearrangeSearches(top8Searches));
    } catch (error) {
      console.error('인기 검색어 데이터를 불러오는 중 오류 발생:', error);
      setSearches([]);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const rearrangeSearches = (searches: string[]) => {
    const halfLength = Math.ceil(searches.length / 2);
    const firstColumn = searches.slice(0, halfLength);
    const secondColumn = searches.slice(halfLength);

    const rearranged = [];
    for (let i = 0; i < halfLength; i++) {
      rearranged.push(firstColumn[i]);
      if (secondColumn[i]) {
        rearranged.push(secondColumn[i]);
      }
    }

    return rearranged;
  };

  return (
    <div className="mt-8 mb-4">
      <div className="flex justify-between items-center">
        <label className="block font-pretendard font-bold text-[14px] text-gray3 ml-8">통합 인기 검색어 순위</label>
        <span 
          className="text-gray2 mr-8 font-pretendard font-medium text-[14px]">{currentTime}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-8 ml-8 mr-8">
        {searches.map((search, index) => (
          <div key={index} className="flex items-center mt-3">
            <span className="font-pretendard font-bold text-[14px] text-gray3 mr-4">
              {index + 1}
            </span>
            <span className="font-pretendard font-semibold text-[14px] text-black">
              {truncateText(search, 10)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularSearches;
