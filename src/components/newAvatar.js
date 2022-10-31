'use strict';

import {
  avatar,
  popupNewAvatar,
  formNewAvatar,
  inputAvatarLink,
  submitFormNewAvatar,
  settingsValidation as settings,
  config
} from './variables';
import { openPopup, closePopup } from './modal';
import { hideAllInputError } from './validate';
import { setNewAvatar } from './api';

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
  submitFormNewAvatar.disabled = true;
  hideAllInputError(formNewAvatar, settings);
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

  setNewAvatar(config, newAvatar)
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
