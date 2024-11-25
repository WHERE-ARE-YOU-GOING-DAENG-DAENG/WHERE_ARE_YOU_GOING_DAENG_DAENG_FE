import styled from "styled-components";
import VisitDateSection from "./VisitDateSection";
import ConfirmBtn from "../../components/commons/ConfirmBtn";
import VisitModal from "./VisitModal";
import { useState } from "react";

const Container = styled.div`
  padding: 20px 44px;
  padding-bottom: 77px;
`;

const VisitScheduleList = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Container>
        {data.map((visit) => (
          <VisitDateSection
            key={visit.visitDate}
            visitDate={visit.visitDate}
            petsAtVisitTimes={visit.petsAtVisitTimes}
          />
        ))}
        <ConfirmBtn label="등록" onClick={toggleModal}/>
      </Container>
  
      <VisitModal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default VisitScheduleList;
