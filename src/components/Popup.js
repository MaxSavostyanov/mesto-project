'use strict'

/**
 * Класс Popup
 */
export default class Popup {
  /**
   * Конструктор класса
   * @param {object} param0 - общие настройки для работы с попапом
   * @param {string} popupSelector - селектор текущего попапа
   */
  constructor({ popupClass, openedClass, closedClass, btnCloseClass }, popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._commonClass = popupClass;
    this._openedClass = openedClass;
    this._closedClass = closedClass;
    this._btnCloseClass = btnCloseClass;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  /**
   * Открывает попап
   */
  open() {
    this._popup.classList.remove(this._closedClass);
    this._popup.classList.add(this._openedClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  /**
   * Закрывает попап
   */
  close() {
    this._popup.classList.remove(this._openedClass);
    this._popup.classList.add(this._closedClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  /**
   * Закрывает попап по кнопке 'Escape'
   */
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  /**
   * Устанавливает слушатели на закрытие попапа по оверлею и крестику 
   */
  setEventListeners() {
    this._popup.addEventListener('mousedown', evt => {
      if (evt.target.classList.contains(this._commonClass) || evt.target.classList.contains(this._btnCloseClass)) {
        this.close();
      }
    });
  }
}
