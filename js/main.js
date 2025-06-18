import { burgerBtnEl, burgerToggle, burgerCloseBtnEl, burgerClose} from "./components/burger.js";
import * as choises from './components/choises.js'
import Goods from './components/Goods.js'
import { typeFilter } from './components/availability.js';
import { filterCheck, filterRadio, catalogEl, filter } from "./components/filter.js";
import {  basketBtnEl, basketTogle } from "./components/bascet.js";
import { accordionTogle } from "./components/accordion.js";
import GoodsOfDay from "./components/GoodsOfDay.js";
import { initSwiper } from './components/swiper.js';
import { validate } from "./components/valiadate.js";
import { hideStatus } from "./components/status.js";

export const allGoods = [];
export const paramArr = [];
export let renderedGoods = [];

export const statusTextEl = document.createElement('p');

window.addEventListener('DOMContentLoaded', () => {
    const filterContainer = document.querySelector('.catalog-form');
    const catalogSortEl = document.querySelector('.catalog__sort-select');
    const accordionEl = document.querySelector('.accordion');
    const statusDiv = document.createElement('div');
    statusDiv.classList.add('status__block')
    const statusContentEl = document.createElement('div');
    statusContentEl.classList.add('status__content')
    statusTextEl.classList.add('status__text')
    statusTextEl.textContent = 'Форма успешно отправлена!';
    const statusCloseBtn = document.createElement('button');
    statusCloseBtn.innerHTML = `
        <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
        </svg>
    `;
    statusCloseBtn.addEventListener('click', hideStatus)
    statusCloseBtn.classList.add('status__btn')
    statusContentEl.append(statusCloseBtn, statusTextEl)
    statusDiv.append(statusContentEl);
    document.body.append(statusDiv);
    
    fetch('./data/data.json')
    .then(res => res.json())
    .then(items => {
        items.forEach(item => {
            const goodsItem = new Goods(item.id, item.name, item.price, item.image, item.availability, item.type, item.rating, item.goodsOfDay);
            goodsItem.renderGoods();
            allGoods.push(goodsItem);
            if(item.goodsOfDay) {
                const goodsOfDayItem = new GoodsOfDay(item.id, item.name, item.price, item.image, item.availability, item.type, item.rating, item.goodsOfDay);
                goodsOfDayItem.renderGoods();
            }
        });
        
        typeFilter(allGoods)
        renderedGoods = [...allGoods]
        initSwiper();
    })
    .catch(err => console.error('Ошибка при загрузке JSON:', err));

    burgerBtnEl.addEventListener('click', burgerToggle);
    burgerCloseBtnEl.addEventListener('click', burgerClose)
    choises.choiceBtnEl.addEventListener('click', choises.sublistToggle);
    basketBtnEl.addEventListener('click', basketTogle)
    catalogEl.addEventListener('click', async function(e) {
        const btn = e.target.closest('#add__btn');
        if (!btn) return;
        e.preventDefault();

        const id = btn.dataset.id;
        const name = btn.dataset.name;
        const priceNew = btn.dataset.priceNew;
        const image = btn.dataset.image

        const newItem = {id: id, 
            name: name, 
            price: priceNew, 
            image: image}
        
        const basketModule = await import("./components/bascet.js");
        basketModule.basketAdd(newItem);
    });
    accordionEl.addEventListener('click', function (e) {
        const btn = e.target.closest('.accordion__btn');
        if (!btn) return;
    
        const currentElement = btn.closest('.accordion__element');
        const currentContent = currentElement.querySelector('.accordion__content');
        const isVisible = getComputedStyle(currentContent).display !== 'none';
    
        const allElements = accordionEl.querySelectorAll('.accordion__element');
        allElements.forEach(el => {
            const elBtn = el.querySelector('.accordion__btn');
            const elContent = el.querySelector('.accordion__content');
    
            if (el !== currentElement) {
                elBtn.classList.remove('accordion__btn--active');
                elContent.style.display = 'none';
            }
        });
        
        if (!isVisible) {
            accordionTogle(btn, currentContent); // Открыть
        } else {
            accordionTogle(btn, currentContent); // Закрыть
        }
    });

    filterContainer.addEventListener('change', function (e) {
        if (e.target.matches('input[type="checkbox"]')) {
            if (e.target.checked) {
                paramArr.push(e.target.value);
            } else {
                const index = paramArr.indexOf(e.target.value);
                if (index !== -1) {
                    paramArr.splice(index, 1);
                }
            }

            const selectedRadio = filterContainer.querySelector('input[type="radio"]:checked');
            if (selectedRadio && selectedRadio.value === 'instock') {
                filterRadio(paramArr);
            } else {
                if (paramArr.length === 0) {
                    catalogEl.innerHTML = '';
                    allGoods.forEach(item => item.renderGoods());
                } else {
                    filterCheck(paramArr, allGoods);
                }
            }
        }

        if (e.target.matches('input[type="radio"]')) {
            if (e.target.value === 'instock') {
                filterRadio(paramArr);
            } else if (e.target.value === 'all-item') {
                if (paramArr.length === 0) {
                    catalogEl.innerHTML = '';
                    allGoods.forEach(item => item.renderGoods());
                } else {
                    filterCheck(paramArr, allGoods);
                }
            }
        }
    });

    catalogSortEl.addEventListener('change', function (e) {
        e.preventDefault()
        let sortValue = '';

        if (catalogSortEl.value === 'price-min') {
            sortValue = catalogSortEl.value;
            filter(sortValue)
        }else if (catalogSortEl.value === 'price-max') {
            sortValue = catalogSortEl.value;
            filter(sortValue)
        } else if (catalogSortEl.value === 'rating-max') {
            sortValue = catalogSortEl.value;
            filter(sortValue)
        }
    })

    validate()

});

