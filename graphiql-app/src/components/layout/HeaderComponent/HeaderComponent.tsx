import { useEffect, useRef, useState } from 'react';
import './HeaderComponent.scss';
import { useTranslation } from 'react-i18next';

function HeaderComponent() {
  const isAuth = true;
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
      <img src="src/assets/logo-desktop.svg" alt="logo" className="header__logo desktop" />
      <img src="src/assets/logo-mobile.svg" alt="logo" className="header__logo mobile" />
      <div className="header__buttons">
        {isAuth
          ?
          <>
            <button className="header__buttons-start">{t("header.started")}</button>
            <div className="header__buttons-language">
              <button onClick={() => changeLanguage("en")}>EN</button>
              <button onClick={() => changeLanguage("ru")}>RU</button>
            </div>
          </>
          :
          <>
            <button className="header__buttons-login">{t("header.login")}</button>
            <button className="header__buttons-signup">{t("header.signup")}</button>
            <div className="header__buttons-language">
              <button onClick={() => changeLanguage("en")}>EN</button>
              <button onClick={() => changeLanguage("ru")}>RU</button>
            </div>
          </>
        }
      </div>

    </header>
  )
}

export default HeaderComponent;