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
  cardsContainerSelector,
  avatar
} from './variables';
import Api from './_Api';
import Profile from './_Profile';
import Card from './_Card';
import Section from './_Section';
import FormValidator from './_FormValidator';
import PopupWithImage from './_PopupWithImage';
import PopupWithForm from './_PopupWithForm';
import { closePopup } from './modal';
import {
  openFormEditProfile,
  handleFormEditProfile,
  //renderUserInfo,
} from './editProfile';
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
const popupImage = new PopupWithImage('.popup_full-image');

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

  const popupFormAddCard = new PopupWithForm(
    '.popup_add-card',
    formAddCard,
    function handleSubmitForm (data) {
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

  const popupNewAvatar = new PopupWithForm(
    '.popup_new-avatar',
    formNewAvatar,
    function handleSubmitForm (newvAvatar) {
      this.setTextButton('Сохранение...');

      api.setNewAvatar(newvAvatar)
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

  profile.renderProfile(user);
  cardsList.renderItems();

  btnEditProfile.addEventListener('click', openFormEditProfile);
  btnAddCard.addEventListener('click', () => {
    addFormValidator.hideAllInputError();
    popupFormAddCard.open()
  });
  btnNewAvatar.addEventListener('click', () => {
    avatarFormValidator.hideAllInputError();
    popupNewAvatar.open()
  });

  formEditProfile.addEventListener('submit', handleFormEditProfile);

  popupFormAddCard.setEventListeners();
  popupNewAvatar.setEventListeners();

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

