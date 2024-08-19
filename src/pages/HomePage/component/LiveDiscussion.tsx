import React, { useState, useEffect } from 'react';
import DiscussionCard from '@components/DiscussionCard';
import { getLiveDiscussionBest3 } from '@apis/getLiveDiscussionBest3';
import PurpleBox from '@images/ico_purple_box.svg';

interface Discussion {
  image: string;
  hits: number | null;
  comments: number | null;
  title: string;
  link: string;
}

interface Response {
  title: string;
  debateId: number;
  mediaUrl?: string;
  hit: number;
  comment: number;
}

const LiveDiscussion: React.FC = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const result: Response[] = await getLiveDiscussionBest3();
        const formattedDiscussions: Discussion[] = result.map((item) => ({
          title: item.title,
          hits: item.hit,
          image: item.mediaUrl || PurpleBox,
          comments: item.comment,
          link: `/post/${item.debateId}`, // 링크를 debateId로 초기화
        }));
        setDiscussions(formattedDiscussions);
      } catch (error) {
        console.error('실시간 토론 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchDiscussions();
  }, []);

  return (
    <div className="mt-[26px] ml-[24px]">
      <div className="flex flex-shrink-0">
        <span className="text-[#2E333B] font-pretendard text-[20px] font-bold leading-normal">실시간 토론 BEST 3</span>
      </div>
      <div className="flex flex-row space-x-[12px] mt-[12px] overflow-x-scroll overflow-y-hidden scrollbar-hidden w-auto h-[100%]] pr-[24px]">
        {discussions.map((discussion, index) => (
          <DiscussionCard 
            key={index}
            title={discussion.title}
            image={discussion.image}
            hits={discussion.hits}
            comments={discussion.comments}
            link={discussion.link}
            className="w-[164px] h-[100%] flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default LiveDiscussion;