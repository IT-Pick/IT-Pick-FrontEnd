import axios from 'axios';

export const getUserNickname = async () => {
  try {
    const token = localStorage.getItem('accessToken');

    if(!token){
      return '익명'; //로그인을 안 해서 토큰이 없으면 닉네임 익명 반환
    }
    const response = await axios.get('/user/nickname', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return response.data.result.nickname;
  } catch (error) {
    console.error('닉네임 불러오는 중 오류 발생:', error);
    return '익명';
  }
};
