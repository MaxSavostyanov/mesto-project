import Popup from './_Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupForm, handleSubmitForm) {
    super(popupSelector);
    
    this._popupForm = popupForm;
    this._inputsList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._btnSubmitElement = this._popupForm.querySelector('.popup__btn_type_submit');
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputsList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputsList.forEach(input => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setTextButton(text) {
    this._btnSubmitElement.textContent = text;
  }
}