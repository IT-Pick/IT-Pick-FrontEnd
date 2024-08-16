import React from 'react';

interface TrendItemProps {
  rank: number;
  name: string;
  tags: string[];
}

const TrendItem: React.FC<TrendItemProps> = ({ rank, name, tags }) => {

  const rankColor = rank === 1 || rank === 2 || rank === 3 ? 'text-point500' : 'text-gray3';

  return (
    <div className="flex flex-col font-pretendard justify-between py-3 border-b">
      <div className="flex items-center">
        <div className="flex flex-col justify-center">
          <span className={`text-[20px] font-bold ${rankColor}`}>{rank}</span>
        </div>
        <div className="ml-4">
          <span className="text-[16px] font-medium">{name}</span>
          <div className="mt-1 space-x-1">
            {tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-point100 rounded-2xl text-xs text-point500 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendItem;
