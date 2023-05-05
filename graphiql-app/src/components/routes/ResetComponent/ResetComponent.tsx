import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { authFirebase, sendPasswordReset } from '../../../utils/firebase/firebase';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IResetState } from '../../../types/authorizationInterface/authorizationInterface';
import AuthorizationInput from '../../layout/AuthorizationInput/AuthorizationInput';

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
    <div>
      <h2>Reset password</h2>
      <form className="form-auth" onSubmit={handleSubmit(handleSubmitClick)}>
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
        <button type="submit">Send password reset email</button>
      </form>
      <div>
        Don't have an account? <Link to="/authorization/register">Register</Link> now.
      </div>
    </div>
  );
}
export default ResetComponent;
