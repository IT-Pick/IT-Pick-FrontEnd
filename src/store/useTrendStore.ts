import create from 'zustand';
import { getRankingInfo } from '@apis/getRankingInfo';

interface Trend {
  rank: number;
  name: string;
  tags: string[];
}

interface Comment {
  commentId: number;
  userName: string;
  time: string;
  like: number;
  text: string;
  parentCommentId: number | null;
}

interface TrendState {
  menuType: 'realTime' | 'daily' | 'weekly';
  communityType: string;
  date: string;
  trends: Trend[];
  comments: { [debateId: number]: Comment[] };  // 댓글 상태를 debateId별로 관리
  setMenuType: (type: 'realTime' | 'daily' | 'weekly') => void;
  setCommunityType: (type: string) => void;
  setDate: (date: string) => void;
  fetchTrends: () => void;
  addComment: (debateId: number, comment: Comment) => void;  // 댓글 추가 함수
  setComments: (debateId: number, updater: (prevComments: Comment[]) => Comment[]) => void;  // 댓글 설정 함수
}

export const useTrendStore = create<TrendState>((set, get) => ({
  menuType: 'realTime',
  communityType: 'total',
  date: new Date().toISOString().split('T')[0],
  trends: [],
  comments: {},  // 댓글 초기 상태를 객체로 초기화

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
      formattedDate = date.replace(/-/g, '').substring(2);
    }

    try {
      const trends = await getRankingInfo(communityType, period, formattedDate);
      console.log('Fetched trends:', trends);
      set({ trends });
    } catch (error) {
      console.error('트렌드 (랭킹) 데이터를 불러오는 중 오류 발생:', error);
      set({ trends: [] });
    }
  },

  addComment: (debateId, newComment) => set((state) => {
    const existingComments = state.comments[debateId] || [];
    const isDuplicate = existingComments.some((comment) => comment.commentId === newComment.commentId);

    if (isDuplicate) {
      console.warn(`중복된 댓글 감지: commentId=${newComment.commentId}`);
      return {}; // 중복 댓글이면 상태 변경 없음
    } 

    return {
      comments: {
        ...state.comments,
        [debateId]: [...existingComments, newComment],
      },
    };
  }),

  setComments: (debateId, updater: (prevComments: Comment[]) => Comment[]) => set((state) => {
    const prevComments = state.comments[debateId] || []; // 기존 댓글 가져오기
    const updatedComments = updater(prevComments); // 업데이트 함수 실행
    return {
      comments: {
        ...state.comments,
        [debateId]: updatedComments, // 업데이트된 댓글 상태 저장
      },
    };
  }),
}));
