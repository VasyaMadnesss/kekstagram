import { debounce } from './util.js';
import { showDataLoadError } from './popups.js';
import { renderGallery } from './gallery.js';
import { getData } from './api.js';

const DEBOUNCE_TIME = 500;

let receivedData = [];
let selectedFilter = 'default';

const renderDefault = debounce(() => renderGallery(receivedData), DEBOUNCE_TIME);
const renderRandom = debounce(() => renderGallery(receivedData, 'random'), DEBOUNCE_TIME);
const renderDiscussed = debounce(() => renderGallery(receivedData, 'discussed'), DEBOUNCE_TIME);

const imageFiltersElement = document.querySelector('.img-filters');
const defaultFilterButtonElement = document.querySelector('#filter-default');
const randomFilterButtonElement = document.querySelector('#filter-random');
const discussedFilterButtonElement = document.querySelector('#filter-discussed');

getData(renderGallery, showDataLoadError).then((result) => {
  receivedData = result;
  imageFiltersElement.classList.remove('img-filters--inactive');

  imageFiltersElement.addEventListener('click', (evt) => {
    switch (evt.target) {
      case defaultFilterButtonElement:
        document.querySelector(`#filter-${selectedFilter}`).classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
        selectedFilter = 'default';
        renderDefault();
        break;
      case randomFilterButtonElement:
        document.querySelector(`#filter-${selectedFilter}`).classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
        selectedFilter = 'random';
        renderRandom();
        break;
      case discussedFilterButtonElement:
        document.querySelector(`#filter-${selectedFilter}`).classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
        selectedFilter = 'discussed';
        renderDiscussed();
        break;
    }
  });
});
