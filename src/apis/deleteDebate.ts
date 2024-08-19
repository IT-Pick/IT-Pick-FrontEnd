import axios from "axios";

export const deleteDebate = async(debateId: number) => {
    const token = localStorage.getItem("accessToken");
    if(!token){
        throw new Error("토큰이 없습니다!");
    }
    const response = await axios.delete(
        `/debate`,
        {
            params: {
                debateId: debateId
            },
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        }
    )
    return response.data;
}