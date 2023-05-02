import { Outlet } from 'react-router-dom';
import FooterComponent from '../../components/layout/FooterComponent/FooterComponent';
import HeaderComponent from '../../components/layout/HeaderComponent/HeaderComponent';

function RootRoute() {
  return (
    <div>
      <HeaderComponent />
      <div className="container">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
}

export default RootRoute;
