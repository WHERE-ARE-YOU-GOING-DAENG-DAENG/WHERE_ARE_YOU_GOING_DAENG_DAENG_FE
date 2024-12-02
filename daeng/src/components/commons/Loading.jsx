import styled from "styled-components";
import Spinner from '../../assets/icons/loading.gif'

const Background = styled.div`
    width: 100%;
    background: #ffffffb7;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LoadingText = styled.div`
    text-align: center;
`;

const Loading = ({label}) => {
  return (
    <Background>
      <img src={Spinner} alt="로딩중" width="25%" />
      <LoadingText>{label}</LoadingText>
    </Background>
  );
};

export default Loading;
