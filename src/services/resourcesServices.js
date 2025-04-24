import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getToken } from "../utils/storageHandler";
const token = getToken()


export const addeduResAPI = async (data) => {
    const response=await axios.post(`${BASE_URL}/resources/create`,data,{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type":"multipart/form-data"
        }
  });
  return response.data;
};  

export const adminviewResAPI = async () => {
    const response=await axios.get(`${BASE_URL}/resources/get`,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
  });
  return response.data;
}; 

export const viewResAPI = async () => {
    const response=await axios.get(`${BASE_URL}/resources/get`,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
  });
  return response.data;
}; 

export const editResAPI = async (data) => {
    console.log(data);
    
        const response=await axios.put(`${BASE_URL}/resources/edit/`,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  

export const deleteResAPI = async (data) => {
        const response=await axios.delete(`${BASE_URL}/resources/delete/${data}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  