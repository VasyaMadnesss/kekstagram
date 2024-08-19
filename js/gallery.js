import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import { getRandomInteger } from './util.js';

const container = document.querySelector('.pictures');

const compareRandom = () => getRandomInteger(-1, 1);
const compareDiscussed = (elementA, elementB) => elementB.comments.length - elementA.comments.length;
let isPicturesRendered = false;

const renderGallery = (pictures, sortingMethod = 'none') => {

  let sortedPictures = [];
  switch (sortingMethod) {
    case 'random':
      sortedPictures = JSON.parse(JSON.stringify(pictures)).sort(compareRandom).slice(0, 10);
      break;
    case 'discussed':
      sortedPictures = JSON.parse(JSON.stringify(pictures)).sort(compareDiscussed);
      break;
    default:
      sortedPictures = pictures;
  }

  while (document.querySelector('.picture')) {
    document.querySelector('.picture').remove();
  }

  renderThumbnails(sortedPictures, container);

  const onPicturesContainerClick = (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (thumbnail) {
      evt.preventDefault();
      const picture = sortedPictures.find((pictureItem) => String(pictureItem.id) === evt.target.closest('.picture').dataset.thumbnailId);
      openBigPicture(picture);
    }
  };

  if (!isPicturesRendered) {
    container.addEventListener('click', onPicturesContainerClick);
    isPicturesRendered = true;
  }
};

export { renderGallery };
