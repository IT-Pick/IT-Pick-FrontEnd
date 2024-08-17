import React, { useState } from 'react';
import ItemInput from './component/ItemInput';
import MakeVoteBar from './component/MakeVoteBar';

// 투표 만들기 컴포넌트 (MakingVote)
const MakingVote: React.FC = () => {
  const [items, setItems] = useState<number[]>([1, 2]);

  // 항목 추가 함수
  const addItem = () => {
    if (items.length < 5) {
      setItems((prevItems) => [...prevItems, prevItems.length + 1]);
    }
  };

  // 항목 삭제 함수
  const removeItem = (id: number) => {
    if (items.length > 2) {
      setItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  return (
    <div className="w-[390px] h-screen mx-auto flex flex-col items-center bg-background">
      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full flex justify-between items-center mb-6 py-4 px-6 bg-white">
          <span className="text-point500 text-lg font-bold font-pretendard">투표 만들기</span>
          <span className="text-gray3 text-sm font-medium font-pretendard">완료</span>
        </div>

        <div className="w-full flex flex-col justify-start items-center gap-4">
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
        <div className="w-full flex justify-center mt-4">
          <div
            className={`w-[350px] h-[52px] rounded-lg flex justify-center items-center ${
              items.length >= 5 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#7620e4] cursor-pointer'
            }`}
            onClick={addItem}
            style={{ pointerEvents: items.length >= 5 ? 'none' : 'auto' }}
          >
            <div className="text-center text-lg font-semibold font-pretendard text-white">
              항목 추가
            </div>
          </div>
        </div>

        <MakeVoteBar />
      </div>
    </div>
  );
};

export default MakingVote;
