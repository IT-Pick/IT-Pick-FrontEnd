// const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
// const URL = `${PROXY}/auth/login`;

import axios from 'axios';

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post('/auth/refresh', {
      refreshToken,
    });

    if (response.data.code === 1000) {
      return response.data.result.refreshToken;
    } else {
      throw new Error(`Error: ${response.data.code}`);
    }
  } catch (error) {
    throw error;
  }
};
