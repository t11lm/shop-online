import Goods from './Goods.js';

export default class GoodsOfDay extends Goods {
    renderGoods() {
        const specialList = document.querySelector('.day-products__list');
        const catalogItem = this.createCardElement(); // тут сразу .catalog__item
    
        catalogItem.classList.add('day-products__item', 'swiper-slide');
    
        const cardEl = catalogItem.querySelector('.product-card');
        cardEl.classList.add('product-card--small');
    
        specialList.append(catalogItem);
    }
    
}
