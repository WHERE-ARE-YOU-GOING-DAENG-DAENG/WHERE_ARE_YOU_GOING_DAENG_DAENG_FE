import React from 'react';
import styled from 'styled-components';
import Header from '../components/commons/Header';
import howToGuide from '../assets/icons/howToGuide.svg';
import FirstBanner from '../components/guide/FirstBanner';
import SecondBanner from '../components/guide/SecondBanner';
import Footer from '../components/commons/Footer';
import LastBanner from '../components/guide/LastBanner';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
`;

const FirstContainer = styled.div`
  width: 100%;
  height: 58px;
  background-color: #fdf2f8;
  color: black;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  margin-top: 10px;
  line-height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: 554px) {
    font-size: 15px;
    margin-top: 0px;
  }
`;

const Container = styled.div`
  flex: 1;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 15%;

  @media (max-width: 554px) {
    margin-bottom: 20%;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

function HowToGuidePage() {
  return (
    <PageWrapper>
      <Header label="How To Guides" />
      <FirstContainer>
        댕댕어디가 서비스를 설명드려요
        <Icon src={howToGuide} alt="서비스 설명 페이지 아이콘" />
      </FirstContainer>
      <Container>
        <FirstBanner />
        <SecondBanner />
        <LastBanner />
      </Container>
      <Footer />
    </PageWrapper>
  );
}

export default HowToGuidePage;
