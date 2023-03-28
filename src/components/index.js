import '../components/validation.js'
import {initCards} from './card'
import {definePopupTrigger, initModal} from './modal'
import {getProfile} from '../components/api.js';


const initProfile = () => {
  const popupEditProfile = document.querySelector('.popup__edit-profile');
  const profileName = document.querySelector('.profile__info-name');
  const profileJob = document.querySelector('.profile__info-details');
  const editProfileForm = document.querySelector('#profile-form');
  getProfile()
  .then((result) => {

  })

  editProfileForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const form = evt.target;
    const element = {};
    profileName.textContent = form.elements['element-profile-name'].value;
    profileJob.textContent = form.elements['element-profile-description'].value;
  });

  definePopupTrigger(popupEditProfile, editProfileForm, 'submit');

}

const initPage = function () {
  initCards();
  initModal();
  initProfile();
}

export {initPage};
