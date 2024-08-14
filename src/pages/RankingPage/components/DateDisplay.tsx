import React from 'react';
import leftArrow from '../../../assets/images/24x24/ico_left_arrow_gray2.svg';
import rightArrow from '../../../assets/images/24x24/ico_right_arrow_gray2.svg';

interface DateDisplayProps {
  menuType: string;
  date: string;
  currentTime: string;
  handleDateChange: (direction: 'prev' | 'next') => void;
  formatDate: (date: Date) => string;
  getWeeklyDateRange: (date: string) => JSX.Element;
}

const DateDisplay: React.FC<DateDisplayProps> = ({
  menuType,
  date,
  currentTime,
  handleDateChange,
  formatDate,
  getWeeklyDateRange,
}) => {
  return (
    <>
      {menuType !== 'realTime' && (
        <div className="flex justify-between items-center h-[36px] mt-4 mx-5">
          <button onClick={() => handleDateChange('prev')}>
            <img src={leftArrow} alt="left arrow" />
          </button>
          <span className="font-pretendard font-semibold text-[16px] text-black">
            {menuType === 'daily' ? formatDate(new Date(date)) : getWeeklyDateRange(date)}
          </span>
          <button onClick={() => handleDateChange('next')}>
            <img src={rightArrow} alt="right arrow" />
          </button>
        </div>
      )}
      {menuType === 'realTime' && (
        <div className="flex flex-col items-center h-[36px] mt-4">
          <span className="font-semibold text-[16px] text-black">{formatDate(new Date())}</span>
          <span className="font-normal text-[12px] text-gray3">{currentTime}</span>
        </div>
      )}
    </>
  );
};

export default DateDisplay;
