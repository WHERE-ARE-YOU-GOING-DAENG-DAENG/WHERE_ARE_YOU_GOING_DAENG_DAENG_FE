import React from 'react';
import SelectLabel from "../../components/commons/SelectLabel";
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
`;

function FormField({ label, type, placeholder, value, onChange }) {
  return (
    <div>
      <SelectLabel label={label} />
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormField;
