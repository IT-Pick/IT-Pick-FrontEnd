import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tag_ico_right from "@images/16x16/tag_ico_right.svg";
import { useTrendStore } from '@store/useTrendStore';

const RankingItem = ({ rank, name, tags }) => (
  <div className="flex flex-col w-full">
    <div className="flex gap-5 mb-4 items-center ">
      <div className="w-5 text-center text-violet-700 text-xl font-bold">{rank}</div>
      <div className="flex flex-col gap-1">
        <div className="text-gray-800 text-base font-medium leading-tight">{name}</div>
        <div className="flex gap-1">
          {tags.map((tag, index) => (
            <div key={index} className="px-2 py-1 bg-purple-100 rounded-2xl text-xs text-violet-700 font-medium">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
    {/* <div className=" h-[2px] bg-[#EDF0F3] mt-[10px]" />  */}
    {/* 최종 디자인에서 삭제 */}
  </div>
);

const IntegratedRanking: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const { trends, fetchTrends } = useTrendStore();

  const updateCurrentTime = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2);
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    
    const formattedTime = `${month}월 ${day}일 ${hour}:00 기준`;
    setCurrentTime(formattedTime);
  };

  useEffect(() => {
    updateCurrentTime();
    fetchTrends();
  }, [fetchTrends]);

  const handleRankingClick = () => {
    navigate('/ranking');
  };

  return (
    <div className="flex flex-col items-start pt-10 ml-[24px]">
      <div className="flex justify-between items-center w-full mb-[16px]">
        <div className="flex items-center">
          <span className="text-[#2E333B] font-pretendard text-[20px] font-bold leading-normal">통합 랭킹</span>
          <span className="text-xs text-gray-400 ml-[8px]">{currentTime}</span>
        </div>
        <span className="ml-[43px] cursor-pointer" onClick={handleRankingClick}>
          <div className="inline-flex items-center justify-start mr-[24px]">
            <span className="w-[50px] h-5 text-right text-gray-400 text-sm font-medium font-['Pretendard']">랭킹보기</span>
            <img src={tag_ico_right} alt="tag_ico_right" />
          </div>
        </span>
      </div>
      <div className="w-full flex flex-col gap-4 mt-[16px]">
        {trends.slice(0, 3).map((item) => (
          <RankingItem key={item.rank} {...item} />
        ))}
      </div>
    </div>
  );
};

export default IntegratedRanking;
