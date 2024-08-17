import axios from "axios";

export const logoutUser = async () => {
    try {
        const token = localStorage.getItem('refreshToken');
        console.log(token);
        const response = await axios.patch(
            '/auth/logout',
            null,
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log("로그아웃 실패:", error);
    }
};
