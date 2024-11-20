import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from '../pages/Search';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
