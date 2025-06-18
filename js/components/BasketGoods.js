import { basketDel } from './bascet.js';
import Goods from './Goods.js'

export default class BasketGoods extends Goods {
    constructor(id, name, price, image) {
        super(id, name, price, image);
        this.id = id;
        this.item = {id: this.id, 
            name: this.name, 
            price: this.price, 
            image: this.image}
    }

    renderBasketGoods() {
        const basketListEl = document.querySelector('.basket__list');
        basketListEl.classList.add('basket__list');
        const basketItemEl = document.createElement('li')
        basketItemEl.classList.add('basket__item');
        basketItemEl.dataset.id = this.id;

        const basketImgBlockEl = document.createElement('div')
        basketImgBlockEl.classList.add('basket__img');
        const basketImgEl = document.createElement('img')
        basketImgEl.src = this.image;

        const basketNameEl = document.createElement('span');
        basketNameEl.textContent = this.name;
        basketNameEl.classList.add('basket__name');
        const basketPriceEl = document.createElement('span')
        basketPriceEl.textContent = this.price
        basketPriceEl.classList.add('basket__price');

        const basketCloseBtnEl = document.createElement('button')
        basketCloseBtnEl.classList.add('basket__close')
        basketCloseBtnEl.onclick = () => basketDel(this.item);
        basketCloseBtnEl.innerHTML = `
            <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-close"></use>
            </svg>
        `

        basketImgBlockEl.append(basketImgEl)
        basketItemEl.append(basketImgBlockEl, basketNameEl, basketPriceEl, basketCloseBtnEl)
        basketListEl.append(basketItemEl)
    }
}