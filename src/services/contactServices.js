import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getToken } from "../utils/storageHandler";
const token = getToken()


export const emergencyContAPI = async () => {
        const response=await axios.get(`${BASE_URL}/users/emergency`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  

export const addemergencyContAPI = async (data) => {
        const response=await axios.put(`${BASE_URL}/users/addemergency`,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  

export const editemergencyContAPI = async (data) => {
    console.log(data);
    
        const response=await axios.put(`${BASE_URL}/users/editemergency/`,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  

export const deleteemergencyContAPI = async (data) => {
        const response=await axios.delete(`${BASE_URL}/users/deleteemergency/${data}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  
