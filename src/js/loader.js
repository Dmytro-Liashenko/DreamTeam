const globalLoader = document.getElementById('global-loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

export function showLoader(isLoadMore = false) {
    if (globalLoader) {
        globalLoader.classList.remove('hidden');
    }

    if (isLoadMore) {
        if (loadMoreBtn) {
            loadMoreBtn.classList.add('loading');
        }
    }
}

export function hideLoader() {
    if (globalLoader) {
        globalLoader.classList.add('hidden');
    }
    if (loadMoreBtn) {
        loadMoreBtn.classList.remove('loading');
    }
}