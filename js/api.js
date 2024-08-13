import { showDataLoadError, showDataSendError, showSuccessPopup } from './popups';

const getData = (onSuccess) => fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
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
    showDataLoadError();
  });

const sendData = (formData) => fetch('https://32.javascript.htmlacademy.pro/kekstagram', {
  method: 'POST',
  body: formData
}).then((response) => {
  if (!response.ok) {
    throw new Error();
  } else {
    showSuccessPopup();
  }
  return response.json();
}).catch(() => {
  showDataSendError();
});

export { getData, sendData };
