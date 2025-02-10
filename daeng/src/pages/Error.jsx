import styled from "styled-components";
import logo from "../assets/icons/logo.svg";
import mascot from "../assets/icons/mascot.svg";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    height: 100vh;
`;

const Logo = styled.img`
    position: absolute;
    top: 23px;
    left: 15px;
    width: 120px;
    margin-bottom: 20px;
    margin-left: 10px;
    z-index: 1000;
`;

const ErrorNum = styled.div`
    margin-top: 30px;
    position: relative;
    display: inline-block;
    p {
        font-family: "RixInooAriDuriR", sans-serif;
        font-size: 150px;
        color: #F9A9D4;
        font-weight: normal;
        letter-spacing: ${(props) => (props.status === 401 ? "18px" : "12px")};
        ${(props) => (props.status === 401 ? "padding-right:16px" : "padding-left: 9px")};
        margin: 0;
    }
`;

const Mascot = styled.img`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ErrorTitle = styled.p`
    font-weight: bold;
    font-size: 18px;
    margin-top: 20px;
`;

const ErrorContent = styled.p`
    color: #818181;
    font-size: 14px;
    margin-top: 10px;
    white-space: pre-line;
    line-height: 1.5;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
`;

const Button = styled.button`
    background-color: ${(props) => (props.$primary ? "#FF69A9" : "#FFFFFF")};
    color: ${(props) => (props.$primary ? "#FFFFFF" : "#FF69A9")};
    border: 1px solid #FF69A9;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => (props.$primary ? "#f788bf" : "#fbe6f0")};
    }
`;

const Error = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const isDeleteUser = params.get("status") === "DELETE_USER";
    const status = isDeleteUser ? 409 : location.state?.status || 404;

    const getErrorMessage = () => {
        if (status === 404) {
            return {
                title: "죄송합니다. 현재 찾을 수 없는 페이지를 요청하셨습니다.",
                content: "페이지의 주소가 잘못 입력되었거나\n주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다",
            };
        } else if (status === 401) {
            return {
                title: "권한이 없는 요청입니다.",
                content: "권한이 없거나, 사용할 수 없는 페이지입니다.\n로그인 정보를 다시 한 번 확인해주세요.",
            };
        }else if (status === 409) {
            return {
                title: "탈퇴된 계정입니다.",
                content: "탈퇴일로부터 30일이 지나야 재가입이 가능합니다.\n다른 계정으로 로그인 해주세요.",
            };
        } else {
            return {
                title: "알 수 없는 에러가 발생했습니다.",
                content: "알 수 없는 문제가 발생했습니다. 관리자에게 문의해주세요.",
            };
        }
    };

    const { title, content } = getErrorMessage();

    return (
        <Container>
            <Logo src={logo} alt="로고" />
            <ErrorNum status={status}>
                <p>{status}</p>
                <Mascot src={mascot} alt="마스코트" />
            </ErrorNum>
            <ErrorTitle>{title}</ErrorTitle>
            <ErrorContent>{content}</ErrorContent>
            <ButtonContainer>
                <Button $primary onClick={() => navigate("/")}>홈으로</Button>
            </ButtonContainer>
        </Container>
    );
};

export default Error;
