import React, { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

import AuthorizationInput from '../../../components/layout/AuthorizationInput/AuthorizationInput';
import Loader from '../../../components/loader/Loader';

import validationName from '../../../utils/authValidation/authorizationName';
import validationEmail from '../../../utils/authValidation/authorizationEmail';
import validationPassword from '../../../utils/authValidation/authorizationPassword';
import { authFirebase, dbFirebase } from '../../../utils/firebase/firebase';

import {
  IRegisterState,
  registrationTypes,
} from '../../../types/authorizationInterface/authorizationInterface';

import '../../../pages/AuthorizationPage/AuthorizationPage.scss';

function RegisterComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterState>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [user, loading] = useAuthState(authFirebase);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, loading, navigate]);

  const registerWithEmailAndPassword = async ({ name, email, password }: registrationTypes) => {
    try {
      const res = await createUserWithEmailAndPassword(authFirebase, email, password);
      const user = res.user;
      await addDoc(collection(dbFirebase, 'users'), {
        uid: user.uid,
        name,
        authProvider: 'local',
        email,
      });
      reset();
      navigate('/graphiql');
    } catch (err) {
      if (err instanceof Error) {
        showErrorToast(err.message);
      }
    }
  };

  const handleSubmitClick: SubmitHandler<IRegisterState> = (data) => {
    registerWithEmailAndPassword(data);
  };

  const showErrorToast = (err: string) => {
    toast.error(`${err}`);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <ToastContainer draggable={false} closeOnClick={true} />
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="authorization-title">{t('registr.signupform')}</h2>
            <form className="form-auth" onSubmit={handleSubmit(handleSubmitClick)}>
              <AuthorizationInput
                type="text"
                id="name-register"
                hookRegister={{
                  ...register('name', {
                    required: 'Error name!',
                    validate: (value) => validationName(value),
                  }),
                }}
                hookError={errors.name}
                placeholder={t('registr.fullname')}
              />
              <AuthorizationInput
                type="text"
                id="email-register"
                hookRegister={{
                  ...register('email', {
                    required: 'Error email!',
                    validate: (value) => validationEmail(value),
                  }),
                }}
                hookError={errors.email}
                placeholder={t('login.placeholderEmail')}
              />
              <AuthorizationInput
                type="password"
                id="password-register"
                hookRegister={{
                  ...register('password', {
                    required: 'Error password!',
                    validate: (value) => validationPassword(value),
                  }),
                }}
                hookError={errors.password}
                placeholder={t('login.placeholderPassword')}
              />
              <button type="submit" className="authorization-button">
                {t('registr.registrButton')}
              </button>
            </form>
            <div className="authorization-links">
              {t('registr.account')}{' '}
              <Link to="/login" className="auth-link">
                {t('registr.login')}
              </Link>{' '}
              {t('registr.now')}.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default RegisterComponent;
