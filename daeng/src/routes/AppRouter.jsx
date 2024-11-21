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
import Preference from '../pages/Preference';
import Bookmark from '../pages/Bookmark';
import MyVisitList from '../pages/MyVisitList';
import ScrollTop from '../components/commons/ScrollTop';

const AppRouter = () => {
  return (
    <Router>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/preference" element={<Preference />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<PlaceDetail />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/pet-register" element={<PetRegisterPage />} />
        <Route path="/pet-add" element={<AddPetPage />} />
        <Route path="/pet-edit" element={<PetEditPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/alarm" element={<AlarmPage/>} />
        <Route path="/my-review" element={<MyReviewPage />} />
        <Route path="/total-review" element={<TotalReviewPage />} />
        <Route path="/write-review" element={<WriteReviewPage />} />
        <Route path="/visit-list" element={<MyVisitList />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;

