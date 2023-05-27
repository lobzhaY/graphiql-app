import React from 'react';

import { useTranslation } from 'react-i18next';

import { ABOUT_US } from '../../constants/constants';

import './WelcomePage.scss';

import yuliyaImg from '../../assets/yuliya.png';
import mariaImg from '../../assets/maria.png';
import alesiaImg from '../../assets/alesia.png';

function WelcomePage() {
  const { t } = useTranslation();

  return (
    <div className="wrapper-welcome">
      <div className="welcome-page">
        <div className="welcome-page__block">
          <div className="welcome-page__block-row-img">
            <img src={yuliyaImg} alt="yuliya" className="welcome-page__block-img" />
          </div>
          <div className="welcome-page__block-row-text">
            <h5 className="welcome-page__block-text">{t('welcomePage.yuliya')}</h5>
            {ABOUT_US.yuliya.map((info, id) => (
              <p key={id}>{info}</p>
            ))}
          </div>
        </div>
        <div className="welcome-page__block">
          <div className="welcome-page__block-row-img">
            <img src={mariaImg} alt="maria" className="welcome-page__block-img" />
          </div>
          <div className="welcome-page__block-row-text">
            <h5 className="welcome-page__block-text">{t('welcomePage.maria')}</h5>
            {ABOUT_US.maria.map((info, id) => (
              <p key={id}>{info}</p>
            ))}
          </div>
        </div>
        <div className="welcome-page__block">
          <div className="welcome-page__block-row-img">
            <img src={alesiaImg} alt="alesia" className="welcome-page__block-img" />
          </div>
          <div className="welcome-page__block-row-text">
            <h5 className="welcome-page__block-text">{t('welcomePage.alesia')}</h5>
            {ABOUT_US.alesia.map((info, id) => (
              <p key={id}>{info}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
