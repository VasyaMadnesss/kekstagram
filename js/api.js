import { showDataLoadError, showDataSendError, showSuccessPopup } from './popups';

const getData = (onSuccess) => fetch('https://32.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .then((result) => onSuccess(result))
  .catch(() => {
    showDataLoadError();
  });

const sendData = (body) => fetch('https://32.javascript.htmlacademy.pro/kekstagram', {
  method: 'POST',
  body
}).then((response) => {
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
}).catch(() => {
  showDataSendError();
}).then (() => {
  showSuccessPopup();
});

export { getData, sendData };
