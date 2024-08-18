import axios from 'axios';

interface Debate {
  title: string;
  content: string;
  mediaUrl: string | null;
  hit: number;
  comment: number;
}

export const fetchDebates = async (keywordId: number, sort: 'latest' | 'popularity'): Promise<Debate[]> => {
  try {
    const response = await axios.get(`/keyword/debate/${keywordId}`, {
      params: {
        sort: sort,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.code === 1000) {
      return response.data.result;
    } else {
      console.error('서버 오류:', response.data.message);
      return [];
    }
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    return [];
  }
};
