const editButton = document.querySelector('.profile__button-edit');
const addCloseButton = document.querySelector('.popup__add-toggle');
const editCloseButton = document.querySelector('.popup__edit-toggle');
const addButton = document.querySelector('.profile__button-add');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupAddElement = document.querySelector('.popup__add-element');
const saveProfileButton = document.getElementById('submit_profileInfo');
const saveNewElementButton = document.getElementById('submit-new-element');

function popup(element) {
  element.classList.toggle('popup_opened');
}

editButton.addEventListener('click', () => popup(popupEditProfile));//как здесь понять, какой из попапов открыать?

editCloseButton.addEventListener('click', () => popup(popupEditProfile));

addButton.addEventListener('click', () => popup(popupAddElement));
addCloseButton.addEventListener('click', () => popup(popupAddElement));
saveProfileButton.addEventListener('click', () => popup(popupEditProfile));
saveNewElementButton.addEventListener('click', () => popup(popupAddElement));

let profileName = document.querySelector('.profile__info-name');
let profileJob = document.querySelector('.profile__info-details');


function editName() {
  let inputName = document.getElementById('name').value;
  let inputJob = document.getElementById('description').value;
  profileName.textContent = inputName;
  profileJob.textContent = inputJob;
  //тут была функция closePopup, которую выкинули к черту, надеюсь, оно будет работать без этого
  

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

  const cardTemplate = document.querySelector('.element__template');
  const cardsList = document.querySelector('.elements__list');

  initialCards.forEach(function (element) {
    const cardElement = cardTemplate.content.cloneNode(true);

    cardElement.querySelector('.element__image').src = element.link;
    cardElement.querySelector('.element__header').textContent = element.name;
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
    });

    cardsList.append(cardElement);

  })

});

//ниже - добавление новой карточки

const cardsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('.element__template');

function addNewElement() {
  let inputHeader = document.getElementById('element-name').value;
  let inputPic = document.getElementById('picture-link').value;

  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector('.element__header').textContent = inputHeader;
  cardElement.querySelector('.element__image').src = inputPic;
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  //cardsList.append(cardElement);
  cardsList.insertBefore(cardElement, cardsList.children[0]);
}

saveNewElementButton.addEventListener('click', addNewElement);

/*$(document).ready(function () {
    $('profile__button-edit').click(function () {
        $('popup').addClass("popup_opened");
    });
});*/

