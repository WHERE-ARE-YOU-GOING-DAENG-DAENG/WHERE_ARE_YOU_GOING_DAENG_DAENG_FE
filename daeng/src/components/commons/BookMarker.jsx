import styled from "styled-components";
import PropTypes from 'prop-types';
import bookmarker from '../../assets/icons/bookmarker.svg'

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
`

const BookMarker = ({ label }) => {
    return (
        <CustomMarker>
            <img src={bookmarker}/>
            <span>{label}</span>
        </CustomMarker>
    );
}

BookMarker.propTypes = {
    label: PropTypes.string.isRequired,
}

export default BookMarker;