import { onDocumentEscapeKeydown as onDocumentEscapeKeydownCloseForm, closeForm } from './form';

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
  document.removeEventListener('keydown', onDocumentEscapeKeydown); //onDocumentEscapeKeydownCloseSendError
  document.removeEventListener('click', onBelowSendErrorPopupClick);
  document.addEventListener('keydown', onDocumentEscapeKeydownCloseForm);
};

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
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  document.addEventListener('click', onBelowSendErrorPopupClick);
  document.removeEventListener('keydown', onDocumentEscapeKeydownCloseForm); //onDocumentEscapeKeydownCloseForm
};

const closeSuccessPopup = () => {
  document.querySelector('.success__button').removeEventListener('click', closeSuccessPopup);
  document.body.removeChild(document.querySelector('.success'));
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  document.removeEventListener('click', onBelowSuccessPopupClick);
};

function onDocumentEscapeKeydown (evt) {
  if (evt.key === 'Escape') {
    switch (true) {
      case document.body.contains(document.querySelector('.error')):
        closeSendError();
        break;
      case document.body.contains(document.querySelector('.success')):
        closeSuccessPopup();
        break;
    }
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
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  document.addEventListener('click', onBelowSuccessPopupClick);
};

export { showLoadError, showSendError, showSuccessPopup };
