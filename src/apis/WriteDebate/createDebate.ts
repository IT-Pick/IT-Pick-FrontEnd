import axios from 'axios';

interface VoteOption {
  optionText: string;
  imageFile?: File;
}

export const createDebate = async (
  userId: string,
  keywordId: string,
  title: string,
  content: string,
  imageFile?: File,
  voteOptions?: VoteOption[]
) => {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('keywordId', keywordId);
  formData.append('title', title);
  formData.append('content', content);

  if (imageFile) {
    formData.append('imageFile', imageFile);
  }

  if (voteOptions && voteOptions.length > 0) {
    voteOptions.forEach((option, index) => {
      formData.append(`voteOptions[${index}][optionText]`, option.optionText);
      if (option.imageFile) {
        formData.append(`voteOptions[${index}][imageFile]`, option.imageFile);
      }
    });
  }

  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('토큰이 없습니다!');
  }

  const response = await axios.post('/debate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`, // Authorization 헤더에 토큰 추가
    },
  });

  return response.data;
};
