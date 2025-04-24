import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getToken } from "../utils/storageHandler";
const token = getToken()


export const distressSignalAPI = async () => {
        const response=await axios.get(`${BASE_URL}/notification/viewall/`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  


export const signalAPI = async (data) => {
        const response=await axios.post(`${BASE_URL}/signal/send/`,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  

export const resolvedAPI = async (data) => {
        const response=await axios.patch(`${BASE_URL}/signal/resolve/`,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  

export const signalViewAPI = async () => {
        const response=await axios.get(`${BASE_URL}/signal/get/`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  

export const deleteSignalAPI = async (data) => {
            const response=await axios.delete(`${BASE_URL}/signal/deletesignal/${data}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
          });
          return response.data;
        }; 
        
export const adminsignalViewAPI = async () => {
            const response=await axios.get(`${BASE_URL}/signal/viewall/`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
          });
          return response.data;
        };  
        
export const nearestPoliceAPI = async () => {
            const response=await axios.get(`${BASE_URL}/signal/police/`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
          });
          return response.data;
        }; 