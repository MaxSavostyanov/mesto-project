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
  settingsPopups,
  cardTemplateSelector,
  cardsContainerSelector,
} from './variables';
import Api from './Api';
import Profile from './Profile';
import Card from './Card';
import Section from './Section';
import FormValidator from './FormValidator';
import PopupWithImage from './PopupWithImage';
import PopupWithForm from './PopupWithForm';

/*Создание экземпляров класса*/
const api = new Api(config);
const profile = new Profile(settingsProfile);

const cardsList = new Section({
  renderer: (card, userID) => renderCard(card, userID)
}, cardsContainerSelector);

const profileFormValidator = new FormValidator(settingsValidation, formEditProfile);
const addFormValidator = new FormValidator(settingsValidation, formAddCard);
const avatarFormValidator = new FormValidator(settingsValidation, formNewAvatar);

const popupImage = new PopupWithImage(settingsPopups.getWithImage('.popup_full-image'));

const popupFormEditProfile = new PopupWithForm(
  settingsPopups.getWithForm('.popup_edit-profile'),
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

const popupFormAddCard = new PopupWithForm(
  settingsPopups.getWithForm('.popup_add-card'),
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

const popupFormNewAvatar = new PopupWithForm(
  settingsPopups.getWithForm('.popup_new-avatar'),
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

function renderCard(card, userID) {
  const newCard = new Card(cardTemplateSelector, card, userID, api, handleCardClick);

  return newCard.createCard();
}

function handleCardClick(link, name) {
  popupImage.open(link, name);
}



function setEventListeners() {
  popupImage.setEventListeners();
  popupFormNewAvatar.setEventListeners();
  popupFormAddCard.setEventListeners();
  popupFormEditProfile.setEventListeners();
}
function enableValidation() {
  profileFormValidator.enableValidation();
  addFormValidator.enableValidation();
  avatarFormValidator.enableValidation();
}

/**
 * Функция иницилизации приложения
 */
async function init() {
  let user, userID, initialCards;
  await Promise.all([api.getUser(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      user = userData;
      userID = user._id;
      initialCards = cardsData;
    })
    .catch((err) => {
      console.log(err);
    });

  profile.renderProfile(user);
  cardsList.renderItems(initialCards, userID);

  btnEditProfile.addEventListener('click', () => {
    profileFormValidator.hideAllInputError();
    popupFormEditProfile.open(profile.getUserInfo());
  });
  btnAddCard.addEventListener('click', () => {
    addFormValidator.hideAllInputError();
    popupFormAddCard.open()
  });
  btnNewAvatar.addEventListener('click', () => {
    avatarFormValidator.hideAllInputError();
    popupFormNewAvatar.open()
  });

  setEventListeners();
  enableValidation();

}

init();

