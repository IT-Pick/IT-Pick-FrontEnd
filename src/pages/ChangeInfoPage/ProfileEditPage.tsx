import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/images/bear.png';
import DeleteAccoutModal from '../../components/Modal/DeleteAccoutModal';

const ProfileEditPage: React.FC = () => {
    const [name, setName] = useState('김잇픽');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(profile);
    const navigate = useNavigate();

    const handleChangePasswordClick = () => {
        navigate('/change-password');
    };

    const handleDeleteAccountClick = () => {
        setIsDeleteModalOpen(true);
    };

    const formatDate = (dateString: string) => {
        if (dateString.length !== 8) return dateString;
        return `${dateString.slice(0, 4)}/${dateString.slice(4, 6)}/${dateString.slice(6, 8)}`;
    };

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length > 10) {
            event.target.value = event.target.value.slice(0, 10);
        }
        setName(event.target.value);
    };

    const confirmDeleteAccount = () => {
        // 탈퇴 로직 추가
        navigate('/');
    };

    const handleInterest = () => {
        navigate('/interest');
    };

    const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-[390px] h-screen flex flex-col items-center mx-auto bg-background">
            <header className="w-full flex justify-between items-center py-4">
                <h1 className="text-[20px] text-black font-pretendard font-bold leading-[28px] ml-6">프로필 편집</h1>
                <button className="mr-6 font-pretendard font-medium text-[14px] text-point400">완료</button>
            </header>
            <div className="flex flex-col items-center mt-5 text-center">
                <label htmlFor="profileImageInput" className="cursor-pointer">
                    <img src={profileImage} alt="profile_image" className="w-20 h-20 rounded-full object-cover" />
                </label>
                <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleProfileImageChange}
                />
                <textarea
                    className="w-[352px] h-[54px] pt-[12px] pb-[12px] px-[20px] mt-6 bg-gray1 rounded-[8px] focus:outline-none text-black placeholder-gray3 text-[18px] font-pretendard font-medium resize-none"
                    contentEditable
                    suppressContentEditableWarning
                    onChange={handleInput}
                    style={{ textAlign: 'left' }}
                >
                    {name}
                </textarea>
            </div>
            <div className="w-full h-3 bg-gray1 mt-8"></div>
            <div className="w-full">
                <div className="mx-6 my-2">
                    <h3 className="text-[16px] text-black font-pretendard font-bold py-3">프로필</h3>
                    <div className="flex justify-between py-3">
                        <p className="text-[16px] text-black font-pretendard font-normal">생년월일</p>
                        <p className="text-[14px] text-gray3 font-pretendard font-normal">{formatDate('20020927')}</p>
                    </div>
                    <div className="flex justify-between py-3">
                        <button onClick={handleInterest} className="text-[16px] text-black font-pretendard font-normal">관심 주제 설정</button>
                        <p className="text-[14px] text-gray3 font-pretendard font-normal">여행, 연예</p>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-gray1"></div>
                <div className="mx-6 mt-2">
                    <p className="text-[16px] text-black font-pretendard font-bold py-3">회원정보</p>
                    <div className="flex justify-between py-3">
                        <p className="text-[16px] text-black font-pretendard font-normal">이메일</p>
                        <p className="text-[14px] text-gray3 font-pretendard font-normal">kimitpick@gmail.com</p>
                    </div>
                    <p
                        className="text-[16px] text-black font-pretendard font-normal py-3 cursor-pointer"
                        onClick={handleChangePasswordClick}
                    >
                        비밀번호 변경
                    </p>
                    <p
                        className="text-[16px] text-errorpoint font-pretendard font-normal py-3 cursor-pointer"
                        onClick={handleDeleteAccountClick}
                    >
                        탈퇴하기
                    </p>
                </div>
            </div>
            <DeleteAccoutModal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                onConfirmDelete={confirmDeleteAccount}
            />
        </div>
    );
};

export default ProfileEditPage;
