import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('/auth/login', {
      email,  // encodeURIComponent 제거
      password,  // encodeURIComponent 제거
    });

    return response.data;
  } catch (error) {
    throw error;  
  }
};
