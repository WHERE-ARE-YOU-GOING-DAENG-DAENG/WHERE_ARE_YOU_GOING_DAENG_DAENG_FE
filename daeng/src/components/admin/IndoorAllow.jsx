import React from "react";
import {Wrapper, ButtonGroup} from './AdminCommonStyle';
import SelectLabel from "../commons/SelectLabel";
import SelectBtn from "../commons/SelectBtn";
const IndoorAllow = ({ label, value, onChange }) => {
  const handleToggleChange = (e, newValue) => {
    e.preventDefault();
    onChange(newValue);
  };

  return (
    <Wrapper>
      <SelectLabel label={label} />
      <ButtonGroup>
        <SelectBtn
          label="있어요"
          selected={value === true}
          onClick={(e) => handleToggleChange(e, true)}
        />
        <SelectBtn
          label="없어요"
          selected={value === false}
          onClick={(e) => handleToggleChange(e, false)}
        />
      </ButtonGroup>
    </Wrapper>
  );
};

export default IndoorAllow;


