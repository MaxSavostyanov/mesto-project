'use strict';

import {
  popupEditProlile,
  formEditProfile,
  inputUsername,
  inputAbout,
  username,
  about,
  settingsValidation as settings,
} from './variables';

import { openPopup, closePopup } from './modal';
import { hideAllInputError } from './validate';

/**
 * Функция открытия popup c формой редактирования профиля
 */
function openFormEditProfile() {
  hideAllInputError(formEditProfile, settings);
  inputUsername.value = username.textContent;
  inputAbout.value = about.textContent;
  openPopup(popupEditProlile);
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
}

export { openFormEditProfile, handleFormEditProfile };
