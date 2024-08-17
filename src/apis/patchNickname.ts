import axios from "axios";

export const patchNickname = async (nickname: string) => {
    const response = await axios.patch(
        '/user/nickname',
        {
            nickname
        },
        {headers: {
            "Content-Type": 'application/json',
        }}
    )
    return response.data;
        
}