import Swiper from 'swiper/bundle';
import 'swiper/css';
import Raty from 'raty-js';

import { getFeedback } from './products-api.js';

const carousel = document.querySelector('.swiper-wrapper')

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 48,
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 32,
        }
    },
    effect: 'slide',
    grabCursor: true,
    freeMode: true,
    breakpoints: true,
    autoHeight: false,
    spaceBetween: 24,
    autoplay: {
        delay: 5000,
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

function createCardMarkup(array) {
    return array.map(({ name, descr, rate }) => `
    <div class="swiper-slide">
      <div class="comment-card">
        <div class="rating" data-score="${rate}"></div>
        <p class="comment-descr">"${descr}"</p>
        <h3 class="comment-name">${name}</h3>
      </div>
    </div>
    `).join('\n')
}

function initRatings() {
    document.querySelectorAll('.rating').forEach(elem => {
        new Raty(elem, {
            starSize: 18,
            score: elem.dataset.score,
            readOnly: true,
        });
    });
}

function createCarousel(feedback) {
    carousel.insertAdjacentHTML('beforeend', createCardMarkup(feedback));
    initRatings();
    swiper.update();
}

let currentPage = 1;

async function loadFeedback() {
    try {
        const feedback = await getFeedback(currentPage);
        createCarousel(feedback);
    } catch (err) {
        console.log(err);
    }
}

loadFeedback();