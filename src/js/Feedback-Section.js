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

function initRatings() {
    document.querySelectorAll('.rating').forEach(elem => {
        new Raty(elem, {
            score: elem.dataset.score,
            starSize: 20,
            step: 0.5,
            score: elem.dataset.score,
            readOnly: true,
            numberMax: 5,
            precision: false,
            round: { down: 0.3, full: 0.7, up: 0.8 },
            path: './img/star-icons',
            starOn: 'star-full.png',
            starHalf: 'star-half.png',
            starOff,
        });
    });
}

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
