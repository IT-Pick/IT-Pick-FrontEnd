import React from "react";
import { useNavigate } from "react-router-dom";


const CompleteBtn: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }
    return(
        <button className="mx-auto mt-[90px] mb-[66px] w-[325px] h-[48px] text-[white] bg-point500 rounded-[12px]" onClick={handleClick}>
            완료</button>
    )
}

export default CompleteBtn;