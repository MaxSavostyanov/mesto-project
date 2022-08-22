'use strict';

import { initialCards } from './initialCards.js';

const cardsList = document.querySelector('.cards__list');
const popup = document.querySelector('.popup');

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

/*Кнопки открытия модальных окон*/
const btnEdit = document.querySelector('.profile__btn_type_edit');
const btnAdd = document.querySelector('.profile__btn_type_add');
const btnClosePopup = popup.querySelector('.popup__btn_type_close');

/**
 * Создание карточки
 * @param {string} name - назнание изображения
 * @param {string} link - ссылка на изображение
 * @returns {object} cardElement - полностью собранная карточка
 */
function createCard (name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const btnDelete = cardElement.querySelector('.card__btn-delete');
  const btnLike = cardElement.querySelector('.card__btn-like');
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  
  image.src = link;
  image.alt = name;

  title.textContent = name;
  title.title = name;

  btnLike.addEventListener('click', () => toggleLike(btnLike));
  btnDelete.addEventListener('click', () => cardElement.remove());
  image.addEventListener('click', () => openFullImage(name, link));
  return cardElement;
}

/**
 * Рендер первоначальных карточек 
 * @param {array} arrCards - массив объектов, содержащих информацию о изображение (название и ссылку)
 */
function renderInitialCards (arrCards) {
  arrCards.forEach((item) => cardsList.append(createCard(item.name, item.link)));
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
function openPopup () {
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
}

/**
 * Функция закрытия popup
 */
function closePopup () {
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
  setTimeout(() => popup.querySelectorAll('.popup__content').forEach(item => item.classList.remove('popup__content_active')), 500);
}

/**
 * Функция открытия popup c картинкой
 * @param {string} name - назнание изображения
 * @param {string} link - ссылка на изображение
 */
function openFullImage(name, link) {
  const container = popup.querySelector('#full-image');
  const fullImage = container.querySelector('.popup__image');
  const caption = container.querySelector('.popup__image-caption');
  fullImage.src = link;
  fullImage.alt = name;
  caption.textContent = name;

  container.classList.add('popup__content_active');
  openPopup();
}

/**
 * Функция открытия popup c формой редактирования профиля
 */
function openEditProfile() {
  const container = popup.querySelector('#edit-profile');
  inputUsername.value = username.textContent;
  inputAbout.value = about.textContent;
  container.classList.add('popup__content_active');
  openPopup();
}

/**
 * Функция обработчик формы редактирования карточки
 * @param {object} evt - событие, произошедшее на странице
 */
function editProfileHandler (evt) {
  evt.preventDefault();
  username.textContent = inputUsername.value;
  about.textContent = inputAbout.value;
  closePopup();
}

/**
 * Функция открытия popup c формой добаления новой карточки
 */
function openAddCard() {
  const container = popup.querySelector('#add-card');
  container.querySelector('.popup__form').reset();
  container.classList.add('popup__content_active');
  openPopup();
}

/**
 * Функция обработчик формы добаления новой карточки
 * @param {object} evt - событие, произошедшее на странице
 */
function addCardHandler (evt) {
  evt.preventDefault();
  cardsList.prepend(createCard(inputNameImage.value, inputLinkImage.value));
  closePopup();
}

/*Добавление услушателей на кнопки*/
btnEdit.addEventListener('click', openEditProfile);
btnAdd.addEventListener('click', openAddCard);
formEditProfile.addEventListener('submit', editProfileHandler);
formAddCard.addEventListener('submit', addCardHandler);
btnClosePopup.addEventListener('click', closePopup);

renderInitialCards (initialCards);
