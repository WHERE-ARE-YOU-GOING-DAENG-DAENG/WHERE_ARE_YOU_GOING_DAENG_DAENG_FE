import React from 'react';
import SelectLabel from "../../components/commons/SelectLabel";
import { StyledInput } from './AdminCommonStyle';

function FormField({ label, type, placeholder, value, onChange }) {
  return (
    <div>
      <SelectLabel label={label} />
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormField;
