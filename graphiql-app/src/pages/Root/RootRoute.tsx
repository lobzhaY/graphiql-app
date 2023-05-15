import { Outlet } from 'react-router-dom';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent';
import HeaderComponent from '../../components/layout/HeaderComponent/HeaderComponent';

import './RootRoute.scss';
import React from 'react';

function RootRoute() {
  return (
    <div className="wrapper-app">
      <HeaderComponent />
      <div className="container">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
}

export default RootRoute;
