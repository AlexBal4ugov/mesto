const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const closeEditButton = popupEdit.querySelector('.popup__close');
const closeAddButton = popupAdd.querySelector('.popup__close');
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
  addCard(card);
});


let profileName = document.querySelector('.profile__name');
let profileAbout =document.querySelector('.profile__about');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_data_name');
let aboutInput = document.querySelector('.popup__input_data_about');

function addCard(card) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__photo').src = card.link;
  cardElement.querySelector('.element__photo').alt = card.name;
  cardElement.querySelector('.element__description').textContent = card.name;
  cardsList.append(cardElement);
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

function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let about = aboutInput.value;
  profileName.textContent = name;
  profileAbout.textContent = about;
  onCloseButtonClick(popupEdit);
}


closeEditButton.addEventListener('click', onCloseButtonClick);
closeAddButton.addEventListener('click', onCloseButtonClick);
editButton.addEventListener('click', onEditButtonClick);
formElement.addEventListener('submit',formSubmitHandler);
addButton.addEventListener('click', onAddButtonClick);

