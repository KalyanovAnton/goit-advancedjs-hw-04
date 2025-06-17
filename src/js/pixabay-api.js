import axios from 'axios';

const refs = {
  loaderEl: document.querySelector('.loader'),
};

axios.defaults.baseURL = 'https://pixabay.com';

axios.interceptors.response.use(
  function (response) {
    refs.loaderEl.classList.remove('active')
    return response;
  },
  function (error) {
    refs.loaderEl.classList.remove('active')
    return Promise.reject(error);
  }
);

export const photoApi = (searchedQuery, currentPage) => {
  const requstParams = {
    key: '50834675-61314f789662a68656002458b',
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: currentPage,
    per_page: 15,
  };
  return axios.get(`/api/`, { params: requstParams });
};
