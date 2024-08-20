import React from 'react';
import TrendItem from './TrendItem';
import { useTrendStore } from '../../../store/useTrendStore';
import { useKeywordState } from '../../../context/KeywordStateContext';
import { useNavigate } from 'react-router-dom';

const TrendList: React.FC = () => {
  const { trends } = useTrendStore();
  const { setSelectedKeyword } = useKeywordState();
  const navigate = useNavigate();

  const handleClick = (name: string) => {
    setSelectedKeyword(name); // 선택된 키워드를 전역 상태에 저장
    navigate('/keyword'); // KeywordPage로 이동
  };

  return (
    <div>
      {trends.map((trend, index) => (
        <div key={index} onClick={() => handleClick(trend.name)}>
          <TrendItem rank={trend.rank} name={trend.name} tags={trend.tags} />
        </div>
      ))}
    </div>
  );
};

export default TrendList;