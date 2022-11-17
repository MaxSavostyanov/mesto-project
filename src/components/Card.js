export default class Card {
  /**
   * @param {string} selector - селектор шаблока карточки
   * @param {object} card - данные создаваемой карточки
   * @param {string} userID - ID пользователя
   * @param {object} api - объект класса Api
   * @param {function} handleCardClick - функция обработчик открытия попапа с картинкой
   */
  constructor(selector, card, userID, api, handleCardClick) {
    this._selector = selector;

    this._link = card.link;
    this._name = card.name;
    this._likes = card.likes;

    this._cardID = card._id;
    this._ownerCardID = card.owner._id;
    this._userID = userID;

    this._api = api;
    this._handleCardClick = handleCardClick;
  }

  /**
   * Клонирования шаблона карточки
   * @returns {object} - копия шаблона карточки
   */
  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true)
  }

  /**
   * Создание карточки
   * @returns {object} - полностью работоспособный и наполненный данными элемент карточки 
   */
  createCard() {
    this._cardElement = this._getTemplate();
    this._btnDeleteElement = this._cardElement.querySelector('.card__btn-delete');
    this._btnLikeElement = this._cardElement.querySelector('.card__btn-like');
    this._countLikesElement = this._cardElement.querySelector('.card__count-likes');
    this._imageElement = this._cardElement.querySelector('.card__image');
    this._titleElement = this._cardElement.querySelector('.card__title');

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;

    this._titleElement.textContent = this._name;
    this._titleElement.title = this._name;

    if (this._userID === this._ownerCardID)
      this._btnDeleteElement.classList.add('card__btn-delete_active');

    if (this._likes.some(item => item._id === this._userID)) {
      this._toggleLike();
    } else {
      this._countLikesElement.textContent = this._likes.length;
    }

    this._setEventListeners();

    return this._cardElement;
  }

  /**
   * Переключение лайка
   */
  _toggleLike() {
    this._btnLikeElement.classList.toggle('card__btn-like_actived');
    this._btnLikeElement.title =
      this._btnLikeElement.classList.contains('card__btn-like_actived')
        ? 'Убрать лайк'
        : 'Поставить лайк';
    this._countLikesElement.textContent = this._likes.length;
  }

  /**
   * Установка лайка
   */
  _setLiked() {
    this._api.setLiked(this._cardID)
      .then((card) => {
        this._likes = card.likes;
        this._toggleLike();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Удаление лайка
   */
  _removeLiked() {
    this._api.removeLiked(this._cardID)
      .then((card) => {
        this._likes = card.likes;
        this._toggleLike();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Обработчик кнопки лайка
   */
  _handleBtnLike() {
    if (!this._btnLikeElement.classList.contains('card__btn-like_actived')) {
      this._setLiked();
    } else {
      this._removeLiked();
    }
  }

  /**
   * Удаление карточки
   */
  _deleteCard() {
    this._api.deleteCard(this._cardID)
      .then(() => this._cardElement.remove())
      .catch((err) => {
        console.log(err);
      })
  }

  /**
   * Установка слушателей на интерактичные элементы карточки
   */
  _setEventListeners() {
    this._imageElement.addEventListener('click', () => this._handleCardClick(this._link, this._name));

    this._btnDeleteElement.addEventListener('click', () => this._deleteCard());

    this._btnLikeElement.addEventListener('click', () => this._handleBtnLike());
  }
}
