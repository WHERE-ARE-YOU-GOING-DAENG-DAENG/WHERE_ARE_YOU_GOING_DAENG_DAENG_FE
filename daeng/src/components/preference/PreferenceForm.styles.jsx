import styled from "styled-components";

export const Wrap = styled.div`
  padding: 20px;
  @media (max-width: 554px) {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 0px;
  }
`;

export const Section = styled.div`
  margin-bottom: 40px;
`;

export const TitleH2 = styled.h3`
  text-align: left;
  margin-left: 10px;
  font-size: 17px;
  margin-bottom: 10px;

  @media (max-width: 554px) {
    font-size: 14px;
    margin-left: 20px;
  }
`;

export const TitleH3 = styled.h3`
  text-align: left;
  margin-left: 10px;
  font-size: 17px;
  margin-bottom: 10px;

  @media (max-width: 554px) {
    font-size: 14px;
    margin-left: 20px;
  }
`;

export const StyledParagraph = styled.p`
  font-size: 12px;
  color: #ff69a9;
  font-weight: bold;
  margin-top: 9px;
  margin-left: 10px;
  display: flex;

  @media (max-width: 554px) {
    font-size: 10px;
    margin-left: 20px;
  }
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 5px;
  margin-left: 5px;

  @media (max-width: 554px) {
    gap: 3px;
  }
`;

export const StyledParagraph2 = styled.p`
  font-size: 14px;
  color: red;
  font-weight: bold;
  margin-top: 80px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  @media (max-width: 554px) {
    font-size: 10px;
    margin-left: 10px;
    text-align: center;
    margin-top: 60px;
  }
`;

export const Footer = styled.div`
  margin-left: 15px;
  padding-bottom: 10px;

  @media (max-width: 554px) {
    margin-left: 20px;
  }
`;
