import React, { useEffect, useState } from 'react';
import tag_ico_comment from '../../assets/images/16x16/tag_ico_comment.svg';
import tag_ico_view from '../../assets/images/16x16/tag_ico_view.svg';
import { useNavigate } from 'react-router-dom';
import { getInvolvedDebate } from '@apis/getInvolvedDebate';

const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

interface DebateItemProps {
  title: string;
  keyword: string;
  duration: string;
  hits: number;
  comments: number;
}

const SortingDebates: React.FC<DebateItemProps & { className?: string }> = ({
  title,
  keyword,
  duration,
  hits,
  comments,
  className,
}) => (
  <div className="w-custom max-w-custom mx-auto px-[20px] pt-6  justify-between items-center">
    <div className={`flex pb-[20px] ${className}`}>
      <div className="flex flex-col items-start flex-grow">
        <div className="text-center font-[600] text-[16px]">{title}</div>
        <div className="flex gap-[4px]">
          <div className="text-[#9EAAB5] text-[12px] font-[400]">
            {duration} |
          </div>
          <div className="text-[#7620E4] text-[12px] font-[400]">
            #{keyword}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[8px]">
        <div className="flex items-center gap-[4px] bg-purple-100 rounded-2xl px-2 py-1 text-xs text-violet-700 font-medium">
          <img src={tag_ico_view} alt="tag_ico_view" />
          {formatNumber(hits)}
        </div>
        <div className="flex items-center gap-[4px] bg-purple-100 rounded-2xl px-2 py-1 text-xs text-violet-700 font-medium">
          <img src={tag_ico_comment} alt="tag_ico_comment" />
          {formatNumber(comments)}
        </div>
      </div>
    </div>
  </div>
);

const ParticipatedDebates: React.FC = () => {
  const navigate = useNavigate();
  const [debates, setDebates] = useState([]);

  useEffect(() => {
    const fetchDebates = async () => {
      const debateData = await getInvolvedDebate();

      if (debateData.length === 0) {
        navigate('/participated-debate-no-data', { replace: true });
      } else {
        setDebates(debateData);
      }
    };
    fetchDebates();
  }, [navigate]);

  return (
    <div className="w-custom max-w-custom mx-auto h-full">
      <header className="w-full flex justify-between items-center py-4">
        <h1 className="text-[20px] text-black font-pretendard font-bold leading-[28px] ml-6">
          내가 참여한 토론
        </h1>
      </header>
      <div className="bg-background h-screen">
        {debates.map((item, index) => (
          <SortingDebates
            key={index}
            title={item.title}
            keyword={item.keyword}
            duration={item.duration}
            hits={item.hits}
            comments={item.comments}
            className={index === debates.length - 1 ? '' : 'border-b-[1px]'}
          />
        ))}
      </div>
    </div>
  );
};

export default ParticipatedDebates;
