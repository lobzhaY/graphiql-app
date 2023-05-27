import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { authFirebase } from './utils/firebase/firebase';

import RootRoute from './pages/Root/RootRoute';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import LoginComponent from './pages/AuthorizationPage/LoginComponent/LoginComponent';
import RegisterComponent from './pages/AuthorizationPage/RegisterComponent/RegisterComponent';
import ResetComponent from './pages/AuthorizationPage/ResetComponent/ResetComponent';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import Playground from './pages/Playground/Playground';

import './App.scss';
import Loader from './components/loader/Loader';

function App() {
  const [user, loading] = useAuthState(authFirebase);
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<RootRoute />}>
          <Route index element={<WelcomePage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/graphiql" element={loading ? <Loader/> : user ? <Playground /> : <Navigate to="/" />} />
          <Route
            index
            path="/login"
            element={loading ? <Loader/> : user ? <Navigate replace to="/" /> : <LoginComponent />}
          />
          <Route
            path="/register"
            element={loading ? <Loader/> : user ? <Navigate replace to="/" /> : <RegisterComponent />}
          />
          <Route path="/reset" element={loading ? <Loader/> : user ? <Navigate replace to="/" /> : <ResetComponent />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
