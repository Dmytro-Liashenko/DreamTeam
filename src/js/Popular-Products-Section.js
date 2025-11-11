import Swiper from 'swiper/bundle';
import 'swiper/css';
import { getPopularItems } from './products-api.js';
import { colorMarkup, handleCardClick } from './Furniture-Details-Modal.js';

const wrapper = document.getElementById('popular-products-wrapper');
let currentPage = 1;
let swiper;

function createSlideMarkup(products) {
  return products
    .map(
      product => `
    <div class="swiper-slide">
      <img src="${product.images[0]}" alt="${product.name}" 
            style="width:100%; height:256px; object-fit:cover; border-radius:8px;" />
      <h3 class="product-name">${product.name}</h3>
      <p>
        ${colorMarkup(product.color)}
      </p>
      <p class="product-price">${product.price} грн</p>
      <a class="more-info" data-id="${product._id}">Детальніше</a>
    </div>
  `
    )
    .join('');
}

function addSlidesToSwiper(products) {
  if (!swiper) {
    wrapper.innerHTML = createSlideMarkup(products);
    swiper = new Swiper('.popular-swiper', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: '.popular-button-next',
        prevEl: '.popular-button-prev',
        disabledClass: 'disabled-nav',
      },
      pagination: {
        el: '.popular-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1440: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },
    });

    const prevBtn = document.querySelector('.popular-button-prev');
    const nextBtn = document.querySelector('.popular-button-next');
    const updateNavButtons = () => {
      prevBtn.classList.toggle('disabled-nav', swiper.isBeginning);
      nextBtn.classList.toggle('disabled-nav', swiper.isEnd);
    };
    swiper.on('slideChange', updateNavButtons);
    swiper.on('init', updateNavButtons);
    updateNavButtons();
  } else {
    products.forEach(product => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      slide.innerHTML = createSlideMarkup([product]);
      swiper.appendSlide(slide);
    });
    swiper.update();
  }

  wrapper.querySelectorAll('.more-info').forEach(btn => {
    btn.addEventListener('click', handleCardClick);
  });
}

async function loadPopularFurniture(page = 1) {
  try {
    const products = await getPopularItems(page);
    if (!products || products.length === 0) return;
    addSlidesToSwiper(products);
  } catch (err) {
    console.error('Помилка завантаження популярних товарів:', err);
    wrapper.innerHTML = '<p>Не вдалося завантажити популярні товари.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPopularFurniture(currentPage);

  document
    .querySelector('.popular-button-next')
    .addEventListener('click', async () => {
      currentPage++;
      await loadPopularFurniture(currentPage);
      swiper.slideNext();
    });

  document
    .querySelector('.popular-button-prev')
    .addEventListener('click', () => {
      swiper.slidePrev();
    });
});
