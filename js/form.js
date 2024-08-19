import { setupValidation } from './form-validation.js';
import { initializeScale, destroyScale } from './scale.js';
import { initializeSlider, destroySlider } from './effects.js';
import { sendData } from './api.js';
import { showSendError as showDataSendError, showSuccessPopup } from './popups.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadButton = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const overlayCloseButton = document.querySelector('.img-upload__cancel');
const effectsPreview = document.querySelectorAll('.effects__preview');

const uploadForm = document.querySelector('.img-upload__form');
const uploadSubmitButton = document.querySelector('.img-upload__submit');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const commentsField = uploadForm.querySelector('.text__description');

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const onDocumentEscapeKeydown = (evt) => {
  if(evt.key === 'Escape') {
    closeForm();
  }
};

const onInputEscapeKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onOverlayCloseButtonClick = () => {
  closeForm();
};

const removeEventListeners = () => {
  overlayCloseButton.removeEventListener('click', onOverlayCloseButtonClick);
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  commentsField.removeEventListener('keydown', onInputEscapeKeydown);
  hashtagsField.removeEventListener('keydown', onInputEscapeKeydown);
};

const addEventListeners = () => {
  overlayCloseButton.addEventListener('click', onOverlayCloseButtonClick);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
  commentsField.addEventListener('keydown', onInputEscapeKeydown);
  hashtagsField.addEventListener('keydown', onInputEscapeKeydown);
};

function closeForm () {
  uploadForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadButton.value = '';
  destroyScale();
  destroySlider();
  removeEventListeners();
}

const showSelectedPicture = (evt) => {
  const selectedFile = evt.target.files[0];
  const fileName = selectedFile.name.toLowerCase();
  const imgPreview = document.querySelector('.img-upload__preview > img');
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (selectedFile && matches) {
    imgPreview.src = URL.createObjectURL(selectedFile);
  }
  for (const effect of effectsPreview) {
    effect.style.backgroundImage = `url('${imgPreview.src}')`;
  }
};

const openForm = (evt) => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initializeScale();
  initializeSlider();
  showSelectedPicture(evt);
  addEventListeners();
};

const onUploadInputChange = (evt) => {
  openForm(evt);
};

const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = 'Опубликовать';
};

const setupForm = () => {
  uploadButton.addEventListener('change', onUploadInputChange);
  setupValidation(hashtagsField, commentsField, pristine);
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(uploadForm), showSuccessPopup, showDataSendError)
        .finally(unblockSubmitButton);
    }
  });
};

export { onDocumentEscapeKeydown, closeForm, setupForm};
