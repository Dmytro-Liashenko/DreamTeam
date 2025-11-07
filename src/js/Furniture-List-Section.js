import { getFurnituresList } from './products-api';

const BASE_URL = 'https://furniture-store-v2.b.goit.study/api';
const loadMoreBtn = document.querySelector('.load-more-btn');
const categoriesContainer = document.querySelector('.categories-list');
const furnitureList = document.querySelector('.furniture-list');

let currentPage = 1;
let selectedCategory = '';
let allFurnitures = [];

document.addEventListener('DOMContentLoaded', initFurnitureSection);

async function initFurnitureSection() {
  try {
    const furnitures = await getFurnituresList();
    allFurnitures = furnitures;

    renderFurniture(furnitures.slice(0, 6));
  } catch (error) {
    console.error('❌ Помилка запиту до API:', error);
  }
}

function renderFurniture(items) {
  const markup = items
    .map(({ _id, images, name, color, price }) => {
      const imageSrc =
        images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image';

      const colorDots = Array.isArray(color)
        ? color
            .map(
              c => `
                <span class="color-dot" 
                      style="background:${c}" 
                      title="${c}">
                </span>`
            )
            .join('')
        : '<span>—</span>';

      return `
          <li class="furniture-card" data-id="${_id}">
            <img src="${imageSrc}" alt="${name}" width="300" height="200" loading="lazy" />
            <h3>${name}</h3>
            <div class="color-list">
              <span>Кольори:</span> ${colorDots}
            </div>
            <p>Ціна: ${price} ₴</p>
          </li>`;
    })
    .join('');

  furnitureList.insertAdjacentHTML('beforeend', markup);
}

function clearFurniture() {
  furnitureList.innerHTML = '';
}

loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  currentPage++;
  const start = (currentPage - 1) * 8;
  const end = currentPage * 8;
  const nextItems = allFurnitures.slice(start, end);

  if (nextItems.length === 0) {
    loadMoreBtn.style.display = 'none';
    return;
  }

  renderFurniture(nextItems);
}
