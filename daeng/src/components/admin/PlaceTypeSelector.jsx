import React from "react";
import styled from "styled-components";
import { placeTypes } from "../../data/CommonCode/";
import { Wrapper } from "./AdminCommonStyle";
import SelectLabel from "../commons/SelectLabel";

const PlaceTypeSelector = ({ value, onChange }) => {
  const handleClick = (e, codeId) => {
    e.preventDefault(); 
    if (value !== codeId) {
      onChange(codeId); 
    }
  };

  return (
    <Wrapper>
      <SelectLabel label="장소 유형 선택" />
      <PlaceTypeButtonGroup>
        {placeTypes.map((type) => (
          <PlaceTypeButton
            key={type.codeId}
            isActive={value === type.codeId}
            onClick={(e) => handleClick(e, type.codeId)}
          >
            <span>{type.name}</span>
          </PlaceTypeButton>
        ))}
      </PlaceTypeButtonGroup>
    </Wrapper>
  );
};

export default PlaceTypeSelector;


const PlaceTypeButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const PlaceTypeButton = styled.button`
  padding: 10px;
  width: 100px;
  height: 50px;
  border: ${(props) => (props.isActive ? "2px solid #ff69a9" : "1px solid #ccc")};
  border-radius: 8px;
  background-color: ${(props) => (props.isActive ? "#ffe6f0" : "#fff")};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ffe6f0;
    border-color: #ff69a9;
  }

  span {
    font-size: 14px;
    font-weight: bold;
    color: ${(props) => (props.isActive ? "#ff69a9" : "#333")};
  }
`;
