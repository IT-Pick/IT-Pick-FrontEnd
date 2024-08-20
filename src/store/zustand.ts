import create from 'zustand';

interface Comment {
    commentId: number;
    userName: string;
    time: string;
    like: number;
    text: string;
}

interface CommentState {
    comments: Comment[];
    addComment: (comment: Comment) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
    comments: [],
    addComment: (newComment) => set((state) => ({
        comments: [...state.comments, newComment],
    })),
}));
