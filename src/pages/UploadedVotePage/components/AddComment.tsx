import React, { useState } from "react";
import send from "../../../assets/images/24x24/ico_send.svg";
import { createComment } from "@apis/WriteDebate/createComment";
import { useTrendStore } from "@store/useTrendStore"; // zustand store import

interface AddCommentProps {
  debateId: number;
  userId: number;
  currentUser: string;
  getTimeDifference: (time: string) => string;
}

const AddComment: React.FC<AddCommentProps> = ({ debateId, userId, currentUser, getTimeDifference }) => {
  const [comment, setComment] = useState("");
  const addComment = useTrendStore((state) => state.addComment);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.trim()) {
      try {
        const response = await createComment({
          comment,
          parentCommentId: null,
          debateId,
          userId,
        });

        const newComment = {
          commentId: response.result.commentId,
          userName: currentUser, // 부모 컴포넌트에서 전달 받은 현재 유저명 사용
          time: getTimeDifference(new Date().toISOString()), // 상대 시간으로 변환
          like: 0,
          text: comment,
          parentCommentId: null,
        };

        addComment(debateId, newComment);  // debateId와 함께 댓글 추가
        setComment("");
      } catch (error) {
        console.error("댓글을 추가하는 중 오류가 발생했습니다:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-custom max-w-custom mx-auto flex items-center bg-[#EDF0F3] p-1 rounded-[8px]">
      <input
        type="text"
        placeholder="댓글을 입력해주세요"
        value={comment}
        onChange={handleInputChange}
        className="w-custom max-w-custom mx-auto px-4 py-2 rounded-lg bg-[#EDF0F3] focus:outline-none"
      />
      <button type="submit" className="text-white rounded-lg mr-[16px]">
        <img src={send} alt="submit button" />
      </button>
    </form>
  );
};

export default AddComment;
