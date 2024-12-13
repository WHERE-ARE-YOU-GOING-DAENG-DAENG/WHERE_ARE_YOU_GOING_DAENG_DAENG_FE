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
            if (error.response?.status === 401) {
                AlertDialog({
                    mode: "confirm",
                    title: "로그인 필요",
                    text: `방문등록을 하시려면 로그인이 필요합니다.<br/>로그인페이지로 이동하시겠습니까?`,
                    confirmText: "네",
                    cancelText: "아니오",
                    onConfirm: ()=> navigate('/login')
                  });
            }else if(error.response?.status === 404){
                navigate('/error', { state: { status: error.response.status } });
            }
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
