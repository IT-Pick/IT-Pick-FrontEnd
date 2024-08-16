import React, { useState } from 'react';

interface ItemInputProps {
  id: number; // 각 항목의 고유 ID
  onRemove: (id: number) => void; // 항목 삭제 시 호출되는 함수
}

// 개별 항목 입력 컴포넌트
const ItemInput: React.FC<ItemInputProps> = ({ id, onRemove }) => {
  return (
    <div className="flex items-center space-x-2 p-2 border-b">
      {/* 삭제 버튼: 클릭 시 해당 항목을 삭제 */}
      <button
        onClick={() => onRemove(id)}
        className="text-gray-500 hover:text-red-500 transition-colors"
        aria-label="항목 삭제"
      >
        ✕
      </button>
      
      {/* 항목 입력 textarea */}
      <textarea
        className="flex-1 p-2 border rounded resize-none"
        placeholder="항목 입력"
        rows={1} // 기본적으로 한 줄 크기의 textarea
      />
      
      {/* 사진 첨부 버튼: 클릭 시 알림 표시 (추후 기능 구현 예정) */}
      <button
        onClick={() => alert('사진 첨부 기능은 나중에 구현됩니다.')}
        className="text-gray-500 hover:text-blue-500 transition-colors"
        aria-label="사진 첨부"
      >
        🖼️
      </button>
    </div>
  );
};

// 항목 목록을 관리하는 컴포넌트
const ItemList: React.FC = () => {
  // 항목들의 ID를 저장하는 상태
  const [items, setItems] = useState<number[]>([0]);

  // 새로운 항목 추가 함수
  const addItem = () => {
    setItems((prevItems) => [...prevItems, prevItems.length]); // 새 항목 ID는 현재 항목 수로 설정
  };

  // 특정 항목 삭제 함수
  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item !== id)); // 해당 ID를 가진 항목 삭제
  };

  return (
    <div className="space-y-2">
      {/* 각각의 항목을 렌더링 */}
      {items.map((item) => (
        <ItemInput key={item} id={item} onRemove={removeItem} />
      ))}
      
      {/* 항목 추가 버튼 */}
      <button
        onClick={addItem}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        항목 추가
      </button>
    </div>
  );
};

export default ItemList;
