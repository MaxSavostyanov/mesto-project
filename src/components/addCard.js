'use strict';

import {
  popupAddCard,
  formAddCard,
  inputNameImage,
  inputLinkImage,
  submitFormAddCard,
  settingsValidation as settings
} from './variables';

import { openPopup, closePopup } from './modal';
import { createCard } from './card';
import { hideAllInputError } from './validate';
import { api } from './index'

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

  api.addCard(newCard, myID)
    .then(card => {
      cardsContainer.prepend(createCard(card, myID));
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      submitFormAddCard.textContent = 'Создать';
    });
}

export { openFormAddCard, handleFormAddCard };
