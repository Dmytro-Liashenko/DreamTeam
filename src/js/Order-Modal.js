import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { postUsersOrder } from './products-api';
import { orderData } from './Furniture-Details-Modal';

const refs = {
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
  form: document.querySelector('.modal-form'),
};

refs.closeModalBtn.addEventListener('click', toggleModal);
refs.modal.addEventListener('click', onModalClick);
window.addEventListener('keydown', onEscClick);
refs.form.addEventListener('submit', onFormSubmit);

export function toggleModal() {
  refs.modal.classList.toggle('is-open');
  refs.body.classList.toggle('modal-open');
}

function closeModal() {
  refs.modal.classList.remove('is-open');
  refs.body.classList.remove('modal-open');
}

function onModalClick(event) {
  if (event.target === refs.modal) closeModal();
}

function onEscClick(event) {
  if (event.key === 'Escape' && refs.modal.classList.contains('is-open')) {
    closeModal();
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const { name: nameInput, phone: phoneInput, comment } = form.elements;
  const commentValue = comment.value;

  clearError(nameInput);
  clearError(phoneInput);

  let isValid = true;
  const nameValue = nameInput.value.trim();

  if (nameValue.length < 2) {
    showError(nameInput, "Будь ласка, введіть правильно ім'я");
    isValid = false;
  }

  const phoneValue = phoneInput.value.trim().replace(/\s+/g, '');
  const phoneRegex = /^(\+?38)?0\d{9}$/;

  if (!phoneRegex.test(phoneValue)) {
    showError(phoneInput, 'Невірний формат телефону');
    isValid = false;
  }

  if (!isValid) return;

  console.log(orderData.modelId);
  console.log(orderData.color);

  postUsersOrder({
    name: nameValue,
    phone: phoneValue,
    modelId: orderData.modelId,
    color: orderData.color,
    comment: commentValue,
  })
    .then(res => {
      console.log(res);
      iziToast.success({
        title: 'Вітаю!',
        message: 'Ваше замовлення оформлено успішно!',
        position: 'topRight',
      });
      form.reset();
      closeModal();
    })
    .catch(error => {
      console.error('Failed to post order.', error.message);
      iziToast.error({
        title: 'Помилка',
        message: `${error.message}`,
        position: 'topRight',
      });
    });
}

function showError(input, message) {
  input.classList.add('invalid');

  if (
    !input.nextElementSibling ||
    !input.nextElementSibling.classList.contains('error-text')
  ) {
    const error = document.createElement('p');
    error.className = 'error-text';
    error.textContent = message;
    input.insertAdjacentElement('afterend', error);
  }
}

function clearError(input) {
  input.classList.remove('invalid');
  if (
    input.nextElementSibling &&
    input.nextElementSibling.classList.contains('error-text')
  ) {
    input.nextElementSibling.remove();
  }
}