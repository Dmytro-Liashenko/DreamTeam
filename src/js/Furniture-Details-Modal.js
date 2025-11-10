import { renderFurniture } from "./render-function";
import { getFurnituresID, getFurnituresList } from './products-api';

const modalRefs = {
  overlay: document.querySelector('[data-modal-item]'),
  darkOverlay: document.querySelector('#menu-overlay'),
  closeBtn: document.querySelector('[data-modal-close]'),
  contentWrapper: document.querySelector('.modal-content-wrapper'),
  furnitureList: document.querySelector('.furniture-list'),
};
/*
function roundRating(rawRating) {
  if (typeof rawRating !== 'number' || isNaN(rawRating)) {
    return 0;
  }
  if (rawRating >= 3.3 && rawRating <= 3.7) {
    return 3.5;
  } else if (rawRating >= 3.8 && rawRating <= 4.2) {
    return 4.0;
  }
  return Math.round(rawRating * 2) / 2;
}
*/

function createProductModalMarkup(item) {
  const { name, category, price, description, sizes, color, images } = item;
  const galleryMarkup = images
    .map(img => `<img src="${img}" alt="${name}" width="260">`)
    .join('');
  const colorMarkup = Array.isArray(color)
    ? color
        .map(c => {
          const colorCode = c.hex || c;
          return `
 <span
style="display:inline-block;width:32px;height:32px;background:${colorCode};border-radius:50%;margin-right:16px"></span>`;
        })
        .join('')
    : `<li class="modal-color-item">—</li>`;
  return `
    <div class="product-info-wrapper">
        <div class="modal-gallery-mobile-wrapper">
            ${galleryMarkup}
        </div>
        <h2 class="modal-product-title">${name}</h2>
        <p class="modal-product-category">${category.name}</p>
        <p class="modal-product-price">${price} грн</p>
        <div class="modal-rating-wrapper">
              <div id="product-rating-container"></div>
        </div>
        <div class="modal-product-details">
            <h3 class="modal-detail-heading">Колір</h3>
            <ul class="modal-color-list">${colorMarkup}
            </ul>
            <p class="modal-product-description">${description}</p>
            <p class="modal-product-size">Розміри: ${sizes}</p>
        </div>
        <button type="button" class="modal-order-btn">Перейти до замовлення</button>
    </div>`;
}
    
function openProductModal() {
  modalRefs.overlay.classList.add('is-open');
  document.body.classList.add('modal-open');
  document.darkOverlay.classList.add('is-visible');
}
function closeProductModal() {
  modalRefs.overlay.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  document.darkOverlay.classList.remove('is-visible');
  modalRefs.contentWrapper.innerHTML = '';
}
function setupModalListeners() {
  modalRefs.closeBtn.addEventListener('click', closeProductModal);
  modalRefs.overlay.addEventListener('click', e => {
    if (e.target === modalRefs.overlay) closeProductModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProductModal();
  });
}

async function handleCardClick(e) {
  const btn = e.target.closest('.item-btn');
  if (!btn) return;
  const id = btn.dataset.id;
  try {
    const data = await getFurnituresID(id);
    modalRefs.contentWrapper.innerHTML = createProductModalMarkup(data);
    openProductModal();
    /*
    const finalRating = roundRating(data.rating);
    const ratingInstance = new Raty(
      document.getElementById('product-rating-container'),
      {
        starType: 'i',
        starOff: 'icon-star',
        starOn: 'icon-vector',
        starHalf: 'icon-vector-1',
        score: finalRating,
        readOnly: true,
        number: 5,
      }
    );
    ratingInstance.init();
    */
  } catch (error) {
    console.error('Failed to open modal:', error);
  }
}
export function setupCardOpenButtons() {
  modalRefs.furnitureList.addEventListener('click', handleCardClick);
  setupModalListeners();
}
async function init() {
  try {
    const items = await getFurnituresList();
    renderFurniture(items, true);
    setupCardOpenButtons();
  } catch (err) {
    console.error('Init error:', err);
  }
}
init();