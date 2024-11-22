import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import pinIcon from "../../assets/icons/pin.svg"

const slideUp = keyframes`
    from {
        transform: translateY(80%);
    }
    to {
        transform: translateY(0);
    }
`;

const slideDown = keyframes`
    from {
        transform: translateY(0%);
    }
    to {
        transform: translateY(80%);
    }
`;
const Overlay = styled.div`
    position: fixed;
    top: 0;
    width: 554px;
    height: 100%;
    z-index: 998;
    @media (max-width: 554px) {
        width: 100%;
    }
`;
const Modal = styled.div`
    position: fixed;
    bottom: 76px;
    width: 555px;
    height: 60%;
    background-color: white;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    animation: ${({ isClosing }) => (isClosing ? slideDown : slideUp)} 0.4s ease-out;
    z-index: 999;
    overflow: visible;
    -webkit-overflow-scrolling: touch;

    .pin{
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
    }

    p{	
		font-weight: bold;
		font-size: 20px;
		margin: 39px 0 0; 
	}

    @media (max-width: 554px) {
        width: 100%;
        bottom: 64px;
    }
`;

const BookMarkList = ({ isOpen, onClose }) => {
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 400);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Body 스크롤 잠금
        } else {
            document.body.style.overflow = 'auto'; // Body 스크롤 복원
        }

        return () => {
            document.body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 복원
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return(
        <>
            <Overlay onClick={handleClose} />
            <Modal isClosing={isClosing}>
                <img className="pin" src={pinIcon} alt="즐겨찾기" />
                <p>즐겨찾기한 장소</p>
            </Modal>
        </>
    )
};

BookMarkList.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default BookMarkList;