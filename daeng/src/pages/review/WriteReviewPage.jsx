import React from 'react'
import Header from '../../components/commons/Header'
import Footer from '../../components/commons/Footer'
import styled from "styled-components";
import WriteReview from '../../components/review/WriteReview';

const WriteReviewContainer = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 3px;
  overflow: auto; 

  @media (max-width: 554px) {
    font-size: 10px;
  }
`
function WriteReviewPage() {
  return (
    <WriteReviewContainer>
      <Header label="리뷰 작성" />
      <WriteReview />
      <Footer />
    </WriteReviewContainer>
  )
}

export default WriteReviewPage
