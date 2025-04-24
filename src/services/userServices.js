import axios from "axios";
import { BASE_URL } from "../utils/urls";
import { getToken } from "../utils/storageHandler";
const token = getToken()


export const loginAPI=async(data)=>{
    const response = await axios.post(`${BASE_URL}/users/login`,data)
    return response.data
}

export const registerAPI=async(data)=>{console.log("Error3");

    const response = await axios.post(`${BASE_URL}/users/register`,data)
    return response.data
}

export const editProfileAPI = async (data) => {
    const response=await axios.put(`${BASE_URL}/users/edit`,data,{
            headers:{
                Authorization: `Bearer ${token}`,
                 "Content-Type":"multipart/form-data"
            }
      });
      return response.data;
    };
    
    
export const getUserProfileAPI = async () => {
        const response=await axios.get(`${BASE_URL}/users/view`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };


export const viewUserAPI = async (data) => {

        const response=await axios.get(`${BASE_URL}/admin/getuser`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
          });
          return response.data;
    };

export const verifyUserAPI = async (data) => {console.log(data);

        const response=await axios.put(`${BASE_URL}/admin/verify`,data,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
          });
          return response.data;
    };

export const changePswdAPI = async (data) => {
        const response=await axios.put(`${BASE_URL}/users/changepswd`,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
      });
      return response.data;
    };  

export const forgotPswdAPI = async (data) => {
        const response=await axios.post(`${BASE_URL}/users/forgot`,data,{
            withCredentials:true,
      });
      return response.data;
    };  

export const resetPswdAPI = async (data) => {console.log(data);

        const response=await axios.post(`${BASE_URL}/users/reset`,data,{
            withCredentials:true,
      });
      return response.data;
    };  
    

        
    // Function to send updated location
    const updateLocation = async (latitude, longitude) => {
            try {
                const data = { latitude, longitude };
                const response = await axios.post(`${BASE_URL}/users/location`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Location updated:", response.data);
            } catch (error) {
                console.error("Error updating location:", error);
            }
        };
        
    // Function to get the user's current location
    const fetchAndUpdateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        updateLocation(latitude, longitude);
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                    },
                    { enableHighAccuracy: true }
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
            }  
        };
        
     // Update location every 5 minutes (300,000 ms)
    setInterval(fetchAndUpdateLocation, 300000);
        
    // Initial call to update location immediately
    // fetchAndUpdateLocation();


    


