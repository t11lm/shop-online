import BasketGoods from "./BasketGoods.js";

const basketEl = document.querySelector('.basket');
export const basketBtnEl = document.querySelector('.header__user-btn');
const basketCountEl = document.querySelector('.header__user-count');
basketCountEl.textContent = 0;
const bascketEmptyEl = document.querySelector('.basket__empty-block');
const basketLinkEl = document.createElement('a');
basketLinkEl.classList.add('basket__link', 'btn')
basketLinkEl.textContent = 'Перейти к оформлению';
basketLinkEl.href = '#';
let basketItemsArr = [];

export function basketTogle() {
    if (basketEl.classList.contains('basket')){
        basketEl.classList.toggle('basket--active');
    }
}

export function basketAdd(item) {
    basketCountEl.textContent++
    if (basketCountEl.textContent > 0) {
        bascketEmptyEl.textContent = '';
        bascketEmptyEl.classList.remove('basket__empty-block')
        basketEl.append(basketLinkEl);
    } else if (basketCountEl.textContent === 0) {
        bascketEmptyEl.textContent = 'Корзина пока пуста';
        bascketEmptyEl.classList.add('basket__empty-block')
        basketEl.remove(basketLinkEl);
    }

    basketItemsArr.push(item)
    
    const basketItem = new BasketGoods(item.id, item.name, item.price, item.image)
    basketItem.renderBasketGoods()

}

export function basketDel(item) {
    const basketGoodsList = document.querySelector('.basket__list');
    const elementToRemove = basketGoodsList.querySelector(`[data-id="${item.id}"]`);

    console.log(item.id);
    const index = basketItemsArr.findIndex(el => el.id === item.id);
    if (index !== -1) {
        basketItemsArr.splice(index, 1);
    }
    console.log(basketItemsArr);
    
    
    console.log(elementToRemove);
    if (elementToRemove) {
        basketGoodsList.removeChild(elementToRemove);
        basketGoodsList.innerHTML = ''
        basketItemsArr.forEach(item => {
            const basketItem = new BasketGoods(item.id, item.name, item.price, item.image)
            basketItem.renderBasketGoods()
        });
    }

    basketCountEl.textContent--

    if (+basketCountEl.textContent === 0) {
        bascketEmptyEl.textContent = 'Корзина пока пуста';
        bascketEmptyEl.classList.add('basket__empty-block');
        
        if (basketEl.contains(basketLinkEl)) {
            basketEl.removeChild(basketLinkEl);
        }
    }
}