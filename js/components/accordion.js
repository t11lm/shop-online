export function accordionTogle(btn, text) {
    btn.classList.toggle('accordion__btn--active');

    if (text.style.display === 'block') {
        text.style.display = 'none';
    } else {
        text.style.display = 'block';
    }
}