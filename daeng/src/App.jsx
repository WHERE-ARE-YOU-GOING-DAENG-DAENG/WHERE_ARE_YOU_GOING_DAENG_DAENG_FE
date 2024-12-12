import { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import useGoogleMapsStore from './stores/useGoogleMapsStore';

function App() {
  const { loadGoogleMaps } = useGoogleMapsStore();
  
  useEffect(() => {
    loadGoogleMaps(); // Google Maps API를 로드
  }, [loadGoogleMaps]);
  
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
