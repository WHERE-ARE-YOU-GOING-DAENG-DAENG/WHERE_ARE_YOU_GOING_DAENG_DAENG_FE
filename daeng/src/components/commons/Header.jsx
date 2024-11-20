import styled from "styled-components";
import PropTypes from "prop-types";
import back from "../../assets/icons/back.svg";

const CustomHeader = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 554px;
    height: 91px;
    background-color: #ffffff;
    font-size: 20px;

    img {
        width: 24px;
        height: 24px;
        margin-left: 40px; 
    }

    span {
        font-weight: 600;
        font-size: 20px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
`;

const Header = ({ label }) => {
    return (
        <CustomHeader>
            <img src={back} alt="뒤로가기" />
            <span>{label}</span>
        </CustomHeader>
    );
};

Header.propTypes = {
    label: PropTypes.string.isRequired,
};

export default Header;
