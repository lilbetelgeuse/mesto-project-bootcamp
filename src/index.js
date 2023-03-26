import './pages/index.css'
import './components/index.js'
import {initPage} from './components'
import {enableValidation} from './components/validation.js'

//теперь добавляем код, который добавит массив в разметку страницы для выданного темплейта
window.addEventListener('DOMContentLoaded', (event) => {

  initPage()

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item-input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'popup__item-error',
    errorClass: 'popup__item-error-visible'
  });

});

