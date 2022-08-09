const editButton = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');

const profileName = document.querySelector('.profile__name');
const profileAbout =document.querySelector('.profile__about');

const nameInput = document.querySelector('.popup__input-name');
const aboutInput = document.querySelector('.popup__input-about');


function onEditButtonClick() {
  popupEdit.classList.add('popup_opened');
  let name = profileName.textContent;
  nameInput.value = name;
  let about = profileAbout.textContent;
  aboutInput.value = about;
}

function onCloseButtonClick() {
  popupEdit.classList.remove('popup_opened');
}



closeButton.addEventListener('click', onCloseButtonClick);
editButton.addEventListener('click', onEditButtonClick);

