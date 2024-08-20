import React from 'react';
import tag_ico_view from '../assets/images/16x16/tag_ico_view.svg';
import tag_ico_comment from '../assets/images/16x16/tag_ico_comment.svg';
import PurpleBox from '@images/ico_purple_box.svg';
import { useNavigate } from 'react-router-dom';

interface DiscussionCardProps {
  image: string | null;
  hits: number | null;
  comments: number | null;
  title: string;
  debateId: number; 
  rank: number; // Add the rank prop
  className?: string; 
  showRnak: boolean;
}

const formatNumber = (num: number | null) => {
  return num !== null ? new Intl.NumberFormat().format(num) : '';
};

const DiscussionCard: React.FC<DiscussionCardProps> = ({ image, hits, comments, title, debateId, rank, className, showRank = true }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      navigate(`/debate/details?debateId=${debateId}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={`font-pretendard relative ${className}`} onClick={handleClick}>
      {showRank &&(
          <div className="absolute top-[12px] left-[16px] bg-[#914CE9] rounded-[8px] text-white w-6 h-6 flex items-center justify-center z-10">
          {rank}
        </div>
      )}
      

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
      <div className="flex justify-start items-center gap-2 mb-2">
        {hits !== null && (
          <div className="bg-point100 text-point500 rounded-2xl px-2 py-1 gap-[2px] flex items-center font-pretendard font-medium text-[12px]">
            <img src={tag_ico_view} alt="tag_ico_view" />
            {formatNumber(hits)}
          </div>
        )}
        {comments !== null && (
          <div className="bg-point100 text-point500 rounded-2xl px-2 py-1 gap-[2px] flex items-center font-pretendard font-medium text-[12px]">
            <img src={tag_ico_comment} alt="tag_ico_comment" />
            {formatNumber(comments)}
          </div>
        )}
      </div>
      <span className="text-black font-bold text-[16px] text-left line-clamp-2">
        {title}
      </span>
    </div>
  );
};

export default DiscussionCard;
