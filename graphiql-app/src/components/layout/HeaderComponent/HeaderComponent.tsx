import React from 'react';
import './HeaderComponent.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authFirebase, logout } from '../../../utils/firebase/firebase';
import { Link } from 'react-router-dom';

function HeaderComponent() {
  const [user] = useAuthState(authFirebase);

  return (
    <header className="header sticky">
      <Link to="/">
        <img src="src/assets/logo-desktop.svg" alt="logo" className="header__logo desktop" />
        <img src="src/assets/logo-mobile.svg" alt="logo" className="header__logo mobile" />
      </Link>
      <div className="header__buttons">
        {!user ? (
          <>
            <Link to="/login">
              <button className="header__buttons-login">Sing in</button>
            </Link>
            <Link to="/register">
              <button className="header__buttons-signup">Sign up</button>
            </Link>
          </>
        ) : (
          <>
            <button className="header__buttons-start">Get Started</button>
            <button className="header__buttons-end" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}

export default HeaderComponent;
