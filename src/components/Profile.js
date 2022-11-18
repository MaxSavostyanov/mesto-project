'use strict'

export default class Profile {
  /**
   * @constructs
   * @param {{
   *  nameSelector: string
   *  aboutSelector: string
   *  avatarSelector: string
   * }} param0 - объект с селекторами элементов Профиля
   */
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  /**
   * Получить данные пользователя
   * @returns {object} - объект с данными пользователя
   */
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  /**
   * Отрисовать полученные данные пользователя
   * @param {object} data - данные пользователя
   */
  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
  }

  /**
   * Отрисовать аватар пользователя
   * @param {object} data - данные пользователя
   */
  setUserAvatar(data) {
    this._avatarElement.src = data.avatar;
  }

  /**
   * Отрисовать профиль пользователя
   * @param {object} data - данные пользователя 
   */
  renderProfile(data) {
    this.setUserInfo(data);
    this.setUserAvatar(data);
  }
}
