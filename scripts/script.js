'use strict';

import { initialCards } from './initialCards.js';

const btnEdit = document.querySelector('.profile__btn_type_edit');
const btnAdd = document.querySelector('.profile__btn_type_add');
const cardsList = document.querySelector('.cards__list');
const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
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
  /*image.addEventListener('click', () => openImage(name, link));*/
  cardsList.append(cardElement);
}

function renderInitialCards (arrCards) {
  arrCards.forEach((item) => createCard(item.name, item.link));
}

function toggleLike(btnLike) {
  btnLike.classList.toggle('card__btn-like_actived');
  btnLike.title = btnLike.classList.contains('card__btn-like_actived') ?'Убрать лайк' : 'Поставить лайк';
}

function openPopup (typeContent) {
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
}

btnEdit.addEventListener('click', () => openPopup());
btnAdd.addEventListener('click', () => openPopup());

btnClosePopup.addEventListener('click', () => closePopup());

renderInitialCards (initialCards);
