import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://www.daengdaeng-where.link',
    withCredentials: true,
});

export const setupAxiosInterceptors = (navigate) => {
    axiosInstance.interceptors.response.use(
        (response) => response, // 성공적인 응답 처리
        (error) => {
            if (error.response?.status === 401) {
                navigate('/login'); // 로그인 페이지로 이동
            }else if(error.response?.status === 404){
                navigate('/error', { state: { status: error.response.status } }); // 에러 페이지로 이동
            }
            return Promise.reject(error); // 다른 에러는 그대로 전달
        }
    );
};

export default axiosInstance;
