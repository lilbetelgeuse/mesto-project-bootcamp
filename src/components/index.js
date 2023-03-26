import '../components/validation.js'
import {initCards} from '../components/card.js'
import {initModal} from '../components/modal.js'
import {definePopup} from "../components/modal.js";

const initProfile = () => {
  const editButton = document.querySelector('.profile__button-edit');
  const popupEditProfile = document.querySelector('.popup__edit-profile');
  const profileName = document.querySelector('.profile__info-name');
  const profileJob = document.querySelector('.profile__info-details');
  const saveProfileButton = document.getElementById('submit_profileInfo');

  function editName() {
    const inputName = document.getElementById('element-profile-name').value;
    const inputJob = document.getElementById('element-profile-description').value;
    profileName.textContent = inputName;
    profileJob.textContent = inputJob;
  }
  definePopup(popupEditProfile, editButton);
  saveProfileButton.addEventListener('click', editName);

}

let initPage = function () {
  initCards();
  initModal();
  initProfile();
}

export {initPage};
