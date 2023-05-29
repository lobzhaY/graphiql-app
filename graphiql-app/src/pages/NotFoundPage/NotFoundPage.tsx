import React from 'react';

import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import './NotFoundPage.scss';

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="wrapper-nfp">
      <div className="not-found-page">
        <h1>404</h1>
        <div className="text">
          <p>{t('notFound.paragraphMessage')} 😭</p>
          <Link to="/" className="nfp-link">
            {t('notFound.link')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
