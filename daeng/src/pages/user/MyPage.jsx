import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Header from '../../components/commons/Header';
import Footer from '../../components/commons/Footer';
import UserContainer from '../../components/user/UserContainer';
import DivisionLine from '../../components/user/DivisionLine';
import PetContainer from '../../components/user/PetContainer';
import RoutePage from '../../components/user/RoutePage';
import PetService from '../../components/user/PetService';
import LastContainer from '../../components/user/LastContainer';
import Loading from '../../components/commons/Loading'; 

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column; 
  min-height: 100vh;  
  overflow: auto; 
  padding-bottom: 15%;
`;

function MyPage() {
  const [isLoading, setIsLoading] = useState(true); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1)); 
        setIsLoading(false); 
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading label="마이페이지를 불러오는 중입니다..." />; 
  }

  return (
    <ReviewContainer>
      <Header label="MY PAGE" />
        <UserContainer />
        <DivisionLine />
        <PetContainer />
        <DivisionLine />
        <RoutePage />
        <DivisionLine />
        <PetService />
        <DivisionLine />
        <LastContainer />
      <Footer />
    </ReviewContainer>
  );
}

export default MyPage;
