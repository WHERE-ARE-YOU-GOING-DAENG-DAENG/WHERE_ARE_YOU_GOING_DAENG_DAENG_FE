import React from 'react';
import styled from "styled-components";
import weight from "../../assets/icons/weight.svg";
import optionparking from "../../assets/icons/Optionparking.svg";

const PlaceOptionContainer = styled.div`
  width: 100%;
  height: 62px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: none;
  padding: 0px 35px;
  background-color: #F7F7F7;
  justify-content: space-between;
  align-items: center;      

  @media (max-width: 554px) {
    padding: 0px 8%;
  }
`;

const PlaceList = styled.p`
  font-size: 13px;
  text-align: center;
  word-break: keep-all;
  display: flex;
  align-items: center;

  @media (max-width: 554px) {
    font-size:12px;
  }
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

function PlaceOption({ parking, space, weightLimit, icon }) {
  return (
    <PlaceOptionContainer>
      <PlaceList>
        <StyledIcon src={optionparking} alt="주차 가능 여부" />
        {parking}
      </PlaceList>

      <PlaceList>
        <StyledIcon src={icon} alt="시설 타입"/>
        {space}
      </PlaceList>

      <PlaceList>
        <StyledIcon src={weight} alt="몸무게 제한" />
        {weightLimit}
      </PlaceList>
    </PlaceOptionContainer>
  );
}

export default PlaceOption;
