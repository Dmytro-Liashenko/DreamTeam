import { renderFurniture } from './render-function';
import { showLoader, hideLoader } from './loader.js';

export const furnitureList = document.querySelector('.furniture-list');
const categoriesList = document.querySelector('.categories-list');
const loadMoreBtn = document.querySelector('.load-more-btn-furniture');

const noFurnitureMessage = document.querySelector('.no-furniture-message');

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

  if (page === 1) {
    noFurnitureMessage.style.display = 'none';
  }

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

      noFurnitureMessage.style.display = 'block';
      loadMoreBtn.style.display = 'none';
      furnitureList.innerHTML = '';
      totalLoaded = 0;
      return;
    }
    noFurnitureMessage.style.display = 'none';

    totalLoaded += furnitures.length;

    if (totalLoaded >= totalAvailable || furnitures.length < limit) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error('Error loading furniture:', error);
    noFurnitureMessage.style.display = 'block';

    loadMoreBtn.style.display = 'none';

    furnitureList.innerHTML = '';

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
  });
  li.classList.add('active');
  currentActiveCategoryLi = li;

  selectedCategory = li.dataset.categoryId;
  currentPage = 1;
  totalLoaded = 0;
  loadFurniture(currentPage, selectedCategory, previousActiveLi);
});

document.addEventListener('DOMContentLoaded', () => {
  const initialActiveLi =
    categoriesList.querySelector('.active') ||
    categoriesList.querySelector('li[data-category-id]');
  if (initialActiveLi) {
    initialActiveLi.classList.add('active');
    currentActiveCategoryLi = initialActiveLi;
    selectedCategory = initialActiveLi.dataset.categoryId;
  }
  loadFurniture(currentPage, selectedCategory);
});

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  loadFurniture(currentPage, selectedCategory);
});
