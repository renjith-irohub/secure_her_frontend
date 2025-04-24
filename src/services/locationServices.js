import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getToken } from "../utils/storageHandler";
const token = getToken()


export const rtLocationAPI = async (data) => {
        const response=await axios.get(`${BASE_URL}/users/find/${data}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  
    