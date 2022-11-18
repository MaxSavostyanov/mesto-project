'use strict';

import './index.css';
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
} from '../components/variables';
import Api from '../components/Api';
import Profile from '../components/Profile';
import Card from '../components/Card';
import Section from '../components/Section';
import FormValidator from '../components/FormValidator';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';

/*_____Создание экземпляров класса_____*/
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

/*_____Переменные_____*/
let userID; 

/*_____Функции_____*/
/**
 * Функция создания элемента карточки
 * @param {object} card - объект с данными создаваемой карточки
 * @returns {object} - DOM-элемент карточки
 */
function renderCard(card) {
  const newCard = new Card(cardTemplateSelector, card, userID, api, handleCardClick);

  return newCard.createCard();
}

/**
 * Функция обратчик нажатия на изображение
 * @param {string} link - ссылка на изображение
 * @param {string} name - название изображения
 */
function handleCardClick(link, name) {
  popupImage.open(link, name);
}


/**
 * Установка слушателей на интерактивные элементы и попапы
 */
function setEventListeners() {
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

  popupImage.setEventListeners();
  popupFormNewAvatar.setEventListeners();
  popupFormAddCard.setEventListeners();
  popupFormEditProfile.setEventListeners();
}

/**
 * Включение валидации форм
 */
function enableValidation() {
  profileFormValidator.enableValidation();
  addFormValidator.enableValidation();
  avatarFormValidator.enableValidation();
}

/**
 * Функция иницилизации приложения
 */
function init() {
  Promise.all([api.getUser(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      userID = userData._id;

      profile.renderProfile(userData);
      cardsList.renderItems(cardsData);
    })
    .catch((err) => {
      console.log(err);
    });

  setEventListeners();
  enableValidation();
}

init();

