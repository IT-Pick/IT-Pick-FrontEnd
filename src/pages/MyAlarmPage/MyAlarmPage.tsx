import React, { useState, useEffect } from 'react';
import AlarmItem from './components/AlarmItem';
import { getAlarm } from '@apis/getAlarm';

interface Alarm {
  title: string;
  keyword: string;
  duration: string;
  debateId: number;
  comment: boolean;
  trend: boolean;
  isRead: boolean;
}

const getReadStatus = (): { [key: number]: boolean } => {
  const storedStatus = localStorage.getItem('alarmReadStatus');
  return storedStatus ? JSON.parse(storedStatus) : {};
};

const saveReadStatus = (status: { [key: number]: boolean }) => {
  localStorage.setItem('alarmReadStatus', JSON.stringify(status));
};

const MyAlarmPage: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);

  //getAlarm API 연결
  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const result = await getAlarm(); 
        const readStatus = getReadStatus();
        const updatedAlarms = result.map((alarm: Alarm) => ({
          ...alarm,
          isRead: readStatus[alarm.debateId] || false,
        }));
        setAlarms(updatedAlarms.sort((a, b) => b.time - a.time));
      } catch (error) {
        console.error('Failed to fetch alarms:', error);
      }
    };

    fetchAlarms();
  }, []);

  const handleAlarmClick = (id: number) => {
    setAlarms(prevAlarms => {
      const newAlarms = prevAlarms.map(alarm => 
        alarm.debateId === id ? { ...alarm, isRead: true } : alarm
      );
      const newReadStatus = newAlarms.reduce((acc, alarm) => {
        acc[alarm.debateId] = alarm.isRead || false;
        return acc;
      }, {} as { [key: number]: boolean });
      saveReadStatus(newReadStatus);
      return newAlarms;
    });
  };

  return (
    <div className="w-[390px] mx-auto bg-background">
      <header className="w-full py-[24.5px] bg-white">
        <h1 className="text-[20px] text-black font-bold mt-[16px] ml-[24px] ">알림</h1>
      </header>
      <div>
        {alarms.map((alarm, index) => (
          <React.Fragment key={alarm.debateId}>
            <AlarmItem {...alarm} onAlarmClick={handleAlarmClick} />
            {index < alarms.length - 1 && <div className="border-[1px] border-[#edf0f3] h-[2px] "></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MyAlarmPage;
