import React from 'react'
import styled from "styled-components";

const PlaceOptionContainer = styled.div`
  width: 503px;
  height:62px;
  display: flex;
  flex-direction:row;
  border-radius: 10px;
  border: none;
  background-color: #F7F7F7;
  justify-content: space-between;
  align-items: center;      
`

const PlaceList = styled.p`
  font-size: 13px;
  text-align: center;
  margin-left: 54px;
  word-break: keep-all;
  margin-right: 54px;
`

function PlaceOption({parking,space, weightLimit }) {
  const options = [parking, space, weightLimit];
  
  return (
    <PlaceOptionContainer>
      {options.map((item, index) => (
        <PlaceList key={index}>{item}</PlaceList>
      ))}
    </PlaceOptionContainer>
  );
}

export default PlaceOption
