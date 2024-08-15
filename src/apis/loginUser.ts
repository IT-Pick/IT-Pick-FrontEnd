import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post('/auth/login', {
      email: encodeURIComponent(email),
      password: encodeURIComponent(password),
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
