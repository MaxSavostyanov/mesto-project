import Popup from './_Popup.js';

export default class popupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fullImage = document.querySelector('.popup__image');
    this._captionFullImage = this._popup.querySelector('.popup__image-caption');
  }

  open(link, name) {
    super.open();
    this._fullImage.src = link;
    this._fullImage.alt = name;
    this._captionFullImage.textContent = name;
  }
}