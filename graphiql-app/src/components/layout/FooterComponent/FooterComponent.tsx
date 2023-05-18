
import React from 'react';
import { useTranslation } from 'react-i18next';
import './FooterComponent.scss';

function FooterComponent() {
  const { t, i18n } = useTranslation();
  console.log(i18n);
  return (
    <footer className="footer">
      <a href="https://rs.school/react/" target="_blank">
        <img src="src/assets/logo-rsschool.svg" alt="logo" className="footer__logo" />
      </a>
      {/* <div className="footer__info-year"> */}
      <div className="footer__info-year">2023</div>
      <div className="footer__info-github">
        <a href="https://github.com/lobzhaY/graphiql-app" target="_blank">
          <div className="footer__info-link">{t("footer.yuliya")}</div>
        </a>
        <a href="https://github.com/lobzhaY/graphiql-app" target="_blank">
          <div className="footer__info-link">{t("footer.maria")}</div>
        </a>
        <a href="https://github.com/lobzhaY/graphiql-app" target="_blank">
          <div className="footer__info-link">{t("footer.alesia")}</div>
        </a>
      </div>

      {/* </div> */}
    </footer>
  )
}

export default FooterComponent;