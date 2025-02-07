import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 49px;
  height: 22px;
  border-radius: 30px;
  background-color: rgba(217, 217, 217, 0.62);
  color: #000000;
  font-size: 10px;
  font-family: "Pretendard", sans-serif;
  font-weight: 400;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #CBCACA;
    font-weight: 700;
  }
`;

function DeleteBtn({ label, onClick }) {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
}

DeleteBtn.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func, 
};

export default DeleteBtn;
