import './upload-form.js';
import { getData } from './api.js';
import { renderGallery } from './gallery.js';
import { showDataLoadError } from './popups.js';
import { setupFiltration } from './filtration.js';

getData(renderGallery, showDataLoadError).then((result) => setupFiltration(result));
