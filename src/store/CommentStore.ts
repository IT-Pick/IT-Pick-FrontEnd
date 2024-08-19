import create from 'zustand';
import { createComment } from '@apis/WriteDebate/api'; // 댓글 작성 API 임포트

interface Comment {
  commentId: number;
  userName: string;
  time: string;
  like: number;
  text: string;
}

interface CommentStore {
  comments: Comment[];
  addComment: (debateId: number, userId: number, comment: string) => Promise<void>;
  setComments: (comments: Comment[]) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
  addComment: async (debateId, userId, comment) => {
    try {
      const response = await createComment({
        comment,
        parentCommentId: null, // 부모 댓글이 없는 일반 댓글
        debateId,
        userId,
      });

      const newComment = {
        commentId: response.result.commentId,
        userName: '현재 유저명', // 실제 유저명 사용
        time: new Date().toLocaleString(),
        like: 0,
        text: comment,
      };

      set((state) => ({
        comments: [...state.comments, newComment],
      }));
    } catch (error) {
      console.error('댓글을 추가하는 중 오류가 발생했습니다:', error);
    }
  },
}));
