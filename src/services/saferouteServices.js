import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getToken } from "../utils/storageHandler";
const token = getToken()


export const safeRouteAPI = async (data) => {

        const response=await axios.get(`${BASE_URL}/route/create?`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
            params:{
                startLatitude:data.startLatitude,
                startLongitude:data.startLongitude,
                endLatitude:data.endLatitude,
                endLongitude:data.endLongitude ,
            }
      });
      return response.data;
    };  


export const getReportAPI = async () => {
        const response=await axios.get(`${BASE_URL}/route/locations`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  