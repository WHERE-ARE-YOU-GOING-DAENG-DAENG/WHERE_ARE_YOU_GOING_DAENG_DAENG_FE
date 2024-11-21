import React from 'react'
import Header from '../../components/commons/Header'
import Footer from '../../components/commons/Footer'
import styled from "styled-components";
import WriteReview from '../../components/review/WriteReview';

const WriteReviewContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;
  padding: 3px;
  overflow: auto; 
  padding-bottom: 205%;
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
