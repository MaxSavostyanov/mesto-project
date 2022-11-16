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
  settingsValidation,
  settingsProfile,
  cardTemplateSelector,
  cardsContainerSelector
} from './variables';
import Api from './_Api';
import Profile from './_Profile';
import Card from './_Card';
import Section from './_Section';
import FormValidator from './_FormValidator';
import PopupWithImage from './_PopupWithImage';
import { closePopup } from './modal';
import {
  openFormEditProfile,
  handleFormEditProfile,
  //renderUserInfo,
} from './editProfile';
import {
  openFormAddCard,
  handleFormAddCard
} from './addCard';
import {
  openFormNewAvatar,
  handleFormNewAvatar,
  //renderAvatar,
} from './newAvatar';

/*Создание экземпляров класса*/
// !!! не забыть убрать экспорт
export const api = new Api(config); 
export const profile = new Profile(settingsProfile);
export const profileFormValidator = new FormValidator(settingsValidation, formEditProfile);
export const addFormValidator = new FormValidator(settingsValidation, formAddCard);
export const avatarFormValidator = new FormValidator(settingsValidation, formNewAvatar);
const popupImage = new PopupWithImage ('.popup_full-image');

let user, userID, initialCards;

function renderCard(card) {
  const newCard = new Card(cardTemplateSelector, card, userID, api, handleCardClick);

  return newCard.createCard();
}

function handleCardClick(link, name) {
  popupImage.open(link, name);
}

/**
 * Функция иницилизации приложения
 * @param {object} settingsValidation - настройки для валидации форм на странице
 */
async function init() {
  await Promise.all([api.getUser(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      user = userData;
      userID = user._id;
      initialCards = cardsData;
      console.log(userID);
    })
    .catch((err) => {
      console.log(err);
    });

  const cardsList = new Section({
    items: initialCards,
    renderer: (card) => renderCard(card)
  }, cardsContainerSelector);

  profile.renderProfile(user);
  cardsList.renderItems();

  btnEditProfile.addEventListener('click', openFormEditProfile);
  btnAddCard.addEventListener('click', openFormAddCard);
  btnNewAvatar.addEventListener('click', openFormNewAvatar);

  formEditProfile.addEventListener('submit', handleFormEditProfile);
  formAddCard.addEventListener('submit', (evt) => handleFormAddCard(evt, userID));
  formNewAvatar.addEventListener('submit', handleFormNewAvatar);

  profileFormValidator.enableValidation();
  addFormValidator.enableValidation();
  avatarFormValidator.enableValidation();

  popupList.forEach(popup => popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__btn_type_close')) {
      closePopup(popup);
    }
  }));

}

init();

