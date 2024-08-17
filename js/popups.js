import { onDocumentEscapeKeydown as onDocumentEscapeKeydownCloseForm, closeForm } from './upload-form';

const dataLoadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const dataSendErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');

const closeLoadError = () => {
  document.body.removeChild(document.querySelector('.data-error'));
};

const showLoadError = () => {
  const errorPopup = dataLoadErrorTemplate.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.append(errorPopup);
  document.body.append(fragment);
  setTimeout(closeLoadError, 5000);
};

const closeSendError = () => {
  document.querySelector('.error__button').removeEventListener('click', closeSendError);
  document.body.removeChild(document.querySelector('.error'));
  document.removeEventListener('keydown', onDocumentEscapeKeydownCloseSendError);
  document.removeEventListener('click', onBelowSendErrorPopupClick);
  document.addEventListener('keydown', onDocumentEscapeKeydownCloseForm);
};

function onDocumentEscapeKeydownCloseSendError (evt) {
  if (evt.key === 'Escape') {
    closeSendError();
  }
}

function onBelowSendErrorPopupClick (evt) {
  if (evt.target === document.querySelector('.error')) {
    closeSendError();
  }
}

const showSendError = () => {
  const errorPopup = dataSendErrorTemplate.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.append(errorPopup);
  document.body.append(fragment);
  document.querySelector('.error__button').addEventListener('click', closeSendError);
  document.addEventListener('keydown', onDocumentEscapeKeydownCloseSendError);
  document.addEventListener('click', onBelowSendErrorPopupClick);
  document.removeEventListener('keydown', onDocumentEscapeKeydownCloseForm);
};

const closeSuccessPopup = () => {
  document.querySelector('.success__button').removeEventListener('click', closeSuccessPopup);
  document.body.removeChild(document.querySelector('.success'));
  document.removeEventListener('keydown', onDocumentEscapeKeydownCloseSuccessPopup);
  document.removeEventListener('click', onBelowSuccessPopupClick);
};


function onDocumentEscapeKeydownCloseSuccessPopup (evt) {
  if (evt.key === 'Escape') {
    closeSuccessPopup();
  }
}

function onBelowSuccessPopupClick (evt) {
  if (evt.target === document.querySelector('.success')) {
    closeSuccessPopup();
  }
}


const showSuccessPopup = () => {
  closeForm();
  const successPopup = successPopupTemplate.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.append(successPopup);
  document.body.append(fragment);
  document.querySelector('.success__button').addEventListener('click', closeSuccessPopup);
  document.addEventListener('keydown', onDocumentEscapeKeydownCloseSuccessPopup);
  document.addEventListener('click', onBelowSuccessPopupClick);
};

export { showLoadError, showSendError, showSuccessPopup };
