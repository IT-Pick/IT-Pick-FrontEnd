import React, { useState } from "react";
import { createComment } from "@apis/WriteDebate/createComment"; // createComment 함수가 위치한 파일 경로를 입력하세요.

interface CommentInputProps {
    debateId: number;
    parentCommentId?: number | null;
    userId: number;
    onCommentCreated: () => void; // 댓글 생성 후 댓글 목록을 갱신하기 위한 콜백 함수
}

const CommentInput: React.FC<CommentInputProps> = ({ debateId, parentCommentId = null, userId, onCommentCreated }) => {
    const [comment, setComment] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!comment.trim()) return;

        try {
            await createComment({
                comment,
                parentCommentId,
                debateId,
                userId,
            });
            setComment("");
            onCommentCreated(); // 부모 컴포넌트의 함수 호출로 댓글 목록을 갱신
        } catch (error) {
            console.error("댓글을 생성하는 중 오류가 발생했습니다.", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col mb-4">
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className="border p-2 mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                댓글 달기
            </button>
        </form>
    );
};

export default CommentInput;
