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


function MyReviewPage() {
  return (
    <ReviewContainer>
      <Header label="내가 작성한 리뷰" />
        <ReviewForm />
        <ReviewForm />
      <Footer />
    </ReviewContainer>
  )
}

export default MyReviewPage;
