import {
  ERROR_MESSAGE_NAME_FIRST_LETTER,
  ERROR_MESSAGE_NAME_FORMAT,
  ERROR_MESSAGE_NAME_LENGTH,
} from '../../constants/errorsConstants';

function validationName(valueName: string): string | boolean {
  const descriptionName = valueName.trim();
  let errorResponse: string | boolean = '';
  const firstLetter = descriptionName[0];
  const letters = /^([а-яё\s]+|[a-z\s]+)$/iu;
  const oneLetter = /^[A-ZА-ЯЁ]+$/;
  if (descriptionName.length < 2) {
    errorResponse = ERROR_MESSAGE_NAME_LENGTH;
  } else if (descriptionName.match(letters)) {
    if (!firstLetter.match(oneLetter)) {
      errorResponse = ERROR_MESSAGE_NAME_FIRST_LETTER;
    } else {
      errorResponse = true;
    }
  } else {
    errorResponse = ERROR_MESSAGE_NAME_FORMAT;
  }
  return errorResponse;
}

export default validationName;
