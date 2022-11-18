'use strict'

/**
 * Класс, отвечающий за отрисовку элементов на странице
 */
export default class Section {
  /**
   * Конструктор класса
   * @param {{ renderer: function }} param0 - функция создания элемента
   * @param {string} selector - селектор контейнера, в который будут добавлятся элементы
   */
  constructor({ renderer }, selector) {
    this._containerElement = document.querySelector(selector);
    this._renderer = renderer;
  }

  /**
   * Добавить новый элемент в контейнер
   * @param {object} item - данные элемента, необходимые для его создания
   */
  addItem(item) {
    const itemElement = this._renderer(item);
    this._containerElement.prepend(itemElement);
  }

  /**
   * Отрисовать начальные элементы в контейнере
   * @param {array} - массив данных начальных элементов
   */
  renderItems(items) {
    items.reverse().forEach(item => this.addItem(item));
  }
}