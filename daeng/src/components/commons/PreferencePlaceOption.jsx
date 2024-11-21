import styled from "styled-components";
import PropTypes from 'prop-types';

const CustomPreferenceButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 97px;
  height: 73px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: white;
  color: #000;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  .icon {
    font-size: 24px;
  }

  &:hover{
    font-weight:bold;
    border-color: #FF4B98;
    background-color: #FDF2F8;
    color: #DB2877;
  }

  &.selected {
    font-weight:bold;
    border-color: #FF4B98;
    background-color: #FDF2F8;
    color: #DB2877;
  }
`;

const PreferencePlaceOption = ({ isSelected, onClick, label, icon }) => {
  return (
    <CustomPreferenceButton
      className={isSelected ? "selected" : ""}
      onClick={onClick}
    >
      <span className="icon">
        <img src={icon} alt="아이콘"/>
      </span>
      <span>{label}</span>
    </CustomPreferenceButton>
  );
};


PreferencePlaceOption.propTypes = {
    isSelected: PropTypes.bool.isRequired, 
    onClick: PropTypes.func.isRequired,    
    label: PropTypes.string.isRequired,    
    icon: PropTypes.string.isRequired,
  };

export default PreferencePlaceOption;