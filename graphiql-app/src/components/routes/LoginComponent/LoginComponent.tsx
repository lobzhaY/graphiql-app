import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authFirebase, logInWithEmailAndPassword } from '../../../utils/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useForm, SubmitHandler } from 'react-hook-form';
import { ILoginState } from '../../../types/authorizationInterface/authorizationInterface';
import AuthorizationInput from '../../layout/AuthorizationInput/AuthorizationInput';
 
function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginState>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const [user, loading, error] = useAuthState(authFirebase);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    console.log(error);
    if (user) navigate('/');
  }, [user, loading]);

  const handleSubmitClick: SubmitHandler<ILoginState> = (data) => {
    console.log(data);
    console.log(errors);
    logInWithEmailAndPassword(data.email, data.password);
    console.log('logInWithEmailAndPassword');
    reset();
  };

  return (
    <div>
      <h2 className='authorization-title'>Log in form</h2>
      <form className="form-auth" onSubmit={handleSubmit(handleSubmitClick)}>
        <AuthorizationInput
          type="text"
          id="email-login"
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
          id="password-login"
          hookRegister={{
            ...register('password', {
              required: 'Error password!',
              validate: (value) => value.length > 3,
            }),
          }}
          hookError={errors.password}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <div>
        <Link to="/authorization/reset">Forgot Password</Link>
      </div>
      <div>
        Don't have an account? <Link to="/authorization/register">Register</Link> now.
      </div>
    </div>
  );
}
export default LoginComponent;
