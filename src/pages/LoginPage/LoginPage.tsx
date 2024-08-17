import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { loginUser } from '@apis/loginUser';
import NonVisibility from '../../assets/images/non_visibility.svg';
import Visibility from '../../assets/images/visibility.svg';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>(''); // 사용자가 입력한 이메일 상태 관리
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false); // 이메일 형식 유효성 상태 관리
    const [password, setPassword] = useState<string>(''); // 사용자가 입력한 비밀번호 상태 관리
    const [showPassword, setShowPassword] = useState<boolean>(false); // 비밀번호 표시/숨김 상태 관리
    const [errorMessage, setErrorMessage] = useState<string>(''); // 오류 메시지 상태 관리
    const navigate = useNavigate();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setIsEmailValid(validateEmail(newEmail));
    };

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isFormValid = email.length > 0 && password.length > 0;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 

        try {
            const response = await loginUser(email, password);

            if (response.code === 1000) {
                // Login successful
                console.log('로그인 성공:', response.result);
                localStorage.setItem('accessToken', response.result.jwt.accessToken);
                localStorage.setItem('refreshToken', response.result.jwt.refreshToken);
                navigate('/');

            } else {
                handleErrorResponse(response.data.code);
            }
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error);
            setErrorMessage('로그인 요청 중 오류가 발생했습니다.');
        }
    };
    const handleErrorResponse = (code: number) => {
        switch (code) {
            case 5000:
                setErrorMessage('잘못된 값이 포함되어 있습니다.'); // Invalid format error
                break;
            case 5004:
                setErrorMessage('잘못된 비밀번호입니다.'); // Incorrect password error
                break;
            case 5006:
                setErrorMessage('존재하지 않는 이메일입니다.'); // Email not found error
                break;
            default:
                setErrorMessage('알 수 없는 오류가 발생했습니다.'); // General error message for unexpected codes
        }
    };

    return (
        <div className="bg-background flex w-[390px] h-[800px] pt-[70px] justify-center min-h-screen mx-auto font-pretendard">
            <div className="w-auto max-w-md p-8 rounded-lg">
                <h1 className="text-[24px] font-[700] mb-[52px]">
                    <div>안녕하세요 :)</div>
                    <span className="text-[#7620E4]">잇픽</span>
                    입니다.
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>                     
                    <div className="space-y-3 relative">
                        <label htmlFor="email" className="text-[16px] text-black font-[700] ml-3">
                            이메일
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-[352px] h-[54px] pt-[12px] pb-[12px] pl-[20px] text-[18px] bg-gray1 rounded-[8px] focus:outline-none text-[black] font-[500]"
                            placeholder="이메일을 입력해주세요"
                        />
                        {!isEmailValid && email.length > 0 && (
                            <p className="text-[12px] text-errorpoint font-pretendard font-medium mt-1 ml-2">
                                이메일 주소를 정확하게 입력해주세요.
                            </p>
                        )}
                    </div>
                    <div className="space-y-3 relative">
                        <label htmlFor="password" className="text-[16px] text-black font-[700] ml-3">
                            비밀번호
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-[352px] h-[54px] pt-[12px] pb-[12px] pl-[20px] text-[18px] bg-gray1 rounded-[8px] focus:outline-none text-[black] font-[500]"
                            placeholder="비밀번호를 입력해주세요"
                        />
                        <button
                            type="button"
                            onClick={handleTogglePasswordVisibility}
                            className="absolute inset-y-0 right-4 pt-[25px] flex items-center text-gray-500"
                        >
                            <img src={showPassword ? Visibility : NonVisibility} alt="toggle password visibility" />
                        </button>
                    </div>
                    {errorMessage && (
                        <p className="text-[12px] text-errorpoint font-pretendard font-medium mt-1 ml-2">
                            {errorMessage}
                        </p>
                    )}
                    <div>
                        <button
                            type="submit"
                            className={`mt-[70px] w-[352px] h-[48px] ${isFormValid ? 'bg-[#7620E4] text-white' : 'bg-[#F1E6FF] text-[#7620E4]'} font-[700] py-[12px] px-[140px] rounded-xl focus:outline-none`}
                            disabled={!isFormValid}
                        >
                            로그인하기
                        </button>
                    </div>
                </form>
                <div className="w-[350px] flex justify-around items-center pt-[12px] text-[14px] font-[500] text-[#9EAAB5]">
                    <Link to="/signup" className="hover:underline ">
                        회원가입
                    </Link>
                    <Link to="/find-id" className="hover:underline ">
                        아이디 찾기
                    </Link>
                    <Link to="/find-password" className="hover:underline">
                        비밀번호 찾기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
