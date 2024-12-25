import axios from 'axios';

interface VoteOption {
  optionText: string;
  imageFile?: File;
}

export const createDebate = async (
  // userId: string,
  token: string,
  keywordId: string,
  title: string,
  content: string,
  imageFile?: File,
  voteOptions?: VoteOption[]
) => {
  const formData = new FormData();
  // formData.append('userId', userId);
  formData.append('keywordId', keywordId);
  formData.append('title', title);
  formData.append('content', content);

  if (imageFile) {
    formData.append('imageFile', imageFile);
  }

  if (voteOptions && voteOptions.length > 0) {
    voteOptions.forEach((option, index) => {
      formData.append(`voteOptions[${index}].optionText`, option.optionText);
      if (option.imageFile) {
        formData.append(`voteOptions[${index}].imageFile`, option.imageFile);
      }
    });
  }

  // const token = localStorage.getItem('accessToken');

  try {
    if (!token) {
      throw new Error('토큰이 없습니다!');
    }
  
    const response = await axios.post('/api/debate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, // Authorization 헤더에 토큰 추가
      },
    });
  
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('서버 응답 에러:', error.response.data); // 서버에서 반환한 오류 데이터를 출력
    } else if (error.request) {
      console.error('요청이 서버에 도달하지 못했습니다:', error.request);
    } else {
      console.error('요청 설정 중 오류가 발생했습니다:', error.message);
    }
    throw error;
  }
};