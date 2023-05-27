import React from 'react';

import { Link } from 'react-router-dom';

import './NotFoundPage.scss';

function NotFoundPage() {
  return (
    <div className="wrapper-nfp">
      <div className="not-found-page">
        <h1>404</h1>
        <div className="text">
          <p>The page you want isn&apos;t available 😭</p>
          <Link to="/" className="nfp-link">
            return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
