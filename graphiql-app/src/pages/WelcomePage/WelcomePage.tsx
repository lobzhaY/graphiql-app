import React from 'react';

import { useTranslation } from 'react-i18next';

import './WelcomePage.scss';

import yuliyaImg from '../../assets/yuliya.png';
import mariaImg from '../../assets/maria.png';
import alesiaImg from '../../assets/alesia.png';

function WelcomePage() {
  const { t } = useTranslation();

  return (
    <div className="welcome-page">
      <div className="welcome-page__block">
        <img src={yuliyaImg} alt="yuliya" className="welcome-page__block-img" />
        <div className="welcome-page__block-text">{t('welcomePage.yuliya')}</div>
      </div>
      <div className="welcome-page__block">
        <img src={mariaImg} alt="maria" className="welcome-page__block-img" />
        <div className="welcome-page__block-text">{t('welcomePage.maria')}</div>
      </div>
      <div className="welcome-page__block">
        <img src={alesiaImg} alt="alesia" className="welcome-page__block-img" />
        <div className="welcome-page__block-text">{t('welcomePage.alesia')}</div>
      </div>
    </div>
  );
}

export default WelcomePage;
