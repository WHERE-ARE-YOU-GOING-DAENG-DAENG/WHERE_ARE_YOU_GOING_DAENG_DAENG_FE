import styled from "styled-components";

export const SliderContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
`;

export const SlidesWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentBanner }) => `translateX(-${currentBanner * 100}%)`};
`;

export const Slide = styled.img`
  margin-top: 5%;
  width: 100%;
  height: auto;
  flex-shrink: 0;
  object-fit: contain;
`;

export const IndicatorWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 90%;
  transform: translateX(-50%);
  background-color: rgba(235, 235, 235, 0.8);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
  color: #333;

  @media (max-width: 554px) {
    left: 86%;
    background-color: rgba(235, 235, 235, 0.8);
    padding: 4px 8px;
  }
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ direction }) => (direction === "left" ? "left: 10px;" : "right: 10px;")}
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: #fff;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 554px) {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
`;
