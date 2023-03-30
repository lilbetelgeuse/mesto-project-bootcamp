

// Переменная для хранения загруженного с сервера профайла пользователя
let localProfile = null;

const setLocalProfile = (profile) => {
  localProfile = profile;
}

const getLocalProfile = () => {
  return localProfile;
}

const getAllForms = (config) => {
  return Array.from(document.querySelectorAll(config.formSelector));
}

// можно сделать универсальную функцию управления текстом кнопки с 3 и 4 необязательными аргументами
export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.value = loadingText;
  } else {
    button.value = buttonText;
  }
}

// можно сделать универсальную функцию, которая принимает функцию запроса, объект события и текст во время загрузки
function handleCommonFormSubmit(request, evt, loadingText = "Сохранение...") {
  // всегда нужно предотвращать перезагрузку формы при сабмите
  evt.preventDefault();

  // универсально получаем кнопку сабмита из `evt`
  const submitButton = evt.submitter;

  // записываем начальный текст кнопки до вызова запроса
  const initialText = submitButton.value;
  // изменяем текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      // любую форму нужно очищать после успешного ответа от сервера
      // а также `reset` может запустить деактивацию кнопки сабмита (смотрите в `validate.js`)
      evt.target.reset();
    })
    .catch((err) => {
      // в каждом запросе нужно ловить ошибку
      console.error(`Ошибка: ${err}`);
    })
    // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}


export {setLocalProfile}
export {getLocalProfile}
export {handleCommonFormSubmit}
export {getAllForms}
