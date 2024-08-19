import create from 'zustand';
import { getRankingInfo } from '@apis/getRankingInfo';

interface Trend {
  rank: number;
  name: string;
  tags: string[];
}

interface TrendState {
  menuType: 'realTime' | 'daily' | 'weekly';
  communityType: string;
  date: string;
  trends: Trend[];
  setMenuType: (type: 'realTime' | 'daily' | 'weekly') => void;
  setCommunityType: (type: string) => void;
  setDate: (date: string) => void;
  fetchTrends: () => void;
}

export const useTrendStore = create<TrendState>((set, get) => ({
  menuType: 'realTime',
  communityType: 'total', // 기본값 설정
  date: new Date().toISOString().split('T')[0],
  trends: [],
  setMenuType: (type) => set({ menuType: type }),
  setCommunityType: (type) => set({ communityType: type }),
  setDate: (date) => set({ date }),
  fetchTrends: async () => {
    const { menuType, communityType, date } = get();

    let period = '';
    let formattedDate = date;
    if (menuType === 'realTime') {
      period = 'real_time';
      formattedDate = date.replace(/-/g, '').substring(2);
    } else if (menuType === 'daily') {
      period = 'day';
      formattedDate = date.replace(/-/g, '').substring(2);
    } else if (menuType === 'weekly') {
      period = 'week';
      formattedDate = date.replace(/-/g, '').substring(2); // '240818 week도 query는 이렇게'
    }
    
    try {
      const trends = await getRankingInfo(communityType, period, formattedDate);
      console.log('Fetched trends:', trends);
      set({ trends });
    } catch (error) {
      console.error('트렌드 (랭킹) 데이터를 불러오는 중 오류 발생:', error);
      set({ trends: [] }); // 오류 발생 시 빈 배열로 설정
    }
    // 임시로 가짜 데이터 사용
    // set({ trends: fakeTrends });
  },
}));
