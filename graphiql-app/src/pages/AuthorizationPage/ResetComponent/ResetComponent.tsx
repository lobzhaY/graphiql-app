import React, { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { sendPasswordResetEmail } from 'firebase/auth';

import { useForm, SubmitHandler } from 'react-hook-form';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

import AuthorizationInput from '../../../components/layout/AuthorizationInput/AuthorizationInput';
import Loader from '../../../components/loader/Loader';

import validationEmail from '../../../utils/authValidation/authorizationEmail';
import { authFirebase } from '../../../utils/firebase/firebase';

import { IResetState } from '../../../types/authorizationInterface/authorizationInterface';

import { SUCCESS_RESET_MESSAGE } from '../../../constants/constants';

import '../../../pages/AuthorizationPage/AuthorizationPage.scss';

function ResetComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IResetState>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [user, loading] = useAuthState(authFirebase);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, loading, navigate]);

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(authFirebase, email);
      showSuccessToast();
      reset();
    } catch (err) {
      if (err instanceof Error) {
        showErrorToast(err.message);
      }
    }
  };

  const handleSubmitClick: SubmitHandler<IResetState> = (data) => {
    sendPasswordReset(data.email);
  };

  const showErrorToast = (err: string) => {
    toast.error(`${err}`);
  };
  const showSuccessToast = () => {
    toast.success(`${SUCCESS_RESET_MESSAGE}`);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <ToastContainer draggable={false} closeOnClick={true} />
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="authorization-title">{t('reset.resetTitle')}</h2>
            <form className="form-auth" onSubmit={handleSubmit(handleSubmitClick)}>
              <AuthorizationInput
                type="text"
                id="email-register"
                hookRegister={{
                  ...register('email', {
                    required: `${t('errors.email')}`,
                    validate: (value) => validationEmail(value),
                  }),
                }}
                hookError={errors.email}
                placeholder={t('login.placeholderEmail')}
              />
              <button type="submit" className="authorization-button">
                {t('reset.sendPassword')}
              </button>
            </form>
            <div className="authorization-links">
              {t('login.account')}{' '}
              <Link to="/register" className="auth-link">
                {t('login.register')}
              </Link>{' '}
              {t('login.now')}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default ResetComponent;
