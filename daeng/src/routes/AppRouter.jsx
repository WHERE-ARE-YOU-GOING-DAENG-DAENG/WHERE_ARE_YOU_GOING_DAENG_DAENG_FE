import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Search from '../pages/search/Search';
import PetRegisterPage from '../pages/pet/PetRegisterPage';
import AddPetPage from '../pages/pet/AddPetPage';
import PetEditPage from '../pages/pet/PetEditPage';
import MyPage from '../pages/user/MyPage';
import AlarmPage from '../pages/alarm/AlarmPage';
import MyReviewPage from '../pages/review/MyReviewPage';
import PlaceDetail from '../pages/search/PlaceDetail';
import TotalReviewPage from '../pages/review/TotalReviewPage';
import WriteReviewPage from '../pages/review/WriteReviewPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<PlaceDetail />} />
        <Route path="/pet-register" element={<PetRegisterPage />} />
        <Route path="/pet-add" element={<AddPetPage />} />
        <Route path="/pet-edit" element={<PetEditPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/alarm" element={<AlarmPage/>} />
        <Route path="/my-review" element={<MyReviewPage />} />
        <Route path="/total-review" element={<TotalReviewPage />} />
        <Route path="/write-review" element={<WriteReviewPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

