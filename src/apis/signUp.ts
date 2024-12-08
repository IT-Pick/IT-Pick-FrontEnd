import axios from 'axios';

interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  birth_date: string;
  likedTopics: string[];
}

export const signUp = async (request: SignUpRequest) => {
  const response = await axios.post('/api/auth/signup', request, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};