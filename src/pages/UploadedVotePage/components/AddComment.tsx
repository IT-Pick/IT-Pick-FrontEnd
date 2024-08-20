import React, { useState } from "react";
import send from "../../../assets/images/24x24/ico_send.svg";
import { createComment } from "@apis/WriteDebate/createComment";
import { useTrendStore } from "@store/useTrendStore"; // zustand store import

interface AddCommentProps {
  debateId: number;
  userId: number;
}

const AddComment: React.FC<AddCommentProps> = ({ debateId, userId }) => {
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
          userName: '현재 유저명', // 실제 유저명 사용
          time: new Date().toLocaleString(),
          like: 0,
          text: comment,
        };

        addComment(debateId, newComment);  // debateId와 함께 댓글 추가
        setComment("");
      } catch (error) {
        console.error("댓글을 추가하는 중 오류가 발생했습니다:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[370px] mx-auto flex justify-around items-center bg-[#EDF0F3] p-1 rounded-[8px]">
      <input
        type="text"
        placeholder="댓글을 입력해주세요"
        value={comment}
        onChange={handleInputChange}
        className="w-[272px] px-4 py-2 rounded-lg bg-[#EDF0F3] focus:outline-none"
      />
      <button type="submit" className="text-white rounded-lg">
        <img src={send} alt="submit button" />
      </button>
    </form>
  );
};

export default AddComment;
