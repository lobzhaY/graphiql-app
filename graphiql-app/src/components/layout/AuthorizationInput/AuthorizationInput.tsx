import React, { ReactNode } from 'react';

import { IAuthorizationInput } from '../../../types/authorizationInterface/authorizationInterface';

import './AuthorizationInput.scss';

function AuthorizationInput({
  id,
  type,
  placeholder,
  hookError,
  hookRegister,
}: IAuthorizationInput) {
  return (
    <div className="auth-input-container">
      <input
        className="authorization-input"
        type={type}
        placeholder={placeholder}
        id={id}
        {...hookRegister}
      />
      {hookError && <p className="invalid-message">{hookError.message as ReactNode}</p>}
    </div>
  );
}

export default AuthorizationInput;
