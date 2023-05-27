import React, { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthorizationInput from '../../../components/layout/AuthorizationInput/AuthorizationInput';
import Loader from '../../../components/loader/Loader';

import { authFirebase } from '../../../utils/firebase/firebase';
import validationEmail from '../../../utils/authValidation/authorizationEmail';
import validationPassword from '../../../utils/authValidation/authorizationPassword';

import { ILoginState } from '../../../types/authorizationInterface/authorizationInterface';

import '../../../pages/AuthorizationPage/AuthorizationPage.scss';

function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginState>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [user, loading] = useAuthState(authFirebase);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, loading, navigate]);

  const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(authFirebase, email, password);
      reset();
      navigate('/graphiql');
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
          <h2 className="authorization-title">Log in form</h2>
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
              Login
            </button>
          </form>
          <div className="authorization-links">
            <div>
              <Link to="/reset" className="auth-link">
                Forgot Password
              </Link>
            </div>
            <div>
              Don&apos;t have an account?{' '}
              <Link to="/register" className="auth-link">
                Register
              </Link>{' '}
              now.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default LoginComponent;
