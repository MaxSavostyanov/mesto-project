'use strict';

/*Настройки для валидации форм*/
export const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn_type_submit',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error-message_visible'
} 

/*Элементы необхомые для создания и добавления карточки */
export const cardsContainer = document.querySelector('.cards__list');
export const cardTemplate = document.querySelector('#card-template').content;

/*Элементы для работы с popup*/
export const popupList = document.querySelectorAll('.popup');
export const popupEditProlile = document.querySelector('.popup_edit-profile');
export const popupAddCard = document.querySelector('.popup_add-card');
export const popupFullImage = document.querySelector('.popup_full-image');

/*Элементы для редактирования профиля*/
export const username = document.querySelector('.profile__name');
export const about = document.querySelector('.profile__about');
export const formEditProfile = document.forms.editProfile;
export const inputUsername = formEditProfile.elements.username;
export const inputAbout = formEditProfile.elements.about;

/*Элементы для добавления карточки*/
export const formAddCard = document.forms.addCard;
export const inputNameImage = formAddCard.elements.name;
export const inputLinkImage = formAddCard.elements.link;
export const submitFormAddCard = formAddCard.elements.submit;

/*Элементы для полноэкранного просмотра изображения*/
export const fullImage = popupFullImage.querySelector('.popup__image');
export const captionFullImage = popupFullImage.querySelector('.popup__image-caption');

/*Кнопки открытия и закрытия модальных окон*/
export const btnEdit = document.querySelector('.profile__btn_type_edit');
export const btnAdd = document.querySelector('.profile__btn_type_add');
