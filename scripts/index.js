const editButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');

let profileName = document.querySelector('.profile__name');
let profileAbout =document.querySelector('.profile__about');

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_data-name');
let aboutInput = document.querySelector('.popup__input_data-about');


function onEditButtonClick() {
  popup.classList.add('popup_opened');
  let name = profileName.textContent;
  nameInput.value = name;
  let about = profileAbout.textContent;
  aboutInput.value = about;
}

function onCloseButtonClick() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let about = aboutInput.value;
  profileName.textContent = name;
  profileAbout.textContent = about;
  onCloseButtonClick();
}


closeButton.addEventListener('click', onCloseButtonClick);
editButton.addEventListener('click', onEditButtonClick);
formElement.addEventListener('submit',formSubmitHandler);

