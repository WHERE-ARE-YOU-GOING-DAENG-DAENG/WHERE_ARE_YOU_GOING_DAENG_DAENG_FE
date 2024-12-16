import React from "react";
import styled from "styled-components";
import AreaField from "../../data/AreaField";

const LocationSelect = ({ city, cityDetail, onCityChange, onCityDetailChange }) => {
  return (
    <SelectionContainer>
      <SelectBox value={city} onChange={(e) => onCityChange(e.target.value)}>
        <option value="" disabled>
          도 선택
        </option>
        {Object.keys(AreaField).map((cityName) => (
          <option key={cityName} value={cityName}>
            {cityName}
          </option>
        ))}
      </SelectBox>

      <SelectBox
        value={cityDetail}
        onChange={(e) => onCityDetailChange(e.target.value)}
        disabled={!city}
      >
        <option value="" disabled>
          시/군/구 선택
        </option>
        {(AreaField[city] || []).slice(1).map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </SelectBox>
    </SelectionContainer>
  );
};

export default LocationSelect;

const SelectionContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const SelectBox = styled.select`
  flex: 1;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
`;
