import styled from 'styled-components';
import Discription from "../../assets/icons/event_discription.svg";
import PropTypes from 'prop-types';

function EventModal({ event, onClose }) {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalHeader>
        <img src={Discription} alt="Discription Icon" />
            설명드려요</ModalHeader>
        <DivisionLine />
        <ModalDescription>{event.eventDescription}</ModalDescription>
      </ModalContent>
    </ModalOverlay>
  );
}


EventModal.propTypes = {
    event: PropTypes.shape({
      eventDescription: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
  };

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  border: 1px solid #ff4b98;
  
    @media (max-width: 554px) {
    padding: 15px;
    width: 95%;
    max-width: 85%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;

const ModalHeader = styled.h2`
  font-size: 25px;
  font-weight: bold;
  color: black;
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: 8px;

    @media (max-width: 554px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
`;

const ModalDescription = styled.p`
  font-size: 18px;
  color: #333;
  line-height: 1.6;
  margin: 15px;

    @media (max-width: 554px) {
    font-size: 15.5px;
    margin: 10px;
  }
`;

const DivisionLine = styled.div`
  height: 1px;
  background-color: #E5E5E5;
  margin-top: 20px;
`;

export default EventModal;
