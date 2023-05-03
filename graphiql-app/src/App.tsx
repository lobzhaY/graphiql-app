import { Navigate, Route, Routes } from 'react-router-dom';

import RootRoute from './pages/Root/RootRoute';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootRoute />}>
          <Route index element={<MainPage />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </>
  );
}

export default App;
