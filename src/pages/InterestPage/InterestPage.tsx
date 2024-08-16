import React from "react";
import Header from "./component/Header";
import Item from "./component/Item";
import CompleteBtn from "./component/CompleteBtn";

const InterestPage: React.FC = () => {
    return(
        <div className="w-[390px] h-screen bg-background mx-auto px-[32px] font-pretendard">
            <Header/>
            <Item/>
            <CompleteBtn/>
        </div>
    )
}

export default InterestPage;