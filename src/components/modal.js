'use strict';

/**
 * Функции открытия popup
 * @param {object} popup - DOM-элемент всплывающего окна
 */
function openPopup(popup) {
  popup.classList.remove('popup_closed');
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

/**
 * Функция закрытия popup
 * @param {object} popup - DOM-элемент всплывающего окна
 */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.classList.add('popup_closed');
  document.removeEventListener('keydown', handleEscClose);
}

/**
 * Функция обработчик нажатия кнопки Esc при открытом popup
 * @param {object} evt - объект события event
 */
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
}

export { openPopup, closePopup };
