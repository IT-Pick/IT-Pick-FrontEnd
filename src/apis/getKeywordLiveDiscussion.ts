import axios from 'axios';

export const getKeywordLiveDiscussion = async (keywordId: number, sort: string) => {
  try {
    const response = await axios.get(`/api/debate/keyword`, {
      params: {
        keywordId: keywordId,
        sort: sort,
      },
    });

    return response.data.result;
  } catch (error) {
    console.error('키워드 관련자료 밑 실시간 토론 불러오는 중 오류 발생:', error);
    throw error;
  }
}