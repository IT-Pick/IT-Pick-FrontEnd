import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tagIcoVoteGray from '../../../assets/images/16x16/tag_ico_vote_gray.svg';
import tagIcoPictureGray from '../../../assets/images/16x16/tag_ico_pic_gray.svg';
import tagIcoVotePoint from '../../../assets/images/16x16/tag_ico_vote.svg';
import tagIcoPicturePoint from '../../../assets/images/16x16/tag_ico_pic.svg';

interface DebateIconBarProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 파일 변경 이벤트를 처리하기 위한 콜백 함수 prop
}

const DebateIconBar: React.FC<DebateIconBarProps> = ({ onFileChange }) => {
  const [voteActive, setVoteActive] = useState(false);
  const [pictureActive, setPictureActive] = useState(false);
  const navigate = useNavigate();

  const handleVoteClick = () => {
    setVoteActive(!voteActive);
    navigate('/make-vote'); // 투표 버튼 클릭 시 투표 페이지로 이동
  };

  const handlePictureClick = () => {
    setPictureActive(!pictureActive);
    document.getElementById('file-input')?.click(); // 파일 입력 클릭 이벤트를 트리거하여 파일 선택 창을 엽니다
  };

  return (
    <div className="w-custom max-w-custom mx-auto ml-5 flex space-x-2">
      <button
        className={`flex justify-start items-center px-4 py-1.5 rounded-full focus:outline-none border ${voteActive ? 'bg-point100 border-point500' : 'bg-background border-gray2'} border-gray2`}
        onClick={handleVoteClick}
      >
        <img
          src={voteActive ? tagIcoVotePoint : tagIcoVoteGray}
          alt="tag_ico_vote"
          className="mr-2"
        />
        <span
          className={`font-pretendard font-medium text-[14px] ${voteActive ? 'text-point500' : 'text-gray3'}`}
        >
          투표
        </span>
      </button>
      <button
        className={`flex justify-start items-center px-4 py-1.5 rounded-full focus:outline-none border ${pictureActive ? 'bg-point100 border-point500' : 'bg-background border-gray2'} border-gray2`}
        onClick={handlePictureClick}
      >
        <img
          src={pictureActive ? tagIcoPicturePoint : tagIcoPictureGray}
          alt="tag_ico_picture"
          className="mr-2"
        />
        <span
          className={`font-pretendard font-medium text-[14px] ${pictureActive ? 'text-point500' : 'text-gray3'}`}
        >
          사진/동영상
        </span>
      </button>
      <input
        type="file"
        id="file-input"
        accept="image/*,video/*"
        onChange={onFileChange} // 파일이 선택되었을 때 부모 컴포넌트로 전달된 콜백 함수를 호출합니다
        style={{ display: 'none' }} // 파일 입력 요소를 화면에 보이지 않게 숨깁니다
      />
    </div>
  );
};

export default DebateIconBar;
