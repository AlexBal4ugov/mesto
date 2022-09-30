import Card from "./Card.js";
import { initialCards } from "./initialCards.js";

const buttonEdit = document.querySelector(".profile__edit");
const buttonAdd = document.querySelector(".profile__add");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_image");
const buttonEditClose = popupEdit.querySelector(".popup__close");
const buttonAddClose = popupAdd.querySelector(".popup__close");
const buttonImageClose = popupImage.querySelector(".popup__close");

const cardsList = document.querySelector(".elements__list");

initialCards.forEach(function (card) {
  const newCard = new Card(card, '#element_container');
  cardsList.append(newCard.generateCard());
});

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const formAddCard = popupAdd.querySelector(".popup__form");
const formEditProfile = popupEdit.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_data_name");
const aboutInput = document.querySelector(".popup__input_data_about");
const nameImgInput = document.querySelector(".popup__input_data_img-name");
const linkImgInput = document.querySelector(".popup__input_data_img-link");

function handleEsc(evt) {
  const openedPopup = document.querySelector(".popup_opened");
  const key = evt.key;
  if (key === "Escape") {
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEsc);
}

function handleEditButtonClick() {
  openPopup(popupEdit);
  const name = profileName.textContent;
  nameInput.value = name;
  const about = profileAbout.textContent;
  aboutInput.value = about;
}

function handleAddButtonClick() {
  openPopup(popupAdd);
}

function handlePopupClose(evt) {
  const parentPopup = evt.target.closest(".popup");
  closePopup(parentPopup);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = aboutInput.value;
  profileName.textContent = name;
  profileAbout.textContent = about;
  handlePopupClose(evt);
  resetError(formEditProfile, validationConfig);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const name = nameImgInput.value;
  const link = linkImgInput.value;
  const card = {
    name: name,
    link: link,
  };
  const newCard = new Card(card, '#element_container');
  cardsList.prepend(newCard.generateCard());
  nameImgInput.value = "";
  linkImgInput.value = "";
  handlePopupClose(evt);
  resetError(formAddCard, validationConfig);
}

function handleOverlayClose(popup, evt) {
  const target = evt.target;
  if (target.classList.contains("popup")) {
    closePopup(popup);
  }
}

buttonEditClose.addEventListener("click", handlePopupClose);
buttonAddClose.addEventListener("click", handlePopupClose);
buttonImageClose.addEventListener("click", handlePopupClose);

buttonEdit.addEventListener("click", handleEditButtonClick);
buttonAdd.addEventListener("click", handleAddButtonClick);

formEditProfile.addEventListener("submit", handleEditFormSubmit);
formAddCard.addEventListener("submit", handleAddFormSubmit);

popupEdit.addEventListener("mousedown", function (evt) {
  handleOverlayClose(popupEdit, evt);
});

popupAdd.addEventListener("mousedown", function (evt) {
  handleOverlayClose(popupAdd, evt);
});

popupImage.addEventListener("mousedown", function (evt) {
  handleOverlayClose(popupImage, evt);
});

export { openPopup };
