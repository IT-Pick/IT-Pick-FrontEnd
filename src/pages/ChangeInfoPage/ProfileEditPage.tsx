import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/images/ico_profile_default.svg';
import cameraIcon from '../../assets/images/ico_camera.svg';
import DeleteAccoutModal from '../../components/Modal/DeleteAccoutModal';
import { editProfileImage } from '../../apis/editProfileImage';
import { getMyPageUserInfo } from '../../apis/getMyPageUserInfo';
import { useSignUpContext } from '../../context/SignUpContext';
import { patchNickname } from '@apis/patchNickname';

const ProfileEditPage: React.FC = () => {
    const {nickname, setNickname} = useSignUpContext();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(profile);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getMyPageUserInfo();
                setProfileImage(userInfo.profileImg || profile);
            } catch (error) {
                console.error('프로필 편집의 이미지 불러오기 실패:', error);
                setProfileImage(profile);
            }
        };
    
        fetchUserInfo();
    }, []);

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



    const confirmDeleteAccount = async () => {
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
            setSelectedFile(file);
        }
    };

    //이미지 서버로 전송
    const handleProfileImageSubmit = async () => {
        if (selectedFile) {
            try {
                const data = await editProfileImage(selectedFile);
                if (data.code === 1000) {
                    console.log('이미지 업로드 성공: ', data.result.url);
                    setProfileImage(data.result.url);
                    localStorage.setItem('profileImage', data.result.url);
                } else {
                    console.log('이미지 업로드 실패:', data.message);
                }
            } catch (error) {
                console.error('이미지 업로드 중 오류 발생:', error);
            }
        }
    };

    //닉네임 변경 반영
    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        if (value.length > 10) {
            event.target.value = value.slice(0, 10);
        }
        setNickname(event.target.value);
    };

    //새로운 닉네임 서버로 전송
    const handleNicknameSubmit = async () => {
        try {
            const data = await patchNickname(nickname);
            if (data.code === 1000) {
                console.log('닉네임 변경 성공');
            } else {
                console.log('닉네임 변경 실패', data.message);
            }
        } catch (error) {
            console.error('닉네임 변경 실패', error);
        }
    };

    //완료 버튼 누를 시, 두 가지 실행
    const handleSubmit = async () => {
        await handleProfileImageSubmit();
        await handleNicknameSubmit();
        navigate(-1); // 또는 다른 페이지로 이동
    };

    return (
        <div className="w-[390px] h-screen flex flex-col items-center mx-auto bg-background">
            <header className="w-full flex justify-between items-center py-4">
                <h1 className="text-[20px] text-black font-pretendard font-bold leading-[28px] ml-6">프로필 편집</h1>
                <button 
                    className="mr-6 font-pretendard font-medium text-[14px] text-point400" 
                    onClick={handleSubmit}
                >
                    완료
                </button>
            </header>
            <div className="flex flex-col items-center mt-5 text-center">
                <div className="relative">
                    <label htmlFor="profileImageInput" className="cursor-pointer">
                        <img src={profileImage} alt="profile_image" className="w-20 h-20 rounded-full object-cover" />
                    </label>
                    <img src={cameraIcon} alt="camera_icon" className="absolute right-[-8px] bottom-[-8px]" />
                </div>
                
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
                    {nickname}
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
                onConfirmDeleteAccount={confirmDeleteAccount}
            />
        </div>
    );
};

export default ProfileEditPage;
