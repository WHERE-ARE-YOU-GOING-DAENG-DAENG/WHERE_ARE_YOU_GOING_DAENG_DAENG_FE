import React from 'react'
import styled from 'styled-components'

const StyledTotalReview = styled.span`
  font-weight: bold;
  font-size: 20px;
  display: block;
  margin-right: 58%;
  margin-top: 5%;

  @media (max-width: 554px) {
    font-size: 18px;
    margin-right: 50%;
  }
`
function CountMyReview() {
  return (
    <>
      <StyledTotalReview>내가 쓴 총 리뷰 개</StyledTotalReview> 
    </>
  )
}

export default CountMyReview
