import React, { useState, useEffect } from 'react';
import tag_ico_view from "../../../assets/images/16x16/tag_ico_view.svg";
import tag_ico_comment from "../../../assets/images/16x16/tag_ico_comment.svg";
import { getKeywordLiveDiscussion } from "@apis/getKeywordLiveDiscussion";


const DiscussionCard = ({ image, hits, comments, title, link }) => (
  <div className="w-[164px] flex-shrink-0 mb-[20px]">
    <img src={image} alt={title} className="w-[164px] h-[200px] rounded-lg mb-2" />
    <div className="w-[130px] h-6 justify-start items-start gap-2 inline-flex">
      <div className="w-[65px] px-2 py-1 bg-purple-100 rounded-2xl justify-center items-center gap-1 flex">
        <div className="flex flex-row gap-[4px] text-violet-700 text-xs font-medium font-['Pretendard']">
          <img src={tag_ico_view} alt='tag_ico_view' />{hits}
        </div>
      </div>
      <div className="w-[57px] px-2 py-1 bg-purple-100 rounded-2xl justify-center items-center gap-1 flex">
        <div className="flex flex-row gap-[4px] text-violet-700 text-xs font-medium font-['Pretendard']">
          <img src={tag_ico_comment} width={16} height={16} alt='tag_ico_comment' />{comments}
        </div>
      </div>
    </div>
    <a href={link} className="block text-[#1D2228] font-pretendard font-bold text-[16px] leading-[22.4px] no-underline mt-2">
      {title}
    </a>
  </div>
);

const PopularDiscussion: React.FC<{ keywordId: number }> = ({ keywordId }) => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchPopularDiscussions = async () => {
      try {
        const data = await getKeywordLiveDiscussion(keywordId, 'popularity');
        setDiscussions(data);
      } catch (error) {
        console.error('토론 목록을 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchPopularDiscussions();
  }, [keywordId]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-[12px]">
        {discussions.map((discussion, index) => (
          <DiscussionCard
            key={index}
            image={discussion.mediaUrl || ''} // mediaUrl이 없는 경우 빈 문자열 사용
            hits={discussion.hit}
            comments={discussion.comment}
            title={discussion.title}
            link={`/debate/${discussion.debateId}`} // debateId를 링크로 사용
          />
        ))}
      </div>
    </div>
  );
};

export default PopularDiscussion;