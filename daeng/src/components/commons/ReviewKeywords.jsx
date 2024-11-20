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
`
function ReviewKeywords() {
  return (
    <ReviewButton>
      방문하고 싶어요!
    </ReviewButton>
  )
} //아이콘 넣기

export default ReviewKeywords;
