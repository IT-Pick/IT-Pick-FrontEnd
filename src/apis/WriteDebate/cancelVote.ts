import axios from 'axios';

interface CancelVotePayload {
  userId: number;
  voteOptionId: number;
}

export const cancelVote = async (payload: CancelVotePayload) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('토큰이 없습니다!');
  }

  const response = await axios.post('/debate/vote', payload, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Authorization 헤더에 토큰 추가
    },
  });

  return response.data;
};
