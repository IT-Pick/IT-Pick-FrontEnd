import axios from "axios";

export const getEmailVerficiation = async (email: string, code: number) => {
    const response = await axios.get(
        `/auth/emails/verifications`, {params: {
            email: encodeURIComponent(email),
            code: code
        }}
    );
    return response.data;
}
