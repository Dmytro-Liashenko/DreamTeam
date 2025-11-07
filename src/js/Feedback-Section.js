import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import Raty from 'raty-js';

import { getFeedback } from './products-api.js';

const carousel = document.querySelector('.swiper-wrapper')

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 3,
    effect: 'slide',

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    scrollbar: {
        el: '.swiper-scrollbar',
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
        console.log('feedback:', feedback);
        createCarousel(feedback);
    } catch (err) {
        console.log(err);
    }
}

loadFeedback();