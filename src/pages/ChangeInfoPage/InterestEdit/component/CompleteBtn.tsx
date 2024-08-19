import React from "react";
import { useNavigate } from "react-router-dom";
import { patchLikedTopics } from "@apis/patchLikedTopics";

interface CompleteBtnProps {
    newLikedTopics: string[];
}

const CompleteBtn: React.FC<CompleteBtnProps> = ({ newLikedTopics }) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const data = await patchLikedTopics(newLikedTopics);
            if(data.code === 1000){
                console.log("관심주제 변경 성공!");
                navigate(-1);
            }
        } catch (error) {
            console.log("관심주제 변경 실패");
            console.log(newLikedTopics);
        }
    };

    return (
        <button 
            className="mx-auto mt-[90px] mb-[66px] w-[325px] h-[48px] text-white text-[16px] font-bold bg-point500 rounded-[12px]" 
            onClick={handleClick}
        >
            변경하기
        </button>
    );
};

export default CompleteBtn;
