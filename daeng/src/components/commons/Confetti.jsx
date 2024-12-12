import React from 'react';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

const Confetti = () => {
  const canvasStyles = {
    position: 'fixed',
    height: '100%',
    width: '554px',
    pointerEvents: 'none',
    zIndex: '3',
  };

  const decorateOptions = (originalOptions) => {
    return {
      ...originalOptions,
      particleCount: 200, // 조각 개수 설정
      spread: 360, // 퍼짐 정도 설정
      startVelocity: 50, // 초기 속도 설정
      ticks: 200, // 애니메이션 지속 시간 설정
      origin: { x: 0.5, y: 0.2 }, // 발사 위치 설정
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
