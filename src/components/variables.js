'use strict';

/*Данные необходимые для работы с сервером*/
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

/*Элементы необхомые для создания и добавления карточки */
export const cardsContainerSelector = '.cards__list';
export const cardTemplateSelector = '#card-template';

/*Элементы для работы с popup*/
export const popupList = document.querySelectorAll('.popup');
export const popupEditProlile = document.querySelector('.popup_edit-profile');
export const popupAddCard = document.querySelector('.popup_add-card');
export const popupFullImage = document.querySelector('.popup_full-image');
export const popupNewAvatar = document.querySelector('.popup_new-avatar');

/*Элементы для редактирования профиля*/
export const username = document.querySelector('.profile__name');
export const aboutUser = document.querySelector('.profile__about');
export const formEditProfile = document.forms.editProfile;
export const inputUsername = formEditProfile.elements.username;
export const inputAbout = formEditProfile.elements.about;
export const submitFormEditProfile = formEditProfile.elements.submit;

/*Элементы для редактирования аватара профиля*/
export const avatar = document.querySelector('.profile__avatar');
export const formNewAvatar = document.forms.newAvatar;
export const inputAvatarLink = formNewAvatar.elements.avatarLink;
export const submitFormNewAvatar = formNewAvatar.elements.submit;

/*Элементы для добавления карточки*/
export const formAddCard = document.forms.addCard;
export const inputNameImage = formAddCard.elements.name;
export const inputLinkImage = formAddCard.elements.link;
export const submitFormAddCard = formAddCard.elements.submit;

/*Элементы для полноэкранного просмотра изображения*/
export const fullImage = popupFullImage.querySelector('.popup__image');
export const captionFullImage = popupFullImage.querySelector('.popup__image-caption');

/*Кнопки открытия и закрытия модальных окон*/
export const btnEditProfile = document.querySelector('.profile__btn_type_edit');
export const btnAddCard = document.querySelector('.profile__btn_type_add');
export const btnNewAvatar = document.querySelector('.profile__avatar-edit');
