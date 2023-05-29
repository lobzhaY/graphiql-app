import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export interface ILoginState {
  email: string;
  password: string;
}

export interface IRegisterState {
  name: string;
  email: string;
  password: string;
}

export interface IResetState {
  email: string;
}

export interface IAuthorizationInput {
  id: string;
  type: string;
  placeholder: string;
  hookError: FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
  hookRegister: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLInputElement> &
    React.InputHTMLAttributes<HTMLInputElement>;
}

export interface registrationTypes {
  name: string;
  email: string;
  password: string;
}
