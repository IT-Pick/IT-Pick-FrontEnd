import React, { useEffect, useState } from 'react';
import { fetchDebates } from '@apis/fetchDebates'; // 방금 작성한 fetchDebates 함수 임포트

const KeywordDebates: React.FC<{ keywordId: number, sort: 'latest' | 'popularity' }> = ({ keywordId, sort }) => {
  const [debates, setDebates] = useState([]);

  useEffect(() => {
    const loadDebates = async () => {
      const debatesData = await fetchDebates(keywordId, sort);
      setDebates(debatesData);
    };

    loadDebates();
  }, [keywordId, sort]);

  return (
    <div>
      {debates.length === 0 ? (
        <p>토론이 없습니다.</p>
      ) : (
        debates.map((debate, index) => (
          <div key={index} className="w-[164px] flex-shrink-0 mb-[20px]">
            <img
              src={debate.mediaUrl || '/path/to/default-image.png'} // 기본 이미지 설정 가능
              alt={debate.title}
              className="w-[164px] h-[200px] rounded-lg mb-2"
            />
            <div className="w-[130px] h-6 justify-start items-start gap-2 inline-flex">
              <div className="w-[65px] px-2 py-1 bg-purple-100 rounded-2xl justify-center items-center gap-1 flex">
                <div className="flex flex-row gap-[4px] text-violet-700 text-xs font-medium font-['Pretendard']">
                  조회수: {debate.hit}
                </div>
              </div>
              <div className="w-[57px] px-2 py-1 bg-purple-100 rounded-2xl justify-center items-center gap-1 flex">
                <div className="flex flex-row gap-[4px] text-violet-700 text-xs font-medium font-['Pretendard']">
                  댓글: {debate.comment}
                </div>
              </div>
            </div>
            <a href={`/debate/${debate.title}`} className="block text-[#1D2228] font-pretendard font-bold text-[16px] leading-[22.4px] no-underline mt-2">
              {debate.title}
            </a>
            <p>{debate.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default KeywordDebates;
