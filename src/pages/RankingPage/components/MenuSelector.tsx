import React from 'react';
import selectedDot from '../../../assets/images/ico_dot_point.svg';

interface MenuSelectorProps {
  menuType: string;
  setMenuType: (type: string) => void;
}

const menus = [
  { label: '실시간', value: 'realTime' },
  { label: '일간', value: 'daily' },
  { label: '주간', value: 'weekly' },
];

const MenuSelector: React.FC<MenuSelectorProps> = ({ menuType, setMenuType }) => {
  return (
    <div className="px-4 pt-5 pb-2 bg-background flex flex-col">
      <div className="flex space-x-3">
        {menus.map((menu) => (
          <div key={menu.value} className="flex flex-col items-center">
            <button
              className={`px-4 py-2 ${menuType === menu.value ? 'text-black font-bold' : 'text-gray3'}`}
              onClick={() => setMenuType(menu.value)}
            >
              {menu.label}
            </button>
            <img
              src={selectedDot}
              alt="dot"
              className={`pl-[2px] mt-[2px] ${menuType === menu.value ? 'visible' : 'invisible'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSelector;
