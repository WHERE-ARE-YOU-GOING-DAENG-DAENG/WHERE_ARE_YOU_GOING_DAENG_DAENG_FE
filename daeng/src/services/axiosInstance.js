import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://52.79.50.171:8080',
    withCredentials: true,
    httpsAgent: false
});

export const setupAxiosInterceptors = (navigate) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
