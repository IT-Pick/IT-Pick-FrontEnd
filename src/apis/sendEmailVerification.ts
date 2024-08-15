import axios from "axios";

export const sendEmailVerification = async (email: string) => {
    const response = await axios.post(`/auth/emails/verification-requests`, {
        params: {
            email: encodeURIComponent(email), // Request body로 email을 전송
        }

        }, 
        {
            headers: {
                'Authorization': 'Bearer <token>',  // Authorization 헤더에 토큰 추가
                'Content-Type': 'application/json', // Content-Type 설정
            }
        }
    );
    return response.data;
}
