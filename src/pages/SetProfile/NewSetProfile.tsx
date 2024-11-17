import React, { useState, useEffect, useRef } from 'react';
import Inputter from './Keypad';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSignUpContext } from '../../context/SignUpContext';
import { nicknameDuplicateCheck } from '../../apis/nicknameDuplicateCheck';

const NewSetProfile: React.FC = () => {
  const { nickname, setNickname, birthDate, setBirthDate } = useSignUpContext();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [birthdateError, setBirthdateError] = useState(false);
  const birthdateRef = useRef<HTMLInputElement>(null);
  const keypadRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 10) {
      setNicknameError('닉네임을 10자 이내로 작성해주세요.');
    } else {
      setNicknameError(null);
      setNickname(value);
    }
  };

  const handleBirthdateChange = (value: string) => {
    setBirthDate(value);
  };

  const handleClick = async () => {
    try {
      const response = await nicknameDuplicateCheck(nickname);

      if (response.code === 1000) {
        const formattedDate = birthDate.substring(2);
        setBirthDate(formattedDate);
        console.log('사용 가능 닉네임', response);
        navigate('/interest');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const response = error.response.data;

        if (response.code === 5002) {
          setNicknameError('중복된 닉네임입니다.');
          console.log('중복 닉네임');
        }
      } else {
        console.error('닉네임 중복 검사 중 네트워크 오류 발생:', error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        birthdateRef.current &&
        !birthdateRef.current.contains(event.target as Node) &&
        keypadRef.current &&
        !keypadRef.current.contains(event.target as Node)
      ) {
        setIsKeyboardVisible(false);
        if (birthDate.length !== 8) {
          setBirthdateError(true);
        } else {
          setBirthdateError(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [birthDate]);

  const isFormValid =
    nickname.length > 0 && birthDate.length === 8 && !nicknameError;

  return (
    <div className="flex w-custom max-w-custom mx-auto h-[800px] pt-[70px] justify-center min-h-screen font-pretendard bg-background">
      <div className="w-full max-w-md p-[20px] rounded-lg">
        <h1 className="text-[24px] font-[700] mb-[52px]">
          <div>잇픽에 필요한</div>{' '}
          <span className="text-[#7620E4]">프로필</span>을 설정해주세요.
        </h1>

        <form className="space-y-4">
          <div className="space-y-3 mb-[39px]">
            <label className="text-[16px] text-black font-[700]">닉네임</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={handleNicknameChange}
              className="w-[352px] h-[54px] pt-[12px] pb-[12px] pl-[20px] text-[18px] text-[black] font-[500] bg-gray1 rounded-[8px] focus:outline-none"
              placeholder="닉네임을 입력해주세요 (10자 이하)"
            />
            {nicknameError && (
              <span className="text-errorpoint text-[12px] font-medium ml-3">
                {nicknameError}
              </span>
            )}
          </div>

          <div className="space-y-3 relative">
            <label className="text-[16px] text-black font-[700]">
              생년월일
            </label>
            <input
              type="text"
              id="birthdate"
              value={birthDate}
              ref={birthdateRef}
              onFocus={() => setIsKeyboardVisible(true)}
              readOnly
              className=" w-[352px] h-[54px] pt-[12px] pb-[12px] pl-[20px] text-[black] font-[500] text-[18px] bg-gray1 rounded-[8px] focus:outline-none"
              placeholder="8자리 숫자로 입력해주세요"
            />
            {birthdateError && (
              <span className="text-errorpoint text-[12px] font-medium ml-3">
                생년월일을 확인해주세요.
              </span>
            )}
          </div>

          <button
            onClick={handleClick}
            type="button"
            className={`absolute bottom-[100px] w-[352px] h-[48px]  ${
              isFormValid
                ? 'bg-[#7620E4] text-white'
                : 'bg-[#F1E6FF] text-[#7620E4]'
            } text-[16px] font-[700] py-[12px] px-[140px] rounded-[12px] focus:outline-none`}
            disabled={!isFormValid}
          >
            다음으로
          </button>

          {isKeyboardVisible && (
            <div ref={keypadRef}>
              <Inputter value={birthDate} onChange={handleBirthdateChange} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewSetProfile;
