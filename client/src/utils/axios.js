import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    (res) => res,
    
    async (error) =>{
        const originalRequest = error.config;

        if(error.response?.status===401 && !originalRequest._retry){
            originalRequest._retry = true;

            try{
                await axios.post("/user/refresh");

                return axios(originalRequest);
            }
            catch(refreshError){
                window.location.href = "/auth";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default axios;