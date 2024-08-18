import React, { useState, useEffect } from 'react';
import axios from 'axios';
import tag_ico_view from "../../../assets/images/16x16/tag_ico_view.svg";
import tag_ico_comment from "../../../assets/images/16x16/tag_ico_comment.svg";

const RecentDiscussion: React.FC = () => {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get('/api/debates'); // 서버에서 토론 목록 가져오기
        setDiscussions(response.data.result || []); // 결과를 상태에 저장, 결과가 undefined일 경우 빈 배열 설정
      } catch (error) {
        console.error('토론 목록을 가져오는 중 오류가 발생했습니다.', error);
        setDiscussions([]); // 오류 발생 시에도 빈 배열 설정
      }
    };

    fetchDiscussions(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-[12px]">
        {discussions.map((discussion, index) => (
          <div key={index} className="w-[164px] flex-shrink-0 mb-[20px]">
            <img src={discussion.image} alt={discussion.title} className="w-[164px] h-[200px] rounded-lg mb-2" />
            <div className="w-[130px] h-6 justify-start items-start gap-2 inline-flex">
              <div className="w-[65px] px-2 py-1 bg-purple-100 rounded-2xl justify-center items-center gap-1 flex">
                <div className="flex flex-row gap-[4px] text-violet-700 text-xs font-medium font-['Pretendard']">
                  <img src={tag_ico_view} alt='tag_ico_view' />{formatNumber(discussion.hits)}
                </div>
              </div>
              <div className="w-[57px] px-2 py-1 bg-purple-100 rounded-2xl justify-center items-center gap-1 flex">
                <div className="flex flex-row gap-[4px] text-violet-700 text-xs font-medium font-['Pretendard']">
                  <img src={tag_ico_comment} width={16} height={16} alt='tag_ico_comment' />{formatNumber(discussion.comments)}
                </div>
              </div>
            </div>
            <a href={discussion.link} className="block text-[#1D2228] font-pretendard font-bold text-[16px] leading-[22.4px] no-underline mt-2">
              {discussion.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentDiscussion;
