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
const nameImage = formAddCard.elements.name;
const linkImage = formAddCard.elements.link;

/*Кнопки открытия модальный окон*/
const btnEdit = document.querySelector('.profile__btn_type_edit');
const btnAdd = document.querySelector('.profile__btn_type_add');
const btnClosePopup = popup.querySelector('.popup__btn_type_close');

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

function renderInitialCards (arrCards) {
  arrCards.forEach((item) => cardsList.append(createCard(item.name, item.link)));
}

function toggleLike(btnLike) {
  btnLike.classList.toggle('card__btn-like_actived');
  btnLike.title = btnLike.classList.contains('card__btn-like_actived') ?'Убрать лайк' : 'Поставить лайк';
}

function openPopup () {
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
  setTimeout(() => popup.querySelectorAll('.popup__content').forEach(item => item.classList.remove('popup__content_active')), 500);
}

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

function openEditProfile() {
  const container = popup.querySelector('#edit-profile');
  inputUsername.value = username.textContent;
  inputAbout.value = about.textContent;
  container.classList.add('popup__content_active');
  openPopup();
}

function editProfile (evt) {
  evt.preventDefault();
  username.textContent = inputUsername.value;
  about.textContent = inputAbout.value;
  closePopup();
}

function openAddCard() {
  const container = popup.querySelector('#add-card');
  container.querySelector('.popup__form').reset();
  container.classList.add('popup__content_active');
  openPopup();
}

function addCard (evt) {
  evt.preventDefault();
  console.log(linkImage);
  cardsList.prepend(createCard(nameImage.value, linkImage.value));
  closePopup();
}

btnEdit.addEventListener('click', openEditProfile);
btnAdd.addEventListener('click', openAddCard);
formEditProfile.addEventListener('submit', editProfile);
formAddCard.addEventListener('submit', addCard);
btnClosePopup.addEventListener('click', closePopup);

renderInitialCards (initialCards);
