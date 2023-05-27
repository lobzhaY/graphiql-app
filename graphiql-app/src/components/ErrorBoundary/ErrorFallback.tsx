import React from 'react';

import { FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error }: FallbackProps) {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={() => window.location.assign('http://localhost:5173/')}>Try again</button>
    </div>
  );
}

export default ErrorFallback;
