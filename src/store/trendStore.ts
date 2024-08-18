//실시간 데이터 연동: zustand, axios
// import create from 'zustand';
// import axios from 'axios';

// interface Trend {
//   rank: number;
//   name: string;
//   tags: string[];
// }

// interface TrendState {
//   menuType: 'realTime' | 'daily' | 'weekly';
//   date: string;
//   trends: Trend[];
//   setMenuType: (type: 'realTime' | 'daily' | 'weekly') => void;
//   setDate: (date: string) => void;
//   fetchTrends: () => void;
// }

// export const useTrendStore = create<TrendState>((set, get) => ({
//   menuType: 'realTime',
//   date: new Date().toISOString().split('T')[0],
//   trends: [],
//   setMenuType: (type) => set({ menuType: type }),
//   setDate: (date) => set({ date }),
//   fetchTrends: async () => {
//     const { menuType, date } = get();
//     try {
//       const response = await axios.get(`/api/trends?type=${menuType}&date=${date}`);
//       set({ trends: response.data });
//     } catch (error) {
//       console.error('Error fetching trends:', error);
//     }
//   },
// }));

//1차 발표를 위해 더미 데이터 생성
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

// const fakeTrends: Trend[] = [
//   { rank: 1, name: '김현주', tags: ['나무위키 1등', '트위터 1등', '네이버 2등'] },
//   { rank: 2, name: '열애설', tags: ['네이버 1등', '다음카페 1등', '트위터 2등'] },
//   { rank: 3, name: '결혼', tags: ['인스티즈 1등', '네이트판 1등', '나무위키 2등'] },
//   { rank: 4, name: '소속사', tags: ['인스티즈 2등', '네이버 3등'] },
//   { rank: 5, name: '야구', tags: ['디시인사이드 1등', '트위터 3등'] },
//   { rank: 6, name: '뉴진스', tags: ['나무위키 1등', '트위터 1등'] },
//   { rank: 7, name: '야구선수', tags: ['나무위키 1등', '트위터 1등'] },
//   { rank: 8, name: '롯데자이언츠', tags: ['나무위키 1등', '트위터 1등'] },
//   { rank: 9, name: '퇴근', tags: ['나무위키 1등', '트위터 1등'] },
//   { rank: 10, name: '아이폰', tags: ['나무위키 1등', '트위터 1등'] },
// ];

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
