import { useEffect, useState } from 'react';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

const Confetti = () => {
  const canvasStyles = {
    position: 'fixed',
    height: '100%',
    width: '554px',
    pointerEvents: 'none',
    zIndex: '3',
  };

  const [origin, setOrigin] = useState({ x: 0.5, y: 0.2 });

  const handleResize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 380) {
      setOrigin({ x: 0.3, y: 0.2 });
    } else if (screenWidth < 490) {
      setOrigin({ x: 0.4, y: 0.2 });
    } else {
      setOrigin({ x: 0.5, y: 0.2 });
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const decorateOptions = (originalOptions) => {
    return {
      ...originalOptions,
      particleCount: 200, // 조각 개수 설정
      spread: 360, // 퍼짐 정도 설정
      startVelocity: 50, // 초기 속도 설정
      ticks: 200, // 애니메이션 지속 시간 설정
      origin: origin, // 발사 위치 설정
      shapes: ['circle', 'circle', 'square'], // 이미지 배열을 shapes로 설정
      gravity: 2, // 중력 설정
    };
  };

  return (
    <Fireworks
      autorun={{ speed: 0.5, duration: 3 }}
      style={canvasStyles}
      decorateOptions={decorateOptions} // 옵션을 적용
    />
  );
};

export default Confetti;
