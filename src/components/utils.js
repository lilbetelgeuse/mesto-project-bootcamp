

// Переменная для хранения загруженного с сервера профайла пользователя
let local_profile = null;

const setLocalProfile = (profile) => {
  local_profile = profile;
}

const getLocalProfile = () => {
  return local_profile;
}

const getAllForms = (config) => {
  return Array.from(document.querySelectorAll(config.formSelector));
}

const updateSaveButtonLabelCommonUI = (config, event, label) => {
  const allForms = getAllForms(config);
  allForms.forEach((formElement) => {
    const submitButton = formElement.querySelector('input[type="submit"]');
    formElement.addEventListener(event, () => (submitButton.value = label));
  })
}

const setBeforeSubmitListenerCommonUI = (config) => {
  updateSaveButtonLabelCommonUI(config, 'submit', "Сохранение...");
}

const setAfterSubmitListenerCommonUI = (config) => {
  updateSaveButtonLabelCommonUI(config, 'reset', "Сохранить");
}


export {setLocalProfile}
export {getLocalProfile}
export {setBeforeSubmitListenerCommonUI}
export {setAfterSubmitListenerCommonUI}
export {getAllForms}
