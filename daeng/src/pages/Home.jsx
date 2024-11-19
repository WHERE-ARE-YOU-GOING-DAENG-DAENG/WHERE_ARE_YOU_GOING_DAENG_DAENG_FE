import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <h1>홈화면</h1>
            <button onClick={goToLogin}>로그인</button>
        </div>
    );
}

export default Home;