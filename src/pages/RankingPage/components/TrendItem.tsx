import React from 'react';

interface TrendItemProps {
  rank: number;
  name: string;
  tags: string[];
}

const TrendItem: React.FC<TrendItemProps> = ({ rank, name, tags }) => {

  const rankColor = rank === 1 || rank === 2 || rank === 3 ? 'text-point500' : 'text-gray3';

  return (
    <div className="flex flex-col justify-between p-4 border-b">
      <div className="flex items-center">
        <span className={`text-lg font-bold ${rankColor}`}>{rank}</span>
        <span className="ml-4 text-lg">{name}</span>
      </div>
      <div className=" space-x-2">
        {tags.map((tag, index) => (
          <span key={index} className="ml-[22px] px-2 py-1 bg-purple-100 rounded-2xl text-xs text-violet-700 font-medium">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrendItem;
