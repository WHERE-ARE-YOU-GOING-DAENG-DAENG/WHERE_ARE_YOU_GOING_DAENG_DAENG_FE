import React from "react";
import styled from "styled-components";
import xIcon from "../../assets/icons/x.svg";
import useVisitStore from "../../stores/useVisitStore";
import AlertDialog from "../commons/SweetAlert";

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

const Button = styled.button`
  border: none;
  background-color: white;
  cursor: pointer;
  img {
    width: 18px;
  }
`;

const ScheduleTable = () => {
  const myVisits = useVisitStore((state)=>state.myVisits);
  const removeVisit  = useVisitStore((state) => state.removeVisit);
  const handleDelete = (id) => {
    AlertDialog({
      mode: "confirm",
      title: "방문예정취소",
      text: "방문예정을 취소하시겠습니까?",
      confirmText: "취소",
      cancelText: "닫기",
      onConfirm: async () => {
        await removeVisit(id);
          
      }
  })
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
            <Th>취소</Th>
          </tr>
        </Thead>
        <tbody>
          {myVisits.length > 0 ? (
            myVisits.map((schedule, index) => (
              <tr key={index}>
                <Td>{schedule.visitAt.split("T")[0]}</Td>
                <Td>{schedule.visitAt.split("T")[1].slice(0, 5)}</Td>
                <Td>{schedule.placeName}</Td>
                <Td>
                  {schedule.pets.map((pet, idx) => (
                    <span key={pet.petId}>
                      {pet.petName}
                      {idx < schedule.pets.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </Td>
                <Td>
                  <Button onClick={() => handleDelete(schedule.visitId)}>
                    <img src={xIcon} alt="삭제" />
                  </Button>
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td colSpan="5">일정 없음</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableWrapper>
  );
};

export default ScheduleTable;
