import React from 'react';
import styled from "styled-components";


const AlarmContainer = styled.div`
  height: 100vh;
  overflow: auto; 
`;

const Division = styled.div`
  width: 487px;
  height: 1px;
  background-color: #E5E5E5;
  margin-top: 45px;
  margin-left: 33px;
`;

const EmptySpace = styled.div`
  font-weight: bold;
  text-align: center;
  margin-top: 250px; 
  margin-bottom: 300px;
`;


function DivisionLine() {
  return (
    <AlarmContainer>
      <Division />
      <EmptySpace>비었어요</EmptySpace>
    </AlarmContainer>
  );
}

export default DivisionLine;
