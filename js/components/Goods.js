export default class Goods {
    constructor(id, name, price, image, availability, type, rating, goodsOfDay) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.availability = availability;
        this.type = type;
        this.rating = rating;
        this.goodsOfDay = goodsOfDay;
    }

    createCardElement() {
        const catalogItem = document.createElement('li');
        catalogItem.classList.add('catalog__item');

        const cardEl = document.createElement('div');
        cardEl.classList.add('product-card');

        const cardVisualEl = document.createElement('div');
        cardVisualEl.classList.add('product-card__visual');

        const cardImgEl = document.createElement('img');
        cardImgEl.classList.add('product-card__img');
        cardImgEl.src = this.image;

        const cardMoreEl = document.createElement('div');
        cardMoreEl.classList.add('product-card__more');
        cardMoreEl.innerHTML = `
            <button id="add__btn" class="product-card__link btn btn--icon" data-id="${this.id}"
            data-name="${this.name}"
            data-price-new="${this.price.new}"
            data-image="${this.image}">
                <span class="btn__text">В корзину</span>
                <svg width="24" height="24" aria-hidden="true">
                    <use xlink:href="images/sprite.svg#icon-basket"></use>
                </svg>
            </button>
            <a href="#" class="product-card__link btn btn--secondary">
                <span class="btn__text">Подробнее</span>
            </a>
        `;

        const cardInfoEl = document.createElement('div');
        cardInfoEl.classList.add('product-card__info');

        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('product-card__title');
        cardTitle.textContent = this.name;

        const cardOldPriceEl = document.createElement('span');
        cardOldPriceEl.classList.add('product-card__old');
        const cardOldPriceNumEl = document.createElement('span');
        cardOldPriceNumEl.classList.add('product-card__old-number');
        cardOldPriceNumEl.textContent = this.price.old;
        const cardOldPriceAddEl = document.createElement('span');
        cardOldPriceAddEl.classList.add('product-card__old-add');
        cardOldPriceAddEl.textContent = '₽';

        const cardPriceEl = document.createElement('span');
        cardPriceEl.classList.add('product-card__price');
        const cardPriceNumEl = document.createElement('span');
        cardPriceNumEl.classList.add('product-card__price-number');
        cardPriceNumEl.textContent = this.price.new;
        const cardPriceAddEl = document.createElement('span');
        cardPriceAddEl.classList.add('product-card__price-add');
        cardPriceAddEl.textContent = '₽';

        const tooltipContent = document.createElement('div');
        tooltipContent.className = 'tooltip__content';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'tooltip__text';
        titleSpan.textContent = 'Наличие товара по городам:';
        tooltipContent.appendChild(titleSpan);

        const citiesList = document.createElement('ul');
        citiesList.className = 'tooltip__list';

        const cities = [
        { name: 'Москва', count: this.availability.moscow },
        { name: 'Оренбург', count: this.availability.orenburg },
        { name: 'Санкт-Петербург', count: this.availability.saintPetersburg }
        ];

        cities.forEach(city => {
        const listItem = document.createElement('li');
        listItem.className = 'tooltip__item';
        
        const itemSpan = document.createElement('span');
        itemSpan.className = 'tooltip__text';
        
        const countSpan = document.createElement('span');
        countSpan.className = 'tooltip__count';
        countSpan.textContent = city.count;
        
        itemSpan.textContent = `${city.name}: `;
        itemSpan.appendChild(countSpan);
        
        listItem.appendChild(itemSpan);
        citiesList.appendChild(listItem);
        });

        tooltipContent.appendChild(citiesList);

        const cardToolTipEl = document.createElement('div');
        cardToolTipEl.classList.add('product-card__tooltip', 'tooltip');
        const cardToolTipBtn = document.createElement('button');
        cardToolTipBtn.classList.add('tooltip__btn')
        cardToolTipBtn.innerHTML = `
            <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                <use xlink:href="images/sprite.svg#icon-i"></use>
            </svg>
        `;

        cardPriceEl.append(cardPriceNumEl, cardPriceAddEl);
        cardOldPriceEl.append(cardOldPriceNumEl, cardOldPriceAddEl);
        cardToolTipEl.append(cardToolTipBtn);
        cardInfoEl.append(cardTitle, cardOldPriceEl, cardPriceEl, cardToolTipEl);
        cardVisualEl.append(cardImgEl, cardMoreEl);
        cardEl.append(cardVisualEl, cardInfoEl);
        catalogItem.append(cardEl);

        requestAnimationFrame(() => {
            tippy(cardToolTipBtn, {
                content: tooltipContent.innerHTML,
                allowHTML: true,
                theme: 'light',
            });            
        });

        return catalogItem;
    }

    renderGoods() {
        const catalogEl = document.querySelector('.catalog__list');
        const card = this.createCardElement();
        catalogEl.append(card);
    }
}