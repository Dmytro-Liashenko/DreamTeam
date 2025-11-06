const refs = {
  openBtn: document.querySelector('#menu-open-btn'),
  closeBtn: document.querySelector('#menu-close-btn'),
  mobileMenu: document.querySelector('#mobile-menu-container'),
  mobaleNavList: document.querySelector('#mobile-nav'),
  navigation: document.querySelector('.navigation'),
  overlay: document.querySelector('#menu-overlay'),
  btn: document.querySelector('.btn-header'),
};

refs.openBtn.addEventListener('click', openMobileMenu);
refs.closeBtn.addEventListener('click', closeMobileMenu);
document.addEventListener('keydown', handleEscKeyClose);
document.addEventListener('click', handleOutsideClick);
refs.btn.addEventListener('click', scrollToFurniture);

function openMobileMenu() {
  refs.mobileMenu.classList.add('is-open');
  refs.navigation.classList.add('menu-active');
  refs.overlay.classList.add('is-visible');

  document.body.style.overflow = 'hidden';
  refs.openBtn.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  refs.mobileMenu.classList.remove('is-open');
  refs.navigation.classList.remove('menu-active');
  refs.overlay.classList.remove('is-visible');

  document.body.style.overflow = '';
  refs.openBtn.setAttribute('aria-expanded', 'false');
}

refs.mobaleNavList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

function handleCloseIfOpen() {
  if (refs.mobileMenu.classList.contains('is-open')) {
    closeMobileMenu();
  }
}

function handleEscKeyClose(event) {
  if (event.key === 'Escape') {
    handleCloseIfOpen();
  }
}

function handleOutsideClick(evt) {
  const isClickInsideMenu = refs.mobileMenu.contains(evt.target);
  const isClickOnOpenBtn = refs.openBtn.contains(evt.target);

  if (!isClickInsideMenu && !isClickOnOpenBtn) {
    handleCloseIfOpen();
  }
}

function scrollToFurniture() {
  const targetSection = document.querySelector('#furniture');

  targetSection.scrollIntoView({
    behavior: 'smooth',
  });
  closeMobileMenu();
}
