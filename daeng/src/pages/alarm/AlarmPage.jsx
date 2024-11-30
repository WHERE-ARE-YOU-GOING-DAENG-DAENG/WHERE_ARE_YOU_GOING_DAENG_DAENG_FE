import React, { useEffect } from 'react';
import Header from '../../components/commons/Header';
import AlarmBox from '../../components/alarm/AlarmBox';
import AlarmButton from '../../components/alarm/AlarmButton';
import DivisionLine from '../../components/alarm/DivisionLine';
import Footer from '../../components/commons/Footer';

function AlarmPage() {
  useEffect(() => {
    // 브라우저가 서비스 워커를 지원하는지 확인
    if ('serviceWorker' in navigator) {
      console.log('이 브라우저는 서비스 워커를 지원합니다.');

      // 서비스 워커 등록
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
  }, []); // 빈 배열로 설정하여 페이지 로드 시 한 번만 실행

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
