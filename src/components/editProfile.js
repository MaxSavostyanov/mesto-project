'use strict';

import {
  popupEditProlile,
  formEditProfile,
  inputUsername,
  inputAbout,
  submitFormEditProfile,
  username,
  aboutUser,
  settingsValidation as settings,
  config
} from './variables';

import { openPopup, closePopup } from './modal';
import { hideAllInputError } from './validate';
import { editUser } from './Api';

/**
 * Функция отрисовки информации о пользователе
 * @param {string} name - имя пользователя
 * @param {string} about - о пользователе
 */
function renderUserInfo(name, about) {
  username.textContent = name;
  aboutUser.textContent = about;
}

/**
 * Функция открытия popup c формой редактирования профиля
 */
function openFormEditProfile() {
  hideAllInputError(formEditProfile, settings);
  inputUsername.value = username.textContent;
  inputAbout.value = aboutUser.textContent;
  openPopup(popupEditProlile);
}

/**
 * Функция обработчик формы редактирования карточки
 * @param {object} evt - событие, произошедшее на странице
 */
function handleFormEditProfile(evt) {
  evt.preventDefault();
  submitFormEditProfile.textContent = 'Cохранение...';
  //evt.submitter.textContent = 'Cохранение...';

  editUser(config, inputUsername.value, inputAbout.value)
    .then(user => {
      renderUserInfo(user.name, user.about);
      closePopup(popupEditProlile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitFormEditProfile.textContent = 'Cохранить';
    });
}

export { openFormEditProfile, handleFormEditProfile, renderUserInfo };
