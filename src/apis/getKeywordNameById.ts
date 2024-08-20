// @apis/Keywords/getKeywordNameById.ts
import axios from 'axios';

export const getKeywordNameById = async (keywordId: number): Promise<string> => {
  const response = await axios.get(`/api/keywords/${keywordId}`);
  return response.data.keywordName;
};
