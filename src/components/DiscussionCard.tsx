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
  debateId: number; // debateId를 직접 받아옴
  className?: string; // 추가적인 클래스 이름을 위한 props
}

const formatNumber = (num: number | null) => {
  return num !== null ? new Intl.NumberFormat().format(num) : '';
};

const DiscussionCard: React.FC<DiscussionCardProps> = ({ image, hits, comments, title, debateId, className }) => {
  const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate(`/debate/details?debateId=${debateId}`);
  // };
  //김민석님 리팩토링 코드 삽입

  const handleClick = () => {
    // localStorage에서 accessToken 가져오기
    const accessToken = localStorage.getItem('accessToken');

    // accessToken이 있는 경우에만 navigate 호출
    if (accessToken) {
      navigate(`/debate/details?debateId=${debateId}`);
    } else {
      // accessToken이 없는 경우 처리 (예: 로그인 페이지로 리다이렉트)
      navigate('/login');
    }
  };

  return (
    <div className={`font-pretendard ${className}`} onClick={handleClick}>
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
      <span className="text-black font-bold text-[16px] text-left">
        {title}
      </span>
    </div>
  );
};

export default DiscussionCard;
