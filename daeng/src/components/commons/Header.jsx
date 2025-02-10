import styled from "styled-components";
import PropTypes from "prop-types";
import back from "../../assets/icons/back.svg";

const CustomHeader = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: 80px;
    background-color: #ffffff;
    font-size: 20px;

    img {
    width: 5%; 
    height: 50%; 
    margin-left: 5%;
    cursor: pointer;
    }

    span {
        font-weight: 600;
        font-size: 20px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
    }
`;

const Header = ({ label }) => {
    const goBack = () => {
        window.history.back();
    };

    const refreshPage = () => {
        window.location.reload(); 
    };

    return (
        <CustomHeader>
            <img src={back} alt="뒤로가기" onClick={goBack} />
            <span onClick={refreshPage}>{label}</span>
        </CustomHeader>
    );
};

Header.propTypes = {
    label: PropTypes.string.isRequired,
};

export default Header;
