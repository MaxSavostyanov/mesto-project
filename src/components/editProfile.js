'use strict';

import {
  popupEditProlile,
  formEditProfile,
  inputUsername,
  inputAbout,
  username,
  about,
} from './variables';

import { openPopup, closePopup } from './modal';
import { hideAllInputError, options } from './validate';

/**
 * Функция открытия popup c формой редактирования профиля
 */
function openFormEditProfile() {
  hideAllInputError(formEditProfile, options);
  inputUsername.value = username.textContent;
  inputAbout.value = about.textContent;
  openPopup(popupEditProlile);
  formEditProfile.addEventListener('submit', handleFormEditProfile);
}

/**
 * Функция обработчик формы редактирования карточки
 * @param {object} evt - событие, произошедшее на странице
 */
function handleFormEditProfile(evt) {
  evt.preventDefault();
  username.textContent = inputUsername.value;
  about.textContent = inputAbout.value;
  closePopup(popupEditProlile);
  formEditProfile.removeEventListener('submit', handleFormEditProfile);
}

export { openFormEditProfile };
