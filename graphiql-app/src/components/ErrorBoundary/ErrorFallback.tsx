import React from 'react';

import { FallbackProps } from 'react-error-boundary';

import './ErrorFallback.scss';

function ErrorFallback({ error }: FallbackProps) {
  console.log(error);
  return (
    <div className="error-body">
      <h1>Error</h1>
      <div className="text">
        <p>The page you want isn&apos;t available 😭</p>
        <a href="http://localhost:5173/">return to homepage</a>
      </div>
    </div>
  );
}

export default ErrorFallback;
