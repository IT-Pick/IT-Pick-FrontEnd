import React, { useState } from "react";
import profile from "../../../assets/images/ico_profile2.svg";  
import moreVertical from "../../../assets/images/ico_more-vertical.svg"; 
import heart from "../../../assets/images/24x24/ico_heart.png"; 
import heartFilled from "../../../assets/images/24x24/ico_heart_filled.svg";

interface CommentProps {
    userName: string;
    time: number;
    text: string;
    like: number;
}

const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
};

const Comment: React.FC<CommentProps> = ({ userName, time, text, like}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(like);

    const handleLikeClick = () => {
        if (isLiked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className="mx-auto w-[337px] h-auto py-[10px] px-[20px] bg-[white] rounded-[20px] mb-3">
            <div className="p-2">
                <div className="flex w-full justify-between items-center">
                    <div className="flex gap-[10px] items-center">
                        <img src={profile} alt="profile" className="rounded-full" />
                        <div className="text-[14px] font-bold">{userName}</div>
                        <div className="text-gray-500 text-[14px] text-[#CED5DB]">{time}분 전</div>
                        <button className="ml-2 text-[14px] text-[#9EAAB5]">답글 달기</button>
                    </div>
                    <div>
                        <img src={moreVertical} alt="more vertical btn" />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-[#1D2228] mt-2 whitespace-pre-line">{text}</div>
                    <div className="text-gray-500 text-[12px] flex flex-col justify-center items-center">
                        <button onClick={handleLikeClick} className="focus:outline-none">
                            <img src={isLiked ? heartFilled : heart} alt="heart icon" />
                        </button>
                        <div>
                            {formatNumber(likeCount)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
