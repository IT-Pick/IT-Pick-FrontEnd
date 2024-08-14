import React from 'react';
import LiveDiscussion1 from '@images/LiveDiscussion/LiveDiscussion1.png';
import LiveDiscussion2 from '@images/LiveDiscussion/LiveDiscussion2.png';
import LiveDiscussion3 from '@images/LiveDiscussion/LiveDiscussion3.png';
import DiscussionCard from '@components/DiscussionCard';

interface Discussion {
  image: string;
  hits: number | null;
  comments: number | null;
  title: string;
  link: string;
}

const discussions: Discussion[] = [
  {
    image: LiveDiscussion1,
    hits: 120,
    comments: 123,
    title: "김현주 열애설 어떻게 생각함?",
    link: "/Post1",
  },
  {
    image: LiveDiscussion2,
    hits: 990,
    comments: 45,
    title: "김현주가 아깝다 vs 차은우가 아깝다",
    link: "/Post2",
  },
  {
    image: LiveDiscussion3,
    hits: 990,
    comments: 45,
    title: "김현주가 아깝다 vs 차은우가 아깝다",
    link: "/Post3",
  },
];


const formatNumber = (num: number | null): string => {
  return num !== null ? new Intl.NumberFormat().format(num) : '0';
};


const LiveDiscussion: React.FC = () => {
  return (
    <div className="mt-[26px] ml-[24px]">
      <div className="flex-shrink-0">
        <span className="text-[#2E333B] font-pretendard text-[20px] font-bold leading-normal">실시간 토론 BEST 3</span>
      </div>
      <div className="flex space-x-[12px] mt-[12px] overflow-x-scroll overflow-y-hidden scrollbar-hidden w-auto">
        {discussions.map((discussion, index) => (
          <DiscussionCard 
            key={index}
            title={discussion.title}
            image={discussion.image}
            hits={formatNumber(discussion.hits)}
            comments={formatNumber(discussion.comments)}
            link={discussion.link}
            className="w-[164px] h-[284px] flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default LiveDiscussion;