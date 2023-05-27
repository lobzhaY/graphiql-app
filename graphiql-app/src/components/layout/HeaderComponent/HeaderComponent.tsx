import React, { useEffect, useRef, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuthState } from 'react-firebase-hooks/auth';

import Switcher from 'react-switcher-rc';

import { authFirebase, logout } from '../../../utils/firebase/firebase';

import './HeaderComponent.scss';

import logoDesktop from '../../../assets/logo-desktop.svg';
import logoMobile from '../../../assets/logo-mobile.svg';

function HeaderComponent() {
  const [switcherState, setSwitcherState] = useState(false);
  const [user] = useAuthState(authFirebase);

  const { pathname } = useLocation();

  const { t, i18n } = useTranslation();

  const changeLanguage = (e: any) => {
    setSwitcherState(e.target.checked);
    if (e.target.checked === true) {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ru');
    }
  };

  const header = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('80px');

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll > 254 && (header as unknown as HTMLDivElement).clientHeight > 60) {
        setHeight(`60px`);
        return;
      }
      if (scroll > 254) return;

      const defaultHeight = 80;

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
        <img src={logoDesktop} alt="logo" className="header__logo desktop" />
        <img src={logoMobile} alt="logo" className="header__logo mobile" />
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
            <Switcher
              name="my-switcher"
              onChange={changeLanguage}
              checked={switcherState}
              checkedIcon="EN"
              unCheckedIcon="RU"
            />
          </>
        ) : (
          <>
            {pathname === '/graphiql' ? (
              <>
                <button className="header__buttons-end" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/graphiql">
                  <button className="header__buttons-start">{t('header.started')}</button>
                </Link>
                <button className="header__buttons-end" onClick={logout}>
                  {t('header.logout')}
                </button>
              </>
            )}
            <Switcher
              name="my-switcher"
              onChange={changeLanguage}
              checked={switcherState}
              checkedIcon="EN"
              unCheckedIcon="RU"
            />
          </>
        )}
      </div>
    </header>
  );
}

export default HeaderComponent;
