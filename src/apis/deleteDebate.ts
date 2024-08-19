import axios from "axios";

export const deleteDebate = async(debateId: number) => {
    const response = await axios.delete(
        '/debate',
        {
            params: {
                debateId: debateId
            }
        }
    )
    return response.data;
}