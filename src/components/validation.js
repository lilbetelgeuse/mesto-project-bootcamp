import {getAllForms} from "./utils";

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
}

const toggleButtonState = (config, inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disableButton(buttonElement);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
  }
};

const showInputError = (config, formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (config, formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

const isValid = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(config, formElement, inputElement);
  }
};

const validateInput = (config, formElement, inputList, inputElement, buttonElement) => {
  isValid(config, formElement, inputElement);
  toggleButtonState(config, inputList, buttonElement);
}

// функция для принудительной ревалидации формы, например, когда данные пришли с сервера и не проходили проверку
const revalidateForm = (config, formElement) => {
  // console.log("Form Valid: " + formElement.checkValidity());
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    validateInput(config, formElement, inputList, inputElement, buttonElement);
  });
  console.log("revalidate");
}

const setEventListeners = (config, formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from

  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(config, inputList, buttonElement);
  formElement.addEventListener('reset', () => {
    //При сбросе формы всегда делаем кнопку неактивной
    disableButton(buttonElement);
  });

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      validateInput(config, formElement, inputList, inputElement, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = getAllForms(config);

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(config, formElement);
  });
};


export {enableValidation};
export {revalidateForm};
