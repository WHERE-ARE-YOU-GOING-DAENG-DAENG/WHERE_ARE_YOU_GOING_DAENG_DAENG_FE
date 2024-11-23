import React from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  margin: 0px 40px;
  overflow: auto;
  padding-bottom: 77px;
  @media (max-width: 554px) {
    margin: 0px 7%;
    padding-bottom: 64px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

const Thead = styled.thead`
  background: #FF4B98;
  color: white;
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Strikethrough = styled.span`
  text-decoration: line-through;
  color: #4c4c4c;
`;

const ScheduleTable = ({ schedules }) => {
  const isPastSchedule = (visitTime) => {
    const currentDate = new Date();
    const scheduleDate = new Date(visitTime);
    return scheduleDate < currentDate; // 지난 일정인지 확인
  };
  
  return (
    <TableWrapper>
      <Table>
        <Thead>
          <tr>
            <Th>날짜</Th>
            <Th>시간</Th>
            <Th>장소</Th>
            <Th>반려동물</Th>
          </tr>
        </Thead>
        <tbody>
          {schedules.length > 0 ? (
            schedules.map((schedule, index) => (
              <tr key={index}>
                <Td>
                  {isPastSchedule(schedule.visitTime) ? (
                    <Strikethrough>{schedule.visitTime.split("T")[0]}</Strikethrough>
                  ) : (
                    schedule.visitTime.split("T")[0]
                  )}
                </Td>
                <Td>
                  {isPastSchedule(schedule.visitTime) ? (
                    <Strikethrough>{schedule.visitTime.split("T")[1].slice(0, 5)}</Strikethrough>
                  ) : (
                    schedule.visitTime.split("T")[1].slice(0, 5)
                  )}
                </Td>
                <Td>
                  {isPastSchedule(schedule.visitTime) ? (
                    <Strikethrough>{schedule.placeId}</Strikethrough>
                  ) : (
                    schedule.placeId
                  )}
                </Td>
                <Td>
                  {schedule.pets.map((pet, idx) => (
                    <span key={pet.petId}>
                      {isPastSchedule(schedule.visitTime) ? (
                        <Strikethrough>
                          {pet.name}
                          {idx < schedule.pets.length - 1 ? ", " : ""}
                        </Strikethrough>
                      ) : (
                        <>
                          {pet.name}
                          {idx < schedule.pets.length - 1 ? ", " : ""}
                        </>
                      )}
                    </span>
                  ))}
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="4">일정 없음</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default ScheduleTable;
