import React, { useEffect, useState } from 'react';
import CategorySlider from './components/CategorySlider';
import TrendList from './components/TrendList';
import { useTrendStore } from '../../store/trendStore';
import MenuSelector from './components/MenuSelector';
import leftArrow from '../../assets/images/24x24/ico_left_arrow_gray2.svg';
import rightArrow from '../../assets/images/24x24/ico_right_arrow_gray2.svg';

const RankingPage: React.FC = () => {
  const { menuType, setMenuType, date, setDate, fetchTrends } = useTrendStore();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    fetchTrends();
    if (menuType === 'realTime') {
      const interval = setInterval(() => {
        updateCurrentTime();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [menuType, date]);

  const updateCurrentTime = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1);
    const day = String(now.getDate());
    const hour = now.getHours();
    const roundedHour = hour;

    const formattedTime = `${month}월 ${day}일 ${roundedHour}:00 기준`;
    setCurrentTime(formattedTime);
  };

  const handleDateChange = (direction: 'prev' | 'next') => {
    const currentDate = new Date(date);
    if (menuType === 'daily') {
      currentDate.setDate(currentDate.getDate() + (direction === 'prev' ? -1 : 1));
    } else if (menuType === 'weekly') {
      currentDate.setDate(currentDate.getDate() + (direction === 'prev' ? -7 : 7));
    }
    setDate(currentDate.toISOString().split('T')[0]);
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const getWeekOfMonth = (date: Date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfMonth = date.getDate();
    const dayOfWeek = startOfMonth.getDay();
    return Math.ceil((dayOfMonth + dayOfWeek) / 7);
  };

  const getWeeklyDateRange = (date: string) => {
    const currentDate = new Date(date);
    const startOfWeek = new Date(currentDate);
    const endOfWeek = new Date(currentDate);

    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const month = startOfWeek.getMonth() + 1;
    const weekOfMonth = getWeekOfMonth(startOfWeek);

    return (
      <div className="flex flex-col items-center">
        <span className="block font-semibold text-[16px] text-black">{`${month}월 ${weekOfMonth}주`}</span>
        <span className="block font-normal text-[12px] text-gray3">{`${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`}</span>
      </div>
    );
  };

  return (
    <div className="bg-background w-[390px] mx-auto font-pretendard">
      <MenuSelector menuType={menuType} setMenuType={setMenuType} />
      <CategorySlider />
      {menuType !== 'realTime' && (
        <div className="flex justify-between items-center h-[36px] mt-4 mx-5">
          <button onClick={() => handleDateChange('prev')}>
            <img src={leftArrow} alt="left arrow" />
          </button>
          <span className="font-pretendard font-semibold text-[16px] text-black">
          {menuType === 'daily'
              ? formatDate(new Date(date))
              : getWeeklyDateRange(date)}
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
      <main className="container mx-auto p-4">
        <TrendList />
      </main>
    </div>
  );
};

export default RankingPage;
