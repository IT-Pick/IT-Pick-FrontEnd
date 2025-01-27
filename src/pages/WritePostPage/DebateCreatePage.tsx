import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DebateIconBar from './components/DebateIconBar';
// import VoteResult from './components/VoteResult';
import { createDebate } from '@apis/WriteDebate/createDebate';
import { refreshAccessToken } from '@apis/refreshAccessToken';
import { getKeywordById } from '@apis/getKeywordById'; // 키워드 ID로 키워드 이름을 불러오는 API 함수 임포트

const DebateCreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [keywordName, setKeywordName] = useState<string | null>(null); // 키워드 이름 상태 추가

  const location = useLocation();
  const navigate = useNavigate();

  // 직전 페이지에서 전달된 keywordId를 받아옴
  const keywordId = location.state?.keywordId;

  useEffect(() => {
    const fetchKeywordName = async () => {
      if (keywordId) {
        try {
          const data = await getKeywordById(keywordId);
          setKeywordName(data.result); // API에서 반환된 키워드 이름 설정
        } catch (error) {
          console.error(
            '키워드 이름을 불러오는 중 오류가 발생했습니다.',
            error
          );
        }
      }
    };

    fetchKeywordName();

    const handleResize = () => {
      const currentViewportHeight = visualViewport.height;
      setViewportHeight(currentViewportHeight);

      if (window.visualViewport.height < window.innerHeight) {
        setIsKeyboardVisible(true);
      } else {
        setIsKeyboardVisible(false);
      }
    };

    window.visualViewport.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.visualViewport.removeEventListener('resize', handleResize);
    };
  }, [keywordId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    try {
      let token = localStorage.getItem('accessToken');

      if (!token) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          token = await refreshAccessToken(refreshToken);
          localStorage.setItem('accessToken', token);
        } else {
          throw new Error('로그인이 필요합니다.');
        }
      }

      await createDebate(
        token,
        keywordId.toString(), // keywordId를 사용
        title,
        content,
        imageFile || undefined
        // voteItems.length > 0 ? voteItems.map((item) => ({ optionText: item })) : []
      );
      navigate('/keyword');
    } catch (error) {
      console.error('글 작성 중 오류가 발생했습니다.', error);
      alert('글 작성 중 오류가 발생했습니다.');
    }
  };

  // if (!keywordName) {
  //   // 키워드 이름이 로딩 중일 때는 로딩 메시지 표시
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="w-custom max-w-custom mx-auto min-h-screen flex flex-col items-center justify-between bg-background">
      <div className="w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-6 py-4 px-6 bg-white">
          <div className="font-pretendard font-bold text-lg">
            <span className="text-point500">#{keywordName}</span>{' '}
            {/* keywordName을 표시 */}
            <span className="text-black"> 토론 만들기</span>
          </div>
          <button
            className="text-point400 font-pretendard font-medium text-[14px]"
            onClick={handleSubmit}
          >
            등록하기
          </button>
        </div>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[335px] px-5 font-pretendard font-bold text-[18px] text-[#2E333B] placeholder-gray3 border-none focus:outline-none bg-background"
        />
        <hr className="w-[350px] border-t border-gray1 my-[20px]" />
        <textarea
          placeholder="자유롭게 이야기해 보세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-[335px] h-[200px] px-5 font-pretendard font-medium text-[16px] text-gray5 placeholder-gray3 border-none focus:outline-none resize-none bg-background"
        />

        {/* 투표 항목이 있을 경우 표시 */}
        {/* {voteItems.length > 0 && (
          <div className="mt-4">
            <VoteResult items={voteItems} />
          </div>
        )}  */}

        {/* 미리보기 이미지가 있을 경우 표시 */}
        {previewUrl && (
          <div className="w-[335px] mt-4">
            <img
              src={previewUrl}
              alt="미리보기"
              className="w-full h-full rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
      <div
        className={`w-custom max-w-custom mx-auto flex justify-center py-3 bg-white ${isKeyboardVisible ? 'fixed bottom-0' : 'absolute bottom-0'}`}
        style={{
          bottom: isKeyboardVisible
            ? `${window.innerHeight - viewportHeight}px`
            : '0',
        }}
      >
        <DebateIconBar onFileChange={handleFileChange} />
      </div>
    </div>
  );
};

export default DebateCreatePage;
