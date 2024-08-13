import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {

  while (document.querySelector('.picture')) {
    document.querySelector('.picture').remove();
  }
  renderThumbnails(pictures, container);

  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('.picture');
    if (thumbnail) {
      evt.preventDefault();
      const picture = pictures.find((item) => String(item.id) === evt.target.closest('.picture').dataset.thumbnailId);
      openBigPicture(picture);
    }
  });

};

export { renderGallery };
