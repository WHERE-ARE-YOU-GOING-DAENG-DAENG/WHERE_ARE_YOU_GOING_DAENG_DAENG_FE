import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import kakaoLoginBtn from "../assets/icons/kakaoLoginBtn.svg";
import loginGoogle from "../assets/icons/login_google.svg";
import loginPuppy from "../assets/icons/login_puppy.svg";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: baseline;
    margin-bottom: 10px;
    margin-top: 70px;
`;

const MainTitle = styled.span`
    font-family: "RixInooAriDuri", sans-serif;
    font-size: 50px;
    color: #ff4b98;
    font-weight: normal;
    margin-right: 1px;
`;

const SubTitle = styled.span`
    font-family: "Pretendard", sans-serif;
    font-size: 23px;
    font-weight: bold;
    color: #000000;
`;

const Subtitle = styled.p`
    font-size: 23px;
    font-weight: bold;
    margin: 0px;
    margin-bottom: 30px;
`;

const Image = styled.img`
    width: 380px;
    height: 264px;
    margin-top: 19px;
`;

const DividerContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 13px;
    margin-bottom: 50px;
    width: 100%;
`;

const Line = styled.div`
    flex: 1;
    height: 1px;
    background-color: #b3b3b3;
    margin-left: 25px;
    margin-right: 25px;
`;

const DividerText = styled.p`
    font-size: 15px;
    color: #b3b3b3;
`;

const Button = styled.button`
    background-color: ${({ bgColor }) => bgColor || "transparent"};
    border: none;
    cursor: pointer;
    margin-bottom: 15px;
    display: flex;
    align-items: center;

    img {
        width: 310px;
        height: 45px;
    }
`;

const FooterText = styled.p`
    font-size: 13px;
    font-weight: bold;
    color: #b3b3b3;
    margin-top: 30px;
    cursor: pointer;
`;

const Login = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <Container>
            <TitleContainer>
                <MainTitle>댕댕어디가</MainTitle>
                <SubTitle>와 함께</SubTitle>
            </TitleContainer>
            <Subtitle>반려동물 동반 가능 시설을 찾아봐요!</Subtitle>
            <Image src={loginPuppy} alt="강아지 이미지" />
            <DividerContainer>
                <Line />
                <DividerText>소셜 로그인으로 간편 가입</DividerText>
                <Line />
            </DividerContainer>
            <Button>
                <img src={kakaoLoginBtn} alt="카카오 로그인" />
            </Button>
            <Button>
                <img src={loginGoogle} alt="구글 로그인" />
            </Button>
            <FooterText onClick={handleGoHome}>나중에 가입할게요</FooterText>
        </Container>
    );
};

export default Login;