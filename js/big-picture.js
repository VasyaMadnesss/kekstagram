const COMMENTS_DOSE = 5;

const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = document.querySelector('#picture-cancel');
const imageElement = bigPictureElement.querySelector('img');
const likesElement = bigPictureElement.querySelector('.likes-count');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const commentsLoadButtonElement = bigPictureElement.querySelector('.comments-loader');
const totalCommentsElement = bigPictureElement.querySelector('.social__comment-total-count');
const shownCommentsElement = bigPictureElement.querySelector('.social__comment-shown-count');

let loadedComments = 0;
let comments = [];

const onDocumentKeydown = (evt) => {
  if(evt.key === 'Escape') {
    closeBigPicture();
  }
};

const createComment = ({avatar, message, name}) => {
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__text').textContent = message;
  comment.querySelector('.social__picture').alt = name;
  return comment;
};

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const futureShownCommentsLength = loadedComments + COMMENTS_DOSE;
  for (let i = loadedComments; i < futureShownCommentsLength; i++) {
    if (comments[i] !== undefined) {
      const comment = createComment(comments[i]);
      fragment.append(comment);
      loadedComments += 1;
    }
  }
  commentsContainerElement.append(fragment);
  shownCommentsElement.textContent = document.querySelector('.social__comments').children.length;
  if(shownCommentsElement.textContent === totalCommentsElement.textContent) {
    commentsLoadButtonElement.classList.add('hidden');
  } else {
    commentsLoadButtonElement.classList.remove('hidden');
  }
};

const onCommentsLoadButtonClick = () => {
  renderComments();
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

const removeEventListeners = () => {
  commentsLoadButtonElement.removeEventListener('click', onCommentsLoadButtonClick);
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const addEventListeners = () => {
  commentsLoadButtonElement.addEventListener('click', onCommentsLoadButtonClick);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const getPictureDetails = (picture) => {
  imageElement.src = picture.url;
  imageElement.alt = picture.description;
  likesElement.textContent = picture.likes;
  descriptionElement.textContent = picture.description;
  totalCommentsElement.textContent = picture.comments.length;
};

function closeBigPicture () {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  removeEventListeners();
  commentsContainerElement.innerHTML = '';
  loadedComments = 0;
}

const openBigPicture = (picture) => {
  comments = picture.comments;
  bigPictureElement.classList.remove('hidden');
  addEventListeners();
  document.body.classList.add('modal-open');
  commentsContainerElement.innerHTML = '';
  getPictureDetails(picture);
  renderComments();
};

export { openBigPicture };
