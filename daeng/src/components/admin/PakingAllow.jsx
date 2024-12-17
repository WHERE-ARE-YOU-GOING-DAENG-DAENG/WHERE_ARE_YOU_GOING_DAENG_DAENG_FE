import React from "react";
import {Wrapper, ButtonGroup} from '../../components/admin/AdminCommonStyle';
import SelectLabel from "../commons/SelectLabel";
import SelectBtn from "../commons/SelectBtn";
const ParkingAllow = ({ label, value, onChange }) => {
  const handleToggleChange = (e, newValue) => {
    e.preventDefault();
    onChange(newValue);
  };

  return (
    <Wrapper>
      <SelectLabel label={label} />
      <ButtonGroup>
        <SelectBtn
          label="가능해요"
          selected={value === true}
          onClick={(e) => handleToggleChange(e, true)}
        />
        <SelectBtn
          label="불가능해요"
          selected={value === false}
          onClick={(e) => handleToggleChange(e, false)}
        />
      </ButtonGroup>
    </Wrapper>
  );
};
export default ParkingAllow;


