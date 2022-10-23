'use strict';

import { openFullImage } from './openFullImage';
import { cardsContainer, cardTemplate } from './variables';

/**
 * Создание карточки
 * @param {object} card - объект с данными о карточке
 * @returns {object} cardElement - полностью собранная карточка
 */
function createCard(card) {
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
 * Функция переключения лайка
 * @param {object} btnLike - DOM-элемент кнопки лайка
 */
function toggleLike(btnLike) {
  btnLike.classList.toggle('card__btn-like_actived');
  btnLike.title = btnLike.classList.contains('card__btn-like_actived') ? 'Убрать лайк' : 'Поставить лайк';
}

/**
 * Рендер первоначальных карточек 
 * @param {array} arrCards - массив объектов, содержащих информацию о изображение (название и ссылку)
 */
function renderInitialCards(arrCards) {
  arrCards.forEach(item => cardsContainer.append(createCard(item)));
}

export { renderInitialCards, createCard };
