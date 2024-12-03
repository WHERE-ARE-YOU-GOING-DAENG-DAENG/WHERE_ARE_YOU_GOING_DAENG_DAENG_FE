import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'https://www.daengdaeng-where.link',
    withCredentials: true,
});

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
    (response) => response, // 성공적인 응답 처리
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 404) {
            // 401 에러 발생 시
            const navigate = useNavigate();
            navigate('/error', { state: { status: error.response.status } }); // 에러 페이지로 리다이렉트
        }
        return Promise.reject(error); // 다른 에러는 그대로 전달
    }
);

export default axiosInstance;
