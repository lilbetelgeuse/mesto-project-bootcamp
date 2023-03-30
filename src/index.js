import './pages/index.css'
import './components/index.js'
import {initPage} from './components'
import {enableValidation} from './components/validation.js'
import {formValidationConfig as config} from "./components/constants";

//теперь добавляем код, который добавит массив в разметку страницы для выданного темплейта
window.addEventListener('DOMContentLoaded', (event) => {
  initPage(config);
  enableValidation(config);
});

