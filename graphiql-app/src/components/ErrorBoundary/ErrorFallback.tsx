import React from 'react';
import { FallbackProps } from 'react-error-boundary';
import './ErrorFallback.scss';

// eslint-disable-next-line
function ErrorFallback({ error }: FallbackProps) {

  return (
    <div>
      <h1>Error</h1>
      <div className="text">
        <p>The page you want isn't available 😭</p>
        <a href="http://localhost:5173/">return to homepage</a>
      </div>
    </div>
  );
}

export default ErrorFallback;
