import React from "react";
import './NotFoundPage.scss';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <div className="text">
        <p>The page you want isn't available 😭</p>
        <a href="http://localhost:5173/">return to homepage</a>
      </div>
    </div>
  )
}

export default NotFoundPage;