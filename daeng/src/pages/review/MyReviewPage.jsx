import React from 'react'
import Header from '../../components/commons/Header'
import Footer from '../../components/commons/Footer'
import TotalReview from '../../components/review/TotalReview'
import ReviewForm from '../../components/review/ReviewForm'
import styled from "styled-components";

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;  
  overflow: auto; 
  padding-bottom: 30%;
`;

const ContentContainer = styled.div`
  overflow: auto; 
`;

function MyReviewPage() {
  return (
    <>
      <ReviewContainer>
        <Header label="내가 작성한 리뷰" />
        <ContentContainer>
          <TotalReview />
          <ReviewForm />
          <ReviewForm />
        </ContentContainer>
        <Footer />
      </ReviewContainer>
    </>
  )
}

export default MyReviewPage;
