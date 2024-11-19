import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };
    const goToUserInfo = () => {
        navigate('/userinfo');
    };

    return (
        <div>
            <h1>홈화면</h1>
            <button onClick={goToLogin}>로그인</button>
            <button onClick={goToUserInfo}>보호자정보</button>
        </div>
    );
}

export default Home;