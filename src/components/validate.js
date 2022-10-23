'use strict';

/**
 * Функция показа сообщения об ошибки
 * @param {object} formElement - DOM-элемент формы 
 * @param {object} inputElement - DOM-элемент поля ввода
 * @param {string} errorMessage - текст сообщения ошибки
 */
function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

/**
 * Функция скытия сообщения об ошибки
 * @param {object} formElement - DOM-элемент формы 
 * @param {object} inputElement - DOM-элемент поля ввода
 */
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(settings.errorClass);
}

/**
 * Функция скытия сообщения всех ошибкок
 * @param {object} formElement - DOM-элемент формы 
 */
function hideAllInputError(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, settings);
  });
}

/**
 * Функция проверки валидности вводимых данных
 * @param {object} formElement - DOM-элемент формы 
 * @param {object} inputElement - DOM-элемент поля ввода
 */
function isValid(formElement, inputElement, settings) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
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
function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const btnElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, btnElement);
    });
  });
}

/**
 * Функция ключения валидации форм на странице
 * @param {object} opts - объект с настройками 
 */
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, settings);
  });
}

export { enableValidation, hideAllInputError};
