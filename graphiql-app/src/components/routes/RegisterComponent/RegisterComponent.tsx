import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { authFirebase, registerWithEmailAndPassword } from '../../../utils/firebase/firebase';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IRegisterState } from '../../../types/authorizationInterface/authorizationInterface';
import AuthorizationInput from '../../layout/AuthorizationInput/AuthorizationInput';

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
    <div>
      <h2>Sign up form</h2>
      <form className="form-auth" onSubmit={handleSubmit(handleSubmitClick)}>
        <AuthorizationInput
          type="text"
          id="name-register"
          hookRegister={{
            ...register('name', {
              required: 'Error name!',
              validate: (value) => value.length > 3,
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
              validate: (value) => value.length > 3,
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
              validate: (value) => value.length > 3,
            }),
          }}
          hookError={errors.password}
          placeholder="Password"
        />
        <button type='submit'>Register</button>
      </form>
      <div>
        Already have an account? <Link to="/authorization/login">Login</Link> now.
      </div>
    </div>
  );
}
export default RegisterComponent;
