import React from 'react'
import styled from 'styled-components'

const StyledTotalReview = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  display: block;
  margin-right: 58%;
  margin-top: 5%;
`

function TotalReview() {
  return (
    <>
      <StyledTotalReview>내가 쓴 총 리뷰 개</StyledTotalReview> 
    </>
  )
} // 나중에 실제 유저가 작성한 리뷰 개수 가지고 와서 넣어줘야함

export default TotalReview
