import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getToken } from "../utils/storageHandler";
const token = getToken()


export const dataReportAPI = async () => {
        const response=await axios.get(`${BASE_URL}/admin/get`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  