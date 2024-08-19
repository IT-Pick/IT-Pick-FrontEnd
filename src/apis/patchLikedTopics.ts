import axios from "axios";

export const patchLikedTopics = async(likedTopicList: string[]) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.patch(
            '/user/liked-topics',
            { likedTopicList },
            {
                headers: {
                    "Content-Type":'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {
        console.error('관심 주제 patch 하는 중 오류 발생:', error);
        throw error;
    }
};