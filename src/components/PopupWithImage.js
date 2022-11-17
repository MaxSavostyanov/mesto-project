import Popup from './Popup.js';

export default class popupWithImage extends Popup {
  constructor({ common, popupSelector, imageSelector, captionSelector }) {
    super(common , popupSelector);
    this._fullImage = document.querySelector(imageSelector);
    this._captionFullImage = this._popup.querySelector(captionSelector);
  }

  open(link, name) {
    this._fullImage.src = link;
    this._fullImage.alt = name;
    this._captionFullImage.textContent = name;
    super.open();
  }
}