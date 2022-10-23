'use strict';

import '../pages/index.css';
import {
  popupList,
  btnEdit,
  btnAdd,
  formEditProfile,
  formAddCard,
  settingsValidation
} from './variables';
import { initialCards } from './initialCards';
import { renderInitialCards } from './card';
import { enableValidation } from './validate';
import { closePopup } from './modal';
import { openFormEditProfile, handleFormEditProfile } from './editProfile';
import { openFormAddCard, handleFormAddCard } from './addCard';

btnEdit.addEventListener('click', openFormEditProfile);
btnAdd.addEventListener('click', openFormAddCard);

formEditProfile.addEventListener('submit', handleFormEditProfile);
formAddCard.addEventListener('submit', handleFormAddCard);

popupList.forEach(popup => popup.addEventListener('mousedown', evt => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn_type_close')) {
    closePopup(popup);
  }
}));

enableValidation(settingsValidation);

renderInitialCards(initialCards);
