import { renderFurniture } from './render-function';
import { showLoader, hideLoader } from './loader.js';
import iziToast from 'izitoast';

export const furnitureList = document.querySelector('.furniture-list');
const categoriesList = document.querySelector('.categories-list');
const loadMoreBtn = document.querySelector('.load-more-btn-furniture');

let currentPage = 1;
const limit = 8;
let totalLoaded = 0;
let totalAvailable = 0;
let selectedCategory = null;

let currentActiveCategoryLi = null;

async function loadFurniture(
  page = 1,
  categoryId = null,
  previousActiveLi = null
) {
  showLoader(page > 1);

  try {
    let url = `https://furniture-store-v2.b.goit.study/api/furnitures?page=${page}&limit=${limit}`;

    if (categoryId && categoryId !== 'all') {
      url += `&category=${categoryId}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const furnitures = data.furnitures;

    totalAvailable = data.total;

    renderFurniture(furnitures, page === 1);

    if (page === 1 && totalAvailable === 0) {
      if (currentActiveCategoryLi) {
        currentActiveCategoryLi.classList.remove('active');
      }

      if (previousActiveLi) {
        previousActiveLi.classList.add('active');
        currentActiveCategoryLi = previousActiveLi;
      } else {
        currentActiveCategoryLi = null;
      }

      loadMoreBtn.style.display = 'none';
      furnitureList.innerHTML = '';
      totalLoaded = 0;

      return;
    }

    totalLoaded += furnitures.length;

    if (totalLoaded >= totalAvailable || furnitures.length < limit) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error('Error loading furniture:', error);

    loadMoreBtn.style.display = 'none';

    furnitureList.innerHTML = '';

    iziToast.error({
      title: 'Помилка',
      message:
        'Не вдалося завантажити товари. Перевірте інтернет-зʼєднання або спробуйте пізніше.',
      position: 'topRight',
      timeout: 5000,
      backgroundColor: '#6b0609',
      messageColor: '#fff',
      titleColor: '#fff',
      icon: 'fa-solid fa-triangle-exclamation',
      progressBarColor: '#fff',
      transitionIn: 'fadeInDown',
      transitionOut: 'fadeOutUp',
    });

    if (previousActiveLi) {
      currentActiveCategoryLi.classList.remove('active');
      previousActiveLi.classList.add('active');
      currentActiveCategoryLi = previousActiveLi;
    }
  } finally {
    hideLoader();
  }
}

categoriesList.addEventListener('click', e => {
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  window.scrollBy({
    top: 1200,
    behavior: "smooth",
  });
}

  const li = e.target.closest('li[data-category-id]');
  if (!li) return;
  const previousActiveLi = currentActiveCategoryLi;

  categoriesList.querySelectorAll('li[data-category-id]').forEach(el => {
    el.classList.remove('active');
    const img = el.querySelector('.img-categories');
    if (img) img.classList.remove('active');
  });

  li.classList.add('active');
  const img = li.querySelector('.img-categories');
  if (img) img.classList.add('active');

  currentActiveCategoryLi = li;

  selectedCategory = li.dataset.categoryId;
  currentPage = 1;
  totalLoaded = 0;
  loadFurniture(currentPage, selectedCategory, previousActiveLi);
});

document.addEventListener('DOMContentLoaded', () => {
  let initialActiveLi =
    categoriesList.querySelector('.active') ||
    categoriesList.querySelector('li[data-category-id]');

  if (!initialActiveLi) {
    initialActiveLi = categoriesList.querySelector('li[data-category-id]');
  }

  if (initialActiveLi) {
    initialActiveLi.classList.add('active');
    currentActiveCategoryLi = initialActiveLi;
    selectedCategory = initialActiveLi.dataset.categoryId;
  } else {
    selectedCategory = 'all';
  }

  loadFurniture(currentPage, selectedCategory);
});

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  loadFurniture(currentPage, selectedCategory);
});
