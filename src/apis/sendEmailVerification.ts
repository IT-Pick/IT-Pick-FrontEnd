import axios from "axios";

export const sendEmailVerification = async (email: string) => {
    const response = await axios.post(
    `/api/auth/emails/verification-requests`, null,
    {
        params: {
            email: email,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );

    return response.data;
  };

