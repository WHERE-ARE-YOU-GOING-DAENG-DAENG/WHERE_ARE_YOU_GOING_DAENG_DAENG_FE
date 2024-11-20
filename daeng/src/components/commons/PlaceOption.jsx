import React from 'react';
import styled from "styled-components";
import weight from "../../assets/icons/weight.svg";
import optionparking from "../../assets/icons/optionparking.svg";

const PlaceOptionContainer = styled.div`
  width: 503px;
  height: 62px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: none;
  background-color: #F7F7F7;
  justify-content: space-between;
  align-items: center;      

  @media (max-width: 554px) {
    width: 450px;
    height: 62px;
  }
`;

const PlaceList = styled.p`
  font-size: 13px;
  text-align: center;
  margin-left: 45px;
  word-break: keep-all;
  margin-right: 54px;
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

function PlaceOption({ parking, space, weightLimit }) {
  return (
    <PlaceOptionContainer>
      <PlaceList>
        <StyledIcon src={optionparking} alt="주차 가능 여부" />
        {parking}
      </PlaceList>

      <PlaceList>
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
