import React from 'react';

import { useTranslation } from 'react-i18next';

import './WelcomePage.scss';

import yuliyaImg from '../../assets/yuliya.png';
import mariaImg from '../../assets/maria.png';
import alesiaImg from '../../assets/alesia.png';

function WelcomePage() {
  const { t } = useTranslation();

  return (
    <div className="wrapper-welcome">
      <div className="welcome-course">
        <div className="welcome-course__block">
          <p>{t('welcomePage.textHeader')}</p>
          <p>{t('welcomePage.textApp1')}</p>
          <p>{t('welcomePage.textApp2')}</p>
          <p>{t('welcomePage.textApp3')}</p>
          <p>{t('welcomePage.textStage')}</p>
        </div>
      </div>
      <div className="welcome-page">
        <div className="welcome-page__block">
          <div className="welcome-page__block-row-img">
            <img src={yuliyaImg} alt="yuliya" className="welcome-page__block-img" />
          </div>
          <div className="welcome-page__block-row-text">
            <h5 className="welcome-page__block-text">{t('welcomePage.yuliya')}</h5>
              <p>{t('welcomePage.yLocation')}</p>
              <p>{t('welcomePage.dev')}</p>
              <p>{t('welcomePage.stack')} JS, TS, React</p>
              <p>{t('welcomePage.language')}</p>
          </div>
        </div>
        <div className="welcome-page__block">
          <div className="welcome-page__block-row-img">
            <img src={mariaImg} alt="maria" className="welcome-page__block-img" />
          </div>
          <div className="welcome-page__block-row-text">
            <h5 className="welcome-page__block-text">{t('welcomePage.maria')}</h5>
              <p>{t('welcomePage.mLocation')}</p>
              <p>{t('welcomePage.dev')}</p>
              <p>{t('welcomePage.stack')} JS, TS, React</p>
              <p>{t('welcomePage.mLanguage')}</p>
          </div>
        </div>
        <div className="welcome-page__block">
          <div className="welcome-page__block-row-img">
            <img src={alesiaImg} alt="alesia" className="welcome-page__block-img" />
          </div>
          <div className="welcome-page__block-row-text">
            <h5 className="welcome-page__block-text">{t('welcomePage.alesia')}</h5>
              <p>{t('welcomePage.aLocation')}</p>
              <p>{t('welcomePage.dev')}</p>
              <p>{t('welcomePage.stack')} JS, TS, React, Angular</p>
              <p>{t('welcomePage.language')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
