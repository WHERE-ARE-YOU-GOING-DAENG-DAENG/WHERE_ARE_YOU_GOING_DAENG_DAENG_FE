import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import PetRegisterPage from '../pages/pet/PetRegisterPage';
import AddPetPage from '../pages/pet/AddPetPage';
import PetEditPage from '../pages/pet/PetEditPage';
import MyPage from '../pages/user/MyPage';
import AlarmPage from '../pages/alarm/AlarmPage';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pet-register" element={<PetRegisterPage />} />
        <Route path="/pet-add" element={<AddPetPage />} />
        <Route path="/pet-edit" element={<PetEditPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/alarm" element={<AlarmPage/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
