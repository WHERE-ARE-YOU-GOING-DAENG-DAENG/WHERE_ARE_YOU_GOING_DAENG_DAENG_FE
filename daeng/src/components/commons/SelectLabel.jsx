import styled from "styled-components";
import PropTypes from "prop-types";

const LabelContainer = styled.label`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #000;
    margin-bottom: 10px;

    span {
        font-size: 14px;
        margin-left: 4px; 
        color: #ff69a9; 
        font-weight: semibold; 
    }
`;

const SelectLabel = ({ label, htmlFor }) => {
    return (
        <LabelContainer htmlFor={htmlFor}>
        {label}
        <span>*</span>
        </LabelContainer>
    );
};

SelectLabel.propTypes = {
    label: PropTypes.string.isRequired,
    htmlFor: PropTypes.string.isRequired,
};

export default SelectLabel;
