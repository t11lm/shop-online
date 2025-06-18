import Goods from "./Goods.js";
import { allGoods } from '../main.js';

const choiceBtnEl = document.querySelector('.location__city');
const choiceNameEl = document.querySelector('.location__city-name');
const sublistEl = document.querySelector('.location__city');
const citiesEl = document.querySelectorAll('.location__sublink');

function sublistToggle() {
    sublistEl.classList.toggle('location__city--active');
}

citiesEl.forEach(cityEl => {
    cityEl.addEventListener('click', function (e) {
        e.preventDefault();
        choiceNameEl.textContent = cityEl.textContent;
        sublistEl.classList.remove('location__city--active');
    });
});

export {
    choiceBtnEl,
    choiceNameEl,
    sublistEl,
    sublistToggle,
}