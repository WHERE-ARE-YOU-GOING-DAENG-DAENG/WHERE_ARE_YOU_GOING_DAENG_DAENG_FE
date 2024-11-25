import styled from "styled-components";
import VisitDateSection from "./VisitDateSection";
import ConfirmBtn from "../../components/commons/ConfirmBtn";

const Container = styled.div`
  padding: 20px 44px;
  padding-bottom: 77px;
`;

const VisitScheduleList = ({ data }) => {
  return (
    <Container>
      {data.map((visit) => (
        <VisitDateSection
          key={visit.visitDate}
          visitDate={visit.visitDate}
          petsAtVisitTimes={visit.petsAtVisitTimes}
        />
      ))}
      <ConfirmBtn label="등록"/>
    </Container>
  );
};

export default VisitScheduleList;
