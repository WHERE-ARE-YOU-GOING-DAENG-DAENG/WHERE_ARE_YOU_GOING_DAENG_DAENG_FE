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
  font-size: 10px;
  margin-right:2%;

  img{
    margin-right: 5px;
  }
  &:hover {
    background-color:#FF99C8;
    font-weight:bold;
  }

  @media (max-width: 554px) {
    height: 20px;
    font-size: 9px;
  }
`
function ReviewKeywords({label, icon}) {
  return (
    <ReviewButton >
      {icon && <img src={icon} alt="아이콘" />}
      {label}
    </ReviewButton>
  )
}

ReviewKeywords.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

export default ReviewKeywords;
