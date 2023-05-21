import React, { useEffect, useRef, useState } from 'react';
import './HeaderComponent.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authFirebase, logout } from '../../../utils/firebase/firebase';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function HeaderComponent() {
  const [user] = useAuthState(authFirebase);

  const { t, i18n } = useTranslation();

  const changeLanguage = (language: any) => {
    i18n.changeLanguage(language);
  };

  const header = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('120px');

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll > 254 && (header as unknown as HTMLDivElement).clientHeight > 60) {
        setHeight(`60px`);
        return;
      }
      if (scroll > 254) return;

      const defaultHeight = 100;

      let newHeight = defaultHeight - scroll / 7;
      if (newHeight < 60) newHeight = 60;
      setHeight(`${newHeight}px`);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="header sticky" ref={header} style={{ height }}>
      <Link to="/">
        <img src="src/assets/logo-desktop.svg" alt="logo" className="header__logo desktop" />
        <img src="src/assets/logo-mobile.svg" alt="logo" className="header__logo mobile" />
      </Link>
      <div className="header__buttons">
        {!user ? (
          <>
            <Link to="/login">
              <button className="header__buttons-login">{t('header.login')}</button>
            </Link>
            <Link to="/register">
              <button className="header__buttons-signup">{t('header.signup')}</button>
            </Link>
            <div className="header__buttons-language">
              <button onClick={() => changeLanguage('en')}>EN</button>
              <button onClick={() => changeLanguage('ru')}>RU</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/graphiql">
              <button className="header__buttons-start">{t('header.started')}</button>
            </Link>
            <button className="header__buttons-end" onClick={logout}>
              Logout
            </button>
            <div className="header__buttons-language">
              <button onClick={() => changeLanguage('en')}>EN</button>
              <button onClick={() => changeLanguage('ru')}>RU</button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default HeaderComponent;
