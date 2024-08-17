import axios from "axios";

export const patchNickname = async (nickname: string) => {
    try{
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
        if(response.data.code === 1000){
            console.log("닉네임 변경 성공");
        }
        else{
            console.log("닉네임 변경 실패");
        }
    }
    catch (error) {
        console.log('닉네임 변경 실패:', error.response.data.message);
      }

}