import React, { useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import kakaoLoginBtn from "../assets/icons/kakaoLoginBtn.svg";
import loginGoogle from "../assets/icons/login_google.svg";
import loginLogo from "../assets/icons/login_mainlogo.svg";
import loginDangdang from "../assets/icons/login_dangdang.svg";
import cloud from "../assets/icons/cloud.svg";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        gsap.to(".floating-cloud", {
            y: "20px",
            duration: 2,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
        });
    }, []);

    const handleGoHome = () => {
        navigate("/");
    };

    const handleKakaoLogin = () => {
        window.location.href = "https://www.daengdaeng-where.link/oauth2/authorization/kakao";
    };

    const handleGoogleLogin = () => {
        location.href = "https://www.daengdaeng-where.link/oauth2/authorization/google";
    };

    return (
        <Container>
            <CloudContainer>
                <FloatingCloud src={cloud} alt="Floating Cloud" className="floating-cloud" />
            </CloudContainer>
            <LogoContainer>
                <LogoImage src={loginDangdang} alt="댕댕어디가 로고" />
                <LogoText>와 함께</LogoText>
            </LogoContainer>
            <Subtitle>반려동물 동반 가능 시설을 찾아봐요!</Subtitle>
            <Image src={loginLogo} alt="강아지 이미지" />
            <DividerContainer>
                <Line />
                <DividerText>소셜 로그인으로 간편 가입</DividerText>
                <Line />
            </DividerContainer>
            <Button onClick={handleKakaoLogin}>
                <img src={kakaoLoginBtn} alt="카카오 로그인" />
            </Button>
            <Button onClick={handleGoogleLogin}>
                <img src={loginGoogle} alt="구글 로그인" />
            </Button>
            <FooterText onClick={handleGoHome}>나중에 가입할게요</FooterText>
        </Container>
    );
};

const Container = styled.div`
    width: 90%;
    max-width: 554px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #ffffff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100vh;
    padding: 50px 20px 20px 20px;
    box-sizing: border-box;
    overflow-y: auto;
`;

const CloudContainer = styled.div`
    position: absolute;
    top: 10%;
    left: 10%;
    width: 100px;

    @media (max-width: 554px) {
        top: 5%;
        left: 5%;
        width: 80px;
    }
`;

const FloatingCloud = styled.img`
    width: 500px;
    height: 500px;
    position: fixed; 
    top: 50px; 
    left: 20px; 
    z-index: -1; 
    pointer-events: none; 
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    margin-bottom: 10px;

    @media (max-width: 554px) {
        margin-top: 50px;
    }
`;

const LogoImage = styled.img`
    width: 250px;

    @media (max-width: 554px) {
        width: 60%;
    }
`;

const LogoText = styled.span`
    font-family: "Pretendard", sans-serif;
    font-size: 28px;
    font-weight: bold;
    color: #000000;
    margin-left: 5px;

    @media (max-width: 554px) {
        font-size: 5.5vw;
    }
`;

const Subtitle = styled.p`
    font-size: 28px;
    font-weight: bold;
    margin: 0px;
    margin-bottom: 30px;

    @media (max-width: 554px) {
        font-size: 5.9vw;
        margin-bottom: 20px;
    }
`;

const Image = styled.img`
    width: 380px;
    height: 264px;
    margin-top: 19px;

    @media (max-width: 554px) {
        width: 80%;
        height: auto;
    }
`;

const DividerContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 13px;
    margin-bottom: 50px;
    width: 100%;

    @media (max-width: 554px) {
        margin-top: 10px;
        margin-bottom: 30px;
    }
`;

const Line = styled.div`
    flex: 1;
    height: 1px;
    background-color: #b3b3b3;
    margin-left: 25px;
    margin-right: 25px;

    @media (max-width: 554px) {
        margin-left: 10px;
        margin-right: 10px;
    }
`;

const DividerText = styled.p`
    font-size: 17px;
    font-weight: 600;
    color: #b3b3b3;

    @media (max-width: 554px) {
        font-size: 3.5vw;
    }
`;

const Button = styled.button`
    background-color: ${({ bgColor }) => bgColor || "transparent"};
    border: none;
    cursor: pointer;
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    max-width: 320px;
    height: 50px;

    img {
        width: 100%;
        height: auto;
    }

    @media (max-width: 554px) {
        width: 90%;
        max-width: 300px;
        height: 45px;
    }
`;

const FooterText = styled.p`
    font-size: 16px;
    font-weight: 600;
    color: #b3b3b3;
    margin-top: 30px;
    cursor: pointer;

    @media (max-width: 554px) {
        font-size: 3vw;
    }
`;

export default Login;
