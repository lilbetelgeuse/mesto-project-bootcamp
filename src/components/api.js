const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-06',
    headers: {
      authorization: '45a234f7-547f-46f4-9fd9-7317cf035dbf',
      'Content-Type': 'application/json'
    }
  }
 
  export const getProfile = () => {
  fetch(`${config.baseUrl}/users/me`, {
  method: 'GET',
  headers: config.headers
  });

  .then(res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
}

  .then((data) => {
    const name = data.name;
    const about = data.about;
    const avatar = data.avatar;


  });
        
    
