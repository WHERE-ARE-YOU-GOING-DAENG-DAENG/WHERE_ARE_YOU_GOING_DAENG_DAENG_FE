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
      particleCount: 200, 
      spread: 360, 
      startVelocity: 50, 
      ticks: 200,
      origin: origin, 
      shapes: ['circle', 'circle', 'square'], 
      gravity: 2, 
    };
  };

  return (
    <Fireworks
      autorun={{ speed: 0.5, duration: 3 }}
      style={canvasStyles}
      decorateOptions={decorateOptions} 
    />
  );
};

export default Confetti;
