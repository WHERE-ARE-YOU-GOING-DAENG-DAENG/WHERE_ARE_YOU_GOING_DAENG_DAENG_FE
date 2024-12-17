import React from "react";
import {Wrapper, StyledInput} from './AdminCommonStyle';
import SelectLabel from "../commons/SelectLabel";

const PhoneNumberField = ({
  label,
  placeholder,
  value,
  onChange,
  maxLength = 13, 
}) => {
  const handleInputChange = (e) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, ""); 

    if (maxLength) {
      inputValue = inputValue.slice(0, maxLength); 
    }

    inputValue = applyPhoneFormat(inputValue);

    onChange(inputValue); 
  };

  const applyPhoneFormat = (value) => {
    const match = value.match(/^(\d{4})(\d{0,4})(\d{0,4})$/);
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-");
    }
    return value;
  };

  return (
    <Wrapper>
      <SelectLabel label={label} />
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </Wrapper>
  );
};

export default PhoneNumberField;
