import styled from 'styled-components';
import PropTypes from 'prop-types';
import xIcon from '../../assets/icons/pinkX.svg'

const AreaBtn = ({ mode, label, isSelected, onClick }) => {
  return (
    <StyledButton
      className={isSelected ? "selected" : ""}
      onClick={() => onClick(label)}
    >
      {label}
      {mode === 'keyword' &&
        <img src={xIcon} alt="삭제"/>
      }
    </StyledButton>
  );
};

AreaBtn.propTypes = {
  mode: PropTypes.oneOf(['area', 'keyword']).isRequired,
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const StyledButton = styled.button`
  height: 35px;
  background-color: white;
  border: 1px solid #d9d9d9;
  padding: 3px 27px;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #FDF2F8;
    border-color: #FF4B98;
    color: #DB2877;
    font-weight: bold;
  }

  &.selected {
    background-color: #FDF2F8;
    border-color: #FF4B98;
    color: #DB2877;
    font-weight: bold;
  }
  img{
    position: relative;
    right: -15px;
  }
`;

export default AreaBtn;
