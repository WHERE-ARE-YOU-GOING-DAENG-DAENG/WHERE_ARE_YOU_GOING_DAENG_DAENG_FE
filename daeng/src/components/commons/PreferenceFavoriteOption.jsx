import PropTypes from 'prop-types';
import styled from "styled-components";

const PreferenceButton = styled.button`
  max-width: auto;
  height: 35px;
  background-color: white;
  border-radius: 5px;
  border: 0.5px solid #E4E4E4;
  font-size: 12px;
  color: black;
  margin-top:5px;
  cursor: pointer;
  margin-right: 10px;
  white-space: nowrap;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  transition: all 0.3s ease;

  &.selected {
    font-weight: bold;
    border-color: #FF4B98;
    background-color: #FDF2F8;
    color: #DB2877;
  }

  @media (hover: hover) {
    &:hover:not(.selected) {
      background-color: #fdf2f8;
      color: #db2877;
      font-weight: bold;
      border-color: #ff4b98;
    }
  }

  @media (max-width: 554px) {
    height:27px;
    font-size: 10px;
  }
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;

  @media (max-width: 554px) {
    width: 15px;
    height: 15px;
  }
`;

function PreferenceFavoriteOption({ label, icon, isSelected, onClick }) {
  return (
    <PreferenceButton 
      className={isSelected ? "selected" : ""} 
      onClick={onClick}
    >
      <StyledIcon src={icon} alt="preperenceicon" />
      {label}
    </PreferenceButton>
  );
}

PreferenceFavoriteOption.propTypes = {
  isSelected: PropTypes.bool.isRequired, 
  onClick: PropTypes.func.isRequired,    
  label: PropTypes.string.isRequired,    
  icon: PropTypes.string.isRequired,
};

export default PreferenceFavoriteOption;
