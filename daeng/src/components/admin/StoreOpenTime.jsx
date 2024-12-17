import React from "react";
import styled from "styled-components";
import SelectLabel from "../commons/SelectLabel";
import { Wrapper } from "./AdminCommonStyle";

const StoreOpenTime = ({ openTime, closeTime, onOpenTimeChange, onCloseTimeChange }) => {
  return (
    <Wrapper>
      <TimeContainer>
        <div>
          <SelectLabel label="오픈 시간" />
          <TimeInput
            type="time"
            value={openTime}
            onChange={(e) => onOpenTimeChange(e.target.value)}
          />
        </div>
        <div>
          <SelectLabel label="마감 시간" />
          <TimeInput
            type="time"
            value={closeTime}
            onChange={(e) => onCloseTimeChange(e.target.value)}
          />
        </div>
      </TimeContainer>
    </Wrapper>
  );
};

export default StoreOpenTime;


const TimeContainer = styled.div`
  display: flex;
  gap: 120px;

  @media (max-width: 554px) {
    gap:30px;
  }
`;

const TimeInput = styled.input`
  width: 170%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  
  @media (max-width: 554px) {
    width: 120%;
  }

  &:focus {
    border-color: #ff69a9;
    outline: none;
    box-shadow: 0 0 5px rgba(255, 105, 169, 0.5);
  }
`;
