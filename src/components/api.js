const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-6',
  headers: {
    'Authorization': '45a234f7-547f-46f4-9fd9-7317cf035dbf',
    'Content-Type': 'application/json'
  }
}

const callApiMethod = (api, method = 'GET', body = null, extraHeaders = {}) => {
  if (!api.startsWith('/')) {
    api = `/${api}`;
  }
  return fetch(`${config.baseUrl}${api}`, {
    method: method,
    headers: {...config.headers, ...extraHeaders},
    body: body
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status} ${res.body}`);
  });
}

const getProfile = () => {
  return callApiMethod(`/users/me`);
}

const updateProfile = (profile) => {
  return callApiMethod(`/users/me`, "PATCH", JSON.stringify(profile));
}

const updateAvatar = (avatar) => {
  return callApiMethod(`/users/me/avatar`, "PATCH", JSON.stringify(avatar));
}

const getCards = () => {
  return callApiMethod(`/cards`);
}
const createCard = (card) => {
  return callApiMethod(`/cards`, "POST", JSON.stringify(card));
}

const deleteCard = (cardId) => {
  return callApiMethod(`/cards/${cardId}`, "DELETE");
}

const likeCard = (cardId) => {
  return callApiMethod(`/cards/likes/${cardId}`, "PUT");
}

const unlikeCard = (cardId) => {
  return callApiMethod(`/cards/likes/${cardId}`, "DELETE");
}

export {getProfile}
export {updateProfile}
export {updateAvatar}
export {getCards}
export {createCard}
export {deleteCard}
export {likeCard}
export {unlikeCard}

