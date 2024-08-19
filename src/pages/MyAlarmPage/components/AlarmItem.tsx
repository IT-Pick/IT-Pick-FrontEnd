import React from 'react';

interface AlarmItemProps {
  title: string;
  keyword: string;
  duration: string;
  debateId: number;
  comment: boolean;
  trend: boolean;
  isRead: boolean;
  onAlarmClick: (id: number) => void;
}

const AlarmItem: React.FC<AlarmItemProps> = ({
  title,
  keyword,
  duration,
  debateId,
  comment,
  trend,
  isRead,
  onAlarmClick,
}) => {
  const getMessage = () => {
    if (comment) {
      return "토론에 댓글이 달렸어요";
    } else if (trend) {
      return "토론이 인기글에 선정되었어요";
    }
    return "";
  };

  return (
    <div 
      className={`p-[16px] ${isRead ? 'bg-[#f8f9fc]' : 'bg-purple-100'}`}
      onClick={() => onAlarmClick(debateId)} 
    > 
      <div>
        <div className="text-[14px] text-gray-700 font-semibold">
          [{title}] {getMessage()}
        </div>
        <p className='flex space-x-[4px] text-[12px] text-gray-500'>
          <span className='text-gray3'>{duration}</span>
          <span className='text-gray2'>|</span>
          <span className='text-purple-500'># {keyword}</span>
        </p>
      </div>
    </div>
  );
};

export default AlarmItem;
