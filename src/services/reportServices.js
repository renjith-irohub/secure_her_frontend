import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getToken } from "../utils/storageHandler";
const token = getToken()


export const reportAPI = async (data) => {
        const response=await axios.post(`${BASE_URL}/reports/create/`,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  


export const reportViewAPI = async () => {
        const response=await axios.get(`${BASE_URL}/reports/viewall/`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    }; 
    
export const myreportViewAPI = async () => {
        const response=await axios.get(`${BASE_URL}/reports/get/`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    }; 

export const adminreportviewAPI = async () => {
        const response=await axios.get(`${BASE_URL}/admin/viewall/`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    }; 
    