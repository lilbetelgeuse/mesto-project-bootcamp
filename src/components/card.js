import {definePopupTrigger} from "./modal";

//добавляем массив карточек
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


const popupLargePic = document.querySelector('.popup__large-pic');
const popupAddElement = document.querySelector('.popup__add-element');
const cardsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.element__template');
const newElementForm = document.querySelector('#element-add-form');

// ниже - добавление новой карточки
function createCard(list, element) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const elementPic = cardElement.querySelector('.element__image');
  const index = list.children.length;

  elementPic.src = element.link;
  elementPic.id = "card-element-" + index;
  elementPic.alt = element.name;
  cardElement.querySelector('.element__header').textContent = element.name;
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  cardElement.querySelector('.element__trash').addEventListener('click', (evt) => evt.target.closest('.element').remove());
  elementPic.addEventListener('mousedown', (e) => lightBox(e, popupLargePic, element.link, element.name));
  definePopupTrigger(popupLargePic, elementPic, 'mousedown');
  return cardElement;
}

function addNewElement(element) {
  cardsList.insertBefore(createCard(cardsList, element), cardsList.firstChild);
}

newElementForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const form = evt.target;
  const element = {};
  element.link = form.elements['picture-link'].value;
  element.name = form.elements['element-name'].value;
  addNewElement(element);
  form.reset();
  evt.submitter.disabled = true;
});

definePopupTrigger(popupAddElement, newElementForm, 'submit');

function lightBox(event, container, imageUrl, caption) {
  container.querySelector('.popup__pic').src = imageUrl;
  container.querySelector('.popup__pic-heading').textContent = caption;
}


const initCards = function() {
  initialCards.reverse().forEach((element) => addNewElement(element));
}

export {initCards}
