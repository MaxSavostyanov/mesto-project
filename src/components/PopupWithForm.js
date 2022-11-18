'use strict'

import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  /**
   * 
   * @param {object} param0 - настройки для работы с попапом
   * @param {object} popupForm - DOM-элемент формы
   * @param {function} handleSubmitForm - функция обработчик формы
   */
  constructor({ common, popupSelector, inputSelector, btsSubmitSeletor }, popupForm, handleSubmitForm) {
    super(common, popupSelector);

    this._popupForm = popupForm;
    this._inputsList = Array.from(this._popupForm.querySelectorAll(inputSelector));
    this._btnSubmitElement = this._popupForm.querySelector(btsSubmitSeletor);
    this._handleSubmitForm = handleSubmitForm;
  }

  /**
   * Получить данные из полей формы
   * @returns {object} - объект с введенными пользователем данных
   */
  _getInputValues() {
    this._inputValues = {};
    this._inputsList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  /**
   * Заполнить поля формы начальными данными
   * @param {object} data - начальные данные
   */
  _setInputValues(data) {
    this._inputsList.forEach(input => {
      input.value = data[input.name];
    });
  }

  /**
   * Установить слушатели на форму
   */
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  /**
   * Отрыть попап с формой
   * @param {object|undefined } data - начальные данные для заполнения формы, если это необходимо
   */
  open(data) {
    if (data) {
      this._setInputValues(data);
      this._btnSubmitElement.disabled = false;
    } else {
      this._popupForm.reset();
      this._btnSubmitElement.disabled = true;
    }
    super.open();
  }

  /**
   * Установить текст кнопки submit
   * @param {string} text 
   */
  setTextButton(text) {
    this._btnSubmitElement.textContent = text;
  }
}