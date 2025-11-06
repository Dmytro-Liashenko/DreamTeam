const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  body: document.querySelector('body'),
};

refs.openModalBtn.addEventListener('click', toggleModal);
refs.closeModalBtn.addEventListener('click', toggleModal);
refs.modal.addEventListener('click', onModalClick);
window.addEventListener('keydown', onEscClick);

function toggleModal() {
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
