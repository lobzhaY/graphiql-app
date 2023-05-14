import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { authFirebase } from '../../../utils/firebase/firebase';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IResetState } from '../../../types/authorizationInterface/authorizationInterface';
import AuthorizationInput from '../../../components/layout/AuthorizationInput/AuthorizationInput';

import '../../../pages/AuthorizationPage/AuthorizationPage.scss';
import validationEmail from '../../../utils/authValidation/authorizationEmail';
import React from 'react';
import Loader from '../../../components/loader/Loader';
import { sendPasswordResetEmail } from 'firebase/auth';

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { SUCCESS_RESET_MESSAGE } from '../../../constants/constants';

function ResetComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IResetState>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [user, loading] = useAuthState(authFirebase);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, loading]);

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
  }
  const showSuccessToast = () => {
    toast.success(`${SUCCESS_RESET_MESSAGE}`);
  }

  return (
    <div className="auth-container">
    <ToastContainer draggable={false} closeOnClick={true} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="authorization-title">Reset password</h2>
          <form className="form-auth" onSubmit={handleSubmit(handleSubmitClick)}>
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
              placeholder="E-mail Address"
            />
            <button type="submit" className="authorization-button">
              Send password reset email
            </button>
          </form>
          <div className="authorization-links">
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Register
            </Link>{' '}
            now.
          </div>
        </>
      )}
    </div>
  );
}
export default ResetComponent;
