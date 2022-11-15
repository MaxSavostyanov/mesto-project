'use strict';

import {
  avatar,
  popupNewAvatar,
  formNewAvatar,
  inputAvatarLink,
  submitFormNewAvatar,
  settingsValidation as settings,
} from './variables';
import { openPopup, closePopup } from './modal';
import { hideAllInputError } from './validate';

import { api, avatarFormValidator } from './index'

/**
 * Функция отрисовки аватара пользователя
 * @param {string} avatarLink - ссылка на аватар пользователя
 */
function renderAvatar(avatarLink) {
  avatar.src = avatarLink;
}

/**
 * Функция открытия popup c формой изменения аватара пользователя
 */
function openFormNewAvatar() {
  avatarFormValidator.disabledButton();
  avatarFormValidator.hideAllInputError();
  formNewAvatar.reset();
  openPopup(popupNewAvatar);
}

/**
 * Функция обработчик формы изменения аватара пользователя
 * @param {object} evt - событие, произошедшее на странице
 */
function handleFormNewAvatar(evt) {
  const newAvatar = {
    avatar: inputAvatarLink.value,
  };

  evt.preventDefault();
  submitFormNewAvatar.textContent = 'Сохранение...';

  api.setNewAvatar(newAvatar)
    .then(user => {
      renderAvatar(user.avatar);
      closePopup(popupNewAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitFormNewAvatar.textContent = 'Сохранить';
    });
}

export { openFormNewAvatar, handleFormNewAvatar, renderAvatar };
