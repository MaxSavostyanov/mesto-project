'use strict';

import '../pages/index.css';
import {
  config,
  popupList,
  btnEditProfile,
  btnAddCard,
  btnNewAvatar,
  formEditProfile,
  formAddCard,
  formNewAvatar,
  settingsValidation
} from './variables';
import Api from './Api';
import { renderInitialCards } from './card';
import { enableValidation } from './validate';
import { closePopup } from './modal';
import {
  openFormEditProfile,
  handleFormEditProfile,
  renderUserInfo,
} from './editProfile';
import {
  openFormAddCard,
  handleFormAddCard
} from './addCard';
import {
  openFormNewAvatar,
  handleFormNewAvatar,
  renderAvatar,
} from './newAvatar';

/*создание экземпляра класса*/
const api = new Api(config);

/**
 * Функция иницилизации приложения
 * @param {object} settingsValidation - настройки для валидации форм на странице
 */
async function init(settingsValidation) {
  let user, myID, initialCards;
  await Promise.all([api.getUser(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      user = userData;
      myID = user._id;
      initialCards = cardsData;
    })
    .catch((err) => {
      console.log(err);
    });

  renderUserInfo(user.name, user.about);
  renderInitialCards(initialCards, myID);
  renderAvatar(user.avatar);

  btnEditProfile.addEventListener('click', openFormEditProfile);
  btnAddCard.addEventListener('click', openFormAddCard);
  btnNewAvatar.addEventListener('click', openFormNewAvatar);

  formEditProfile.addEventListener('submit', handleFormEditProfile);
  formAddCard.addEventListener('submit', (evt) => handleFormAddCard(evt, myID));
  formNewAvatar.addEventListener('submit', handleFormNewAvatar);

  popupList.forEach(popup => popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn_type_close')) {
      closePopup(popup);
    }
  }));

  enableValidation(settingsValidation);
}

init(settingsValidation);

