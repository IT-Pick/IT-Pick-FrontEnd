import axios from 'axios';

export const getRankingInfo = async (community = '', period = '', date = '') => {
  try {
    const response = await axios.get('/rank', {
      params: {
        community: community,
        period: period,
        date: date,
      },
    });
    
    return response.data.result;
  } catch (error) {
    console.error('랭킹 조회 중 오류:', error);
    throw error;
  }
};