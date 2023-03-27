import '../components/validation.js'
import {initCards} from '../components/card.js'
import {initModal} from '../components/modal.js'
import {definePopup} from "../components/modal.js";

const initProfile = () => {
  const editButton = document.querySelector('.profile__button-edit');
  const popupEditProfile = document.querySelector('.popup__edit-profile');
  const profileName = document.querySelector('.profile__info-name');
  const profileJob = document.querySelector('.profile__info-details');
  const editProfileForm = document.querySelector('#profile-form');
  
  editProfileForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const form = evt.target;
    const element = {};
    profileName.textContent = form.elements['element-profile-name'].value;
    profileJob.textContent = form.elements['element-profile-description'].value;
    
  });

  definePopup(popupEditProfile, editButton);

}

const initPage = function () {
  initCards();
  initModal();
  initProfile();
}

export {initPage};
