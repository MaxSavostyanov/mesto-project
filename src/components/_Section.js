/**
 * Класс, отвечающий за отрисовку элементов на странице
 */
export default class Section {
  /**
   * Конструктор класса
   * @param {*} param0 
   * @param {*} renderer 
   */
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._containerElement = document.querySelector(selector);
    this._renderer = renderer;
  }

  /**
   * Добавить новый элемент в контейнер
   * @param {*} item 
   */
  addItem(item) {
    const itemElement = this._renderer(item);
    this._containerElement.append(itemElement);
  }

  /**
   * Отрисовать начальные элементы в контейнере
   */
  renderItems() {
    console.log(this._renderer);
    this._items.forEach(item => this.addItem(item));
  }
}