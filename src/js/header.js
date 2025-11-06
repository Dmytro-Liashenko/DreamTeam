const refs = {
  openBtn: document.querySelector('#menu-open-btn'),
  closeBtn: document.querySelector('#menu-close-btn'),
  mobileMenu: document.querySelector('#mobile-menu-container'),
  mobaleNavList: document.querySelector('#mobile-nav'),
  navigation: document.querySelector('.navigation'),
};

refs.openBtn.addEventListener('click', openMobileMenu);
refs.closeBtn.addEventListener('click', closeMobileMenu);
document.addEventListener('keydown', handleEscKeyClose);

function openMobileMenu() {
  refs.mobileMenu.classList.add('is-open');
  refs.navigation.classList.add('menu-active');

  document.body.style.overflow = 'hidden';
  refs.openBtn.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  refs.mobileMenu.classList.remove('is-open');
  refs.navigation.classList.remove('menu-active');

  document.body.style.overflow = '';
  refs.openBtn.setAttribute('aria-expanded', 'false');
}

refs.mobaleNavList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});
function handleEscKeyClose(event) {
  if (event.key === 'Escape') {
    if (refs.mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  }
}
