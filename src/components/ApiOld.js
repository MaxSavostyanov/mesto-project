'use strict'

/**
 * Функция проверки ответа от сервера на корректность
 * @param {object} res  - ответ от сервера
 * @returns 
 */
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`);
  }
}

/**
 * Функция отправки новой карточки на сервер
 * @param {object} config - объект данными для работы с сервером 
 * @returns 
 */
export function addCard(config, card) {
  return fetch(`${config.server}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(card)
  })
    .then(res => checkResponse(res));
}

/**
 * Функция отправки запроса на удаления карточки 
 * @param {object} config - объект данными для работы с сервером 
 * @returns 
 */
export function deleteCard(config, id) {
  return fetch(`${config.server}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkResponse(res));
}

/**
 * Функция отправки запроса на устновку лайка 
 * @param {object} config - объект данными для работы с сервером 
 * @param {object} btnLike - DOM-элемент кнопки лайка 
 * @param {object} countLikes - DOM-элемент кол-ва лайков 
 * @param {function} toggleLike - функция переключения лайка 
 * @returns 
 */
export function getLiked(config, btnLike, countLikes, toggleLike) {
  return fetch(`${config.server}/cards/likes/${btnLike.dataset.id}`, {
    method: 'PUT',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkResponse(res))
    .then((card) => {
      toggleLike(btnLike, countLikes, card);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Функция отправки запроса на удаление лайка 
 * @param {object} config - объект данными для работы с сервером 
 * @param {object} btnLike - DOM-элемент кнопки лайка 
 * @param {object} countLikes - DOM-элемент кол-ва лайков 
 * @param {function} toggleLike - функция переключения лайка 
 * @returns 
 */
export function removeLiked(config, btnLike, countLikes, toggleLike) {
  return fetch(`${config.server}/cards/likes/${btnLike.dataset.id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    }
  })
    .then(res => checkResponse(res))
    .then((card) => {
      toggleLike(btnLike, countLikes, card);
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * Функция отправки отредактированных данных пользователя на сервер
 * @param {object} config - объект данными для работы с сервером 
 * @param {object} newAvatar - объект содержащий ссылку на новый аватар пользователя
 * @returns 
 */
export function setNewAvatar(config, newAvatar) {
  return fetch(`${config.server}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newAvatar)
  })
    .then(res => checkResponse(res));
}