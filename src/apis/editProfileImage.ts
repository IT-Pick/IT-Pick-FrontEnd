import axios from 'axios';

export const editProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('토큰이 없습니다!');
  }

  const response = await axios.patch('/api/user/profile-img', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`, // Authorization 헤더에 토큰 추가
    },
  });

  return response.data;
};