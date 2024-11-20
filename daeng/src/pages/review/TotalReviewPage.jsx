import React from 'react'
import Header from '../../components/commons/Header'
import TotalReviewForm from '../../components/review/TotalReviewForm'
import Footer from '../../components/commons/Footer'
import styled from "styled-components";
import ReviewDetail from '../../components/review/ReviewDetail';

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;  
  overflow: auto; 
  padding-bottom: 20%;
`;


function TotalReviewPage() {
  return (
    <>
    <ReviewContainer>
      <Header label="리뷰 전체보기" />
      <ReviewDetail />
        <TotalReviewForm />
        <TotalReviewForm />
        <TotalReviewForm />
      <Footer />
    </ReviewContainer>
    </>
  )
}

export default TotalReviewPage
