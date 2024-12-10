import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import Bookmark from '../pages/Bookmark';
import PreferenceRegister from '../pages/user/PreferenceRegisterPage';
import EditPreference from '../pages/user/PreferenceEditPage';
import ScrollTop from '../components/commons/ScrollTop';
import UserRegisterPage from '../pages/user/UserRegisterPage';
import UserEditPage from '../pages/user/UserEditPage';
import MyVisitList from '../pages/visit/MyVisitList';
import PlaceVisitList from '../pages/visit/PlaceVisitList';
import Error from "../pages/Error";
import { setupAxiosInterceptors } from '../services/axiosInstance';
import HowToGuidePage from '../pages/HowToGuidePage';

const trackPageView = () => {
  if (window.wcs) {
    window.wcs_do();
  }
};

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView();
  }, [location]);
};

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  usePageTracking();

  return (
    <>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-register" element={<UserRegisterPage />} />
        <Route path="/user-edit" element={<UserEditPage />} />
        <Route path="/preference-register" element={<PreferenceRegister />} />
        <Route path="/preference-edit" element={<EditPreference />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<PlaceDetail />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/pet-register" element={<PetRegisterPage />} />
        <Route path="/pet-add" element={<AddPetPage />} />
        <Route path="/pet-edit/:petId" element={<PetEditPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/alarm" element={<AlarmPage />} />
        <Route path="/my-review" element={<MyReviewPage />} />
        <Route path="/total-review/:placeId" element={<TotalReviewPage />} />
        <Route path="/write-review/:placeId" element={<WriteReviewPage />} />
        <Route path="/visit-list" element={<MyVisitList />} />
        <Route path="/visit-list/:id" element={<PlaceVisitList />} />
        <Route path="/how-to-guide" element={<HowToGuidePage />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default AppRouter;
