import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true,
    validateStatus: () => true
})

export const setupAxiosInterceptors = (navigate) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
