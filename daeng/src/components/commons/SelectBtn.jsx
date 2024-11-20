import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
    width: 100%;    
    max-width: 234px;
    height: 44px;
    background-color: #ffffff;
    border: 0.5px solid #e4e4e4;
    border-radius: 5px;
    font-size: 12px;
    font-weight: nomal;
    color: #B3B3B3;
    text-align: center;
    cursor: pointer;

    &:hover {
        background-color: #ff69a9;
        font-weight: bold;
        color: #ffffff;
    }

    @media (max-width: 554px) {
        max-width: 50%;
        font-size: 10px;
        height: 40px;
    }
`;

const SelectBtn = ({ label }) => {
    return <StyledButton>{label}</StyledButton>;
};

SelectBtn.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SelectBtn;
