import {definePopupTrigger, togglePopup} from "./modal";
import {
  getCards,
  createCard as apiCreateCard,
  deleteCard as apiDeleteCard,
  likeCard,
  unlikeCard
} from "./api";
import {getLocalProfile} from "./utils";

const popupLargePic = document.querySelector('.popup__large-pic');
const popupAddElement = document.querySelector('.popup__add-element');
const cardsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.element__template');
const newElementForm = document.querySelector('#element-add-form');

function deleteCard(evt, cardId) {
  apiDeleteCard(cardId).then(() => {
    evt.target.closest('.element').remove();
  });
}

function toggleLikeCard(evt, cardId, elementLikeCounter) {
  const elementCard = evt.target;
  const apiFunction = (elementCard.classList.contains('element__like_active') ? unlikeCard : likeCard);
  apiFunction(cardId).then((data) => {
    if(!data) {
      return;
    }
    elementCard.classList.toggle('element__like_active');
    elementLikeCounter.textContent = data.likes.length;
  });
}

// ниже - добавление новой карточки
function createCard(element) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const elementPic = cardElement.querySelector('.element__image');
  const elementTrash = cardElement.querySelector('.element__trash');
  const elementLikeCounter = cardElement.querySelector('.element__like-counter');
  const elementLike = cardElement.querySelector('.element__like');
  const localProfile = getLocalProfile();

  elementPic.src = element.link;
  elementPic.alt = element.name;
  elementLikeCounter.textContent = element.likes.length;

  const isCardLiked = element.likes.some((l) => (l._id === localProfile._id));
  if(isCardLiked) {
    elementLike.classList.add('element__like_active')
  }
  cardElement.querySelector('.element__header').textContent = element.name;
  elementLike.addEventListener('click', function (evt) {
    toggleLikeCard(evt, element._id, elementLikeCounter);
  });

  if(element.owner && element.owner._id === localProfile._id) {
    elementTrash.addEventListener('click', (evt) => deleteCard(evt, element._id));
    elementTrash.classList.add("element__trash-visible");
  }
  elementPic.addEventListener('mousedown', (e) => lightBox(e, popupLargePic, element.link, element.name));
  definePopupTrigger(popupLargePic, elementPic, 'mousedown');
  return cardElement;
}

function addNewElement(element) {
  cardsList.insertBefore(createCard(element), cardsList.firstChild);
}

newElementForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const form = evt.target;
  const link = form.elements['picture-link'].value;
  const name = form.elements['element-name'].value;
  apiCreateCard({
    name: name,
    link: link
  }).then((data) => {
    addNewElement(data);
    form.reset();
    evt.submitter.disabled = true;
    togglePopup(popupAddElement);
  });

});

function lightBox(event, container, imageUrl, caption) {
  container.querySelector('.popup__pic').src = imageUrl;
  container.querySelector('.popup__pic-heading').textContent = caption;
}


const initCards = function () {
  getCards().then((data) => {
    if (!data) {
      return;
    }
    const cards = data.map((element) => createCard(element));
    cardsList.append(...cards);
  });
}

export {initCards}
