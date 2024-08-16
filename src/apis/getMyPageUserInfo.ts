import axios from 'axios';

export const getMyPageUserInfo = async () => {
  try {
    const token = localStorage.getItem('accessToken');

    const response = await axios.get('/user/my-page', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data.result;
  } catch (error) {
    console.error('마이페이지 정보 불러오는 중 오류 발생:', error);
    throw error;
  }
};
// 마이페이지의 profileImg, nickname, email은 이걸로 get 해옴
// 일단 홈화면의 nickname은 getUserNickname 써서 get 구현해놓음