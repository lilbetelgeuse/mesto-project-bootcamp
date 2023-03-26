const all_popups = Array.from(document.querySelectorAll('.popup'));

function popup(event, clicked, element) {
  // console.log(event.target);
  // console.log(clicked);
  // console.log(event.target.id + " : " + clicked.id);
  if (!clicked.id || event.target.id !== clicked.id) {
    return false;
  }
  element.classList.toggle('popup_opened');
}

function definePopup(popupElement, triggers) {
  if (!triggers) {
    triggers = [];
  }
  if (!Array.isArray(triggers)) {
    triggers = [triggers];
  }
  popupElement.addEventListener('click', (e) => popup(e, popupElement, popupElement));
  const closeButtons = Array.from(popupElement.querySelectorAll('.popup__close-button'));
  triggers.push(...closeButtons);
  triggers.forEach((triggerElement) => {
    triggerElement.addEventListener('click', (e) => popup(e, triggerElement, popupElement));
  });
}

function initModal() {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      all_popups.forEach((popup) => {
        popup.classList.remove('popup_opened');
      })
    }
  })
}

export {initModal}
export {definePopup}
export {popup}
