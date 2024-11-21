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
    font-weight: normal;
    color: #B3B3B3;
    text-align: center;
    margin-right: 18px;
    cursor: pointer;

    ${(props) => props.selected && `
        background-color: #FF69A9;
        font-weight: bold;
        color: #ffffff;
    `}

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

const SelectBtn = ({ label, selected, onClick }) => {
    return <StyledButton selected={selected} onClick={onClick}>{label}</StyledButton>;
};

SelectBtn.propTypes = {
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default SelectBtn;
