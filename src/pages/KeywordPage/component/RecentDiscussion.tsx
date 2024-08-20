import React, { useState, useEffect } from 'react';
import tag_ico_view from "../../../assets/images/16x16/tag_ico_view.svg";
import tag_ico_comment from "../../../assets/images/16x16/tag_ico_comment.svg";
import { getKeywordLiveDiscussion } from "@apis/getKeywordLiveDiscussion";
import PurpleBox from '@images/ico_purple_box.svg';

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

const DiscussionCard = ({ image, hits, comments, title, link }) => (
  <div className="w-[164px] flex-shrink-0 mb-[20px]">
    {image === PurpleBox ? (
        <div 
          className="w-[164px] h-[200px] bg-point500 rounded-2xl mb-2 flex items-center justify-center text-white text-center p-2"
          style={{ backgroundImage: `url(${PurpleBox})`, backgroundSize: 'cover' }}
        >
          <span className="text-[14px] font-pretendard font-semibold px-[15px] leading-6">
            {title}
          </span>
        </div>
      ) : (
        <img src={image} alt={title} className="w-[164px] h-[200px] rounded-2xl mb-2 object-cover object-center" />
      )}
    <div className="w-[130px] h-6 justify-start items-start gap-2 inline-flex">
      <div className="w-[65px] px-2 py-1 bg-purple-100 rounded-2xl justify-center items-center gap-1 flex">
        <div className="flex flex-row gap-[4px] text-point500 text-xs font-medium font-pretendard">
          <img src={tag_ico_view} alt='tag_ico_view' />{formatNumber(hits)}
        </div>
      </div>
      <div className="w-[57px] px-2 py-1 bg-purple-100 rounded-2xl justify-center items-center gap-1 flex">
        <div className="flex flex-row gap-[4px] text-point500 text-xs font-medium font-pretendard">
          <img src={tag_ico_comment} width={16} height={16} alt='tag_ico_comment' />{formatNumber(comments)}
        </div>
      </div>
    </div>
    <a href={link} className="block text-[#1D2228] font-pretendard font-bold text-[16px] leading-[22.4px] no-underline mt-2">
      {title}
    </a>
  </div>
);

const RecentDiscussion: React.FC<{ keywordId: number }> = ({ keywordId }) => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const data = await getKeywordLiveDiscussion(keywordId, 'latest');
        setDiscussions(data);
      } catch (error) {
        console.error('토론 목록을 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchDiscussions();
  }, [keywordId]);

  return (
    <div >
      <div className="grid grid-cols-2 gap-x-[12px]">
        {discussions.map((discussion, index) => (
          <DiscussionCard
            key={index}
            image={discussion.mediaUrl || PurpleBox} // mediaUrl이 없는 경우 빈 문자열 사용
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

export default RecentDiscussion;
