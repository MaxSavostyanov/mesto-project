'use strict';

import '../pages/index.css';
import {
  config,
  btnEditProfile,
  btnAddCard,
  btnNewAvatar,
  formEditProfile,
  formAddCard,
  formNewAvatar,
  settingsValidation,
  settingsProfile,
  cardTemplateSelector,
  cardsContainerSelector,
} from './variables';
import Api from './_Api';
import Profile from './_Profile';
import Card from './_Card';
import Section from './_Section';
import FormValidator from './_FormValidator';
import PopupWithImage from './_PopupWithImage';
import PopupWithForm from './_PopupWithForm';
import { closePopup } from './modal';

/*Создание экземпляров класса*/
// !!! не забыть убрать экспорт
const api = new Api(config);
const profile = new Profile(settingsProfile);
const profileFormValidator = new FormValidator(settingsValidation, formEditProfile);
const addFormValidator = new FormValidator(settingsValidation, formAddCard);
const avatarFormValidator = new FormValidator(settingsValidation, formNewAvatar);

const popupImage = new PopupWithImage('.popup_full-image');
popupImage.setEventListeners();

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
    })
    .catch((err) => {
      console.log(err);
    });

  const cardsList = new Section({
    items: initialCards,
    renderer: (card) => renderCard(card)
  }, cardsContainerSelector);

  const popupFormEditProfile = new PopupWithForm(
    '.popup_edit-profile',
    formEditProfile,
    function handleSubmitForm(data) {
      this.setTextButton('Сохранение...');

      api.editUser(data)
        .then(user => {
          profile.setUserInfo(user);
          this.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setTextButton('Сохранить');
        });
    }
  );

  popupFormEditProfile.setEventListeners();
  btnEditProfile.addEventListener('click', () => {
    profileFormValidator.hideAllInputError();
    popupFormEditProfile.open(profile.getUserInfo());
  });

  const popupFormAddCard = new PopupWithForm(
    '.popup_add-card',
    formAddCard,
    function handleSubmitForm(data) {
      this.setTextButton('Сохранение...');

      api.addCard(data)
        .then(card => {
          cardsList.addItem(card);
          this.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setTextButton('Создать');
        });
    }
  );

  popupFormAddCard.setEventListeners();
  btnAddCard.addEventListener('click', () => {
    addFormValidator.hideAllInputError();
    popupFormAddCard.open()
  });

  const popupFormNewAvatar = new PopupWithForm(
    '.popup_new-avatar',
    formNewAvatar,
    function handleSubmitForm(data) {
      this.setTextButton('Сохранение...');
      api.setNewAvatar(data)
        .then(user => {
          profile.setUserAvatar(user);
          this.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.setTextButton('Сохранить');
        });
    }
  );

  popupFormNewAvatar.setEventListeners();
  btnNewAvatar.addEventListener('click', () => {
    avatarFormValidator.hideAllInputError();
    popupFormNewAvatar.open()
  });

  profile.renderProfile(user);
  cardsList.renderItems();

  profileFormValidator.enableValidation();
  addFormValidator.enableValidation();
  avatarFormValidator.enableValidation();
}

init();

