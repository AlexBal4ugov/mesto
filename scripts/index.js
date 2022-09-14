const buttonEdit = document.querySelector(".profile__edit");
const buttonAdd = document.querySelector(".profile__add");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupImage = document.querySelector(".popup_image");
const popupImagePic = popupImage.querySelector(".popup__image-pic");
const popupImageTitle = popupImage.querySelector(".popup__image-title");
const buttonEditClose = popupEdit.querySelector(".popup__close");
const buttonAddClose = popupAdd.querySelector(".popup__close");
const buttonImageClose = popupImage.querySelector(".popup__close");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document.querySelector("#element_container").content;
const cardTemplateElement = cardTemplate.querySelector(".element");
const cardsList = document.querySelector(".elements__list");

initialCards.forEach(function (card) {
  const newCard = createCard(card);
  cardsList.append(newCard);
});

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const formAddCard = popupAdd.querySelector(".popup__form");
const formEditProfile = popupEdit.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_data_name");
const aboutInput = document.querySelector(".popup__input_data_about");
const nameImgInput = document.querySelector(".popup__input_data_img-name");
const linkImgInput = document.querySelector(".popup__input_data_img-link");

function createCard(card) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const cardPhoto = cardElement.querySelector(".element__photo");
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;
  cardElement.querySelector(".element__description").textContent = card.name;
  const likeButton = cardElement.querySelector(".element__like");
  likeButton.addEventListener("click", handleLikeButtonClick);
  const deleteButton = cardElement.querySelector(".element__delete");
  deleteButton.addEventListener("click", handleDeleteButtonClick);
  const cardImage = cardElement.querySelector(".element__photo-button");
  cardImage.addEventListener("click", handleImageButtonClick);
  return cardElement;
}

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

function handleDeleteButtonClick(evt) {
  const deleteTarget = evt.target.closest(".element");
  deleteTarget.remove();
}

function handleLikeButtonClick(evt) {
  const like = evt.target;
  like.classList.toggle("element__like_active");
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
  const form = parentPopup.querySelector(validationConfig.formSelector);
  if (form) {
    resetError(form, validationConfig);
  }
  closePopup(parentPopup);
}

function handleImageButtonClick(evt) {
  const target = evt.target.closest(".element");
  const image = target.querySelector(".element__photo").src;
  const title = target.querySelector(".element__description").textContent;
  popupImagePic.src = image;
  popupImagePic.alt = title;
  popupImageTitle.textContent = title;
  openPopup(popupImage);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = aboutInput.value;
  profileName.textContent = name;
  profileAbout.textContent = about;
  handlePopupClose(evt);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const name = nameImgInput.value;
  const link = linkImgInput.value;
  const card = {
    name: name,
    link: link,
  };
  const newCard = createCard(card);
  cardsList.prepend(newCard);
  nameImgInput.value = "";
  linkImgInput.value = "";
  handlePopupClose(evt);
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
