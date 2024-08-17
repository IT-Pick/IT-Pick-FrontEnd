import React from 'react';
import tag_ico_right from "@images/16x16/tag_ico_right.svg";
import namuwiki from '@images/CommunityLogo/namuwiki.svg';
import naver from '@images/CommunityLogo/naver.svg';
import google from '@images/CommunityLogo/google.svg';
import nate from '@images/CommunityLogo/nate.svg';
import zum from '@images/CommunityLogo/zum.svg';

const rankings = [
  { name: '네이트', tag: '#김현주_연애', icon: nate },
  { name: '네이버', tag: '#김현주_열애설', icon: naver },
  { name: '줌', tag: '#김현주_남자친구', icon: zum },
  { name: '구글', tag: '#김현주_열애설', icon: google },
  { name: '나무위키', tag: '#김현주_열애설', icon: namuwiki },
];

const CommunityRanking: React.FC = () => {
  return (
    <div className=" pt-[44px]  pb-[33px] ">
      <span className='ml-[24px]'>
        <span className="text-[#2E333B] font-pretendard text-[20px] font-bold leading-normal">커뮤니티 별 랭킹</span>
        <span className="text-xs text-gray-400 ml-[8px]">4월 1일 18:00 기준</span>
      </span>
      <span className="ml-[43px]">
        <div className="inline-flex items-center justify-start">
          <span className="w-[50px] h-5 text-right text-gray-400 text-sm font-medium font-['Pretendard']">랭킹보기</span>
          <img src={tag_ico_right} alt="tag_ico_right" />
        </div>
      </span>

      <ul className="ml-[24px] mt-[24px] space-y-4">
        {rankings.map((item, index) => (
          <React.Fragment key={index}>
            <li className="flex mb-4">
              <img src={item.icon} alt={item.name} className="mr-4" />
              <div className="ml-[12px] flex justify-between items-center w-full">
                <span className="font-medium text-[#1D2228] font-pretendard text-[16px]">
                  {item.name}
                </span>
                <span className="text-gray-500 text-[16px] font-pretendard mr-[24px]">
                  {item.tag}
                </span>
              </div>
            </li>
            {index < rankings.length - 1 && (
              <div className="h-[1px] bg-gray1 "/>
            )}
          </React.Fragment>
        ))}
      </ul>

    </div>
  );
};

export default CommunityRanking;
