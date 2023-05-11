import { Navigate, Route, Routes } from 'react-router-dom';

import RootRoute from './pages/Root/RootRoute';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './App.scss';
import LoginComponent from './pages/AuthorizationPage/LoginComponent/LoginComponent';
import RegisterComponent from './pages/AuthorizationPage/RegisterComponent/RegisterComponent';
import ResetComponent from './pages/AuthorizationPage/ResetComponent/ResetComponent';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<RootRoute />}>
          <Route index element={<MainPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route index path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/reset" element={<ResetComponent />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
