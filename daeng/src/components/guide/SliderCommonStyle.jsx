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
  left: 91%;
  transform: translateX(-50%);
  background-color: rgba(235, 235, 235, 0.8);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
  color: #333;

  @media (max-width: 554px) {
    left: 88%;
    background-color: rgba(235, 235, 235, 0.8);
    padding: 4px 8px;
  }
`;


