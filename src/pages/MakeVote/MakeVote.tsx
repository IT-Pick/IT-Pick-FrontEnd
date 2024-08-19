import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemInput from './component/ItemInput';
import MakeVoteBar from './component/MakeVoteBar';

const MakeVote: React.FC = () => {
  const [items, setItems] = useState<number[]>([1, 2]);
  const [itemNames, setItemNames] = useState<{ [key: number]: string }>({});
  const [itemImages, setItemImages] = useState<{ [key: number]: File | null }>({}); // 이미지 파일을 저장하는 상태 추가
  const navigate = useNavigate();

  const addItem = () => {
    if (items.length < 5) {
      setItems((prevItems) => [...prevItems, prevItems.length + 1]);
    }
  };

  const removeItem = (id: number) => {
    if (items.length > 2) {
      setItems((prevItems) => prevItems.filter((item) => item !== id));
      const updatedNames = { ...itemNames };
      delete updatedNames[id];
      setItemNames(updatedNames);

      const updatedImages = { ...itemImages };
      delete updatedImages[id];
      setItemImages(updatedImages); // 이미지 상태에서도 삭제
    }
  };

  const handleNameChange = (id: number, name: string) => {
    setItemNames({ ...itemNames, [id]: name });
  };

  const handleImageChange = (id: number, image: File | null) => {
    setItemImages({ ...itemImages, [id]: image });
  };

  const handleComplete = () => {
    const voteItems = items.map((id) => ({
      name: itemNames[id] || `항목 ${id}`,
      image: itemImages[id] || null,
    }));
    navigate('/create', { state: { voteItems } });
  };

  return (
    <div className="w-[390px] h-screen mx-auto flex flex-col items-center bg-background">
      <div className="w-full flex flex-col justify-start items-center">
        <div className="w-full flex justify-between items-center mb-6 py-4 px-6 bg-white">
          <span className="text-point500 text-lg font-bold font-pretendard">투표 만들기</span>
          <span
            className="text-gray3 text-sm font-medium font-pretendard cursor-pointer"
            onClick={handleComplete}
          >
            완료
          </span>
        </div>

        <div className="w-full flex flex-col justify-start items-center gap-4">
          {items.map((item) => (
            <ItemInput
              key={item}
              id={item}
              onRemove={removeItem}
              canRemove={items.length > 2}
              onNameChange={handleNameChange}
              onImageChange={handleImageChange} // 이 부분 추가
            />
          ))}
        </div>

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

        {/* 미리보기 섹션 */}
        <div className="w-full mt-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-point500 mb-4">미리보기</h2>
          <ul className="w-full list-disc list-inside text-gray-800">
            {items.map((item) => (
              <li key={item} className="mb-2">
                {itemNames[item] || `항목 ${item}`}
              </li>
            ))}
          </ul>
        </div>

        <div className='w-[390px]'>
          <MakeVoteBar />
        </div>
      </div>
    </div>
  );
};

export default MakeVote;
