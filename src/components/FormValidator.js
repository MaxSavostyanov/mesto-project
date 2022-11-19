'use strict'

/**
 * Класс отвечающий за валидацию форм
 */
export default class FormValidator {
  /**
   * Конструктор класса
   * @param {object} settingsValidation - Объект настроек
   * @param {string} formElement - DOM-элемент формы
   */
  constructor(settingsValidation, formElement) {
    this._settings = settingsValidation;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  /**
   * Показ сообщение об ошибки
   * @param {object} inputElement - DOM-элемент поля ввода
   */
  _showInputError(inputElement) {
    inputElement.classList.add(this._settings.inputErrorClass);
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._settings.errorClass);
  }

  /**
   * Скрытие сообщения об ошибки
   * @param {object} inputElement - DOM-элемент поля ввода
   */
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._settings.inputErrorClass);
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._settings.errorClass);
  }

  /**
   * Скрытие сообщений всех ошибок
   */
  hideAllInputError() {
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
    this._buttonElement.disabled = true;
  }

  /**
   * Проверка валидности вводимых данных
   * @param {object} inputElement - DOM-элемент поля ввода
   */
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /**
   * Проверка наличия в форме невалидного поля ввода
   */
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid
    });
  }

  /**
   * Включение/отключение кнопки submit
   */
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  }

  /**
   * Установка слушателей на форму
   */
  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  /**
   * Проверить начальные значения полей
   */
  checkInitialInputValues() {
    this._inputList.forEach(inputElement => {
        this._isValid(inputElement);
        this._toggleButtonState();
    });
  }

  /**
   * Включение валидации форм на странице
   */
  enableValidation() {
    this._setEventListeners();
  }
}