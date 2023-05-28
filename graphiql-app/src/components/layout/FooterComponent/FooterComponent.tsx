import React from 'react';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { FOOTER_ICON } from '../../../constants/constants';

import './FooterComponent.scss';

import rssLogo from '../../../assets/logo-rsschool.svg';

function FooterComponent() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <Link to="https://rs.school/react/" target="_blank" className="footer-logo-link">
        <img src={rssLogo} alt="logo" className="footer__logo" />
      </Link>
      <div className="footer__info-year">2023</div>
      <div className="footer__info-github">
        <Link to="https://github.com/lobzhaY/graphiql-app" target="_blank" className="footer-link">
          <div className="footer__info-link">
            <div className="gh-link">
              <img src={FOOTER_ICON} alt="github logo" />
            </div>
            <p>{t('footer.yuliya')}</p>
          </div>
        </Link>
        <Link to="https://github.com/lobzhaY/graphiql-app" target="_blank" className="footer-link">
          <div className="footer__info-link">
            <div className="gh-link">
              <img src={FOOTER_ICON} alt="github logo" />
            </div>
            <p>{t('footer.maria')}</p>
          </div>
        </Link>
        <Link to="https://github.com/lobzhaY/graphiql-app" target="_blank" className="footer-link">
          <div className="footer__info-link">
            <div className="gh-link">
              <img src={FOOTER_ICON} alt="github logo" />
            </div>
            <p>{t('footer.alesia')}</p>
          </div>
        </Link>
      </div>
    </footer>
  );
}

export default FooterComponent;
