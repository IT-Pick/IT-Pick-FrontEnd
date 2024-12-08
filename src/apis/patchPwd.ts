import axios from "axios";

export const patchPwd = async (password: string) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.patch(
            '/api/user/password',
            { password },
            {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('비밀번호 변경 patch 하는 중 오류 발생:', error);
        throw error;
    }
};