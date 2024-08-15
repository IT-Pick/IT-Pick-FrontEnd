import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignUpContext } from '../../../context/SignUpContext';
import { signUp } from '../../../apis/signUp';


const CompleteBtn: React.FC = () => {
    const { email, password, nickname, birthDate, likedTopics } = useSignUpContext();
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const request = {
                email,
                password,
                nickname,
                birth_date: birthDate,
                likedTopics
            };

            const response = await signUp(request);

            if (response && response.data.code === 1000) {
                // 요청 성공 시
                console.log('회원가입 성공:', response.data);
                navigate('/');
            } else if (response && response.message) {
                // 요청 실패 시
                console.error('회원가입 실패:', response.message);
            } else {
                // 예기치 않은 응답 형식
                console.error('예기치 않은 응답:', response);
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