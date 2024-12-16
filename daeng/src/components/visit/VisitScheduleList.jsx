import styled from "styled-components";
import VisitDateSection from "./VisitDateSection";
import ConfirmBtn from "../../components/commons/ConfirmBtn";
import VisitModal from "./VisitModal";
import { useEffect, useState } from "react";
import usePetStore from "../../stores/usePetStore";

const VisitScheduleList = ({ data, placeId, setReloadTrigger }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const pets = usePetStore((state)=> state.pets);
  const fetchPetList = usePetStore((state)=> state.fetchPetList);

  useEffect(()=>{
    const fetchPets = async () => {
        await fetchPetList();
    };
    
    fetchPets();
  },[])

  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
  };

  const openModal = (initDate = null , initTime = null) => {

    setModalProps({
      initDate,
      initTime,
      pets
    })
    setIsModalOpen(true);
  }

  return (
    <>
      <Container>
        {data.length > 0 ? (data.map((visit) => (
          <VisitDateSection
            key={visit.visitDate}
            visitDate={visit.visitDate}
            petsAtVisitTimes={visit.petsAtVisitTimes}
            onVisitClick={openModal}
          />
        ))): (<NoVisit>일주일간 등록된 방문예정이 없습니다.</NoVisit>)}
        <FixedButtonWrapper>
          <ConfirmBtn label="추가" onClick={() => openModal()} />
        </FixedButtonWrapper>
      </Container>
      
      <VisitModal placeId={placeId} isOpen={isModalOpen} onClose={toggleModal} setReloadTrigger={setReloadTrigger} {...modalProps} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 44px;
  padding-bottom: 47px;
`;

const NoVisit = styled.div`
  padding: 15vh 0;
  font-weight: bold;
`
const FixedButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default VisitScheduleList;
