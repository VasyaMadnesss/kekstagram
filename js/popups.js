import { closeUploadOverlayOnEscapeKeydown, closeUploadOverlay } from './upload-form';

const closeDataLoadError = () => {
  document.body.removeChild(document.querySelector('.data-error'));
};

const showDataLoadError = () => {
  const dataLoadErrorTemplate = document.querySelector('#data-error').content
    .querySelector('.data-error');
  const errorPopup = dataLoadErrorTemplate.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.append(errorPopup);
  document.body.append(fragment);
  setTimeout(closeDataLoadError, 5000);
};

const closeDataSendError = () => {
  document.querySelector('.error__button').removeEventListener('click', closeDataSendError);
  document.body.removeChild(document.querySelector('.error'));
  document.removeEventListener('keydown', closeDataSendErrorOnEscape);
  document.removeEventListener('click', closeOnClickBelowDataSendErrorPopup);
  document.addEventListener('keydown', closeUploadOverlayOnEscapeKeydown);
};

function closeDataSendErrorOnEscape (evt) {
  if (evt.key === 'Escape') {
    closeDataSendError();
  }
}

function closeOnClickBelowDataSendErrorPopup (evt) {
  if (evt.target === document.querySelector('.error')) {
    closeDataSendError();
  }
}

const showDataSendError = () => {
  const dataSendErrorTemplate = document.querySelector('#error').content
    .querySelector('.error');
  const errorPopup = dataSendErrorTemplate.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.append(errorPopup);
  document.body.append(fragment);
  document.querySelector('.error__button').addEventListener('click', closeDataSendError);
  document.addEventListener('keydown', closeDataSendErrorOnEscape);
  document.addEventListener('click', closeOnClickBelowDataSendErrorPopup);
  document.removeEventListener('keydown', closeUploadOverlayOnEscapeKeydown);
};

const closeSuccessPopup = () => {
  document.querySelector('.success__button').removeEventListener('click', closeSuccessPopup);
  document.body.removeChild(document.querySelector('.success'));
  document.removeEventListener('keydown', closeSuccessPopupOnEscape);
  document.removeEventListener('click', closeOnClickBelowSuccessPopup);
};


function closeSuccessPopupOnEscape (evt) {
  if (evt.key === 'Escape') {
    closeSuccessPopup();
  }
}

function closeOnClickBelowSuccessPopup (evt) {
  if (evt.target === document.querySelector('.success')) {
    closeSuccessPopup();
  }
}


const showSuccessPopup = () => {
  closeUploadOverlay();
  const template = document.querySelector('#success').content.querySelector('.success');
  const successPopup = template.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.append(successPopup);
  document.body.append(fragment);
  document.querySelector('.success__button').addEventListener('click', closeSuccessPopup);
  document.addEventListener('keydown', closeSuccessPopupOnEscape);
  document.addEventListener('click', closeOnClickBelowSuccessPopup);
};

export {showDataLoadError, closeDataLoadError, showDataSendError, showSuccessPopup};
