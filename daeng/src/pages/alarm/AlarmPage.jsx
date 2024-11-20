import React from 'react';
import Header from '../../components/Header';
import AlarmBox from '../../components/alarm/AlarmBox';
import AlarmButton from '../../components/alarm/AlarmButton';
import DivisionLine from '../../components/alarm/DivisionLine';
import Footer from '../../components/Footer';
function AlarmPage() {
  return (
    <>
      <Header label="알림" />
        <AlarmBox />
        <AlarmButton />
        <DivisionLine />
      <Footer />
    </>
  );
}

export default AlarmPage;
