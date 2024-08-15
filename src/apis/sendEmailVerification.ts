import axios from "axios";

export const sendEmailVerification = async (email: string) => {
    const response = await axios.get(`/auth/emails/verification-requests` ,{
        params: {
            email: encodeURIComponent(email),
        }
    });
    return response.data;
}