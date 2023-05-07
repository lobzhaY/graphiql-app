import './HeaderComponent.scss';

function HeaderComponent() {
  const isAuth = false;

  return (
    <header className="header sticky">
      <img src="src/assets/logo-desktop.svg" alt="logo" className="header__logo desktop" />
      <img src="src/assets/logo-mobile.svg" alt="logo" className="header__logo mobile" />
      <div className="header__buttons">
        {isAuth
          ?
          <>
            <button className="header__buttons-login">Log in</button>
            <button className="header__buttons-signup">Sign up</button>
          </>
          :
          <button className="header__buttons-start">Get Started</button>
        }
      </div>
    </header>
  )
}

export default HeaderComponent;