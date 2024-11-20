import React from 'react'
import styled from "styled-components";


const ReviewButton = styled.button`
  width: 95px;
  height: 24px;
  background-color:#F9A9D4;
  border-radius: 20px;
  color:white;
  border:none;
  font-size: 10px;
  margin-right:2%;

  @media (max-width: 554px) {
    width: 90px;
    height: 20px;
    font-size: 9px;
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
