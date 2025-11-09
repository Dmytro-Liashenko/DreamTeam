import { getFurnituresList } from './products-api';

const furnitureList = document.querySelector('.furniture-list');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage = 1;
const limit = 8;
let totalLoaded = 0;
let totalAvailable = 0;

async function loadFurniture(page = 1) {
  try {
    const response = await fetch(
      `https://furniture-store-v2.b.goit.study/api/furnitures?page=${page}&limit=${limit}`
    );
    const data = await response.json();

    const furnitures = data.furnitures;
    totalAvailable = data.total;

    renderFurniture(furnitures);

    totalLoaded += furnitures.length;
    console.log(`Завантажено: ${totalLoaded}/${totalAvailable}`);

    if (totalLoaded >= totalAvailable) {
      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    console.error('❌ Помилка при завантаженні меблів:', error);
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
            <img class="img-card" src="${imageSrc}" alt="${name}" width="300" height="200" loading="lazy" />
            <h3>${name}</h3>
            <div class="color-list">
              <span>Кольори:</span> ${colorDots}
            </div>
            <p>Ціна: ${price} ₴</p>
            <button class="btn-card">Детальніше</button>
             </li>`;
    })
    .join('');

  furnitureList.insertAdjacentHTML('beforeend', markup);
}

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  loadFurniture(currentPage);
});

loadFurniture();
const categories = document.querySelectorAll('.img-categories');

categories.forEach(cat => {
  cat.addEventListener('click', () => {
    // При кліку знімаємо "active" з усіх, а додаємо тільки поточному
    categories.forEach(c => c.classList.remove('active'));
    cat.classList.add('active');
  });
});
