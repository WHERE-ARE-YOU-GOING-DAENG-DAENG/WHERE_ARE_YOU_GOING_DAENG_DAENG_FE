import styled from "styled-components";
import PropTypes from "prop-types";

const ReviewButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 24px;
  background-color:#F9A9D4;
  border-radius: 20px;
  color:white;
  border:none;
  font-size: 12px;
  margin-right: 2%;
  white-space: nowrap;

  img{
    margin-right: 5px;
  }

  @media (max-width: 554px) {
    height: 20px;
    font-size: 10px;
  }

  ${({ hasIcon }) =>
    hasIcon &&
    `
    padding: 15px;
    font-size: 15px;
    img{
     width: 25px;
    }
    &:hover {
      background-color: #FF77C0;
      font-weight: bold;
    }
    @media (max-width: 554px) {
    font-size: 13px;
    img{
     width: 22px;
    }
  }
  `}
`
function ReviewKeywords({label, icon, onClick}) {
  return (
    <ReviewButton hasIcon={!!icon} onClick={onClick}>
      {icon && <img src={icon} alt="아이콘" />}
      {label}
    </ReviewButton>
  )
}

ReviewKeywords.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default ReviewKeywords;