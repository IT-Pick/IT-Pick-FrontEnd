import axios from 'axios';

export const getKeywordRelatedData = async (community: string, period: string, keyword: string) => {
  try {
    const response = await axios.get('/rank/reference', {
      params: {
        community,
        period,
        keyword,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error('키워드 관련자료 데이터를 가져오는 중 오류 발생:', error);
    throw error;
  }
};