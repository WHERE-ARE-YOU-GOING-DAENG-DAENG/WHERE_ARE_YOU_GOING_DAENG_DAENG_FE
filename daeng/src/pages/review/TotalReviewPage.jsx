import React from 'react'
import Header from '../../components/commons/Header'
import TotalReviewForm from '../../components/review/TotalReviewForm'
import Footer from '../../components/commons/Footer'
import styled from "styled-components";

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;  
  max-height: auto;
  overflow: auto; 
  padding-bottom: 20%;
`;


function TotalReviewPage() {
  return (
    <ReviewContainer>
      <Header label="리뷰 전체보기" />
        <TotalReviewForm />
      <Footer />
    </ReviewContainer>
  )
}

export default TotalReviewPage
