import React, { useEffect, useState } from 'react';
import CategorySlider from './components/CategorySlider';
import TrendList from './components/TrendList';
import { useTrendStore } from '../../store/trendStore';
import MenuSelector from './components/MenuSelector';
import DateDisplay from './components/DateDisplay';

const RankingPage: React.FC = () => {
  const { menuType, setMenuType, communityType, setCommunityType, fetchTrends, setDate } = useTrendStore();
  const [dailyDate, setDailyDate] = useState(new Date().toISOString().split('T')[0]);
  const [weeklyDate, setWeeklyDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    fetchTrends();
    if (menuType === 'realTime') {
      const interval = setInterval(() => {
        updateCurrentTime();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [menuType, communityType, dailyDate, weeklyDate]);

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
    if (menuType === 'daily') {
      const currentDate = new Date(dailyDate);
      currentDate.setDate(currentDate.getDate() + (direction === 'prev' ? -1 : 1));
      setDailyDate(currentDate.toISOString().split('T')[0]);
      setDate(currentDate.toISOString().split('T')[0]);
    } else if (menuType === 'weekly') {
      const currentDate = new Date(weeklyDate);
      currentDate.setDate(currentDate.getDate() + (direction === 'prev' ? -7 : 7));
      setWeeklyDate(currentDate.toISOString().split('T')[0]);
      setDate(currentDate.toISOString().split('T')[0]);
    }
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
    <div className="bg-background w-[390px] h-full mx-auto font-pretendard">
      <MenuSelector menuType={menuType} setMenuType={setMenuType} />
      <CategorySlider setCommunityType={setCommunityType} />
      <DateDisplay
        menuType={menuType}
        date={menuType === 'daily' ? dailyDate : weeklyDate}
        currentTime={currentTime}
        handleDateChange={handleDateChange}
        formatDate={formatDate}
        getWeeklyDateRange={getWeeklyDateRange}
      />
      <main className="container mx-auto p-4">
        <TrendList />
      </main>
    </div>
  );
};

export default RankingPage;
