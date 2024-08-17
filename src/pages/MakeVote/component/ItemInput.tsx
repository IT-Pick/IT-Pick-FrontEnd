import React, { useState } from "react";
import ico_vote_add_photo from "../../../assets/images/etc/ico_vote_add_photo.svg";

interface ItemInputProps {
  id: number;
  onRemove: (id: number) => void;
  canRemove: boolean;
}

const ItemInput: React.FC<ItemInputProps> = ({ id, onRemove, canRemove }) => {
  const [text, setText] = useState(""); // 항목 입력 텍스트를 관리하는 상태

  return (
    <div className="w-[350px] h-[47px] flex-col justify-center items-start gap-3 inline-flex">
      <div className="w-[350px] h-[35px] justify-start items-center gap-3 inline-flex">
        <button
          className={`w-[18px] h-[18px] relative ${canRemove ? 'text-red-500' : 'text-gray-300 cursor-not-allowed'}`}
          onClick={() => canRemove && onRemove(id)}
          disabled={!canRemove}
          aria-label="항목 삭제"
        >
          ✕
        </button>
        <div className=" justify-end items-center flex flex-row">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="항목 입력"
            className="text-black text-base font-medium font-['Pretendard'] bg-transparent focus:outline-none"
          />
          <div className="w-[35px] h-[35px] relative">
            <img src={ico_vote_add_photo} alt="사진 추가" className="w-[35px] h-[35px]" /> 
            <div className="w-[23px] h-[23px] left-[6px] top-[6px] absolute opacity-80" />
          </div>
        </div>
      </div>
      <div className="w-[350px] h-[0px] border border-[#edf0f3]"></div>
    </div>
  );
};

export default ItemInput;
