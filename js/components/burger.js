export const burgerBtnEl = document.querySelector('.header__catalog-btn');
const burgerMenuEl = document.querySelector('#main-menu');
export const burgerCloseBtnEl = document.querySelector('.main-menu__close');

export function burgerToggle() {
    if (burgerMenuEl.classList.contains('main-menu')){
        burgerMenuEl.classList.toggle('main-menu--active');
    }
}

export function burgerClose() {
    if (burgerMenuEl.classList.contains('main-menu--active')) {
        burgerMenuEl.classList.remove('main-menu--active');
    }
}



