const ADDRESSES = {
  post: 'https://32.javascript.htmlacademy.pro/kekstagram',
  get: 'https://32.javascript.htmlacademy.pro/kekstagram/data'
};

const getData = (onSuccess, onFail) => fetch(ADDRESSES.get)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .then((result) => {
    onSuccess(result);
    return result;
  })
  .catch(() => {
    onFail();
  });

const sendData = (formData, onSuccess, onFail) => fetch(ADDRESSES.post, { method: 'POST', body: formData })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    } else {
      onSuccess();
    }
    return response.json();
  }).catch(() => {
    onFail();
  });

export { getData, sendData };
