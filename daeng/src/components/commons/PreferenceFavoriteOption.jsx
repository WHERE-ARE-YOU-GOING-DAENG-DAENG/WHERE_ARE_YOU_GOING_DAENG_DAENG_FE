import React from 'react'
import styled from "styled-components";
import run from "../../assets/icons/run.svg";

const PreferenceButton = styled.button`
  min-width: 130px;
  max-width: auto;
  height: 44px;
  background-color: white;
  border-radius: 5px;
  border: 0.5px solid #E4E4E4;
  font-size: 12px;
  color: black;
  cursor: pointer;
  white-space: nowrap;
  display: flex; 
  align-items: center; 
  justify-content: center; 

  &:hover {
    background-color: #FDF2F8;
    color: #DB2877;
    font-weight: bold;
  }

  @media (max-width: 554px) {
    width: 100px;
    height: 40px;
    font-size: 11px;
  }
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;

  @media (max-width: 554px) {
    width: 15px;
    height: 40px;
  }
`;

function PreferenceFavoriteOption({ label, icon }) {
  return (
    <PreferenceButton>
      <StyledIcon src={run} alt="달리기 좋아요" />
      {label}
    </PreferenceButton>
  );
}

export default PreferenceFavoriteOption;
