import React from "react";
import Comment from "./Comment";
import { useTrendStore } from "@store/useTrendStore"; // zustand store import

const CommentList: React.FC = () => {
  const comments = useTrendStore((state) => state.comments);

  return (
    <div className="flex flex-col border-t-[12px] border-[#EDF0F3] pt-[28px] pb-[42px]">
      <div className="text-[14px] text-[#9EAAB5] ml-[28px] mb-[12px]">댓글 {comments.length}</div>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          userName={comment.userName}
          time={comment.time}
          text={comment.text}
          like={comment.like}
        />
      ))}
    </div>
  );
};

export default CommentList;
