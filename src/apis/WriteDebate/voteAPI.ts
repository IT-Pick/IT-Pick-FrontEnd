import axios, { AxiosResponse } from 'axios';

interface VoteRequest {
    userId: number;
    voteOptionIds: number[];
}

interface ApiResponse {
    code: number;
    status: number;
    message: string;
    result: string;
}

// 투표 요청 함수
export const vote = async (userId: number, voteOptionIds: number[]): Promise<ApiResponse> => {
    try {
        const payload: VoteRequest = { userId, voteOptionIds };
        const response: AxiosResponse<ApiResponse> = await axios.post('/api/debate/vote', payload);
        return response.data;
    } catch (error) {
        throw new Error(`투표 요청 실패: ${error.response.data.message || error.message}`);
    }
};

// 투표 취소 함수
export const cancelVote = async (userId: number, voteOptionIds: number[]): Promise<ApiResponse> => {
    try {
        const payload: VoteRequest = { userId, voteOptionIds };
        const response: AxiosResponse<ApiResponse> = await axios.delete('/api/debate/vote', { data: payload });
        return response.data;
    } catch (error) {
        throw new Error(`투표 취소 실패: ${error.response.data.message || error.message}`);
    }
};
