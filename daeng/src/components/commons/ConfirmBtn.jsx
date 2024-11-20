import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 483px; 
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
`;

function ConfirmBtn({ label }) {
  return <StyledButton>{label}</StyledButton>;
}

// PropTypes 정의
ConfirmBtn.propTypes = {
  label: PropTypes.string.isRequired, // label은 문자열이며 필수
};

export default ConfirmBtn;