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

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      this._handelForm(this._getInputValues());
      evt.preventDefault();
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