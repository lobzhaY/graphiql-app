import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { authFirebase, sendPasswordReset } from '../../../utils/firebase/firebase';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IResetState } from '../../../types/authorizationInterface/authorizationInterface';
import AuthorizationInput from '../../../components/layout/AuthorizationInput/AuthorizationInput';

import '../../../pages/AuthorizationPage/AuthorizationPage.scss';
import validationEmail from '../../../utils/authValidation/authorizationEmail';

function ResetComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IResetState>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [user, loading, error] = useAuthState(authFirebase);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading]);

  const handleSubmitClick: SubmitHandler<IResetState> = (data) => {
    console.log(data);
    console.log(errors);
    console.log(error);
    sendPasswordReset(data.email);
    navigate('/');
    console.log('sendPasswordReset');
    reset();
  };

  return (
    <div className="auth-container">
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
    </div>
  );
}
export default ResetComponent;
