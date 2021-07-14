import md5 from 'crypto-js/md5';

const GRAVATAR_URL = 'https://www.gravatar.com/avatar/';

const gravatarAPI = (email) => {
  const hash = md5(email).toString();
  fetch(`${GRAVATAR_URL}${hash}`).then((response) => response
    .json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    .then((data) => console.log(data)));
};

export default gravatarAPI;
