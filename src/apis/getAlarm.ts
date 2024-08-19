import axios from "axios";

export const getAlarm = async() => {
    try{
        const response = await axios.get(`/user/alarm`,{})
        return response.data.result;
    }catch(error){
        console.error("알림 불러오는 중 오류 발생", error);
        throw error;
    }
    
}