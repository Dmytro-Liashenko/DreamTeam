import Swiper from 'swiper/bundle';
import 'swiper/css';
import Raty from 'raty-js';
import starHalfUrl from "../img/star-icons/star-half.svg"
import starOffUrl from "../img/star-icons/star-off.svg"
import starOnUrl from "../img/star-icons/star-on.svg"
import { getFeedback } from './products-api.js';

const carousel = document.querySelector('.feedback-swiper-wrapper')

const swiper = new Swiper('.feedback-swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
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
    autoHeight: false,
    spaceBetween: 24,
    autoplay: {
        delay: 5000,
    },

    pagination: {
        el: '.feedback-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.feedback-swiper-button-next',
        prevEl: '.feedback-swiper-button-prev',
    },
});


export function initRatings() {
    document.querySelectorAll('.feedback-rating').forEach(elem => {

        new Raty(elem, {
            score: elem.dataset.score,
            starSize: 20,
            step: 0.5,
            score: elem.dataset.score,
            readOnly: true,
            numberMax: 5,
            precision: false,
            round: { down: 0.3, full: 0.7, up: 0.8 },
            starOn: starOnUrl,
            starHalf: starHalfUrl,
            starOff: starOffUrl,
        }).init();
    });
}

function createCardMarkup(array) {
    return array.map(({ name, descr, rate }) => `
    <div class="swiper-slide feedback-swiper-slide">
      <div class="feedback-comment-card">
        <div class="feedback-rating" data-score="${rate}"></div>
        <p class="feedback-comment-descr">"${descr}"</p>
        <h3 class="feedback-comment-name">${name}</h3>
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
