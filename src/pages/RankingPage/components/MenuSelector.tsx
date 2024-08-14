import React from 'react';
import selectedDot from '../../../assets/images/ico_dot_point.svg';

interface MenuSelectorProps {
  menuType: string;
  setMenuType: (type: string) => void;
}

const MenuSelector: React.FC<MenuSelectorProps> = ({ menuType, setMenuType }) => {
  return (
    <div className="px-4 pt-5 pb-2 bg-background flex flex-col">
      <div className="flex space-x-3">
        <div className="flex flex-col items-center">
          <button
            className={`px-4 py-2 ${menuType === 'realTime' ? 'text-black font-bold' : 'text-gray3'}`}
            onClick={() => setMenuType('realTime')}
          >
            실시간
          </button>
          <img
              src={selectedDot}
              alt="dot"
              className={`pl-[2px] mt-[2px] ${menuType === 'realTime' ? 'visible' : 'invisible'}`}
            />
        </div>
        <div className="flex flex-col items-center">
          <button
            className={`px-4 py-2 ${menuType === 'daily' ? 'text-black font-bold' : 'text-gray3'}`}
            onClick={() => setMenuType('daily')}
          >
            일간
          </button>
          <img
              src={selectedDot}
              alt="dot"
              className={`pl-[2px] mt-[2px] ${menuType === 'daily' ? 'visible' : 'invisible'}`}
            />
        </div>
        <div className="flex flex-col items-center">
          <button
            className={`px-4 py-2 ${menuType === 'weekly' ? 'text-black font-bold' : 'text-gray-400'}`}
            onClick={() => setMenuType('weekly')}
          >
            주간
          </button>
          <img
              src={selectedDot}
              alt="dot"
              className={`pl-[2px] mt-[2px] ${menuType === 'weekly' ? 'visible' : 'invisible'}`}
            />
        </div>
      </div>
    </div>
  );
};

export default MenuSelector;
