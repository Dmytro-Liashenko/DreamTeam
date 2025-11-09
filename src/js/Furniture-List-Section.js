import { getFurnituresList } from './products-api';
import { renderFurniture } from './render-function';

export const furnitureList = document.querySelector('.furniture-list');
const categoriesList = document.querySelector('.categories-list-item');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage = 1;
const limit = 8;
let totalLoaded = 0;
let totalAvailable = 0;
let selectedCategory = null;

async function loadFurniture(page = 1, categoryId = null) {
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

    totalLoaded += furnitures.length;

    if (totalLoaded >= totalAvailable || furnitures.length < limit) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error('Error loading furniture:', error);
  }
}

categoriesList.addEventListener('click', e => {
  const li = e.target.closest('li[data-category-id]');
  if (!li) return;

  selectedCategory = li.dataset.categoryId;
  currentPage = 1;
  totalLoaded = 0;

  loadFurniture(currentPage, selectedCategory);
});

loadFurniture();

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  loadFurniture(currentPage, selectedCategory);
});

const categories = document.querySelectorAll('.img-categories');

categories.forEach(cat => {
  cat.addEventListener('click', () => {
    categories.forEach(c => c.classList.remove('active'));
    cat.classList.add('active');
  });
});

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  loadFurniture(currentPage, selectedCategory);
});
