import { setupValidation } from './upload-form-validation.js';
import { initializeScale, destroyScale } from './scale.js';
import { initializeSlider, destroySlider } from './effects.js';
import { sendData } from './api.js';

const uploadButton = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const overlayCloseButton = document.querySelector('.img-upload__cancel');

const uploadForm = document.querySelector('.img-upload__form');
const uploadSubmitButton = document.querySelector('.img-upload__submit');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentsField = uploadForm.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

function closeUploadOverlayOnEscapeKeydown (evt) {
  if(evt.key === 'Escape') {
    closeUploadOverlay();
  }
}

function onInputEscapeKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function closeUploadOverlay () {
  uploadForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadButton.value = '';
  destroyScale();
  destroySlider();
  overlayCloseButton.removeEventListener('click', closeUploadOverlay);
  document.removeEventListener('keydown', closeUploadOverlayOnEscapeKeydown);
  commentsField.removeEventListener('keydown', onInputEscapeKeydown);
  hashtagsField.removeEventListener('keydown', onInputEscapeKeydown);
}

const showSelectedPicture = (evt) => {
  const selectedFile = evt.target.files[0];
  const imgPreview = document.querySelector('.img-upload__preview > img');
  const reader = new FileReader();

  reader.onloadend = function () {
    imgPreview.src = reader.result;
  };

  if (selectedFile) {
    reader.readAsDataURL(selectedFile);
  }
};

function openUploadOverlay (evt) {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initializeScale();
  initializeSlider();
  showSelectedPicture(evt);
  overlayCloseButton.addEventListener('click', closeUploadOverlay);
  document.addEventListener('keydown', closeUploadOverlayOnEscapeKeydown);
  commentsField.addEventListener('keydown', onInputEscapeKeydown);
  hashtagsField.addEventListener('keydown', onInputEscapeKeydown);
}

const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = 'Опубликовать';
};

const setUploadFormSubmit = (form) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    pristine.validate();
    if (pristine.validate()) {
      sendData(new FormData(evt.target))
        .finally(unblockSubmitButton);
    }
  });
};

setupValidation(uploadForm, hashtagsField, commentsField, pristine);
setUploadFormSubmit(uploadForm);

uploadButton.addEventListener('change', openUploadOverlay);

export { closeUploadOverlayOnEscapeKeydown, closeUploadOverlay};
