import '../components/validation.js'
import {initCards} from './card'
import {togglePopup, initModal} from './modal'
import {getProfile, getCards, updateProfile, updateAvatar} from './api';
import {
  setLocalProfile,
  handleCommonFormSubmit,
} from "./utils";
import {revalidateForm} from "./validation";
import {formValidationConfig as config} from "./constants";

const initProfile = () => {
  const popupEditProfile = document.querySelector('.popup__edit-profile');
  const popupEditAvatar = document.querySelector('.popup__edit-avatar');
  const profileName = document.querySelector('.profile__info-name');
  const profileJob = document.querySelector('.profile__info-details');
  const profileImage = document.querySelector('.profile__image');
  const editProfileForm = document.querySelector('#profile-form');
  const editProfileButton = document.querySelector('#profile__button-edit');
  const editAvatarForm = document.querySelector('#profile-avatar-form');

  const setProfileData = (profile) => {
    profileName.textContent = profile.name;
    profileJob.textContent = profile.about;
    profileImage.src = profile.avatar;
    setLocalProfile(profile);
  }

  editProfileForm.addEventListener('submit', function (evt) {

    const form = evt.target;
    const name = form.elements['element-profile-name'].value;
    const about = form.elements['element-profile-description'].value;

    function makeRequest() {
      return updateProfile({
        "name": name,
        "about": about
      }).then((data) => {
        profileName.textContent = data.name;
        profileJob.textContent = data.about;
        setProfileData(data);
        togglePopup(popupEditProfile);
      })
    }
    handleCommonFormSubmit(makeRequest, evt);

  });

  editProfileButton.addEventListener("mousedown", () => {
    editProfileForm.elements['element-profile-name'].value = profileName.textContent;
    editProfileForm.elements['element-profile-description'].value = profileJob.textContent;
    //Уточняем, что данные, полученные с сервера, соответствуют текущим критериям валидации
    revalidateForm(config, editProfileForm);
  });

  editAvatarForm.addEventListener('submit', function (evt) {
    const form = evt.target;
    const avatar = form.elements['element-avatar'].value;

    function makeRequest() {
      // вот это позволяет потом дальше продолжать цепочку `then, catch, finally`
      return updateAvatar({
        "avatar": avatar
      }).then((data) => {
        setProfileData(data);
        togglePopup(popupEditAvatar);
      });
    }

    handleCommonFormSubmit(makeRequest, evt);
  });

  Promise.all([getProfile(), getCards()])
    .then(([profile, cards]) => {
      setProfileData(profile);
      initCards(cards);
    })
    .catch(err => {
      console.log(err);
    });
}

const initPage = function (config) {

  initModal();
  initProfile();
}

export {initPage};
