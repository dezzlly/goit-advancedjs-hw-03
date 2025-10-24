import axios from 'axios';

const API_KEY = '52905819-433962418f10cc5e4a65a61ca';
const BASE_URL = 'https://pixabay.com/api/';


export function fetchImages(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

  return axios
    .get(BASE_URL, { params })
    .then(res => res.data);
}