import { lstBlockWords } from './abusive-words';

const validateName = (input) => {
  const fullNameRegeX = /^[A-Za-z ]*$/;
  const isNameValid = fullNameRegeX.test(input) && input !== '';
  return isNameValid;
};

const validateEmail = (input) => {
  const emailRegeX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isEmailValid = emailRegeX.test(input);
  return isEmailValid;
};

const validatePhoneNumber = (input) => {
  const phoneRegeX = /^(\d{11})?$/;
  const isPhoneNumberValid = phoneRegeX.test(input);
  return isPhoneNumberValid;
};

const songCreationStepTwoValidation = (input) => {
  const stepTwoInputRegeX = /^[A-Za-z ]*$/;
  const isValidInput = stepTwoInputRegeX.test(input);
  const containsBlockWord = abusiveWordChecker(input);
  return isValidInput && !containsBlockWord;
};

const validateFirstName = (input) => {
  const firstNameRegeX = /^[A-Za-z]*$/;
  const isValid = firstNameRegeX.test(input) && input.length >= 3;
  return isValid;
};

const abusiveWordChecker = function (input) {
  const userInput = input.split(' ');
  const hasBlockedWord = userInput.some((word) => lstBlockWords.includes(word));
  return hasBlockedWord;
};

export {
  validateEmail,
  validateName,
  validatePhoneNumber,
  songCreationStepTwoValidation,
  abusiveWordChecker,
  validateFirstName,
};
