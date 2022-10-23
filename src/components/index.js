'use strict';

import '../pages/index.css';
import {
  popupList,
  btnEdit,
  btnAdd,
} from './variables';
import { initialCards } from './initialCards';
import { renderInitialCards } from './card';
import { enableValidation } from './validate';
import { closePopup } from './modal';
import { openFormEditProfile } from './editProfile';
import { openFormAddCard } from './addCard';

btnEdit.addEventListener('click', openFormEditProfile);
btnAdd.addEventListener('click', openFormAddCard);

popupList.forEach(popup => popup.addEventListener('mousedown', evt => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn_type_close')) {
    closePopup(popup);
  }
}));

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn_type_submit',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_visible'
});

renderInitialCards(initialCards);

