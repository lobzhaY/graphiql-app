import React from 'react';
import './WelcomePage.scss';
import { useTranslation } from 'react-i18next';

function WelcomePage() {
  const { t } = useTranslation();

  return (
    <div className="welcome-page">
      <div className="welcome-page__block">
        <img src="src/assets/yuliya.png" alt="yuliya" className="welcome-page__block-img" />
        <div className="welcome-page__block-text">{t("welcomePage.yuliya")}</div>
      </div>
      <div className="welcome-page__block">
        <img src="src/assets/maria.png" alt="maria" className="welcome-page__block-img" />
        <div className="welcome-page__block-text">{t("welcomePage.maria")}</div>
      </div>
      <div className="welcome-page__block">
        <img src="src/assets/alesia.png" alt="alesia" className="welcome-page__block-img" />
        <div className="welcome-page__block-text">{t("welcomePage.alesia")}</div>
      </div>
    </div>
  );
}

export default WelcomePage;
