import { renderFurniture } from './render-function';
import { getFurnituresID, getFurnituresList } from './products-api';
import { toggleModal } from './Order-Modal';
import { initRatings } from './Feedback-Section';

import Raty from 'raty-js';
import starHalfUrl from "../img/star-icons/star-half.svg"
import starOffUrl from "../img/star-icons/star-off.svg"
import starOnUrl from "../img/star-icons/star-on.svg"

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
          const borderStyle = colorCode === '#fff' ? 'border: 1px solid #ccc' : 'border: 1px solid transparent'

          return `
            <button 
              class="color-button" 
              data-color="${colorCode}"
              style="
                display:inline-block;
                width:32px;
                height:32px;
                background:${colorCode};
                border-radius:50%;
                margin-right:16px;
                border:2px solid transparent;
                cursor:pointer;"
            ></button>`;
        })
        .join('')
    : `<li class="modal-color-item">—</li>`;
};

function initModalRating(score) {
  const ratingContainer = document.querySelector('.product-rating-container');
  if (!ratingContainer) return;

  new Raty(ratingContainer, {
    score: score || 0,
    starSize: 20,
    step: 0.5,
    readOnly: true,
    numberMax: 5,
    precision: false,
    round: { down: 0.3, full: 0.7, up: 0.8 },
    starOn: starOnUrl,
    starHalf: starHalfUrl,
    starOff: starOffUrl,
  }).init();
}



function pickColor() {
  const colorButtons = document.querySelectorAll('.color-button');

  colorButtons.forEach(btn => {
    const color = btn.dataset.color?.toLowerCase();
    if (color === '#fff' || color === 'white') {
      btn.style.border = '1px solid #838584'; 
    } else {
      btn.style.border = '3px solid transparent'; 
    }
  });

  colorButtons.forEach(button => {
    button.addEventListener('click', e => {
      const selectedColor = e.currentTarget.dataset.color.toLowerCase();
      orderData.color = selectedColor;

      colorButtons.forEach(btn => {
        const color = btn.dataset.color?.toLowerCase();
        if (color === '#fff' || color === 'white') {
          btn.style.border = '1px solid #838584';
        } else {
          btn.style.border = '3px solid transparent';
        }
      });

      if (selectedColor === '#fff' || selectedColor === 'white') {
        e.currentTarget.style.border = '2px solid #000'; 
      } else {
        e.currentTarget.style.border = '4px solid #838584'; 
      }
    });
  });
}

function createProductModalMarkup(item) {
  const { name, category, price, description, sizes, color, images,  } = item;

  const galleryMarkup = images
    .map(img => `<img src="${img}" alt="${name}" width="260">`)
    .join('');

  return `
    <div class="product-info-wrapper">
      <div class="modal-gallery-mobile-wrapper">
        ${galleryMarkup}
      </div>
      <div class="furniture-content">
        <h2 class="modal-product-title">${name}</h2>
        <p class="modal-product-category">${category.name}</p>
        <p class="modal-product-price">${price} грн</p>
        <div class="modal-rating-wrapper">
        <div class="product-rating-container small"></div>
        </div>
        <div class="modal-product-details">
        <h3 class="modal-detail-heading">Колір</h3>
        <ul class="modal-color-list">${colorMarkup(color)}</ul>
        <p class="modal-product-description">${description}</p>
        <p class="modal-product-size">Розміри: ${sizes}</p>
        </div>
        <button type="button" class="modal-order-btn">Перейти до замовлення</button>
      </div>
    </div>
  `;
}

export function openProductModal() {
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

export function setupModalListeners() {
  modalRefs.closeBtn.addEventListener('click', closeProductModal);

  modalRefs.overlay.addEventListener('click', e => {
    if (e.target === modalRefs.overlay) closeProductModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProductModal();
  });
}

export async function handleCardClick(e) {
  const btn = e.target.closest('[data-id]');
  if (!btn) return;

  const id = btn.dataset.id;
  orderData.modelId = id

  try {
    const data = await getFurnituresID(id);

    modalRefs.contentWrapper.innerHTML = createProductModalMarkup(data);
    pickColor();
    initModalRating(data.rate)

    const orderBtn = modalRefs.contentWrapper.querySelector('.modal-order-btn');
    if (orderBtn) {
      orderBtn.addEventListener('click', () => {
        toggleModal();
        closeProductModal()
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
    setupCardOpenButtons()
  } catch (err) {
    console.error('Init error:', err);
  }
}

init();