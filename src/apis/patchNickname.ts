import axios from "axios";

export const patchNickname = async (nickname: string) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.patch(
            '/api/user/nickname',
            { nickname },
            {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
            
        );

        return response.data;
    } catch (error) {
        console.error('닉네임 patch 하는 중 오류 발생:', error);
        throw error;
    }    
};