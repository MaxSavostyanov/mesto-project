'use strict';

import {
  popupAddCard,
  formAddCard,
  inputNameImage,
  inputLinkImage,
  submitFormAddCard,
  cardsContainer,
} from './variables';

import { openPopup, closePopup } from './modal';
import { createCard } from './card';
import { hideAllInputError, options } from './validate';

/**
 * Функция открытия popup c формой добаления новой карточки
 */
function openFormAddCard() {
  submitFormAddCard.disabled = true;
  hideAllInputError(formAddCard, options);
  formAddCard.reset();
  openPopup(popupAddCard);
  formAddCard.addEventListener('submit', handleFormAddCard);
}

/**
 * Функция обработчик формы добаления новой карточки
 * @param {object} evt - событие, произошедшее на странице
 */
function handleFormAddCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: inputNameImage.value,
    link: inputLinkImage.value,
  };
  cardsContainer.prepend(createCard(newCard));
  closePopup(popupAddCard);
  formAddCard.removeEventListener('submit', handleFormAddCard);
}

export { openFormAddCard };
