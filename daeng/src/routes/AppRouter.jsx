import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styled from "styled-components";
import ScrollTop from '../components/commons/ScrollTop';
import { setupAxiosInterceptors } from '../services/axiosInstance';
import Loading from '../components/commons/Loading';

// ✅ 동적 import로 코드 스플리팅 적용
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Search = lazy(() => import('../pages/search/Search'));
const PetRegisterPage = lazy(() => import('../pages/pet/PetRegisterPage'));
const AddPetPage = lazy(() => import('../pages/pet/AddPetPage'));
const PetEditPage = lazy(() => import('../pages/pet/PetEditPage'));
const MyPage = lazy(() => import('../pages/user/MyPage'));
const AlarmPage = lazy(() => import('../pages/alarm/AlarmPage'));
const MyReviewPage = lazy(() => import('../pages/review/MyReviewPage'));
const PlaceDetail = lazy(() => import('../pages/search/PlaceDetail'));
const TotalReviewPage = lazy(() => import('../pages/review/TotalReviewPage'));
const WriteReviewPage = lazy(() => import('../pages/review/WriteReviewPage'));
const Bookmark = lazy(() => import('../pages/Bookmark'));
const PreferenceRegister = lazy(() => import('../pages/user/PreferenceRegisterPage'));
const EditPreference = lazy(() => import('../pages/user/PreferenceEditPage'));
const UserRegisterPage = lazy(() => import('../pages/user/UserRegisterPage'));
const UserEditPage = lazy(() => import('../pages/user/UserEditPage'));
const MyVisitList = lazy(() => import('../pages/visit/MyVisitList'));
const PlaceVisitList = lazy(() => import('../pages/visit/PlaceVisitList'));
const Error = lazy(() => import("../pages/Error"));
const Hopscotch = lazy(() => import('../pages/Hopscotch'));
const EventPage = lazy(() => import('../pages/user/EventPage'));
const HowToGuidePage = lazy(() => import('../pages/HowToGuidePage'));
const AdminPage = lazy(() => import('../pages/AdminPage'));

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
      {/* Suspense를 사용하여 동적 import가 완료될 때까지 로딩 컴포넌트트 표시 */}
      <Suspense fallback={
        <LoadingWrapper>
          <Loading label="페이지를 불러오는 중입니다." />
        </LoadingWrapper>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event" element={<EventPage />} />
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
          <Route path="/hopscotch" element={<Hopscotch />} />
          <Route path="/how-to-guide" element={<HowToGuidePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
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

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
`;

export default AppRouter;
