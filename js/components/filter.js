import { allGoods, renderedGoods } from "../main.js";
import Goods from "./Goods.js";

export const catalogEl = document.querySelector('.catalog__list');

export function filterCheck(param, arr) {
    catalogEl.innerHTML = '';
    renderedGoods.length = 0;
    let matchedGoods = [];

    arr.forEach(el => {
        const hasMatch = param.some(type => Array.isArray(el.type) && el.type.includes(type));
        
        if (hasMatch) {
            matchedGoods.push(el)
        }  
    });

    renderFiltredArr(matchedGoods)
}

export function filterRadio(param) {
    catalogEl.innerHTML = '';
    const hasMatch = [];

    allGoods.forEach(el => {
        if (el.availability.moscow !== 0 && el.availability.orenburg !== 0 && el.availability.saintPetersburg !== 0){
            hasMatch.push(el)
        }
    });

    if (param.length === 0) {
        const allParam = ["pendant", "nightlights", "overhead", "point", "ceiling"]
        filterCheck(allParam, hasMatch)
    } else {
        filterCheck(param, hasMatch) 
    }
}

export function filter(param) {
    catalogEl.innerHTML = '';
    const goods = [];
    renderedGoods.forEach(el => {
        goods.push(el)
    });
    renderedGoods.length = 0;


    switch (param) {
        case 'price-min':
            goods.sort((a, b) => (a.price?.new || 0) - (b.price?.new || 0));
            break;
        case 'price-max':
            goods.sort((a, b) => (b.price?.new || 0) - (a.price?.new || 0));
            break;
        case 'rating-max':
            goods.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        default:
            console.warn('Неизвестный параметр сортировки:', param);
    }


    renderFiltredArr(goods);
}

function renderFiltredArr (arr) {
    arr.forEach (el => {
        const filtredItem = new Goods(el.id, el.name, el.price, el.image, el.availability, el.type, el.rating, el.goodsOfDay);
        filtredItem.renderGoods();
        renderedGoods.push(el);
        console.log(renderedGoods);
    })
}