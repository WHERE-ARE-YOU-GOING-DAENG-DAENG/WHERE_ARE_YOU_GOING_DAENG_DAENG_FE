import styled from "styled-components";

export const StoryWrapper = styled.div`
  margin: 10px 0;
  padding: 0 20px;

  @media (max-width: 554px) {
    padding: 0 10px;
    margin: 10px 0 0 0;
  }
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  margin-left: 10px;
  text-align: left;

  @media (max-width: 554px) {
    font-size: 15px;
    margin: 10px 10px 0 10px;
  }
`;

export const StoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 554px) {
    gap: 5px;
  }
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;

    @media (max-width: 554px) {
      width: 20px;
      height: 20px;
    }
  }
`;

export const ScrollableArea = styled.div`
  overflow: hidden;
  flex: 1;

  @media (max-width: 554px) {
    margin-top: 5px;
  }
`;

export const ScrollableStories = styled.div`
  display: flex;
  gap: 15px;
  transform: translateX(${({ currentIndex }) => -currentIndex * 104}px); 
  transition: transform 0.3s ease-in-out;
  align-items: center;

  @media (max-width: 554px) {
    gap: 10px;
  }
`;

export const FixedStoryAdd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 104px;
  height: 136px;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;

  @media (max-width: 554px) {
    width: 88px;
    height: 120px;
    margin-top: 10px;
  }
`;

export const PersonIconWrapper = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 554px) {
    width: 70px;
    height: 70px;
  }
`;

export const PersonIcon = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background-color: #d9d9d9;

  @media (max-width: 554px) {
    width: 70px;
    height: 70px;
  }
`;

export const PlusIcon = styled.img`
  position: absolute;
  bottom: 5px;
  right: 0;
  width: 30px;
  height: 30px;

  @media (max-width: 554px) {
    width: 20px;
    height: 20px;
  }
`;

export const AddText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
  color: black;

  @media (max-width: 554px) {
    font-size: 12px;
    margin-top: 5px;
  }
`;

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

export const CrownIcon = styled.img`
  position: absolute;
  top: -12px;
  right: 14.5px;
  width: 25px;
  height: auto;

  @media (max-width: 554px) {
    width: 20px;
  }
`;
