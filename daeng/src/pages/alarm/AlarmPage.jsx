import React from 'react';
import Header from '../../components/commons/Header';
import AlarmBox from '../../components/alarm/AlarmBox';
import Footer from '../../components/commons/Footer';

function AlarmPage() {
  return (
    <>
      <Header label="알림" />
      <AlarmBox />
      <Footer />
    </>
  );
}

export default AlarmPage;
