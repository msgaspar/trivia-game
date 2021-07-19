export const getStorage = (key) => JSON.parse(localStorage.getItem(key));

// export const setStorage = (key) =>

export const setRankingStorage = (key, value) => {
  const keyStorage = getStorage(key);
  if (keyStorage) {
    const updatedKeyStorage = [...keyStorage, value];
    updatedKeyStorage.sort((a, b) => b.score - a.score);
    localStorage.setItem(key, JSON.stringify(updatedKeyStorage));
  } else {
    localStorage.setItem(key, JSON.stringify([value]));
  }
};
