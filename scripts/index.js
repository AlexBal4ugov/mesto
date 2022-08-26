const editButton = document.querySelector('.profile__edit');
const addButton = document.querySelector('.profile__add');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImage = document.querySelector('.popup_image');
const popupImagePic = popupImage.querySelector('.popup__image-pic');
const popupImageTitle = popupImage.querySelector('.popup__image-title');
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


const profileName = document.querySelector('.profile__name');
const profileAbout =document.querySelector('.profile__about');

const addFormElement = popupAdd.querySelector('.popup__form');
const editFormElement = popupEdit.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_data_name');
const aboutInput = document.querySelector('.popup__input_data_about');
const nameImgInput = document.querySelector('.popup__input_data_img-name');
const linkImgInput = document.querySelector('.popup__input_data_img-link');

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardPhoto = cardElement.querySelector('.element__photo');
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;
  cardElement.querySelector('.element__description').textContent = card.name;
  const likeButton = cardElement.querySelector('.element__like');
  likeButton.addEventListener('click', handleLikeButtonClick);
  const deleteButton = cardElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', handleDeleteButtonClick);
  const cardImage = cardElement.querySelector('.element__photo-button');
  cardImage.addEventListener('click', handleImageButtonClick);
  return cardElement;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handleDeleteButtonClick(evt) {
  const deleteTarget = evt.target.closest('.element');
  deleteTarget.remove();
}

function handleLikeButtonClick(evt) {
  const like = evt.target;
  like.classList.toggle('element__like_active');
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
  const parentPopup = evt.target.closest('.popup');
  closePopup(parentPopup);
}

function handleImageButtonClick(evt) {
  const target = evt.target.closest('.element');
  const image = target.querySelector('.element__photo').src;
  const title = target.querySelector('.element__description').textContent;
  popupImagePic.src = image;
  popupImagePic.alt = title;
  popupImageTitle.textContent = title;
  openPopup(popupImage);
}

function handleFormSubmit(evt) {
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
    link: link
  }
  const newCard = createCard(card);
  cardsList.prepend(newCard);
  nameImgInput.value = '';
  linkImgInput.value = '';
  handlePopupClose(evt);
}

closeEditButton.addEventListener('click', handlePopupClose);
closeAddButton.addEventListener('click', handlePopupClose);
closeImageButton.addEventListener('click',handlePopupClose);

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);

editFormElement.addEventListener('submit',handleFormSubmit);
addFormElement.addEventListener('submit',handleAddFormSubmit);

