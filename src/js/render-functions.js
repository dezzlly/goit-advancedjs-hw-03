export function clearGallery(container) {
    container.innerHTML = '';
}

export function renderGallery(container, items) {
    const markup = items
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <li class="card">
        <a href="${largeImageURL}" class="card-link" aria-label="Відкрити зображення у повному розмірі">
        <img class="card-thumb" src="${webformatURL}" alt="${escapeHtml(tags)}" loading="lazy" />
        </a>
        <ul class="meta">
        <li><span>Likes</span><b>${likes}</b></li>
        <li><span>Views</span><b>${views}</b></li>
        <li><span>Comments</span><b>${comments}</b></li>
        <li><span>Downloads</span><b>${downloads}</b></li>
        </ul>
        </li>`;
    })
    .join('');

    container.insertAdjacentHTML('beforeend', markup);
}

export function toggleLoader(loaderEl, visible) {
    loaderEl.classList.toggle('is-hidden', !visible);
}

function escapeHtml(str = '') {
    return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}