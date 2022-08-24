const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');
const closeEditButton = popupEdit.querySelector('.popup__close');
const closeAddButton = popupAdd.querySelector('.popup__close');
const closeImageButton = popupImage.querySelector('.popup__close');



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#element_container').content;
const cardsList = document.querySelector('.elements__list');

initialCards.forEach(function (card) {
  const newCard = createCard(card);
  cardsList.append(newCard);
});


let profileName = document.querySelector('.profile__name');
let profileAbout =document.querySelector('.profile__about');

let addFormElement = popupAdd.querySelector('.popup__form');
let editFormElement = popupEdit.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_data_name');
let aboutInput = document.querySelector('.popup__input_data_about');
let nameImgInput = document.querySelector('.popup__input_data_img-name');
let linkImgInput = document.querySelector('.popup__input_data_img-link');

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__photo').src = card.link;
  cardElement.querySelector('.element__photo').alt = card.name;
  cardElement.querySelector('.element__description').textContent = card.name;
  const likeButton = cardElement.querySelector('.element__like');
  likeButton.addEventListener('click', onLikeButtonClick);
  const deleteButton = cardElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', onDeleteButtonClick);
  const cardImage = cardElement.querySelector('.element__photo-button');
  cardImage.addEventListener('click', onImageButtonClick);
  return cardElement;
}

function onDeleteButtonClick(evt) {
  const deleteTarget = evt.target.closest('.element');
  deleteTarget.remove();
}

function onLikeButtonClick(evt) {
  const like = evt.target;
  like.classList.toggle('element__like_active');
}

function onEditButtonClick() {
  popupEdit.classList.add('popup_opened');
  let name = profileName.textContent;
  nameInput.value = name;
  let about = profileAbout.textContent;
  aboutInput.value = about;
}

function onAddButtonClick() {
  popupAdd.classList.add('popup_opened');
}

function onCloseButtonClick(evt) {
  const parentPopup = evt.target.closest('.popup');
  parentPopup.classList.remove('popup_opened');
}

function onImageButtonClick(evt) {
  const target = evt.target.closest('.element');
  const image = target.querySelector('.element__photo').src;
  const title = target.querySelector('.element__description').textContent;
  popupImage.querySelector('.popup__image-pic').src = image;
  popupImage.querySelector('.popup__image-title').textContent = title;
  popupImage.classList.add('popup_opened');
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let about = aboutInput.value;
  profileName.textContent = name;
  profileAbout.textContent = about;
  onCloseButtonClick(evt);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  let name = nameImgInput.value;
  let link = linkImgInput.value;
  const card = {
    name: name,
    link: link
  }
  const newCard = createCard(card);
  cardsList.prepend(newCard);
  onCloseButtonClick(evt);
}

closeEditButton.addEventListener('click', onCloseButtonClick);
closeAddButton.addEventListener('click', onCloseButtonClick);
closeImageButton.addEventListener('click',onCloseButtonClick);

editButton.addEventListener('click', onEditButtonClick);
addButton.addEventListener('click', onAddButtonClick);

editFormElement.addEventListener('submit',editFormSubmitHandler);
addFormElement.addEventListener('submit',addFormSubmitHandler);

