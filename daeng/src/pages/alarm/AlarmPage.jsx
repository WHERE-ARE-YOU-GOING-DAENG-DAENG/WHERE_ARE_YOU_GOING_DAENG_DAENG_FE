import React, { useEffect } from 'react';
import Header from '../../components/commons/Header';
import AlarmBox from '../../components/alarm/AlarmBox';
import AlarmButton from '../../components/alarm/AlarmButton';
import DivisionLine from '../../components/alarm/DivisionLine';
import Footer from '../../components/commons/Footer';

function AlarmPage() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      console.log('이 브라우저는 서비스 워커를 지원합니다.');

      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('서비스 워커 등록 성공:', registration);
        })
        .catch((error) => {
          console.error('서비스 워커 등록 실패:', error);
        });
    } else {
      console.warn('이 브라우저는 서비스 워커를 지원하지 않습니다.');
    }
  }, []); 

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
