const all_popups = Array.from(document.querySelectorAll('.popup'));

/**
 * 1. Единая функция для обработки попапов - открывает закрытые, закрывает открытые
 *
 * 2. https://www.macmillandictionary.com/dictionary/british/pop-up_1
 * "Pop up" (phrasal verb, intransitive)
 * DEFINITIONS:
 *     to appear very quickly or suddenly
 *     "The daffodils and tulips are popping up everywhere."
 */
function popup(element) {
  element.classList.toggle('popup_opened');
  if (element.classList.contains('popup_opened')) {
    document.addEventListener('keydown', handleKeyDownEvent)
  } else {
    document.removeEventListener('keydown', handleKeyDownEvent)
  }
}

function handleKeyDownEvent(event) {
  if (event.key === 'Escape') {
    const element = document.querySelector('.popup_opened');
    popup(element);
  }
}

function handleTriggerEvent(event, element) {
  event.stopPropagation();
  if (!event.target.classList.contains('popup__trigger')) {
    return false;
  }
  popup(element);
}

function definePopupTrigger(popupElement, triggerElement, eventType) {
  triggerElement.classList.add('popup__trigger');
  triggerElement.addEventListener(eventType, (e) => handleTriggerEvent(e, popupElement))
}

function initModal() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  const popupTriggerList = Array.from(document.querySelectorAll('.popup__trigger'));

  popupList.forEach((popupElement) => {
    popupTriggerList.forEach((triggerElement) => {
      if (triggerElement.classList.contains(`${popupElement.id}-trigger`)) {
        triggerElement.addEventListener('mousedown', (e) => handleTriggerEvent(e, popupElement))
      }
    });
  });
}

export {initModal}
export {definePopupTrigger}
