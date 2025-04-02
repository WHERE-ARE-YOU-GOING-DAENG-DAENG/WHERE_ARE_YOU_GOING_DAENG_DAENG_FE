import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const VideoContainer = styled.div`
  width: 500px;
  height: 90%;
  border-radius: 10px;
  padding-top: 10px;
  background-color: #fdf2f8;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 554px) {
    width: 90%;
    height: 90%;
  }
`;

export const CloseButton = styled.img`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const TextContainer = styled.div`
  color: #b3b3b3;
  font-size: 14px;
  text-align: center;
  margin-top: 30px;
  margin-bottom:10px;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 70%;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

export const ShowStoryBottomBar = styled.div`
  text-align: center;
  color: #ff69b4;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  padding-bottom: 50px;
  border-radius: 10px;
  align-items: center;
  background-color: #fdf2f8;

  & > span {
    font-size:20px;
    font-weight: bold;
    color: #ff69b4;
  }

  & > div {
    font-size: 20px;
    color: #333;
  }
`;

export const UploadStoryBottomBar = styled.div`
  text-align: center;
  color: #ff69b4;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  padding-bottom: 10px;
  border-radius: 10px;
  align-items: center;
  background-color: #fdf2f8;

  & > span {
    font-size:20px;
    font-weight: bold;
    color: #ff69b4;
  }

  & > div {
    font-size: 20px;
    color: #333;
  }
`
export const Location = styled.div`
  display: flex;
  gap: 10px;
  font-size: 20px; 
  margin-right:10px;
`;

export const UploadImg = styled.div`
  cursor: pointer;
  font-size: 14px;
`;
export const ProgressBar = styled.div`
  display: flex;
  position: absolute;
  top: 10px;
  left: 5px;
  right: 5px;
  height: 5px;
  gap: 2px;
  z-index: 20;
`;

export const ProgressItem = styled.div`
  flex: 1;
  height: 3px;
  background-color: ${({ isCompleted }) =>
    isCompleted ? " #ff69b4" : "#e0e0e0"}; 
  border-radius: 5px;
`;

