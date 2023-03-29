import '../components/validation.js'
import {initCards} from './card'
import {togglePopup, initModal} from './modal'
import {getProfile, updateProfile, updateAvatar} from '../components/api.js';
import {
  setLocalProfile,
  onBeforeSubmitCommonUI,
  setBeforeSubmitListenerCommonUI,
  setAfterSubmitListenerCommonUI
} from "./utils";

const initProfile = () => {
  const popupEditProfile = document.querySelector('.popup__edit-profile');
  const popupEditAvatar = document.querySelector('.popup__edit-avatar');
  const profileName = document.querySelector('.profile__info-name');
  const profileJob = document.querySelector('.profile__info-details');
  const profileImage = document.querySelector('.profile__image');
  const editProfileForm = document.querySelector('#profile-form');
  const editProfileButton = document.querySelector('#profile__button-edit');
  const editAvatarForm = document.querySelector('#profile-avatar-form');

  const profileChanged = (profile) => {
    profileName.textContent = profile.name;
    profileJob.textContent = profile.about;
    profileImage.src = profile.avatar;
    setLocalProfile(profile);
  }

  editProfileForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const form = evt.target;
    const name = form.elements['element-profile-name'].value;
    const about = form.elements['element-profile-description'].value;

    updateProfile({
      "name": name,
      "about": about
    }).then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      form.reset();
      form.elements['element-profile-name'].value = data.name
      form.elements['element-profile-description'].value = data.about;
      togglePopup(popupEditProfile);
    })
  });

  editProfileButton.addEventListener("mousedown", () => {
    editProfileForm.elements['element-profile-name'].value = profileName.textContent;
    editProfileForm.elements['element-profile-description'].value = profileJob.textContent;
  });

  editAvatarForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const form = evt.target;
    const avatar = form.elements['element-avatar'].value;

    updateAvatar({
      "avatar": avatar
    }).then((data) => {
      if(!data) {
        return;
      }
      profileChanged(data);
      form.reset();
      togglePopup(popupEditAvatar);
    })
  });


  getProfile().then((data) => {
    if(!data) {
      return;
    }
    profileChanged(data);
    // Для корректной работы initCards необходимо сначала загрузить данные из профайла
    initCards();
  });

}

const initPage = function (config) {

  setBeforeSubmitListenerCommonUI(config);
  initModal();
  initProfile();
  setAfterSubmitListenerCommonUI(config);
}

export {initPage};
