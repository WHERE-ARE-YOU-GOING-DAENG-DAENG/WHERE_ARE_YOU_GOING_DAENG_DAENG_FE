import { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import useGoogleMapsStore from './stores/useGoogleMapsStore';

function App() {
  const { loadGoogleMaps } = useGoogleMapsStore();
  
  useEffect(() => {
    loadGoogleMaps();
  }, [loadGoogleMaps]);
  
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
