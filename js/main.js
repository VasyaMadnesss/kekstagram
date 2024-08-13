import { renderGallery } from './gallery.js';
import { getData } from './api.js';
import './upload-form.js';

import { debounce } from './util.js';

import { getRandomInteger } from './util.js';

getData(renderGallery).then((result) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  document.querySelector('#filter-default').addEventListener('click', (evt) => {
    evt.target.classList.add('img-filters__button--active');
    document.querySelector('#filter-random').classList.remove('img-filters__button--active');
    document.querySelector('#filter-discussed').classList.remove('img-filters__button--active');
    debounce(() => renderGallery(result), 500)();
  });

  document.querySelector('#filter-random').addEventListener('click', (evt) => {
    evt.target.classList.add('img-filters__button--active');
    document.querySelector('#filter-default').classList.remove('img-filters__button--active');
    document.querySelector('#filter-discussed').classList.remove('img-filters__button--active');
    debounce(() => renderGallery(result.slice().sort(() => getRandomInteger(-1, 1)).slice(0, 10)), 500)();
  });

  document.querySelector('#filter-discussed').addEventListener('click', (evt) => {
    evt.target.classList.add('img-filters__button--active');
    document.querySelector('#filter-default').classList.remove('img-filters__button--active');
    document.querySelector('#filter-random').classList.remove('img-filters__button--active');
    debounce(() => renderGallery(result.slice().sort((a, b) => b.comments.length - a.comments.length)), 500)();
  });
});

