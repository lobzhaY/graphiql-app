import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { authFirebase, registerWithEmailAndPassword } from '../../../utils/firebase/firebase';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegisterState } from '../../../types/authorizationInterface/authorizationInterface';
import AuthorizationInput from '../../../components/layout/AuthorizationInput/AuthorizationInput';

import '../../../pages/AuthorizationPage/AuthorizationPage.scss';
import validationName from '../../../utils/authValidation/authorizationName';
import validationEmail from '../../../utils/authValidation/authorizationEmail';
import validationPassword from '../../../utils/authValidation/authorizationPassword';

function RegisterComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterState>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [user, loading, error] = useAuthState(authFirebase);
  const history = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) history('/');
  }, [user, loading]);

  const handleSubmitClick: SubmitHandler<IRegisterState> = (data) => {
    console.log(data);
    console.log(errors);
    console.log(error);
    registerWithEmailAndPassword(data);
    console.log('registerWithEmailAndPassword');
    reset();
  };

  return (
    <div className="auth-container">
      <h2 className="authorization-title">Sign up form</h2>
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
          placeholder="Full Name"
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
          placeholder="E-mail Address"
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
          placeholder="Password"
        />
        <button type="submit" className="authorization-button">
          Register
        </button>
      </form>
      <div className="authorization-links">
        Already have an account?{' '}
        <Link to="/login" className="auth-link">
          Login
        </Link>{' '}
        now.
      </div>
    </div>
  );
}
export default RegisterComponent;
