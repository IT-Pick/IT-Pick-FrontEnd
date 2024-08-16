import axios from "axios";

export const sendEmailVerification = async (email: string) => {
    const response = await axios.post(
        `/auth/emails/verification-requests`,
        null,
        {
            params: {
                email: email,  // Query parameter로 email 전송
            },
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
};
