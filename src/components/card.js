'use strict';

import { openFullImage } from './openFullImage';
import {
  cardsContainer,
  cardTemplate,
  config
} from './variables';
import {
  deleteCard,
  getLiked,
  removeLiked,
} from './api';

/**
 * Создание карточки
 * @param {object} card - объект с данными о карточке
 * @param {string} myID - ID пользователя
 * @returns {object} cardElement - полностью собранная карточка
 */
function createCard(card, myID) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const btnDelete = cardElement.querySelector('.card__btn-delete');
  const btnLike = cardElement.querySelector('.card__btn-like');
  const countLikes = cardElement.querySelector('.card__count-likes');
  const image = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');

  image.src = card.link;
  image.alt = card.name;

  title.textContent = card.name;
  title.title = card.name;

  btnDelete.dataset.id = card._id;
  if (myID === card.owner._id) {
    setRemoveCard(cardElement, btnDelete, config);
  }

  btnLike.dataset.id = card._id;
  if (card.likes.some(item => item._id === myID)) {
    toggleLike(btnLike, countLikes, card);
  } else {
    countLikes.textContent = card.likes.length;
  }

  btnLike.addEventListener('click', () => handleBtnLike(config, btnLike, countLikes, toggleLike));
  image.addEventListener('click', () => openFullImage(card));
  return cardElement;
}

/**
 * Функция обратчик кнопки лайк
 * @param {object} config - объект данными для работы с сервером 
 * @param {object} btnLike - DOM-элемент кнопки лайка 
 * @param {object} countLikes - DOM-элемент кол-ва лайков 
 * @param {function} toggleLike - функция переключения лайка 
 */
function handleBtnLike(config, btnLike, countLikes, toggleLike){
  if(!btnLike.classList.contains('card__btn-like_actived')){
    getLiked(config, btnLike, countLikes, toggleLike);
  } else {
    removeLiked(config, btnLike, countLikes, toggleLike);
  }
}

/**
 * Функция переключения лайка
 * @param {object} btnLike - DOM-элемент кнопки лайка 
 * @param {object} countLikes - DOM-элемент кол-ва лайков 
 * @param {object} card - данные о карточке полученные с сервера  
 */
function toggleLike(btnLike, countLikes, card) {
  btnLike.classList.toggle('card__btn-like_actived');
  btnLike.title = btnLike.classList.contains('card__btn-like_actived') ? 'Убрать лайк' : 'Поставить лайк';
  countLikes.textContent = card.likes.length;
}

/**
 * Функция установки удаления карточки
 * @param {object} cardElement - DOM-элемент удаляемой карточки
 * @param {object} btnDelete - DOM-элемент кнопки удаления карточки
 * @param {object} config - объект данными для работы с сервером 
 */
function setRemoveCard(cardElement, btnDelete, config) {
  btnDelete.classList.add('card__btn-delete_active');
  btnDelete.addEventListener('click', () => {
    deleteCard(config, btnDelete.dataset.id)
      .then(() => cardElement.remove())
      .catch((err) => {
        console.log(err);
      })
  }, { once: true });
}

/**
 * Рендер первоначальных карточек 
 * @param {array} arrCards - массив объектов, содержащих информацию о изображение (название и ссылку)
 * @param {string} myID - ID пользователя
 */
function renderInitialCards(arrCards, myID) {
  arrCards.forEach(item => cardsContainer.append(createCard(item, myID)));
}

export { renderInitialCards, createCard };
