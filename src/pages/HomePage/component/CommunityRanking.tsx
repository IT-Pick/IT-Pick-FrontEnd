import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tag_ico_right from "@images/16x16/tag_ico_right.svg";
import namuwiki from '@images/CommunityLogo/namuwiki.svg';
import naver from '@images/CommunityLogo/naver.svg';
import google from '@images/CommunityLogo/google.svg';
import nate from '@images/CommunityLogo/nate.svg';
import zum from '@images/CommunityLogo/zum.svg';
import { getCommunityRankingKeyword } from '@apis/getCommunityRankingKeyword';

const CommunityRanking: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');
  const [rankings, setRankings] = useState([
    { name: '네이트', tag: '#', icon: nate },
    { name: '네이버', tag: '#', icon: naver },
    { name: '줌', tag: '#', icon: zum },
    { name: '구글', tag: '#', icon: google },
    { name: '나무위키', tag: '#', icon: namuwiki },
  ]);

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

    const fetchRankingData = async () => {
      try {
        const result = await getCommunityRankingKeyword('your-main-keywords');
        setRankings([
          { name: '네이트', tag: `#${result.nateMainKeyword}`, icon: nate },
          { name: '네이버', tag: `#${result.naverMainKeyword}`, icon: naver },
          { name: '줌', tag: `#${result.zumMainKeyword}`, icon: zum },
          { name: '구글', tag: `#${result.googleMainKeyword}`, icon: google },
          { name: '나무위키', tag: `#${result.namuwikiMainKeyword}`, icon: namuwiki },
        ]);
      } catch (error) {
        console.error('랭킹 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchRankingData();

  }, []);

  const handleRankingClick = () => {
    navigate('/ranking');
  };

  return (
    <div className="flex flex-col items-start pt-[44px] ml-[24px]">
      <div className="flex justify-between items-center w-full mb-[16px]">
        <div className="flex items-center">
          <span className="text-[#2E333B] font-pretendard text-[20px] font-bold leading-normal">커뮤니티 별 랭킹</span>
          <span className="text-xs text-gray-400 ml-[8px]">{currentTime}</span>
        </div>
        <span className="cursor-pointer" onClick={handleRankingClick}>
          <div className="inline-flex items-center justify-start mr-[24px]">
            <span className="w-[50px] h-5 text-right text-gray-400 text-sm font-medium font-['Pretendard']">랭킹보기</span>
            <img src={tag_ico_right} alt="tag_ico_right" />
          </div>
        </span>
      </div>
      <ul className="w-full flex flex-col gap-4 mt-[24px]">
        {rankings.map((item, index) => (
          <React.Fragment key={index}>
            <li className="flex mb-4">
              <object data={item.icon} className="mr-4" type="image/svg+xml">
                <img src={item.icon} alt={item.name} />
              </object>
              <div className="flex justify-between items-center w-full">
                <span className="font-medium text-[#1D2228] font-pretendard text-[16px]">
                  {item.name}
                </span>
                <span className="text-gray-500 text-[16px] font-pretendard mr-[24px]">
                  {item.tag}
                </span>
              </div>
            </li>
            {index < rankings.length - 1 && (
              <div className="h-[1px] bg-gray1 " />
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default CommunityRanking;
