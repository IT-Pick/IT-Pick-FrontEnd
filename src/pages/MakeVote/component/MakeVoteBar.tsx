import React, { useEffect, useState } from 'react';

const MakeVoteBar: React.FC = () => {
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const currentViewportHeight = visualViewport.height;
      setViewportHeight(currentViewportHeight);

      if (window.visualViewport.height < window.innerHeight) {
        setIsKeyboardVisible(true);
      } else {
        setIsKeyboardVisible(false);
      }
    };

    window.visualViewport.addEventListener('resize', handleResize);
    handleResize(); // 초기화
    return () => {
      window.visualViewport.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleToggle = () => {
    setIsMultipleChoice(!isMultipleChoice);
  };

  return (
    <div
      className="w-full px-5 py-3 bg-white fixed left-0 right-0 border-t border-gray2 flex justify-between items-center"
      style={{ bottom: isKeyboardVisible ? `${window.innerHeight - viewportHeight}px` : '0' }}
    >
      <span className="font-pretendard text-base text-gray-800">복수 선택 가능</span>
      <div
        onClick={handleToggle} // 클릭 시 토글
        className={`relative w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
          isMultipleChoice ? 'bg-[#7620e4]' : 'bg-gray-300'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            isMultipleChoice ? 'translate-x-5' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default MakeVoteBar;
