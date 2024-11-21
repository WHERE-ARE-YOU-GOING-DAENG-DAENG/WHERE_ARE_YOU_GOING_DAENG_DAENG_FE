import styled from "styled-components";
import PropTypes from "prop-types";
import addressarrow from "../../assets/icons/addressarrow.svg";

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
    margin-bottom: 10px;

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

const Icon = styled.img`
    width: 16px;
    height: 16px;
    margin-top:1px;
`;

const SelectBtn = ({ label, selected, onClick, isAddress }) => {
    return (
        <StyledButton selected={selected} onClick={onClick}>
            {label}
            {isAddress && <Icon src={addressarrow} alt="주소 리스트 화살표" />}
        </StyledButton>
    );
};

SelectBtn.propTypes = {
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    isAddress: PropTypes.bool, 
};

SelectBtn.defaultProps = {
    isAddress: false,
};


export default SelectBtn;
