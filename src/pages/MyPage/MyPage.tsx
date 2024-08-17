import React, { useState } from 'react';
import AlarmButton from '../../components/AlarmButton';
import profile from '../../assets/images/ic_profile.svg';
import { useNavigate } from 'react-router-dom';
import LogoutModal from '../../components/Modal/LogoutModal';
import { useSignUpContext } from '../../context/SignUpContext';
import { patchNickname } from '@apis/patchNickname';
import { nicknameDuplicateCheck } from '@apis/nicknameDuplicateCheck';

const MyPage: React.FC = () => {
    const { nickname, setNickname } = useSignUpContext();
    const [newNickname, setNewNickname] = useState(nickname);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length > 10) {
            setError('닉네임은 10자 이내로 작성해주세요.');
        } else {
            setError(null);
            setNewNickname(value);
        }
    };

    const handleNicknameEdit = async () => {
        if (newNickname.trim() === "") {
            setError("닉네임을 입력해주세요.");
            return;
        }

        if (newNickname.length < 3) {
            setError("닉네임은 3자 이상이어야 합니다.");
            return;
        }

        try {//중복확인 생략
            const result = await patchNickname(newNickname);
            if (result.success) {
                setNickname(newNickname);
                setError(null);
                alert("닉네임이 성공적으로 변경되었습니다.");
            } else {
                setError("닉네임 변경에 실패했습니다.");
            }
        } catch (error) {
            console.error("닉네임 변경 중 오류 발생:", error);
            setError("서버와의 통신 중 오류가 발생했습니다.");
        }
    };

    const handleProfileEditClick = () => {
        navigate('/profile-edit');
    };

    const handleLogoutClick = () => {
        setModalIsOpen(true);
    };

    const confirmLogout = () => {
        navigate('/');
    };

    const handleDebateClick = () => {
        navigate('/debate');
    };

    const handleParticipatedDebatesClick = () => {
        navigate('/participated-debates');
    };

    return (
        <div className="w-[390px] flex flex-col items-center mx-auto">
            <header className="w-full flex justify-between items-center py-4">
                <h1 className="text-[20px] text-black font-pretendard font-bold leading-[28px] ml-6">마이페이지</h1>
                <AlarmButton />
            </header>
            <div className="flex flex-col items-center mt-5 text-center">
                <img src={profile} alt="profile_image" className="w-20 h-20" />
                <h2 className="text-[20px] text-black font-pretendard font-bold leading-[24px] mt-3">{nickname}</h2>
                <p className="text-[14px] text-gray3 mt-1">kimitpick@gmail.com</p>
                <input
                    className="border rounded px-2 py-1 mt-3"
                    type="text"
                    value={newNickname}
                    onChange={handleNicknameChange}
                    placeholder="새 닉네임을 입력하세요 (10자 이하)"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="flex gap-8 mt-5">
                    <button
                        className="bg-point500 text-[16px] text-white font-pretendard font-semibold px-12 py-3 rounded-xl cursor-pointer"
                        onClick={handleProfileEditClick}
                    >
                        프로필 편집
                    </button>
                    <button
                        className="bg-point100 text-[16px] text-point500 font-pretendard font-semibold px-12 py-3 rounded-xl cursor-pointer"
                        onClick={handleLogoutClick}
                    >
                        로그아웃
                    </button>
                </div>
                <button
                    className="bg-point500 text-[16px] text-white font-pretendard font-semibold px-12 py-3 rounded-xl cursor-pointer mt-4"
                    onClick={handleNicknameEdit}
                >
                    닉네임 변경
                </button>
            </div>
            <div className="w-full h-3 bg-gray1 mt-8"></div>
            <div className="w-full">
                <div className="ml-6 my-2">
                    <h3 className="text-[16px] text-black font-pretendard font-bold py-3">히스토리</h3>
                    <p className="text-[16px] text-black font-pretendard font-normal py-3 cursor-pointer" onClick={handleDebateClick}>
                        내가 만든 토론
                    </p>
                    <p className="text-[16px] text-black font-pretendard font-normal py-3 cursor-pointer" onClick={handleParticipatedDebatesClick}>
                        내가 참여한 토론
                    </p>
                </div>
                <div className="w-full h-0.5 bg-gray1"></div>
                <div className="ml-6 mt-2">
                    <p className="text-[16px] text-black font-pretendard font-bold py-3">공지사항</p>
                    <p className="text-[16px] text-black font-pretendard font-normal py-3">자주 묻는 질문</p>
                    <p className="text-[16px] text-black font-pretendard font-normal py-3">약관 및 정책</p>
                </div>
            </div>
            <LogoutModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onConfirmLogout={confirmLogout}
            />
        </div>
    );
};

export default MyPage;
