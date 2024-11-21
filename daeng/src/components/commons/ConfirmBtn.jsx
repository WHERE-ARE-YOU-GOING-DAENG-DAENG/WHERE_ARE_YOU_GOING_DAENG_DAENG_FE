import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  max-width: 483px; 
  height: 56px;
  border-radius: 5px;
  background-color: #ff69a9;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  border: none; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom:30px;

  &:hover {
    background-color: #FF99C8;
  }

  @media (max-width: 554px) {
    max-width: 95%;
    font-size: 14px;
    height: 48px;
  }
`;

function ConfirmBtn({ label }) {
  return <StyledButton>{label}</StyledButton>;
}

ConfirmBtn.propTypes = {
  label: PropTypes.string.isRequired, 
};

export default ConfirmBtn;