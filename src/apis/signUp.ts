import axios from 'axios';

interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  birth_date: string;
  likedTopics: string[];
}

export const signUp = async (request: SignUpRequest) => {
  try {
    const response = await axios.post('/auth/signup', request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data; // 응답 데이터의 반환을 보장
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    throw error; // 에러를 호출자에게 전달
  }
};