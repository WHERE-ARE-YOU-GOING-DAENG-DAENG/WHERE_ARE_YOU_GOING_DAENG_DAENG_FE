import styled from "styled-components";
import PropTypes from "prop-types";

const LabelContainer = styled.p`
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: semibold;
    color: #000;

    span {
        font-size: 12px;
        margin-left: 4px; 
        color: #ff69a9; 
        font-weight: semibold; 
    }
`;

const SelectLabel = ({ label }) => {
    return (
        <LabelContainer>
        {label}
        <span>*</span>
        </LabelContainer>
    );
};

SelectLabel.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SelectLabel;
