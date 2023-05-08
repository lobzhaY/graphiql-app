import { Navigate, Route, Routes } from 'react-router-dom';

import RootRoute from './pages/Root/RootRoute';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './App.scss';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import LoginComponent from './components/routes/LoginComponent/LoginComponent';
import RegisterComponent from './components/routes/RegisterComponent/RegisterComponent';
import ResetComponent from './components/routes/ResetComponent/ResetComponent';
import Playground from './pages/Playground/Playground';


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<RootRoute />}>
          <Route index element={<MainPage />} />
          <Route path="/graphiql" element={<Playground />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/authorization" element={<AuthorizationPage />}>
            <Route index path="/authorization/login" element={<LoginComponent />} />
            <Route path="/authorization/register" element={<RegisterComponent />} />
            <Route path="/authorization/reset" element={<ResetComponent />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
