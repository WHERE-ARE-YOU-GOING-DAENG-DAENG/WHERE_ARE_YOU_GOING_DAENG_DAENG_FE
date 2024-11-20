import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const AreaBtn = ({ label }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <StyledButton
      className={isSelected ? "selected" : ""}
      onClick={handleClick}
    >
      {label}
    </StyledButton>
  );
};

AreaBtn.propTypes = {
    label: PropTypes.string.isRequired,
  };

const StyledButton = styled.button`
  height: 35px;
  background-color: white;
  border: 1px solid #d9d9d9;
  padding: 3px 27px;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #FDF2F8;
    border-color: #FF4B98;
    color: #DB2877;
    font-weight:bold;
  }
  &.selected {
    background-color: #FDF2F8;
    border-color: #FF4B98;
    color: #DB2877;
    font-weight:bold;
  }

`;

export default AreaBtn;
