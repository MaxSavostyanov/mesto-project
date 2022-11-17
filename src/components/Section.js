/**
 * Класс, отвечающий за отрисовку элементов на странице
 */
export default class Section {
  /**
   * Конструктор класса
   * @param {*} param0 
   * @param {*} renderer 
   */
  constructor({ renderer }, selector) {
    this._containerElement = document.querySelector(selector);
    this._renderer = renderer;
  }

  /**
   * Добавить новый элемент в контейнер
   * @param {*} item 
   */
  addItem(item, userID) {
    const itemElement = this._renderer(item, userID);
    this._containerElement.prepend(itemElement);
  }

  /**
   * Отрисовать начальные элементы в контейнере
   */
  renderItems(items, userID) {
    items.reverse().forEach(item => this.addItem(item, userID));
  }
}