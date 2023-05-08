import { useEffect, useRef, useState } from 'react';
import './HeaderComponent.scss';

function HeaderComponent() {
  const isAuth = true;

  const header = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('100px');

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
          <button className="header__buttons-start">Get Started</button>
          :
          <>
            <button className="header__buttons-login">Log in</button>
            <button className="header__buttons-signup">Sign up</button>
          </>
        }
      </div>
    </header>
  )
}

export default HeaderComponent;