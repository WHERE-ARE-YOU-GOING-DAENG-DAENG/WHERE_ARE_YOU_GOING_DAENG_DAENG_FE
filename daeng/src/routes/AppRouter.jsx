import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PetRegisterPage from '../pages/pet/PetRegisterPage';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pet-register" element={<PetRegisterPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
