import axios from "axios";

export const deleteDebate = async (debateId: number) => {
    try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("토큰이 없습니다!");
        }

        // 올바른 URL 형식으로 debateId를 포함
        const response = await axios.delete(`/api/debate/${debateId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        
        console.log("Delete response:", response);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.status, error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        throw error;
    }
};
