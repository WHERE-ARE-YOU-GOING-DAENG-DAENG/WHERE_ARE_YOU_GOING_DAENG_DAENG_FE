import React from 'react'
import styled from "styled-components";
import Header from '../../components/commons/Header'
import Footer from '../../components/commons/Footer'
import MypageFullContainer from '../../components/user/MypageFullContainer';

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;  
  overflow: auto; 
  padding-bottom: 15%;
`;

function MyPage() {
  return (
    <ReviewContainer>
      <Header label="MY PAGE" />
      <MypageFullContainer />
      <Footer />
    </ReviewContainer>
  )
}

export default MyPage
