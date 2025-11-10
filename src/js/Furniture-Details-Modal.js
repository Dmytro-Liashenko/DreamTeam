import { renderFurniture } from './render-function';
import { getFurnituresID, getFurnituresList } from './products-api';
import { toggleModal } from './Order-Modal';

const modalRefs = {
  overlay: document.querySelector('[data-modal-item]'),
  darkOverlay: document.querySelector('#menu-overlay'),
  closeBtn: document.querySelector('[data-modal-close-furniture]'),
  contentWrapper: document.querySelector('.modal-content-wrapper'),
  furnitureList: document.querySelector('.furniture-list'),
};

export const orderData = {
  modelId: null,
  color: null,
};

export const colorMarkup = color => {
  return Array.isArray(color)
    ? color
        .map(c => {
          const colorCode = c.hex || c;
          return `<span style="display:inline-block;width:32px;height:32px;background:${colorCode};border-radius:50%;margin-right:16px"></span>`;
        })
        .join('')
    : `<li class="modal-color-item">—</li>`;
};

function createProductModalMarkup(item) {
  const { name, category, price, description, sizes, color, images } = item;

  const galleryMarkup = images
    .map(img => `<img src="${img}" alt="${name}" width="260">`)
    .join('');

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
        <ul class="modal-color-list">${colorMarkup(color)}</ul>
        <p class="modal-product-description">${description}</p>
        <p class="modal-product-size">Розміри: ${sizes}</p>
      </div>
      <button type="button" class="modal-order-btn">Перейти до замовлення</button>
    </div>
  `;
}

function openProductModal() {
  modalRefs.overlay.classList.add('is-open');
  modalRefs.darkOverlay.classList.add('is-visible');
  document.body.classList.add('modal-open');
}

function closeProductModal() {
  modalRefs.overlay.classList.remove('is-open');
  modalRefs.darkOverlay.classList.remove('is-visible');
  document.body.classList.remove('modal-open');
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

    const orderBtn = modalRefs.contentWrapper.querySelector('.modal-order-btn');
    if (orderBtn) {
      orderBtn.addEventListener('click', () => {
        toggleModal();
      });
    }

    openProductModal();
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
