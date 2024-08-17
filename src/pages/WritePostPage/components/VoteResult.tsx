import React from "react";

interface VoteResultProps {
  items: string[];
}

const VoteResult: React.FC<VoteResultProps> = ({ items }) => {
  return (
    <div className="w-[350px] h-auto px-5 pt-4 pb-5 bg-white rounded-xl flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="text-[#1d2228] text-sm font-semibold font-['Pretendard']">투표</div>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="self-stretch h-14 p-3 bg-[#edf0f3] rounded-lg flex items-center gap-2"
        >
          <div className="w-5 h-5 bg-white rounded-sm" />
          <div className="text-[#1d2228] text-base font-semibold font-['Pretendard']">
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoteResult;
