import md5 from 'crypto-js/md5';

const gravatarAPI = (email) => {
  const url = 'https://www.gravatar.com/avatar/';
  const hash = md5(email).toString();
  return url + hash;
};

export default gravatarAPI;
