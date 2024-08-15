import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSignUpContext } from '../../../context/SignUpContext';


const CompleteBtn: React.FC = () => {
    const { email, password, nickname, birthDate, likedTopics } = useSignUpContext();
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const requestData = {
                email,
                password,
                nickname,
                birth_date: birthDate,
                likedTopics
            };

            const response = await axios.post('/auth/signup', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.code === 1000) {
                // 요청 성공 시
                console.log('회원가입 성공:', response.data);
                navigate('/');
            } else {
                // 요청 실패 시
                console.error('회원가입 실패:', response.data.message);
            }
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error);
        }
    }
    return(
        <button className="mx-auto mt-[90px] mb-[66px] w-[325px] h-[48px] text-[white] bg-point500 rounded-[12px]" onClick={handleClick}>
            완료</button>
    )
}

export default CompleteBtn;