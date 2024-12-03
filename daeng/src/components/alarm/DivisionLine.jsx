import React from 'react';
import styled from "styled-components";
import AlarmList from './AlarmList';

const AlarmContainer = styled.div`
  height: 100vh;
  overflow: auto; 
`;

const Division = styled.div`
  height: 1px;
  background-color: #E5E5E5;
  margin-top: 45px;
  margin-left: 33px;
  margin-right:33px;
`;


function DivisionLine() {
  return (
    <AlarmContainer>
      <Division />
      <AlarmList />
    </AlarmContainer>
  );
}

export default DivisionLine;
