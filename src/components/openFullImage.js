'use strict'

import {
  fullImage,
  captionFullImage,
  popupFullImage
} from './variables';
import { openPopup } from './modal';

/**
 * Функция открытия popup c картинкой
 * @param {object} card - объект с данными о карточке
 */
export function openFullImage(card) {
  fullImage.src = card.link;
  fullImage.alt = card.name;
  captionFullImage.textContent = card.name;

  openPopup(popupFullImage);
}
