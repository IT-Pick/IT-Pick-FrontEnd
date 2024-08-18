import axios from 'axios';

interface VotePayload {
  userId: number;
  voteOptionIds: number[];
}

export const submitVote = async (payload: VotePayload) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('토큰이 없습니다!');
  }

  try {
    const response = await axios.post('/debate/vote', payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Authorization 헤더에 토큰 추가
      },
    });

    return response.data;
  } catch (error) {
    // 에러 처리: 필요에 따라 특정 에러 코드에 대한 처리 로직 추가 가능
    if (axios.isAxiosError(error) && error.response) {
      const { code } = error.response.data;
      switch (code) {
        case 7001:
          throw new Error('투표 요청에서 잘못된 값이 존재합니다.');
        case 7002:
          throw new Error('해당 투표 옵션이 존재하지 않습니다.');
        case 5003:
          throw new Error('해당 유저가 존재하지 않습니다.');
        case 7005:
          throw new Error('복수 투표가 허용되지 않습니다.');
        default:
          throw new Error('요청 중 오류가 발생했습니다.');
      }
    }
    throw error;
  }
};
