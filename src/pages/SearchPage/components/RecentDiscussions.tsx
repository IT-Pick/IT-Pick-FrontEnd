import React, { useState, useEffect } from 'react';
import DiscussionCard from '../../../components/DiscussionCard';
import { getRecentDiscussion } from '@apis/getRecentDiscussion';
import PurpleBox from '@images/ico_purple_box.svg';

interface DiscussionCardProps {
  image: string;
  hits: number;
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

const RecentDiscussions: React.FC = () => {
  const [discussions, setDiscussions] = useState<DiscussionCardProps[]>([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const result: Response[] = await getRecentDiscussion();
        const formattedDiscussions: DiscussionCardProps[] = result.map((item) => ({
          title: item.title,
          hits: item.hit,
          image: item.mediaUrl || PurpleBox,
          comments: item.comment,
          link: item.debateId ? `/debate/details?debateId=${item.debateId}` : '', // 링크를 debateId로 초기화
        }));
        setDiscussions(formattedDiscussions);
        console.log('최근 본 토론 데이터 가져오기 성공', result);
      } catch (error) {
        console.error('최근 본 토론 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchDiscussions();
  }, []);

  return (
    <div className="mt-10 mb-4">
      <div className="flex justify-between items-center">
        <label className="block font-pretendard font-bold text-[14px] text-gray3 ml-8">최근 본 토론</label>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-3 ml-8 mr-8">
        {discussions.map((discussion, index) => (
          <DiscussionCard 
            key={index}
            title={discussion.title}
            image={discussion.image}
            hits={discussion.hits}
            comments={discussion.comments}
            debateId={discussion.debateId}
            link={discussion.link}
            showRank={false}
            className="w-[164px] h-[100%] flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default RecentDiscussions;
