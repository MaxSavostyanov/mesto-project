'use strict'

/**
 * Класс Api
 * @param {object} baseUrl - URL
 * @param {object} headers - заголовки для запроса и токен
 */
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  /**
   * Метод проверки ответа от сервера на корректность
   * @param {object} res  - ответ от сервера
   * @returns 
   */
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: code ${res.status}`);
    }
  }

  /**
  * Метод запроса информации о пользователе с сервера
  * @returns {object} res
  */
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  /**
  * Метод запроса начальных карточек с сервера
  * @returns {object} res
  */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  /**
  * Метод отправки отредактированных данных пользователя на сервер
  * @param {object} user - объект с отредактированными данными пользователя
  * @returns {object} res
  */
  editUser(user) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(user)
    })
      .then(this._checkResponse);
  }

  /**
  * Метод отправки новой карточки на сервер
  * @param {object} card - объект с данными добавляемой карточки
  * @returns {object} res
  */
  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
      .then(this._checkResponse);
  }

  /**
  * Метод отправки запроса на удаления карточки 
  * @param {string} cardID - ID удаляемой карточки
  * @returns {object} res
  */
  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  /**
  * Метод отправки запроса на установку лайка 
  * @param {string} cardID - ID понравившейся карточки
  * @returns {object} res 
  */
  setLiked(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  /**
   * Метод отправки запроса на удаление лайка 
   * @param {string} cardID - ID карточки, с которой убирается лайк
   * @returns {object} res 
   */
  removeLiked(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  /**
   * Функция отправки отредактированных данных пользователя на сервер
   * @param {object} newAvatar - объект содержащий ссылку на новый аватар пользователя
   * @returns {object} res 
   */
  setNewAvatar(newAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newAvatar)
    })
      .then(this._checkResponse);
  }
}