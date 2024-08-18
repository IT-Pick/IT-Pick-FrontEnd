import axios from "axios";

export const patchPwd = async (password: string) => {
    const response = await axios.patch(
        '/user/password',
        password,
        {headers:{
            "Content-Type": 'application/json',
        }}
    )
    return response.data;
}