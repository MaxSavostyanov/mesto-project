'use strict';

/*Настройки для работы с сервером*/
export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
  headers: {
    authorization: '26e206db-fdaf-4832-831b-12af613bc48e',
    'Content-Type': 'application/json'
  }
};

/*Настройки для валидации форм*/
export const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn_type_submit',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_visible'
}

/*Настройки для работы с профилем пользователя*/
export const settingsProfile = {
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
}

/*Настройки для работы с общим классом попапа*/
const settingsPopup = {
  popupClass: 'popup',
  openedClass: 'popup_opened',
  closedClass: 'popup_closed',
  btnCloseClass: 'popup__btn_type_close'
}

/*Настройки для работы с конкретными попапами*/
export const settingsPopups = {
  getWithImage: (popupSelector) => {
    return {
      common: settingsPopup,
      popupSelector: popupSelector,
      imageSelector: '.popup__image',
      captionSelector: '.popup__image-caption'
    }
  },

  getWithForm: (popupSelector) => {
    return {
      common: settingsPopup,
      popupSelector: popupSelector,
      inputSelector: '.popup__input',
      btsSubmitSeletor: '.popup__btn_type_submit'
    }
  }

}

/*Элементы необхомые для создания и добавления карточки */
export const cardsContainerSelector = '.cards__list';
export const cardTemplateSelector = '#card-template';

/*Формы*/
export const formEditProfile = document.forms.editProfile;
export const formNewAvatar = document.forms.newAvatar;
export const formAddCard = document.forms.addCard;

/*Кнопки открытия и закрытия модальных окон*/
export const btnEditProfile = document.querySelector('.profile__btn_type_edit');
export const btnAddCard = document.querySelector('.profile__btn_type_add');
export const btnNewAvatar = document.querySelector('.profile__avatar-edit');
