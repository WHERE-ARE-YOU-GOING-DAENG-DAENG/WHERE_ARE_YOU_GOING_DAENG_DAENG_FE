import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.daengdaeng-where.link',
    withCredentials: true,
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
