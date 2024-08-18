import axios from "axios";

export const patchLikedTopics = async(likedTopicList: string[]) => {
    const response = await axios.patch(
        '/user/liked-topics',
        likedTopicList,
        {
            headers: {
                "Content-Type":'application/json',
            }
        }
    )
    return response.data;
}