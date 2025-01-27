import axios from "axios";

export const getEmailVerficiation = async (email: string, verificationCode: string) => {
    const response = await axios.get(`/auth/emails/verifications`, {
        params: {
            email: email,
            code: verificationCode,
        },
    });

    return response.data;
}
