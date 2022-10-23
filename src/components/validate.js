'use strict';

const options = {
  formSelector: '',
  inputSelector: '',
  submitButtonSelector: '',
  inputErrorClass: '',
  errorClass: ''
};

/**
 * Функция показа сообщения об ошибки
 * @param {object} formElement - DOM-элемент формы 
 * @param {object} inputElement - DOM-элемент поля ввода
 * @param {string} errorMessage - текст сообщения ошибки
 */
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
}

/**
 * Функция скытия сообщения об ошибки
 * @param {object} formElement - DOM-элемент формы 
 * @param {object} inputElement - DOM-элемент поля ввода
 */
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(options.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(options.errorClass);
}

/**
 * Функция скытия сообщения всех ошибкок
 * @param {object} formElement - DOM-элемент формы 
 */
function hideAllInputError(formElement, options) {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement);
  });
}

/**
 * Функция проверки валидности вводимых данных
 * @param {object} formElement - DOM-элемент формы 
 * @param {object} inputElement - DOM-элемент поля ввода
 */
function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

/**
 * Функция проверки наличия в форме невалидного поля ввода
 * @param {array} inputList - массив полей ввода
 * @returns {boolean} true - форма содержит хотя бы одного невалидное поле ввода
 */
function hasInvalidInput(inputList) {
  console.log(typeof (inputList));
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  });
}

/**
 * Функция включения/отключения кнопки submit
 * @param {array} inputList - массив полей ввода
 * @param {object} buttonElement - DOM-элемент кнопки submit
 */
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

/**
 * Функция установки слушателей на форму
 * @param {object} formElement - DOM-элемент формы
 */
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const btnElement = formElement.querySelector(options.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, btnElement);
    });
  });
}

/**
 * Функция ключения валидации форм на странице
 * @param {object} opts - объект с настройками 
 */
function enableValidation(opts) {
  for (let key in opts) {
    options[key] = opts[key];
  }

  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement);
  });
}

export { enableValidation, hideAllInputError, options };
