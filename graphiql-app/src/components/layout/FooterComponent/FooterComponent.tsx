import React from 'react';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './FooterComponent.scss';

import rssLogo from '../../../assets/logo-rsschool.svg';

function FooterComponent() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <Link to="https://rs.school/react/" target="_blank">
        <img src={rssLogo} alt="logo" className="footer__logo" />
      </Link>
      <div className="footer__info-year">2023</div>
      <div className="footer__info-github">
        <Link to="https://github.com/lobzhaY/graphiql-app" target="_blank">
          <div className="footer__info-link">{t('footer.yuliya')}</div>
        </Link>
        <Link to="https://github.com/lobzhaY/graphiql-app" target="_blank">
          <div className="footer__info-link">{t('footer.maria')}</div>
        </Link>
        <Link to="https://github.com/lobzhaY/graphiql-app" target="_blank">
          <div className="footer__info-link">{t('footer.alesia')}</div>
        </Link>
      </div>
    </footer>
  );
}

export default FooterComponent;
