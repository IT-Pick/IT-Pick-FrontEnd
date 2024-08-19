import React from 'react';
import tag_ico_view from '../assets/images/16x16/tag_ico_view.svg';
import tag_ico_comment from '../assets/images/16x16/tag_ico_comment.svg';

interface DiscussionCardProps {
  image: string | null;
  hits: number | null;
  comments: number | null;
  title: string;
  link: string;
  className?: string; // 추가적인 클래스 이름을 위한 props
}

const formatNumber = (num: number | null) => {
  return num !== null ? new Intl.NumberFormat().format(num) : '';
};

const DiscussionCard: React.FC<DiscussionCardProps> = ({ image, hits, comments, title, link, className }) => (
  <div className={`font-pretendard ${className}`}>
    {image === null ? (
      <div>
        <span className="text-sm font-bold">{title}</span>
        <div className="w-[164px] h-[200px] bg-point500 rounded-2xl mb-2 flex items-center justify-center text-white text-center p-2" />
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
    <a href={link} className="text-black font-bold text-[16px] text-left">
      {title}
    </a>
  </div>
);

export default DiscussionCard;
