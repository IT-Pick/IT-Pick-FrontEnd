import React, { useState } from 'react';
import ico_vote_add_photo from '../../assets/images/etc/ico_vote_add_photo.svg'; // SVG 파일을 올바르게 import

// 항목 컴포넌트 (ItemInput)
const ItemInput: React.FC<{ id: number; onRemove: (id: number) => void; canRemove: boolean }> = ({ id, onRemove, canRemove }) => {
  return (
    <div className="w-[350px] h-[47px] flex-col justify-center items-start gap-3 inline-flex">
      <div className="w-[350px] h-[35px] justify-start items-center gap-3 inline-flex">
        <button
          className={`w-[18px] h-[18px] relative ${canRemove ? 'text-red-500' : 'text-gray-300 cursor-not-allowed'}`}
          onClick={() => canRemove && onRemove(id)}
          disabled={!canRemove}
          aria-label="항목 삭제"
        >
          ✕
        </button>
        <div className="h-[35px] justify-between items-center flex">
          <div className="text-[#ced5db] text-base font-medium font-['Pretendard']">항목 입력</div>
          <div className="w-[35px] h-[35px] relative">
            <img src={ico_vote_add_photo} alt="사진 추가" className="w-[35px] h-[35px]" /> 
            <div className="w-[23px] h-[23px] left-[6px] top-[6px] absolute opacity-80" />
          </div>
        </div>
      </div>
      <div className="w-[350px] h-[0px] border border-[#edf0f3]"></div>
    </div>
  );
};

// 투표 만들기 컴포넌트 (MakingVote)
const MakingVote: React.FC = () => {
  // 항목 리스트를 관리하는 상태 (초기값으로 두 개의 항목)
  const [items, setItems] = useState<number[]>([1, 2]);

  // 항목 추가 함수
  const addItem = () => {
    setItems((prevItems) => [...prevItems, prevItems.length + 1]);
  };

  // 항목 삭제 함수
  const removeItem = (id: number) => {
    if (items.length > 2) {
      setItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  return (
    <div className="w-[390px] h-screen mx-auto flex flex-col items-center justify-between bg-background">
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-6 py-4 px-6 bg-white">
          <div className="flex flex-row justify-between items-center">
            <span className="text-point500 text-lg font-bold font-pretendard">투표 만들기</span>
            <span className="text-gray3 text-sm font-medium font-pretendard">완료</span>
          </div>
        </div>

        {/* 여기에 항목이 추가됨 */}
        <div className="flex flex-col items-center">
          {items.map((item) => (
            <ItemInput
              key={item}
              id={item}
              onRemove={removeItem}
              canRemove={items.length > 2} // 항목이 2개 이상일 때만 삭제 가능
            />
          ))}
        </div>

        {/* 항목 추가 버튼 */}
        <div className="w-[350px] h-[52px] relative mt-4" onClick={addItem}>
          <div className="w-[350px] h-[52px] left-0 top-0 absolute bg-[#7620e4] rounded-lg cursor-pointer flex justify-center items-center">
            <div className="text-center text-white text-lg font-semibold font-['Pretendard']">항목 추가</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakingVote;
