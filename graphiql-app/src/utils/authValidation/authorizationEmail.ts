import {
  ERROR_MESSAGE_EMAIL_END,
  ERROR_MESSAGE_EMAIL_FORMAT,
  ERROR_MESSAGE_EMAIL_LETTER,
  ERROR_MESSAGE_EMAIL_START,
} from '../../constants/errorsConstants';

function validationEmail(valueEmail: string): string | boolean {
  const descriptionEmail = valueEmail.trim();
  let errorResponse: string | boolean = '';
  const mailFormat = /^(.+){2,3}@(.+)\.(.+){2,4}$/;

  const address = descriptionEmail.split('@')[0];
  const firstSymbols = /^[A-ZА-ЯЁ]+$/i;
  const letters = /^[\w-/.]+$/i;

  if (descriptionEmail.match(mailFormat)) {
    if (!address.match(letters)) {
      errorResponse = ERROR_MESSAGE_EMAIL_LETTER;
    } else {
      if (!address[0].match(firstSymbols)) {
        errorResponse = ERROR_MESSAGE_EMAIL_START;
      } else if (!address[address.length - 1].match(firstSymbols)) {
        errorResponse = ERROR_MESSAGE_EMAIL_END;
      } else {
        errorResponse = true;
      }
    }
  } else {
    errorResponse = ERROR_MESSAGE_EMAIL_FORMAT;
  }
  return errorResponse;
}

export default validationEmail;
