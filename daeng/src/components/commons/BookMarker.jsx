import styled from "styled-components";
import PropTypes from 'prop-types';

const CustomMarker = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 73px;
    font-size: 18px;
    text-align: center;
    gap: 1px;
    word-break: keep-all;
    
    span {
    color: black;
    text-shadow: //글자 테두리
      -1px -1px 0 white
      1px -1px 0 white,
      -1px 1px 0 white,
      1px 1px 0 white;
  }
`

const BookMarker = ({ label, icon }) => {
    return (
        <CustomMarker>
            <img src={icon} alt="마커"/>
            <span>{label}</span>
        </CustomMarker>
    );
}

BookMarker.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}

export default BookMarker;