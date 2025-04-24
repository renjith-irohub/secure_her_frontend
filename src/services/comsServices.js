import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getToken } from "../utils/storageHandler";
const token = getToken()


export const comsAPI = async (data) => {
    const response=await axios.post(`${BASE_URL}/support/create`,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      console.log(response)
      return response.data;
    };


export const comsviewAPI = async () => {
        const response=await axios.get(`${BASE_URL}/support/viewall`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
          });
          return response.data;
    };


export const mycomsviewAPI = async () => {
        const response=await axios.get(`${BASE_URL}/support/showall`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
          });
          return response.data;
    };


export const offerSupportAPI = async (data) => {console.log(data);


        const response=await axios.put(`${BASE_URL}/support/offer/${data}`,{},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
          });
          return response.data;
    };


export const markCompletedAPI = async (data) => {

        const response=await axios.put(`${BASE_URL}/support/edit/${data}`,{},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
          });
          return response.data;
    };


export const admincomsViewAPI = async (data) => {

        const response=await axios.get(`${BASE_URL}/admin/support`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
          });
          return response.data;
    };

    

    

