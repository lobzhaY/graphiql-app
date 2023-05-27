import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authFirebase } from '../../../utils/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useForm, SubmitHandler } from 'react-hook-form';
import { ILoginState } from '../../../types/authorizationInterface/authorizationInterface';
import AuthorizationInput from '../../../components/layout/AuthorizationInput/AuthorizationInput';

import '../../../pages/AuthorizationPage/AuthorizationPage.scss';
import validationEmail from '../../../utils/authValidation/authorizationEmail';
import validationPassword from '../../../utils/authValidation/authorizationPassword';
import React from 'react';
import Loader from '../../../components/loader/Loader';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginState>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [user, loading] = useAuthState(authFirebase);

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, loading, navigate]);

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(authFirebase, email, password);
      reset();
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        showErrorToast(err.message);
      }
    }
  };

  const handleSubmitClick: SubmitHandler<ILoginState> = (data) => {
    logInWithEmailAndPassword(data.email, data.password);
  };

  const showErrorToast = (err: string) => {
    toast.error(`${err}`);
  };

  return (
    <div className="auth-container">
      <ToastContainer draggable={false} closeOnClick={true} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="authorization-title">{t('login.loginform')}</h2>
          <form className="form-auth" onSubmit={handleSubmit(handleSubmitClick)}>
            <AuthorizationInput
              type="text"
              id="email-login"
              hookRegister={{
                ...register('email', {
                  required: 'Error email!',
                  validate: (value) => validationEmail(value),
                }),
              }}
              hookError={errors.email}
              placeholder="E-mail Address"
            />
            <AuthorizationInput
              type="password"
              id="password-login"
              hookRegister={{
                ...register('password', {
                  required: 'Error password!',
                  validate: (value) => validationPassword(value),
                }),
              }}
              hookError={errors.password}
              placeholder="Password"
            />
            <button className="authorization-button" type="submit">
            {t('login.loginButton')}
            </button>
          </form>
          <div className="authorization-links">
            <div>
              <Link to="/reset" className="auth-link">
                {t('login.forgot')}
              </Link>
            </div>
            <div>
             {t('login.account')}{' '}
              <Link to="/register" className="auth-link">
                {t('login.register')}
              </Link>{' '}
               {t('login.now')}.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default LoginComponent;
