const API_KEY = '52905819-433962418f10cc5e4a65a61ca';
const BASE_URL = 'https://pixabay.com/api/';


function buildUrl(query) {
const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '40'
    });
    return `${BASE_URL}?${params.toString()}`;
}



export function fetchImages(query) {
    const url = buildUrl(query);


    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .catch(err => {
            throw err;
        });
}