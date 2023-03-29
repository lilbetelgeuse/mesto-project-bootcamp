const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-6',
  headers: {
    'Authorization': '45a234f7-547f-46f4-9fd9-7317cf035dbf',
    'Content-Type': 'application/json'
  }
}

const api_call = (api, method = 'GET', body = null, extraHeaders = {}) => {
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
  }).catch((err) => {
    console.log(err);
  });
}

const getProfile = () => {
  return api_call(`/users/me`);
}

const updateProfile = (profile) => {
  return api_call(`/users/me`, "PATCH", JSON.stringify(profile));
}

const updateAvatar = (avatar) => {
  return api_call(`/users/me/avatar`, "PATCH", JSON.stringify(avatar));
}

const getCards = () => {
  return api_call(`/cards`);
}
const createCard = (card) => {
  return api_call(`/cards`, "POST", JSON.stringify(card));
}

const deleteCard = (cardId) => {
  return api_call(`/cards/${cardId}`, "DELETE");
}

const likeCard = (cardId) => {
  return api_call(`/cards/likes/${cardId}`, "PUT");
}

const unlikeCard = (cardId) => {
  return api_call(`/cards/likes/${cardId}`, "DELETE");
}

export {getProfile}
export {updateProfile}
export {updateAvatar}
export {getCards}
export {createCard}
export {deleteCard}
export {likeCard}
export {unlikeCard}

