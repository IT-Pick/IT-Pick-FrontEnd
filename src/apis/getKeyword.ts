import axios from "axios";

export const getKeyword = async(query: string) => {
    const response = await axios.get(
        `/keyword/search`,
        {params: {
            query: query
        }}
    )
    return response.data;
}