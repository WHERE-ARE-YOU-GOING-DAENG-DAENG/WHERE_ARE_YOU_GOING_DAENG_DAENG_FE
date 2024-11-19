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
    transition: background-color 0.3s ease, font-weight 0.3s ease;

    &:hover {
        background-color: #CBCACA;
        font-weight: 700;
    }

`;

function DeleteBtn({ label }) {
    return <StyledButton>{label}</StyledButton>;
}

DeleteBtn.propTypes = {
    label: PropTypes.string.isRequired,
};

export default DeleteBtn;
