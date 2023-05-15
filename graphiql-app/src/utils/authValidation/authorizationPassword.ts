import {
  ERROR_MESSAGE_PASSWORD_LANGUAGE,
  ERROR_MESSAGE_PASSWORD_LENGTH,
  ERROR_MESSAGE_PASSWORD_NUMBERS,
  ERROR_MESSAGE_PASSWORD_SPACE,
  ERROR_MESSAGE_PASSWORD_SYMBOL,
} from '../../constants/errorsConstants';

function validationPassword(valuePassword: string): string | boolean {
  const descriptionPassword = valuePassword.trim();
  let errorResponse: string | boolean = '';
  const passwordFormat =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-#!$@%^&*_+~=:;?/`()<>?[\]{|}])[-\w#!$@%^&*_+~=:;?/`()<>?[\]{|}]{8,}$/i;
  const withoutSpaces = /^[\s]$/;
  if (descriptionPassword.length >= 8) {
    if (descriptionPassword.match(passwordFormat)) {
      errorResponse = true;
    } else {
      if (!descriptionPassword.match(/[0-9]/)) {
        errorResponse = ERROR_MESSAGE_PASSWORD_NUMBERS;
      } else if (!descriptionPassword.match(/(?=.*[^\w\s])/i)) {
        errorResponse = ERROR_MESSAGE_PASSWORD_SYMBOL;
      } else if (!descriptionPassword.match(withoutSpaces)) {
        errorResponse = ERROR_MESSAGE_PASSWORD_SPACE;
      } else {
        errorResponse = ERROR_MESSAGE_PASSWORD_LANGUAGE;
      }
    }
  } else {
    errorResponse = ERROR_MESSAGE_PASSWORD_LENGTH;
  }
  return errorResponse;
}

export default validationPassword;
