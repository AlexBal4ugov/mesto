import { openPopup, popupImage, popupImagePic, popupImageTitle } from "./index.js";

export default class Card {
  constructor(data, template){
    this._data=data;
    this._template=template;
  }

  _getTemplate(){
    const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _handleLikeButtonClick(evt) {
    const like = evt.target;
    like.classList.toggle("element__like_active");
  }

  _handleDeleteButtonClick(evt) {
    const deleteTarget = evt.target.closest(".element");
    deleteTarget.remove();
  }

  _handleImageButtonClick = (evt) => {
    popupImagePic.src = this._data.link;
    popupImagePic.alt = this._data.name;
    popupImageTitle.textContent = this._data.name;
    openPopup(popupImage);
  }

  _setEventListeners(){
    const likeButton = this._element.querySelector(".element__like");
    likeButton.addEventListener("click", this._handleLikeButtonClick);
    const deleteButton = this._element.querySelector(".element__delete");
    deleteButton.addEventListener("click", this._handleDeleteButtonClick);
    const cardImage = this._element.querySelector(".element__photo-button");
    cardImage.addEventListener("click", this._handleImageButtonClick);
  }

  _fillCard(){
    const cardPhoto = this._element.querySelector(".element__photo");
    cardPhoto.src = this._data.link;
    cardPhoto.alt = this._data.name;
    this._element.querySelector(".element__description").textContent = this._data.name;
  }

  generateCard(){
    this._element = this._getTemplate();
    this._fillCard();
    this._setEventListeners();
    return this._element;
  }
}
