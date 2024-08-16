import axios from 'axios';

export const emailDuplicateCheck = async (email: string) => {
  const response = await axios.get(`/auth/email/check`, {
    params: {
      email: encodeURIComponent(email),
    },
  });

  return response.data;
};