import React from "react";

import { Link } from "react-router-dom";

import './NotFoundPage.scss';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <div className="text">
        <p>The page you want isn't available 😭</p>
        <Link to="http://localhost:5173/">return to homepage</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
