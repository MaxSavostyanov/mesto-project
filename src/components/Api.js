'use strict'

/**
 * Класс Api
 * @param {object} baseUrl - URL
 * @param {object} headers - заголовки для запроса и токен
 */
export default class Api {
  constructor({ baseUrl, headers}) {
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
 * @param {object} this - объект данными для работы с сервером
 * @returns 
 */
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

/**
 * Метод запроса начальных карточек с сервера
 * @param {object} this - объект данными для работы с сервером
 * @returns 
 */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  /**
 * Метод отправки отредактированных данных пользователя на сервер
 * @param {object} this - объект данными для работы с сервером 
 * @returns 
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
 * @param {object} this - объект данными для работы с сервером 
 * @returns 
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
 * @param {object} this - объект данными для работы с сервером 
 * @returns 
 */
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
  
  /**
 * Метод отправки запроса на установку лайка 
 * @param {object} this - объект данными для работы с сервером 
 * @returns 
 */
  setLiked(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

/**
 * Метод отправки запроса на удаление лайка 
 * @param {object} this - объект данными для работы с сервером 
 * @returns 
 */
  removeLiked(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

/**
 * Функция отправки отредактированных данных пользователя на сервер
 * @param {object} this - объект данными для работы с сервером 
 * @param {object} newAvatar - объект содержащий ссылку на новый аватар пользователя
 * @returns 
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