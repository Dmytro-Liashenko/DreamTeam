import Swiper from 'swiper/bundle';
import 'swiper/css';
import { getPopularItems } from './products-api.js';

const wrapper = document.getElementById('popular-products-wrapper');
let currentPage = 1;
let swiper;


function createSlideMarkup(products) {
  return products.map(product => `
    <div class="swiper-slide">
      <img src="${product.images[0]}" alt="${product.name}" 
           style="width:100%; height:256px; object-fit:cover; border-radius:8px;" />
      <h3 class="product-name">${product.name}</h3>
      <p>
        ${product.colors ? product.colors.map(c =>
          `<span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${c}; margin:0 2px;"></span>`).join('') : ''}
      </p>
      <p class="product-price">${product.price} грн</p>
      <a class="more-info" href= >Детальніше</a>
      
    </div>
  `).join('');
}

function addSlidesToSwiper(products) {
  if (!swiper) {
    wrapper.innerHTML = createSlideMarkup(products);
    swiper = new Swiper('.popular-swiper', {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: false,
      navigation: {
        nextEl: '.popular-button-next',
        prevEl: '.popular-button-prev',
        disabledClass: 'disabled-nav'
      },
      pagination: {
        el: '.popular-pagination',
        clickable: true
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 10 },
        768: { slidesPerView: 2, spaceBetween: 15 },
        1024: { slidesPerView: 3, spaceBetween: 20 }
      }
    });

    swiper.update(); 

    const prevBtn = document.querySelector('.popular-button-prev');
    const nextBtn = document.querySelector('.popular-button-next');
    const updateNavButtons = () => {
      prevBtn.classList.toggle('disabled-nav', swiper.isBeginning);
      nextBtn.classList.toggle('disabled-nav', swiper.isEnd);
    };
    swiper.on('slideChange', updateNavButtons);
    swiper.on('init', updateNavButtons);
    updateNavButtons();

  } catch (error) {
    console.error('Помилка завантаження популярних товарів:', error);

    swiper.update(); 

    const prevBtn = document.querySelector('.popular-button-prev');
    const nextBtn = document.querySelector('.popular-button-next');
    const updateNavButtons = () => {
      prevBtn.classList.toggle('disabled-nav', swiper.isBeginning);
      nextBtn.classList.toggle('disabled-nav', swiper.isEnd);
    };
    swiper.on('slideChange', updateNavButtons);
    swiper.on('init', updateNavButtons);
    updateNavButtons();

  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPopularFurniture();
  loadPopularFurniture();
});
