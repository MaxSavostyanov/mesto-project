'use strict'

import Popup from './Popup.js';

/**
 * Класс Popup
 */
export default class popupWithImage extends Popup {
  /**
   * Конструктор класса
   * @param {object} param0 - настройки для работы с попапом
   */
  constructor({ common, popupSelector, imageSelector, captionSelector }) {
    super(common, popupSelector);
    this._fullImage = document.querySelector(imageSelector);
    this._captionFullImage = this._popup.querySelector(captionSelector);
  }

  /**
   * Открывает попап
   * @param {string} link - ссылка на картинку
   * @param {string} name - название картинки
   */
  open(link, name) {
    this._fullImage.src = link;
    this._fullImage.alt = name;
    this._captionFullImage.textContent = name;
    super.open();
  }
}