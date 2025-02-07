import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledButton = styled.button`
  width: 100%;
  max-width: 483px;
  height: 56px;
  border-radius: 5px;
  background-color: #ff69a9;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* ✅ 스피너와 텍스트 간격 추가 */
  margin-bottom: 30px;
  position: relative;
  transition: background-color 0.5s;

  &:hover {
    background-color: #ff99c8;
  }

  &:disabled {
    background-color: #ff99c8;
    cursor: not-allowed;
  }

  @media (max-width: 554px) {
    max-width: 95%;
    font-size: 14px;
    height: 48px;
  }
`;

const StyledSpinner = styled.div`
  width: 15px;
  height: 15px;
  border: 3px solid rgba(255, 255, 255, 0.6);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

function ConfirmBtn({ label, onClick, isLoading }) {
  return (
    <StyledButton onClick={isLoading ? null : onClick} disabled={isLoading}>
      {isLoading && <StyledSpinner />}
      <span>{label}</span>
    </StyledButton>
  );
}

ConfirmBtn.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ConfirmBtn;
