import React from "react";
import Header from "./component/Header";
import Item from "./component/Item";
import CompleteBtn from "./component/CompleteBtn";

const Interest: React.FC = () => {
    return(
        <div className="w-[390px] bg-background mx-auto px-[32px]">
            <Header/>
            <Item/>
            <CompleteBtn/>
        </div>
    )
}

export default Interest;