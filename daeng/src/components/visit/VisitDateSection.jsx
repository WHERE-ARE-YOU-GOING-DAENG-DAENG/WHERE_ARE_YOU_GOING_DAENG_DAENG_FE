import styled from "styled-components";
import VisitTimePets from "./VisitTimePets";

const VisitDateSection = ({ visitDate, petsAtVisitTimes, onVisitClick }) => {
  return (
    <div>
      <DateTitle>
        {new Date(visitDate).toLocaleDateString("ko-KR", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </DateTitle>
      {petsAtVisitTimes.map((timeSlot) => (
        <VisitTimePets
          key={timeSlot.visitAt}
          visitAt={timeSlot.visitAt}
          pets={timeSlot.pets}
          onVisitClick={onVisitClick}
        />
      ))}
    </div>
  );
};

const DateTitle = styled.h2`
  font-size: 20px;
  background-color: #FDF2F8;
  padding: 10px;
  border-radius: 10px;
  color: #333;
`;

export default VisitDateSection;
