import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getToken } from "../utils/storageHandler";
const token = getToken()


export const markAsReadAPI = async (data) => {
        const response=await axios.put(`${BASE_URL}/notification/update/`,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  
