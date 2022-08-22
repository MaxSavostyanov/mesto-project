'use strict';

import { initialCards } from './initialCards.js';

/*Элементы необхомые для создания и добавления карточки */
const cardsContainer = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template').content;

/*Элементы для работы с popup*/
const popupEditProlile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupFullImage = document.querySelector('.popup_full-image');

/*Элементы для редактирования профиля*/
const username = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const formEditProfile = document.forms.editProfile;
const inputUsername = formEditProfile.elements.username;
const inputAbout = formEditProfile.elements.about;

/*Элементы для добавления карточки*/
const formAddCard = document.forms.addCard;
const inputNameImage = formAddCard.elements.name;
const inputLinkImage = formAddCard.elements.link;

/*Элементы для полноэкранного просмотра изображения*/
const fullImage = popupFullImage.querySelector('.popup__image');
const captionFullImage = popupFullImage.querySelector('.popup__image-caption');

/*Кнопки открытия и закрытия модальных окон*/
const btnEdit = document.querySelector('.profile__btn_type_edit');
const btnAdd = document.querySelector('.profile__btn_type_add');
/*
надеюсь не сильно намудрил с названием
я решил выбрать все кнопки закрытия popup
=> через цикл на каждую повесить слушатель
=> через event.target.closest('.popup) закрыть соответствующий popup
*/
const btnsClosePopupList = document.querySelectorAll('.popup__btn_type_close');

/**
 * Создание карточки
 * @param {object} card - объект с данными о карточке
 * @returns {object} cardElement - полностью собранная карточка
 */
function createCard (card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const btnDelete = cardElement.querySelector('.card__btn-delete');
  const btnLike = cardElement.querySelector('.card__btn-like');
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  
  image.src = card.link;
  image.alt = card.name;

  title.textContent = card.name;
  title.title = card.name;

  btnLike.addEventListener('click', () => toggleLike(btnLike));
  btnDelete.addEventListener('click', () => cardElement.remove());
  image.addEventListener('click', () => openFullImage(card));
  return cardElement;
}

/**
 * Рендер первоначальных карточек 
 * @param {array} arrCards - массив объектов, содержащих информацию о изображение (название и ссылку)
 */
function renderInitialCards (arrCards) {
  arrCards.forEach((item) => cardsContainer.append(createCard(item)));
}

/**
 * Функция переключения лайка
 * @param {object} btnLike - DOM-элемент кнопки лайка
 */
function toggleLike(btnLike) {
  btnLike.classList.toggle('card__btn-like_actived');
  btnLike.title = btnLike.classList.contains('card__btn-like_actived') ?'Убрать лайк' : 'Поставить лайк';
}

/**
 * Функции открытия popup
 */
function openPopup (popup) {
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
}

/**
 * Функция закрытия popup
 * @param {object} evt - событие, произошедшее на странице
 */
function closePopup (evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
}

/**
 * Функция открытия popup c картинкой
 * @param {object} card - объект с данными о карточке
 */
function openFullImage(card) {
  fullImage.src = card.link;
  fullImage.alt = card.name;
  captionFullImage.textContent = card.name;
  
  openPopup(popupFullImage);
}

/**
 * Функция открытия popup c формой редактирования профиля
 */
function openFormEditProfile() {
  inputUsername.value = username.textContent;
  inputAbout.value = about.textContent;
  openPopup(popupEditProlile);
}

/**
 * Функция обработчик формы редактирования карточки
 * @param {object} evt - событие, произошедшее на странице
 */
function handleFormEditProfile (evt) {
  evt.preventDefault();
  username.textContent = inputUsername.value;
  about.textContent = inputAbout.value;
  closePopup(evt);
}

/**
 * Функция открытия popup c формой добаления новой карточки
 */
function openFormAddCard() {
  formAddCard.reset();
  openPopup(popupAddCard);
}

/**
 * Функция обработчик формы добаления новой карточки
 * @param {object} evt - событие, произошедшее на странице
 */
function handleFormAddCard (evt) {
  evt.preventDefault();
  const newCard = {
    name: inputNameImage.value,
    link: inputLinkImage.value,
  };
  cardsContainer.prepend(createCard(newCard));
  closePopup(evt);
}

/*Добавление услушателей на кнопки*/
btnEdit.addEventListener('click', openFormEditProfile);
btnAdd.addEventListener('click', openFormAddCard);
formEditProfile.addEventListener('submit', handleFormEditProfile);
formAddCard.addEventListener('submit', handleFormAddCard);
btnsClosePopupList.forEach(item => item.addEventListener('click', closePopup));

renderInitialCards (initialCards);
