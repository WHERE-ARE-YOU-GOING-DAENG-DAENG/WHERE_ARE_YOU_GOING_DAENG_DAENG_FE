import React from 'react'
import Header from '../../components/commons/Header'
import Footer from '../../components/commons/Footer'
import ReviewForm from '../../components/review/ReviewForm'
import styled from "styled-components";

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;  
  overflow: auto; 
  padding-bottom: 20%;
`;

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


function MyReviewPage() {
  return (
    <ReviewContainer>
      <Header label="내가 작성한 리뷰" />
      <StyledTotalReview>내가 쓴 총 리뷰 개</StyledTotalReview> 
        <ReviewForm />
        <ReviewForm />
      <Footer />
    </ReviewContainer>
  )
}

export default MyReviewPage;
