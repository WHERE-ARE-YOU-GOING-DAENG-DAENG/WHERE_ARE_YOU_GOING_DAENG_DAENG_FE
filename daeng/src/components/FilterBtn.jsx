import React from 'react'
import styled from 'styled-components';

const FilterButton = styled.button`
  width: 118px;
  height: 43px;
  background-color: #FDF2F8;
  color: #DB2877;
  font-size: 15px;
  border-radius: 20px;
  border:none;
  font-weight:bold;
  cursor: pointer;

  &:hover {
    background-color: #FBD1E6;
    cursor: pointer;
  }
`;

function FilterBtn({label}) {
  return (
    <FilterButton>
      {label}
    </FilterButton>
  )
}
//아이콘 알맞게 추가해야함
export default FilterBtn;