import React from 'react'
import styled from "styled-components";


const ReviewButton = styled.button`
  width: 125px;
  height: 40px;
  background-color:#F9A9D4;
  border-radius: 20px;
  color:white;
  border:none;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background-color:#FF99C8;
    font-weight:bold;
  }

  @media (max-width: 554px) {
    width: 110px;
    height: 35px;
    font-size: 10px;
  }
`
function ReviewKeywords({label}) {
  return (
    <ReviewButton >
      {label}
    </ReviewButton>
  )
} //아이콘 넣기

export default ReviewKeywords;
