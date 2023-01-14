const editButton = document.querySelector('.profile__button-edit');
const addCloseButton = document.querySelector('.popup__add-toggle');
const editCloseButton = document.querySelector('.popup__edit-toggle');
const picCloseButton = document.querySelector('.popup__pic-toggle');
const addButton = document.querySelector('.profile__button-add');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupAddElement = document.querySelector('.popup__add-element');
const popupLargePic = document.querySelector('.popup__large-pic');
const saveProfileButton = document.getElementById('submit_profileInfo');
const saveNewElementButton = document.getElementById('submit-new-element');
const trashButton = document.querySelector('.element__trash button');



function popup(element) {
  element.classList.toggle('popup_opened');
}

editButton.addEventListener('click', () => popup(popupEditProfile));
editCloseButton.addEventListener('click', () => popup(popupEditProfile));

addButton.addEventListener('click', () => popup(popupAddElement));
addCloseButton.addEventListener('click', () => popup(popupAddElement));

picCloseButton.addEventListener('click', () => popup(popupLargePic));
saveProfileButton.addEventListener('click', () => popup(popupEditProfile));
saveNewElementButton.addEventListener('click', () => popup(popupAddElement));


let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__info-details');


function editName() {
  let inputName = document.getElementById('name').value;
  let inputJob = document.getElementById('description').value;
  profileName.textContent = inputName;
  profileJob.textContent = inputJob;
  

}

saveProfileButton.addEventListener('click', editName);



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
//теперь добавляем код, который добавит массив в разметку страницы для выданного темплейта
window.addEventListener('DOMContentLoaded', (event) => {

  initialCards.reverse().forEach((element) => addNewElement(element));

});

function lightBox(container, imageUrl, caption) {
  container.querySelector('.popup__pic').src = imageUrl;
  container.querySelector('.popup__pic-heading').textContent = caption;
  popup(container);


}

//ниже - добавление новой карточки


//
function addNewElement(element) {
  const cardsList = document.querySelector('.elements__list');
  const cardTemplate = document.querySelector('.element__template');
  const cardElement = cardTemplate.content.cloneNode(true);
  const elementPic = cardElement.querySelector('.element__image');


  elementPic.src = element.link;
  elementPic.addEventListener('click', () => lightBox(popupLargePic, element.link, element.name));

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



