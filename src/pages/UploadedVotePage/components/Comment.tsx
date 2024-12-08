import React, { useState } from "react";
import profile from "../../../assets/images/ico_profile2.svg";  
import moreVertical from "../../../assets/images/ico_more-vertical.svg"; 
import heart from "../../../assets/images/24x24/ico_heart.png"; 
import heartFilled from "../../../assets/images/24x24/ico_heart_filled.svg";

interface CommentProps {
    userName: string;
    time: string;  // 서버에서 오는 시간 형식인 string으로 유지
    text: string;
    like: number;
}

const getTimeDifference = (timeString: string) => {
    const parsedTime = new Date(timeString);
    if (isNaN(parsedTime.getTime())) {
        // 파싱 실패 시 처리
        console.error('Invalid time string format:', timeString);
        return 'Invalid date';
    }

    const now = new Date();
    const diffInMs = now.getTime() - parsedTime.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
    } else {
        return `${diffInDays}일 전`;
    }
};


const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
};

const Comment: React.FC<CommentProps> = ({ userName, time, text, like }) => {
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
        <div className="max-w-custom h-auto py-[10px] px-[20px] bg-[white] rounded-[20px] mb-3 mx-4">
            <div className="p-2">
                <div className="flex w-full justify-between items-center">
                    <div className="flex items-center">
                        <img src={profile} alt="profile" className="rounded-full" width={28} height={28} />
                        <div className="text-[14px] pl-[8px] font-bold">{userName}</div>
                        {/* <div className="text-[14px] text-gray2 pl-[8px]">{getTimeDifference(time)}</div> */}
                        <div className="text-[14px] text-gray2 pl-[8px]">{time}</div>

                        {/* <button className="ml-2 text-[14px] text-gray3 pl-[16px]">답글 달기</button> */}
                    </div>
                    {/* <div>
                        <img src={moreVertical} alt="more vertical btn" />
                    </div> */}
                </div>
                <div className="flex justify-between items-center">
                    <div className="text-[#1D2228] mt-2 whitespace-pre-line">{text}</div>
                    <div className="text-gray-500 text-[12px] flex flex-col justify-center items-center">
                        <button onClick={handleLikeClick} className="focus:outline-none ">
                            <img src={isLiked ? heartFilled : heart} alt="heart icon" />
                        </button>
                        <div className="text-gray3">
                            {formatNumber(likeCount)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;
