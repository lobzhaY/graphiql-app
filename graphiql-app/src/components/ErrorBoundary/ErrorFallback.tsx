import React, { useEffect, useState } from 'react';

import { FallbackProps } from 'react-error-boundary';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

import './ErrorFallback.scss'; 

function ErrorFallback({ error }: FallbackProps) {
  const [showError, setShowError] = useState<boolean>(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (showError) {
      toast.error(`${error.message}`);
      setShowError(false);
    }
  }, [showError]);

  return (
    <div className="error-body">
      <ToastContainer draggable={false} closeOnClick={true} />
      <h1>Error</h1>
      <div className="text">
        <p>{t('errorFallback.paragraphMessage')} 😭</p>
        <a href="http://localhost:5173/">{t('errorFallback.link')}</a>
        <button className="error-fallback" onClick={() => setShowError(true)}>
          {t('errorFallback.button')}
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
