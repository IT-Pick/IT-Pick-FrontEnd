import React, { useState } from "react";
import Header from "./component/Header";
import Item from "./component/Item";
import CompleteBtn from "./component/CompleteBtn";

const InterestEditPage: React.FC = () => {
    const [newLikedTopics, setNewLikedTopics] = useState<string[]>([]);
    return(
        <div className="w-[390px] h-screen bg-background mx-auto px-[32px] font-pretendard">
            <Header/>
            <Item newLikedTopics = {newLikedTopics} setNewLikedTopics={setNewLikedTopics}/>
            <CompleteBtn newLikedTopics={newLikedTopics}/>
        </div>
    )
}

export default InterestEditPage;