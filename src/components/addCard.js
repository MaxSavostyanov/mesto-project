'use strict';

import {
  popupAddCard,
  formAddCard,
  inputNameImage,
  inputLinkImage,
  submitFormAddCard,
  cardsContainer,
  settingsValidation as settings,
  config,
} from './variables';

import { openPopup, closePopup } from './modal';
import { createCard } from './card';
import { hideAllInputError } from './validate';
import { addCard } from './api';

/**
 * Функция открытия popup c формой добаления новой карточки
 */
function openFormAddCard() {
  submitFormAddCard.disabled = true;
  hideAllInputError(formAddCard, settings);
  formAddCard.reset();
  openPopup(popupAddCard);
}

/**
 * Функция обработчик формы добаления новой карточки
 * @param {object} evt - событие, произошедшее на странице
 * @param {string} myID - ID пользователя
 */
function handleFormAddCard(evt, myID) {
  const newCard = {
    name: inputNameImage.value,
    link: inputLinkImage.value,
  };

  evt.preventDefault();
  submitFormAddCard.textContent = 'Сохранение...';

  addCard(config, newCard, myID)
    .then(card => {
      cardsContainer.prepend(createCard(card, myID));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup(popupAddCard);
      submitFormAddCard.textContent = 'Создать';
    });
}

export { openFormAddCard, handleFormAddCard };
