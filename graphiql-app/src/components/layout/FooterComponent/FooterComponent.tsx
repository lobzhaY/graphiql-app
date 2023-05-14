import React from 'react';
import './FooterComponent.scss';

function FooterComponent() {
  return (
    <footer className="footer">
      <a href="https://rs.school/react/" target="_blank">
        <img src="src/assets/logo-rsschool.svg" alt="logo" className="footer__logo" />
      </a>
      <div className="footer__info-year">
        <div className="footer__info-year">2023</div>
        <a href="https://github.com/lobzhaY/graphiql-app" target="_blank">
          <div className="footer__info-link">PROJECT</div>
        </a>
      </div>
    </footer>
  )
}

export default FooterComponent;