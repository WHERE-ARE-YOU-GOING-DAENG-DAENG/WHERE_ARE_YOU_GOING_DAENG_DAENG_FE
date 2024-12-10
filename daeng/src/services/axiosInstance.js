import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://www.daengdaeng-where.link',
    withCredentials: true,
});

export const setupAxiosInterceptors = (navigate) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                navigate('/login');
            }else if(error.response?.status === 404){
                navigate('/error', { state: { status: error.response.status } });
            }
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
