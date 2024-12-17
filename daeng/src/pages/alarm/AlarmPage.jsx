import React from 'react';
import Header from '../../components/commons/Header';
import AlarmBox from '../../components/alarm/AlarmBox';
import Footer from '../../components/commons/Footer';
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto; 
`;

function AlarmPage() {
  return (
    <PageContainer>
      <Header label="알림" />
      <Content>
        <AlarmBox />
      </Content>
      <Footer />
    </PageContainer>
  );
}

export default AlarmPage;
