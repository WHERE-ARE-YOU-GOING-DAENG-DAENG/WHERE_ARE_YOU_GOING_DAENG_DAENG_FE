import axios from 'axios';
import AlertDialog from '../components/commons/SweetAlert';

const axiosInstance = axios.create({
    baseURL: 'https://dev.daengdaeng-where.link',
    withCredentials: true,
});

export const setupAxiosInterceptors = (navigate) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if(error.response?.status === 404){
                navigate('/error', { state: { status: error.response.status } });
            }
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
