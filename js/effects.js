const SLIDER_OPTIONS = {
  none: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower'
  },
  chrome: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    connect: 'lower'
  },
  sepia: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    connect: 'lower'
  },
  marvin: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower' },
  phobos: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    connect: 'lower'
  },
  heat: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    connect: 'lower'
  }
};

const PICTURE_EFFECTS = {
  none: () => 'none',
  chrome: (value) => `grayscale(${value})`,
  sepia: (value) => `sepia(${value})`,
  marvin: (value) => `invert(${value}%)`,
  phobos: (value) => `blur(${value}px)`,
  heat: (value) => `brightness(${value})`
};

const effectLevelField = document.querySelector('.effect-level');
const sliderElement = effectLevelField.querySelector('.effect-level__slider');
const effectValue = effectLevelField.querySelector('.effect-level__value');
const effectedImg = document.querySelector('.img-upload__preview > img');
const effectsList = document.querySelector('.effects__list');

let selectedEffect = 'none';
let isSliderInitialized = false;

const initializeSlider = () => {
  effectLevelField.classList.add('hidden');
  if (!isSliderInitialized) {
    noUiSlider.create(sliderElement, SLIDER_OPTIONS[selectedEffect]);
    isSliderInitialized = true;
  }

  sliderElement.noUiSlider.on('update', () => {
    const value = Number(sliderElement.noUiSlider.get());
    effectValue.value = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
    effectedImg.style.filter = PICTURE_EFFECTS[selectedEffect](value);
  });

  effectsList.addEventListener('change', onEffectApply);
};

function onEffectApply (evt) {
  const inputElement = evt.target.closest('input[type="radio"]');

  if (inputElement) {
    const chosenFilter = inputElement.value;
    selectedEffect = chosenFilter;
    effectedImg.style.filter = PICTURE_EFFECTS[chosenFilter](SLIDER_OPTIONS[chosenFilter].start);

    sliderElement.noUiSlider.updateOptions(SLIDER_OPTIONS[chosenFilter]);
    sliderElement.noUiSlider.set(SLIDER_OPTIONS[chosenFilter].start);

    if (chosenFilter === 'none') {
      effectLevelField.classList.add('hidden');
    } else {
      effectLevelField.classList.remove('hidden');
    }
  }
}

const destroySlider = () => {
  if (isSliderInitialized) {
    sliderElement.noUiSlider.destroy();
    selectedEffect = 'none';
    isSliderInitialized = false;
    effectsList.removeEventListener('change', onEffectApply);
  }
};

export { initializeSlider, destroySlider };
