import { creatGalleryCard } from './js/render-functions';
import { photoApi } from './js/pixabay-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  formEl: document.querySelector('.form'),
  galleryEl: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.loader'),
  loadMoreEl: document.querySelector('.load-more-btn'),
};

const galleryLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let currentPage = 1;
let searchedQuery = '';

const toSearchSubmit = async event => {
  try {
    event.preventDefault();

    const { target: searchForm } = event;

    searchedQuery = searchForm.elements.user_query.value;

    if (searchedQuery === '') {
      iziToast.error({
        title: '',
        message: 'The field is empty.<br>Please enter something to continue.',
        position: 'topRight',
      });
      refs.galleryEl.innerHTML = '';
      return;
    }

    refs.loaderEl.classList.add('active');

    refs.loadMoreEl.classList.add('is-hiden');

    currentPage = 1;

    const { data } = await photoApi(searchedQuery, currentPage);

    if (data.total === 0) {
      iziToast.error({
        title: '',
        message:
          'Sorry, there are no images matching<br>your search query. Please try again!',
        position: 'topRight',
      });
      refs.galleryEl.innerHTML = '';
      return;
    }

    if (data.totalHits > 1) {
      refs.loadMoreEl.classList.remove('is-hiden');
      refs.loadMoreEl.addEventListener('click', loadMoreBtn);
    }

    const galleryCreat = data.hits
      .map(pictureInfo => creatGalleryCard(pictureInfo))
      .join('');

    refs.galleryEl.innerHTML = galleryCreat;

    galleryLightBox.refresh();

    searchForm.reset();
  } catch (error) {
    console.log('Fetch error:', error);
  }
};

const loadMoreBtn = async event => {
  try {
    currentPage++;

    const { data } = await photoApi(searchedQuery, currentPage);

    const galleryCreat = data.hits
      .map(pictureInfo => creatGalleryCard(pictureInfo))
      .join('');

    refs.galleryEl.insertAdjacentHTML('beforeend', galleryCreat);

    galleryLightBox.refresh();

    if (data.hits.length < 15) {
      refs.loadMoreEl.classList.add('is-hiden');
      iziToast.info({
        title: '',
        message:
          "We're sorry, but you've reached<br>the end of search results.",
        position: 'topRight',
      });
      refs.loadMoreEl.removeEventListener('click', loadMoreBtn);
    }

    const firstCard = document.querySelector('.gallery-item');
    const cardHeight = firstCard.getBoundingClientRect().height;

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log('Fetch error:', error);
  }
};

refs.formEl.addEventListener('submit', toSearchSubmit);
