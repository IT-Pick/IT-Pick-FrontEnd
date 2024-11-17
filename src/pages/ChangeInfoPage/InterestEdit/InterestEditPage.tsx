import React, { useState } from 'react';
import Header from './component/Header';
import Item from './component/Item';
import CompleteBtn from './component/CompleteBtn';

const InterestEditPage: React.FC = () => {
  const [newLikedTopics, setNewLikedTopics] = useState<string[]>([]);
  return (
    <div className="w-custom max-w-custom mx-auto h-screen bg-backgroun px-[32px] font-pretendard">
      <Header />
      <Item
        newLikedTopics={newLikedTopics}
        setNewLikedTopics={setNewLikedTopics}
      />
      <CompleteBtn newLikedTopics={newLikedTopics} />
    </div>
  );
};

export default InterestEditPage;
