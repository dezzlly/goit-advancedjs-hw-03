import { fetchImages } from './js/pixabay-api.js';
import { clearGallery, renderGallery, toggleLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';


const refs = {
    form: document.getElementById('search-form'),
    input: document.getElementById('query'),
    gallery: document.getElementById('gallery'),
    loader: document.getElementById('loader'),
};


const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 200,
    animationSpeed: 200,
});


refs.form.addEventListener('submit', onSearchSubmit);


function onSearchSubmit(e) {
    e.preventDefault();
    const query = refs.input.value.trim();


    if (!query) {
        iziToast.warning({
            title: 'Увага',
            message: 'Введіть пошуковий запит.',
            position: 'topRight',
        });
        return;
    }


    toggleLoader(refs.loader, true);
    clearGallery(refs.gallery);


    fetchImages(query)
    .then(data => {
        const { hits = [] } = data || {};


    if (!hits.length) {
        iziToast.info({
            title: 'Немає результатів',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
        });
        return;
    }


    renderGallery(refs.gallery, hits);
    lightbox.refresh();
    })
    .catch(err => {
    iziToast.error({
        title: 'Помилка',
        message: `Не вдалося завантажити зображення. ${err?.message || ''}`,
        position: 'topRight',
    });
    })
    .finally(() => {
    toggleLoader(refs.loader, false);
    });
}