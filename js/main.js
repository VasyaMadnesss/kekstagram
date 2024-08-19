import { getData } from './api.js';
import { renderGallery } from './gallery.js';
import { showLoadError as showDataLoadError } from './popups.js';
import { setupFiltration } from './filtration.js';
import { setupForm } from './form.js';

getData(renderGallery, showDataLoadError).then((result) => setupFiltration(result));

setupForm();
