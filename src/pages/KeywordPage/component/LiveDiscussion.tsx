import React, { useState } from "react";
import ico_eclipse from "../../../assets/images/etc/ico_eclipse.svg";
import RecentDiscussion from "./RecentDiscussion";
import PopularDiscussion from "./Popular";
// import { getKeywordLiveDiscussion } from "@apis/getKeywordLiveDiscussion";

const Tab = ({activeTab, label, onClick}) => (
    <button className={`text-[14px] ${activeTab === label ? 'font-[700]' : 'text-[#9EAAB5] font-[500'}`}  onClick={()=> onClick(label)}>
        <div className="flex gap-[4px]">
            {activeTab === label && <img src={ico_eclipse} alt="eclipse"/>}
            {label}
        </div>
        
    </button>
);

const TabContent = ({ activeTab, keywordId }) => {
    if (activeTab === '인기순') {
        return <RecentDiscussion keywordId={keywordId} />;
      }
      if (activeTab === '최신순') {
        return <PopularDiscussion keywordId={keywordId} />;
      }
      return null;
};

const LiveDiscussion: React.FC<{ keywordId: number }> = ({ keywordId }) => {
    const [activeTab, setActiveTab] = useState('인기순')
    return(
        <div className="mt-[44px] mx-[24px]">
            <div className="flex justify-between items-center mb-[12px]">
                <header className="text-[20px] font-[700]">
                    실시간 토론
                </header>
                <div className="flex gap-[12px]">
                    <Tab activeTab={activeTab} label="인기순" onClick={setActiveTab}/>
                    <Tab activeTab={activeTab} label="최신순" onClick={setActiveTab}/>
                </div>
             </div>
            <TabContent activeTab={activeTab} keywordId={keywordId}/>
        </div>
        
    )
}

export default LiveDiscussion;

