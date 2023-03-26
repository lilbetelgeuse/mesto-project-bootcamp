import {popup, definePopup} from "./modal";

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
const saveNewElementButton = document.getElementById('submit-new-element');
const addButton = document.querySelector('.profile__button-add');
const cardsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.element__template');

//ниже - добавление новой карточки
//
function addNewElement(element) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const elementPic = cardElement.querySelector('.element__image');
  const index = cardsList.children.length;

  elementPic.src = element.link;
  elementPic.id = "card-element-" + index;
  elementPic.addEventListener('click', (e) => lightBox(e, popupLargePic, element.link, element.name));
  cardElement.querySelector('.element__header').textContent = element.name;
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  cardElement.querySelector('.element__trash').addEventListener('click', (evt) => evt.target.parentNode.remove());

  cardsList.insertBefore(cardElement, cardsList.firstChild);
  //
}

saveNewElementButton.addEventListener('click', function () {
  const element = {};
  element.link = document.getElementById('picture-link').value;
  element.name = document.getElementById('element-name').value;
  addNewElement(element);
});

function lightBox(event, container, imageUrl, caption) {
  container.querySelector('.popup__pic').src = imageUrl;
  container.querySelector('.popup__pic-heading').textContent = caption;
  popup(event, event.target, container);
}


let initCards = function() {
  initialCards.reverse().forEach((element) => addNewElement(element));
  definePopup(popupLargePic);
  definePopup(popupAddElement, addButton);
}

export {initCards}
