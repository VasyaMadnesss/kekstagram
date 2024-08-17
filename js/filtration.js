import { debounce } from './util.js';
import { renderGallery } from './gallery.js';

const DEBOUNCE_TIME = 500;

let selectedFilter = 'default';

const renderDebounced = (data, filter) => debounce(() => renderGallery(data, filter), DEBOUNCE_TIME)();

const imageFiltersElement = document.querySelector('.img-filters');
const defaultFilterButtonElement = document.querySelector('#filter-default');
const randomFilterButtonElement = document.querySelector('#filter-random');
const discussedFilterButtonElement = document.querySelector('#filter-discussed');

const toggleActiveClass = (evt) => {
  document.querySelector(`#filter-${selectedFilter}`).classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const setupFiltration = (receivedData) => {
  imageFiltersElement.classList.remove('img-filters--inactive');
  imageFiltersElement.addEventListener('click', (evt) => {
    switch (evt.target) {
      case defaultFilterButtonElement:
        toggleActiveClass(evt);
        selectedFilter = 'default';
        renderDebounced(receivedData, selectedFilter);
        break;
      case randomFilterButtonElement:
        toggleActiveClass(evt);
        selectedFilter = 'random';
        renderDebounced(receivedData, selectedFilter);
        break;
      case discussedFilterButtonElement:
        toggleActiveClass(evt);
        selectedFilter = 'discussed';
        renderDebounced(receivedData, selectedFilter);
        break;
    }
  });
};

export { setupFiltration };
